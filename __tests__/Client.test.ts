import { Client, HttpRequestNode } from "../src/index";
import { MyTask } from "../src/MyTask";
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
    const me = client.getMyStatus();
    expect(spy.mock.calls[0][0]).toBe("/my/status");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Client#getMyStatus()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    const me = client.getMyStatus();
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
    const contacts = client.getContacts();
    expect(spy.mock.calls[0][0]).toBe("/contacts");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Client#getRoom()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    const response = client.getRoom(123);
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
    const room = client.createNewRoom(
      "test room",
      [111, 222, 333],
      "the room's description.",
      "beer",
      false,
      false,
      undefined,
      undefined,
      undefined
    );
    expect(spy.mock.calls[0][0]).toBe("/rooms");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      name: "test room",
      members_admin_ids: "111,222,333",
      description: "the room's description.",
      icon_preset: "beer",
      link: false,
      link_need_acceptance: false,
    });
  });

  test("Client#getRequestOfContacts()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "get");
    const contacts = client.getRequestOfContacts();
    expect(spy.mock.calls[0][0]).toBe("/incoming_requests");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Client#sendMessage()", () => {
    const request = new HttpRequestMock();
    const client = new Client(request);
    const spy = jest.spyOn(request, "post");
    const response = client.sendMessage(123, "test message");
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/messages");
    expect(spy.mock.calls[0][1]).toStrictEqual({ body: "test message" });
  });
});
