import { Me } from "../src/Me";
import { RoledUser } from "../src/RoledUser";
import { HttpRequestNode } from "../src/HttpRequestNode";

jest.mock("../src/HttpRequestNode");
const HttpRequestMock = HttpRequestNode as jest.Mock;

describe("Me, RoledUserのテスト", () => {
  const roledUserData = {
    account_id: 12345,
    role: "member",
    name: "John Smith",
    chatwork_id: "leno3s",
    organization_id: 12345,
    organization_name: "Hello Company",
    department: "Marketing",
    avatar_image_url: "https://example.com/abc.png",
  };
  const contactData = {
    account_id: 12345,
    room_id: 123,
    name: "John Smith",
    chatwork_id: "leno3s",
    organization_id: 12345,
    organization_name: "Example inc.",
    department: "Marketing",
    avatar_image_url: "https://example.com/abc.png",
  };
  const meData = {
    account_id: 12345,
    room_id: 123,
    name: "leno3s",
    chatwork_id: "leno3s",
    organization_id: 12345,
    organization_name: "Example inc.",
    department: "Marketing",
    title: "My Chat",
    url: "http://example.com",
    introduction: "Self Introduction",
    mail: "leno3s@example.com",
    tel_organization: "XXX-XXXX-XXXX",
    tel_extension: "YYY-YYYY-YYYY",
    tel_mobile: "ZZZ-ZZZZ-ZZZZ",
    skype: "myskype_id",
    facebook: "myfacebook_id",
    twitter: "mytwitter_id",
    avatar_image_url: "https://example.com/abc.png",
    login_mail: "leno3s@example.com",
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

  test("RoledUser()", () => {
    const roledUser = new RoledUser(roledUserData);
  });

  test("Me#getRoom()", () => {
    const request = new HttpRequestMock();
    const me = new Me(contactData, request);
    const spy = jest.spyOn(request, "get");
    const room = me.getRoom();
    expect(spy.mock.calls[0][0]).toBe("/rooms/123");
    expect(spy.mock.calls[0][1]).toBe(null);
  });
});
