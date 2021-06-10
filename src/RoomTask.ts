import { Account } from "./Account";
import { IHttpRequest } from "./IHttpRequest";
import { Task } from "./Task";

/**
 * GET /rooms/${room_id}/tasks のレスポンスにおけるタスク
 * GET /my/tasks と違いがある
 *
 * @export
 * @class RoomTask
 * @extends {Task}
 */
export class RoomTask extends Task {
  account: Account;

  /**
   * Creates an instance of RoomTask.
   * @param {*} task
   * @param {number} roomId
   * @param {IHttpRequest} httpRequest
   * @memberof RoomTask
   */
  public constructor(task: any, roomId: number, httpRequest: IHttpRequest) {
    super(task, roomId, httpRequest);
    this.account = task.account;
  }
}
