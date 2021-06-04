import * as Types from "./Types";
import { IHttpRequest } from "./IHttpRequest";

/**
 * タスクを表すクラス
 *
 * @class Task
 * @implements {Types.Task}
 */
export class Task implements Types.Task {
  account: Types.Account;
  assigned_by_account: Types.Account;
  message_id: string;
  body: string;
  limit_time: number;
  status: string;
  task_id: number;
  roomId: number;
  httpRequest: IHttpRequest;

  /**
   * Creates an instance of Task.
   * @param {*} task
   * @param {number} roomId
   * @param {IHttpRequest} httpRequest
   * @memberof Task
   */
  constructor(task: any, roomId: number, httpRequest: IHttpRequest) {
    this.account = task.account;
    this.assigned_by_account = task.assigned_by_account;
    this.message_id = task.message_id;
    this.body = task.body;
    this.limit_time = task.limit_time;
    this.status = task.status;
    this.task_id = task.task_id;
    this.roomId = roomId;
    this.httpRequest = httpRequest;
  }

  /**
   * タスク完了状態を変更する
   * https://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-tasks-task_id-status
   *
   * @param {Types.taskStatus} status タスク完了状態
   * 'done'を指定した場合、未完了のタスクを完了にします。 'open'を指定した場合、完了のタスクを未完了にします。
   * @returns {Types.TaskId} タスクのID
   */
  public update(status: Types.taskStatus): Types.TaskId {
    const endpoint =
      "/rooms/" + this.roomId + "/tasks/" + this.task_id + "/status";
    const payload = { body: status };
    return this.httpRequest.put(endpoint, payload);
  }
}
