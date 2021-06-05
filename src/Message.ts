import * as Types from "./Types";
import { IHttpRequest } from "./IHttpRequest";

/**
 * チャットルーム内のメッセージを表すクラス
 *
 * @class Message
 * @implements {Types.Message}
 */
export class Message implements Types.Message {
  account: Types.Account;
  body: string;
  send_time: number;
  update_time: number;
  message_id: string;
  /**
   * エンドポイントが/rooms/以下の為にroom_idを要求されている
   * @type {number}
   * @memberof Message
   */
  roomId: number;
  httpRequest: IHttpRequest;

  /**
   * Creates an instance of Message.
   * @param {*} message
   * @param {number} roomId
   * @param {IHttpRequest} httpRequest
   * @memberof Message
   */
  constructor(message: any, roomId: number, httpRequest: IHttpRequest) {
    this.account = message.account;
    this.body = message.body;
    this.send_time = message.send_time;
    this.update_time = message.update_time;
    this.message_id = message.message_id;
    this.roomId = roomId;
    this.httpRequest = httpRequest;
  }

  /**
   * チャットのメッセージを更新する。
   * https://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-messages-message_id
   *
   * @param {string} body 更新するメッセージ本文
   * @returns {Types.MessageId} 削除したメッセージのID
   */
  public update(body: string): Types.MessageId {
    const endpoint = "/rooms/" + this.roomId + "/messages/" + this.message_id;
    const payload = { body: body };
    return this.httpRequest.put(endpoint, payload);
  }

  /**
   * メッセージを削除する
   * https://developer.chatwork.com/ja/endpoint_rooms.html#DELETE-rooms-room_id-messages-message_id
   *
   * @returns {Types.MessageId} 削除したメッセージのID
   */
  public delete(): Types.MessageId {
    const endpoint = "/rooms/" + this.roomId + "/messages/" + this.message_id;
    return this.httpRequest.delete(endpoint, null);
  }

  /**
   * メッセージを既読にする
   * https://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-messages-read
   *
   * @returns {Types.ReadInformation} 未読メッセージの情報
   * @memberof Message
   */
  public read(): Types.ReadInformation {
    const endpoint = "/rooms/" + this.roomId + "/messages/read";
    return this.httpRequest.put(endpoint, null);
  }

  /**
   * メッセージを未読にする
   * https://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-messages-unread
   *
   * @returns {Types.ReadInformation} 未読メッセージの情報
   * @memberof Message
   */
  public unread(): Types.ReadInformation {
    const endpoint = "/rooms/" + this.roomId + "/messages/unread";
    const payload = { message_id: this.message_id };
    return this.httpRequest.put(endpoint, payload);
  }
}
