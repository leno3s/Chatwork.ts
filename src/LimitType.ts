/**
 * タスクの期限の定数のクラス
 *
 * @export
 * @class LimitType
 */
export class Limit {
  public static readonly NONE: LimitType = "none";
  public static readonly DATE: LimitType = "date";
  public static readonly TIME: LimitType = "time";
  private constructor() {}
}

export type LimitType = "none" | "date" | "time";
