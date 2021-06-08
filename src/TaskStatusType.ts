/**
 * タスクの状態の定数のクラス
 *
 * @class TaskStatusType
 */
export class TaskStatus {
  public static readonly OPEN: TaskStatusType = "open";
  public static readonly DONE: TaskStatusType = "done";
  private constructor() {}
}

export type TaskStatusType = "open" | "done";
