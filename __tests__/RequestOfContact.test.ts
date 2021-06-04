import { Client, HttpRequestNode, RequestOfContact } from "../src/index";
jest.mock("../src/HttpRequestNode");
const HttpRequestMock = HttpRequestNode as jest.Mock;

describe("Clientのテスト", () => {
  const requestData = {
    request_id: 123,
    message: "test contact.",
    chatwork_id: "exampleMan",
    organization_id: 12345,
    organization_name: "Example inc.",
    department: "",
    account_id: 123,
    name: "example man",
    avatar_image_url: "https://example.com/",
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

  test("RequestOfContact#accept()", () => {
    const request = new HttpRequestMock();
    const requestOfContact = new RequestOfContact(requestData, request);
    const spy = jest.spyOn(request, "put");
    const me = requestOfContact.accept();
    expect(spy.mock.calls[0][0]).toBe("/incoming_requests/123");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("RequestOfContact#deny()", () => {
    const request = new HttpRequestMock();
    const requestOfContact = new RequestOfContact(requestData, request);
    const spy = jest.spyOn(request, "delete");
    const me = requestOfContact.deny();
    expect(spy.mock.calls[0][0]).toBe("/incoming_requests/123");
    expect(spy.mock.calls[0][1]).toBe(null);
  });
});
