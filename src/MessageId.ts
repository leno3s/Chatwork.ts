import * as Types from "./Types";
import { IHttpRequest } from "./IHttpRequest";
import { Room } from "./Room";

/**
 * メッセージIDを表すクラス
 *
 * @export
 * @class MessageId
 * @implements {Types.MessageId}
 */
export class MessageId implements Types.MessageId {
  messageId: string;
  roomId: number;
  httpRequest: IHttpRequest;

  /**
   * Creates an instance of MessageId.
   * @param {*} messageId
   * @memberof MessageId
   */
  public constructor(
    messageId: any,
    roomId: number,
    httpRequest: IHttpRequest
  ) {
    this.messageId = messageId.message_id;
    this.roomId = roomId;
    this.httpRequest = httpRequest;
  }

  /**
   * メッセージのあるルームを取得
   *
   * @return {Room} メッセージのあるチャットルーム
   * @memberof MessageId
   */
  public getRoom(): Room {
    const endpoint = "/rooms/" + this.roomId;
    const response = this.httpRequest.get(endpoint, null);
    return new Room(response, this.httpRequest);
  }
}
