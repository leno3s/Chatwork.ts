import { HttpRequestNode } from "../src/HttpRequestNode";
import { Link } from "../src/Link";

jest.mock("../src/HttpRequestNode");
const HttpRequestMock = HttpRequestNode as jest.Mock;

describe("Linkのテスト", () => {
  const linkData = {
      public: true,
      url: "https://example.com/g/ramdomcode42",
      need_acceptance: true,
      description: "this is test link",
  };
  const roomId = 123;

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

  test("Link#update()", () => {
    const request = new HttpRequestMock();
    const link = new Link(linkData, roomId, request);
    const spy = jest.spyOn(request, "put");
    const newLink = link.update("hoge", "description updated.", true);
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/link");
    expect(spy.mock.calls[0][1]).toStrictEqual({
        path: "hoge",
        description: "description updated.",
        need_acceptance: true
    })
  });

  test("Link#delete()", () => {
    const request = new HttpRequestMock();
    const link = new Link(linkData, roomId, request);
    const spy = jest.spyOn(request, "delete");
    const _ = link.delete();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/link");
    expect(spy.mock.calls[0][1]).toBe(null);
  });

  test("Link#getRoom()", () => {
    const request = new HttpRequestMock();
    const link = new Link(linkData, roomId, request);
    const spy = jest.spyOn(request, "get");
    const room = link.getRoom();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123");
    expect(spy.mock.calls[0][1]).toBe(null);
  });
});
