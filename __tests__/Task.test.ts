import { Client, HttpRequestNode } from "../src/index";
import { MyTask } from "../src/MyTask";
import { RoomTask } from "../src/RoomTask";
import { Task } from "../src/Task";
jest.mock("../src/HttpRequestNode");
const HttpRequestMock = HttpRequestNode as jest.Mock;

describe("Clientのテスト", () => {
  const roomId = 123;
  const roomTaskData = {
    account: {
      chatwork_id: "leno3s",
      organization_id: "Example inc.",
      organization_name: "Example inc.",
      department: "traveling",
    },
    assigned_by_account: {
      chatwork_id: "leno3s",
      organization_id: "Example inc.",
      organization_name: "Example inc.",
      department: "traveling",
    },
    message_id: "123456789",
    body: "this is my task.",
    limit_time: 1298905200,
    status: "open",
    task_id: 1234,
  };
  const myTaskData = {
    room: {
      room_id: 123,
      name: "leno3s",
      avatar_image_url: "https://example.com/icon_path.png",
    },
    assigned_by_account: {
      chatwork_id: "leno3s",
      organization_id: "Example inc.",
      organization_name: "Example inc.",
      department: "traveling",
    },
    message_id: "123456789",
    body: "this is my task.",
    limit_time: 1298905200,
    status: "open",
    task_id: 1234,
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

  test("Task#update()", () => {
    const request = new HttpRequestMock();
    const task = new Task(roomTaskData, roomId, request);
    const spy = jest.spyOn(request, "put");
    const taskId = task.update("done");
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/tasks/1234/status");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      body: "done",
    });
  });

  test("RoomTask#update()", () => {
    const request = new HttpRequestMock();
    const task = new RoomTask(roomTaskData, roomId, request);
    const spy = jest.spyOn(request, "put");
    const taskId = task.update("done");
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/tasks/1234/status");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      body: "done",
    });
  });

  test("MyTask#update()", () => {
    const request = new HttpRequestMock();
    const task = new MyTask(myTaskData, request);
    const spy = jest.spyOn(request, "put");
    const taskId = task.update("done");
    expect(spy.mock.calls[0][0]).toBe("/rooms/123/tasks/1234/status");
    expect(spy.mock.calls[0][1]).toStrictEqual({
      body: "done",
    });
  });
});
