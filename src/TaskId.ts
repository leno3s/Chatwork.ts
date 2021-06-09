import * as Types from "./Types";

/**
 * タスクIDを表すクラス
 *
 * @export
 * @class TaskId
 * @implements {Types.TaskId}
 */
export class TaskId implements Types.TaskId {
  taskId: number;

  /**
   * Creates an instance of TaskId.
   * @param {*} taskId
   * @memberof TaskId
   */
  public constructor(taskId: any) {
    this.taskId = taskId.task_id;
  }
}
