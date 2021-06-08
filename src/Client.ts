import {
  ContactedUser,
  IconPresetType,
  IHttpRequest,
  Me,
  MessageId,
  MyStatus,
  MyTask,
  RequestOfContact,
  Room,
  RoomId,
  TaskStatusType,
} from "src";
import { createHttpRequest } from "./IHttpRequest";

/**
 * Chatwork API wrapper
 *   公式ドキュメント : http://developer.chatwork.com/ja/
 */

/**
 * 基本的なエンドポイントへのアクセスを担当する
 *
 * @class Client
 * @implements {Client}
 */
export class Client implements Client {
  httpRequest: IHttpRequest;

  public constructor(httpRequest: IHttpRequest) {
    this.httpRequest = httpRequest;
  }

  /**
   * インスタンス生成用のメソッド
   *
   * @param {string} token 利用するアカウントのAPIトークン, 下記URLから取得
   * https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php
   * @param {IHttpRequest} httpRequest Httpリクエストに利用するクラスを指定
   * @returns {Client} ChatWork.Clientのインスタンス
   * @memberof Client
   */
  public static factory(
    token: string,
    httpRequest: { new (): IHttpRequest }
  ): Client {
    return new Client(createHttpRequest(token, httpRequest));
  }

  /**
   * 自身の情報を取得
   * http://developer.chatwork.com/ja/endpoint_me.html#GET-me
   *
   * @returns {Me} 自分自身の情報
   */
  public getMe(): Me {
    const response = this.httpRequest.get("/me", null);
    return new Me(response, this.httpRequest);
  }

  /**
   * 自分の未読数、未読To数、未完了タスク数を返す
   * https://developer.chatwork.com/ja/endpoint_my.html#GET-my-status
   *
   * @returns {MyStatus} 自分の未読数、未読To数、未完了タスク数
   */
  public getMyStatus(): MyStatus {
    const response = this.httpRequest.get("/my/status", null);
    return new MyStatus(response);
  }

  /**
   * 自分のタスク一覧を取得
   * http://developer.chatwork.com/ja/endpoint_my.html#GET-my-task
   *
   * @param {number} assignorId   (オプション) タスク送信者のアカウントID
   * @param {TaskStatusType} status        (オプション) タスクのステータス
   * @returns {Task[]} タスクの一覧
   * @memberof Client
   */
  public getMyTasks(assignorId?: number, status?: TaskStatusType): MyTask[] {
    const param: {
      assigned_by_account_id?: number;
      status?: TaskStatusType;
    } = {};
    if (assignorId !== undefined) param["assigned_by_account_id"] = assignorId;
    if (status !== undefined) param["status"] = status;
    const response = this.httpRequest.get("/my/tasks", param) as Array<any>;
    return response.map((t) => new MyTask(t, this.httpRequest));
  }

  /**
   * 自分のコンタクト一覧を取得
   * https://developer.chatwork.com/ja/endpoint_contacts.html#GET-contacts
   *
   * @returns {ContactedUser[]} 自分のコンタクト一覧
   * @memberof Client
   */
  public getContacts(): ContactedUser[] {
    const response = this.httpRequest.get("/contacts", null) as Array<any>;
    return response.map((r) => new ContactedUser(r, this.httpRequest));
  }

  /**
   * チャットの名前、アイコン、種類(my/direct/group)を取得
   * https://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id
   *
   * @returns {Room} チャットの名前、アイコン、種類(my/direct/group)
   * @memberof Client
   */
  public getRoom(roomId: number): Room {
    const endpoint = "/rooms/" + roomId;
    const response = this.httpRequest.get(endpoint, null);
    return new Room(response, this.httpRequest);
  }

  /**
   * 自分のチャットルーム一覧を取得
   * http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms
   *
   * @returns {Room[]} 自分のチャット一覧の取得
   * @memberof Client
   */
  public getRooms(): Room[] {
    const response = this.httpRequest.get("/rooms", null) as Array<any>;
    return response.map((r) => new Room(r, this.httpRequest));
  }

  /**
   * グループチャットを新規作成
   * https://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms
   *
   * @param {string} roomName
   * @param {number[]} adminIds 作成したチャットに参加メンバーのうち、管理者権限にしたいユーザーのアカウントIDの配列。最低1人は指定する必要がある。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @param {string} description グループチャットの概要説明テキスト
   * @param {iconPreset} iconPreset グループチャットのアイコン種類
   * @param {boolean} isCreateLink 招待リンクを作成するか
   * @param {boolean} isNeedAcceptance 参加に管理者の承認を必要とするか。
   * @param {string} linkPath リンクのパス部分。省略するとランダムな文字列となる。
   * @param {number[]} memberIds 作成したチャットに参加メンバーのうち、メンバー権限にしたいユーザーのアカウントIDの配列。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @param {number[]} readonlyIds 作成したチャットに参加メンバーのうち、閲覧のみ権限にしたいユーザーのアカウントIDの配列。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @returns {RoomId} 作成したチャットルームのルームID
   * @memberof Client
   */
  public createNewRoom(
    roomName: string,
    adminIds: number[],
    description?: string,
    iconPreset?: IconPresetType,
    isCreateLink?: boolean,
    isNeedAcceptance?: boolean,
    linkPath?: string,
    memberIds?: number[],
    readonlyIds?: number[]
  ): RoomId {
    let param: {
      name: string;
      membersAdminIds: string;
      description?: string;
      iconPreset?: IconPresetType;
      link?: boolean;
      linkNeedAcceptance?: boolean;
      linkCode?: string;
      membersMemberIds?: string;
      membersReadonlyIds?: string;
    } = {
      name: roomName,
      membersAdminIds: adminIds.join(","),
    };
    if (description !== undefined) param.description = description;
    if (iconPreset !== undefined) param.iconPreset = iconPreset;
    if (isCreateLink !== undefined) param.link = isCreateLink;
    if (isNeedAcceptance !== undefined)
      param.linkNeedAcceptance = isNeedAcceptance;
    if (linkPath !== undefined) param.linkCode = linkPath;
    if (memberIds !== undefined) param.membersMemberIds = memberIds.join(",");
    if (readonlyIds !== undefined)
      param.membersReadonlyIds = readonlyIds.join(",");
    const response = this.httpRequest.post("/rooms", param);
    return new RoomId(response, this.httpRequest);
  }

  /**
   * 自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   * https://developer.chatwork.com/ja/endpoint_incoming_requests.html#GET-incoming_requests
   *
   * @returns {RequestOfContact[]} 自分に対するコンタクト承認依頼一覧
   * @memberof Client
   */
  public getRequestOfContacts(): RequestOfContact[] {
    const response = this.httpRequest.get(
      "/incoming_requests",
      null
    ) as Array<any>;
    return response.map((r) => new RequestOfContact(r, this.httpRequest));
  }

  /**
   * 指定したチャットルームへメッセージを送信
   * http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-messages
   *
   * @param {number} roomId 送信先とする相手のRoomId
   * @param {string} message   送信するメッセージ本文
   * @returns {MessageId} 送信したメッセージのMessageId
   * @memberof Client
   */
  public sendMessage(roomId: number, message: string): MessageId {
    const endpoint = "/rooms/" + roomId + "/messages";
    const postData = { body: message };
    const response = this.httpRequest.post(endpoint, postData);
    return new MessageId(response);
  }

  /**
   * MyChatへメッセージを送信
   *
   * @param {string} message 送信するメッセージ本文
   * @memberof Client
   */
  public sendMessageToMyChat(message: string): MessageId {
    let me = this.httpRequest.get("/me", null);
    return this.sendMessage(me.room_id, message);
  }
}
