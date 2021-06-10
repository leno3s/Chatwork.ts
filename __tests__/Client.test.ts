import { Client } from "../src/Client"
import { MyTask } from "../src/MyTask";
import { HttpRequestNode } from "../src/HttpRequestNode";

jest.mock("../src/HttpRequestNode");
const HttpRequestMock = HttpRequestNode as jest.Mock;

describe("Clientのテスト", () => {
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

  test("Client.factory()", () => {
    const request = new HttpRequestMock();
    const spy = jest.spyOn(request, "get");
    const client = Client.factory("token", HttpRequestMock);
    expect(client).toBeInstanceOf(Client);
  });

  test("Client#getMe()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    const me = client.getMe();
    expect(spy.mock.calls[0][0]).toBe("/me");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Client#getMyStatus()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    const status = client.getMyStatus();
    expect(spy.mock.calls[0][0]).toBe("/my/status");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Client#getMyTasks()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    let tasks: MyTask[];
    expect(() => {
      tasks = client.getMyTasks();
    }).toThrow();
    expect(spy.mock.calls[0][0]).toBe("/my/tasks");
    expect(spy.mock.calls[0][1]).not.toBeNull();
  });

  test("Client#getMyContacts()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    expect(() => client.getContacts()).toThrow();
    expect(spy.mock.calls[0][0]).toBe("/contacts");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Client#getRoom()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    const room = client.getRoom(123);
    expect(spy.mock.calls[0][0]).toBe("/rooms/123");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Client#getRooms()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    expect(() => {
      client.getRooms();
    }).toThrow();
    expect(spy.mock.calls[0][0]).toBe("/rooms");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Client#createNewRoom()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "post");
    const roomId = client.createNewRoom(
      "test room",
      [111, 222, 333],
      "the room's description.",
      "beer",
      false,
      false,
      "linkPath",
      [444, 555, 666],
      [777, 888, 999]
    );
    expect(spy.mock.calls[0][0]).toBe("/rooms");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      name: "test room",
      members_admin_ids: "111,222,333",
      description: "the room's description.",
      icon_preset: "beer",
      link: false,
      link_need_acceptance: false,
      link_code: "linkPath",
      members_member_ids: "444,555,666",
      members_readonly_ids: "777,888,999"
    });
  });

  test("Client#getRequestOfContacts()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    expect(() => client.getRequestOfContacts()).toThrow();
    expect(spy.mock.calls[0][0]).toBe("/incoming_requests");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Client#sendMessage()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "post");
    const messageId = client.sendMessage(123, "test message");
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/messages");
    expect(spy.mock.calls[0][1]).toStrictEqual({ body: "test message" });
  });

  test("Client#sendMessageToMyChat()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "post");
    const messageId = client.sendMessageToMyChat("test message");
    expect(spy.mock.calls[0][0]).toBe("/rooms/undefined/messages");
    expect(spy.mock.calls[0][1]).toStrictEqual({ body: "test message" });
  });
});
