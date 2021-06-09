import * as Types from "./Types";

/**
 * 既読数・メンション数を表すクラス
 *
 * @export
 * @class ReadInformation
 * @implements {Types.ReadInformation}
 */
export class ReadInformation implements Types.ReadInformation {
  unreadNum: number;
  mentionNum: number;

  /**
   * Creates an instance of ReadInformation.
   * @param {*} readInformation
   * @memberof ReadInformation
   */
  public constructor(readInformation: any) {
    this.unreadNum = readInformation.unread_num;
    this.mentionNum = readInformation.mention_num;
  }
}
