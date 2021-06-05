import { IHttpRequest } from "./IHttpRequest";
import { Task } from "./Task";

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
  constructor(task: any, httpRequest: IHttpRequest) {
    super(task, task.room.room_id, httpRequest);
    this.room = task.room;
  }
}
