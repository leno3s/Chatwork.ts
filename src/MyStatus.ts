import { ReadInformation, Types } from "src";

/**
 * 自身の情報を表すクラス
 *
 * @export
 * @class MyStatus
 * @extends {ReadInformation}
 * @implements {Types.MyStatus}
 */
export class MyStatus extends ReadInformation implements Types.MyStatus {
  unreadRoomNum: number;
  mentionRoomNum: number;
  myTaskRoomNum: number;
  myTaskNum: number;

  /**
   * Creates an instance of MyStatus.
   * @param {*} myStatus
   * @memberof MyStatus
   */
  public constructor(myStatus: any) {
    super(myStatus);
    this.unreadRoomNum = myStatus.unread_room_num;
    this.mentionRoomNum = myStatus.mention_room_num;
    this.myTaskRoomNum = myStatus.mytask_room_num;
    this.myTaskNum = myStatus.mytask_num;
  }
}
