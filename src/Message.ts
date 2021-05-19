import { IHttpRequest } from "./IHttpRequest";
import { Chatwork } from "./types/Chatwork";

/**
 * メッセージオブジェクトのクラス
 *
 * @class Message
 * @implements {Chatwork.Message}
 */
export class Message implements Chatwork.Message {
  account: Chatwork.Account;
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
   * @returns {Chatwork.MessageId} 削除したメッセージのID
   */
  public update(body: string): Chatwork.MessageId {
    const endpoint = "/rooms/" + this.roomId + "/messages/" + this.message_id;
    const payload = { body: body };
    return this.httpRequest.put(endpoint, payload);
  }

  /**
   * メッセージを削除する
   * https://developer.chatwork.com/ja/endpoint_rooms.html#DELETE-rooms-room_id-messages-message_id
   *
   * @returns {Chatwork.MessageId} 削除したメッセージのID
   */
  public delete(): Chatwork.MessageId {
    const endpoint = "/rooms/" + this.roomId + "/messages/" + this.message_id;
    return this.httpRequest.delete(endpoint, null);
  }
}
