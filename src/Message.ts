import * as Types from "./Types";
import { IHttpRequest } from "./IHttpRequest";
import { MessageId, ReadInformation, Room } from "src";

/**
 * チャットルーム内のメッセージを表すクラス
 *
 * @class Message
 * @implements {Types.Message}
 */
export class Message implements Types.Message {
  account: Types.Account;
  body: string;
  sendTime: number;
  updateTime: number;
  messageId: string;
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
  public constructor(message: any, roomId: number, httpRequest: IHttpRequest) {
    this.account = message.account;
    this.body = message.body;
    this.sendTime = message.send_time;
    this.updateTime = message.update_time;
    this.messageId = message.message_id;
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
  public update(body: string): MessageId {
    const endpoint = "/rooms/" + this.roomId + "/messages/" + this.messageId;
    const payload = { body: body };
    const response = this.httpRequest.put(endpoint, payload);
    return new MessageId(response, this.roomId, this.httpRequest);
  }

  /**
   * メッセージを削除する
   * https://developer.chatwork.com/ja/endpoint_rooms.html#DELETE-rooms-room_id-messages-message_id
   *
   * @returns {Types.MessageId} 削除したメッセージのID
   */
  public delete(): MessageId {
    const endpoint = "/rooms/" + this.roomId + "/messages/" + this.messageId;
    const response = this.httpRequest.delete(endpoint, null);
    return new MessageId(response, this.roomId, this.httpRequest);
  }

  /**
   * メッセージを既読にする
   * https://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-messages-read
   *
   * @returns {ReadInformation} 未読メッセージの情報
   * @memberof Message
   */
  public read(): ReadInformation {
    const endpoint = "/rooms/" + this.roomId + "/messages/read";
    const response = this.httpRequest.put(endpoint, null);
    return new ReadInformation(response);
  }

  /**
   * メッセージを未読にする
   * https://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-messages-unread
   *
   * @returns {ReadInformation} 未読メッセージの情報
   * @memberof Message
   */
  public unread(): ReadInformation {
    const endpoint = "/rooms/" + this.roomId + "/messages/unread";
    const payload = { message_id: this.messageId };
    const response = this.httpRequest.put(endpoint, payload);
    return new ReadInformation(response);
  }

  /**
   * ルームを取得
   *
   * @return {Room}
   * @memberof Message
   */
  public getRoom(): Room {
    const endpoint = "/rooms/" + this.roomId;
    const response = this.httpRequest.get(endpoint, null);
    return new Room(response, this.httpRequest);
  }
}
