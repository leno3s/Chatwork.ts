import * as Types from "./Types";
import { IHttpRequest } from "./IHttpRequest";

/**
 * タスクを表すクラス
 *
 * @class Task
 * @implements {Types.Task}
 */
export class Task implements Types.Task {
  assignedByAccount: Types.Account;
  messageId: string;
  body: string;
  limitTime: number;
  status: string;
  taskId: number;
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
    this.assignedByAccount = task.assigned_by_account;
    this.messageId = task.message_id;
    this.body = task.body;
    this.limitTime = task.limit_time;
    this.status = task.status;
    this.taskId = task.task_id;
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
      "/rooms/" + this.roomId + "/tasks/" + this.taskId + "/status";
    const payload = { body: status };
    return this.httpRequest.put(endpoint, payload);
  }
}
