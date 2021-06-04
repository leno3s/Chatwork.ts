import { Message, HttpRequestNode } from "../src/index";
jest.mock("../src/HttpRequestNode");
const HttpRequestMock = HttpRequestNode as jest.Mock;

describe("Messageのテスト", () => {
  const messageData = {
    account: {
      chatwork_id: "leno3s",
      organization_id: "Example inc.",
      organization_name: "Example inc.",
      department: "traveling",
    },
    body: "message body.",
    send_time: 1298905200,
    update_time: 1298905200,
    message_id: 123456789,
    /**
     * エンドポイントが/rooms/以下の為にroom_idを要求されている
     * @type {number}
     * @memberof Message
     */
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

  test("Message#update()", () => {
    const request = new HttpRequestMock();
    const message = new Message(messageData, messageData.room_id, request);
    const spy = jest.spyOn(request, "put");
    const messageId = message.update("message updated.");
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/messages/123456789");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      body: "message updated.",
    });
  });

  test("Message#delete()", () => {
    const request = new HttpRequestMock();
    const message = new Message(messageData, messageData.room_id, request);
    const spy = jest.spyOn(request, "delete");
    const messageId = message.delete();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/messages/123456789");
    expect(spy.mock.calls[0][1]).toBe(null);
  });
});
