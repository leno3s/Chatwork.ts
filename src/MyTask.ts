import { IHttpRequest, Task } from "src";

/**
 * GET /my/tasks のレスポンスにおけるTask
 *
 * @export
 * @class MyTask
 * @extends {Task}
 */
export class MyTask extends Task {
  room: {
    room_id: number;
    name: string;
    icon_path: string;
  };

  /**
   * Creates an instance of MyTask.
   * @param {*} task
   * @param {IHttpRequest} httpRequest
   * @memberof MyTask
   */
  public constructor(task: any, httpRequest: IHttpRequest) {
    super(task, task.room.room_id, httpRequest);
    this.room = task.room;
  }
}
