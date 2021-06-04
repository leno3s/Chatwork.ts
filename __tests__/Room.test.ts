import { Chatwork, Client, HttpRequestNode, Room } from "../src/index";
jest.mock("../src/HttpRequestNode");
const HttpRequestMock = HttpRequestNode as jest.Mock;

describe("Clientのテスト", () => {
  const roomData = {
    name: "test room",
    type: "direct",
    role: "admin",
    sticky: true,
    unread_num: 0,
    mention_num: 0,
    mytask_num: 0,
    message_num: 0,
    file_num: 0,
    task_num: 0,
    icon_path: "https://example.com/icon_path.png",
    last_update_time: 1298905200,
    description: "test description",
    room_id: 123,
  };

  beforeEach(() => {
    return HttpRequestMock.mockImplementation(() => {
      return {
        __esModule: true,
        constructor: (token: string) => {},
        get: jest.fn((path: string, options: any) => {
          return path;
        }),
        post: jest.fn((path: string, options: any) => {
          return path;
        }),
        put: jest.fn((path: string, options: any) => {
          return path;
        }),
        delete: jest.fn((path: string, options: any) => {
          return path;
        }),
      };
    });
  });

  test("HttpRequestがmockできているか", () => {
    const request = new HttpRequestMock();
    expect(request.get("hoge")).toBe("hoge");
    expect(request.post("fuga")).toBe("fuga");
    expect(request.put("piyo")).toBe("piyo");
    expect(request.delete("foo")).toBe("foo");
  });

  test("Room#update()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "put");
    const roomId = room.update("test room", "the room's description.", "beer");
    expect(spy.mock.calls[0][0]).toBe("/rooms/123");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      name: "test room",
      description: "the room's description.",
      icon_preset: "beer",
    });
  });

  test("Room#leave()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "delete");
    room.leave();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123");
    expect(spy.mock.calls[0][1]).toStrictEqual({ action_type: "leave" });
  });

  test("Room#delete()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "delete");
    room.delete();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123");
    expect(spy.mock.calls[0][1]).toStrictEqual({ action_type: "delete" });
  });

  test("Room#getMembers()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "get");
    const members = room.getMembers();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/members");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Room#updateMembers()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "put");
    const members = room.updateMembers(
      [111, 222, 333],
      [444, 555, 666],
      [777, 888, 999]
    );
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/members");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      members_admin_ids: "111,222,333",
      members_member_ids: "444,555,666",
      members_readonly_ids: "777,888,999",
    });
  });

  test("Room#getMessages()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "get");
    let messages
    expect(() => {
      messages = room.getMessages(1);
    }).toThrow();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/messages");
    expect(spy.mock.calls[0][1]).toStrictEqual({ force: 1 });
  });

  test("Room#sendMessages()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "post");
    const messageId = room.sendMessage("test messages.", 0);
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/messages");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      body: "test messages.",
      self_unread: 0,
    });
  });

  test("Room#read()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "put");
    const messageId = room.read("123456789");
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/messages/read");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      message_id: "123456789"
    });
  });

  test("Room#getTasks()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "get");
    let tasks: Chatwork.Task[];
    expect(() => {
      tasks = room.getTasks(111, 222, "open");
    }).toThrow();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/tasks");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      account_id: 111,
      assigned_by_account_id: 222,
      status: "open",
    });
  });

  test("Room#getLink()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "get");
    const link = room.getLink();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/link");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Room#createLink()", () => {
    const request = new HttpRequestMock();
    const room = new Room(roomData, request);
    const spy = jest.spyOn(request, "post");
    const link = room.createLink(
        "link_string",
        "the link's description.",
        true
    );
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/link");
    expect(spy.mock.calls[0][1]).toStrictEqual({
        code: "link_string",
        description: "the link's description.",
        need_acceptance: true
    });
  });
});
