import * as Types from "./Types";
import { Room } from "./Room";
import { createHttpRequest, IHttpRequest } from "./IHttpRequest";
import { MyTask } from "./MyTask";

/**
 * Chatwork API wrapper
 *   公式ドキュメント : http://developer.chatwork.com/ja/
 */

/**
 * 基本的なエンドポイントへのアクセスを担当する
 *
 * @class Client
 * @implements {Types.Client}
 */
export class Client implements Types.Client {
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
   * @returns {Types.Client} ChatWork.Clientのインスタンス
   * @memberof Client
   */
  public static factory(
    token: string,
    httpRequest: { new (): IHttpRequest }
  ): Types.Client {
    return new Client(createHttpRequest(token, httpRequest));
  }

  /**
   * 自身の情報を取得
   * http://developer.chatwork.com/ja/endpoint_me.html#GET-me
   *
   * @returns {Types.Me} 自分自身の情報
   */
  public getMe(): Types.Me {
    return this.httpRequest.get("/me", null);
  }

  /**
   * 自分の未読数、未読To数、未完了タスク数を返す
   * https://developer.chatwork.com/ja/endpoint_my.html#GET-my-status
   *
   * @returns {Types.MyStatus} 自分の未読数、未読To数、未完了タスク数
   */
  public getMyStatus(): Types.MyStatus {
    return this.httpRequest.get("/my/status", null);
  }

  /**
   * 自分のタスク一覧を取得
   * http://developer.chatwork.com/ja/endpoint_my.html#GET-my-task
   *
   * @param {number} assignor_id   (オプション) タスク送信者のアカウントID
   * @param {Types.taskStatus} status        (オプション) タスクのステータス
   * @returns {Types.Task[]} タスクの一覧
   * @memberof Client
   */
  public getMyTasks(
    assignor_id?: number,
    status?: Types.taskStatus
  ): MyTask[] {
    const param: {
      assigned_by_account_id?: number;
      status?: Types.taskStatus;
    } = {};
    if (assignor_id !== undefined)
      param["assigned_by_account_id"] = assignor_id;
    if (status !== undefined) param["status"] = status;
    const response = this.httpRequest.get("/my/tasks", param) as Array<any>;
    return response.map((t) => new MyTask(t, this.httpRequest));
  }

  /**
   * 自分のコンタクト一覧を取得
   * https://developer.chatwork.com/ja/endpoint_contacts.html#GET-contacts
   *
   * @returns {Types.ContactedUser[]} 自分のコンタクト一覧
   * @memberof Client
   */
  public getContacts(): Types.ContactedUser[] {
    return this.httpRequest.get("/contacts", null);
  }

  /**
   * チャットの名前、アイコン、種類(my/direct/group)を取得
   * https://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id
   *
   * @returns {Types.Room} チャットの名前、アイコン、種類(my/direct/group)
   * @memberof Client
   */
  public getRoom(roomId: number): Types.Room {
    const endpoint = "/rooms/" + roomId;
    return new Room(this.httpRequest.get(endpoint, null), this.httpRequest);
  }

  /**
   * 自分のチャットルーム一覧を取得
   * http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms
   *
   * @returns {Types.Room[]} 自分のチャット一覧の取得
   * @memberof Client
   */
  public getRooms(): Types.Room[] {
    const rooms: Types.Room[] = [];
    const response = this.httpRequest.get("/rooms", null);
    // @ts-expect-error
    response.forEach((room) => {
      rooms.push(new Room(room, this.httpRequest));
    });
    return rooms;
  }

  /**
   * グループチャットを新規作成
   * https://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms
   *
   * @param {string} roomName
   * @param {number[]} adminIds 作成したチャットに参加メンバーのうち、管理者権限にしたいユーザーのアカウントIDの配列。最低1人は指定する必要がある。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @param {string} description グループチャットの概要説明テキスト
   * @param {Types.iconPreset} iconPreset グループチャットのアイコン種類
   * @param {boolean} isCreateLink 招待リンクを作成するか
   * @param {boolean} isNeedAcceptance 参加に管理者の承認を必要とするか。
   * @param {string} linkPath リンクのパス部分。省略するとランダムな文字列となる。
   * @param {number[]} memberIds 作成したチャットに参加メンバーのうち、メンバー権限にしたいユーザーのアカウントIDの配列。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @param {number[]} readonlyIds 作成したチャットに参加メンバーのうち、閲覧のみ権限にしたいユーザーのアカウントIDの配列。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @returns {Types.RoomId} 作成したチャットルームのルームID
   * @memberof Client
   */
  public createNewRoom(
    roomName: string,
    adminIds: number[],
    description?: string,
    iconPreset?: Types.iconPreset,
    isCreateLink?: boolean,
    isNeedAcceptance?: boolean,
    linkPath?: string,
    memberIds?: number[],
    readonlyIds?: number[]
  ): Types.RoomId {
    let param: {
      name: string;
      members_admin_ids: string;
      description?: string;
      icon_preset?: Types.iconPreset;
      link?: boolean;
      link_need_acceptance?: boolean;
      link_code?: string;
      members_member_ids?: string;
      members_readonly_ids?: string;
    } = {
      name: roomName,
      members_admin_ids: adminIds.join(","),
    };
    if (description !== undefined) param.description = description;
    if (iconPreset !== undefined) param.icon_preset = iconPreset;
    if (isCreateLink !== undefined) param.link = isCreateLink;
    if (isNeedAcceptance !== undefined)
      param.link_need_acceptance = isNeedAcceptance;
    if (linkPath !== undefined) param.link_code = linkPath;
    if (memberIds !== undefined) param.members_member_ids = memberIds.join(",");
    if (readonlyIds !== undefined)
      param.members_readonly_ids = readonlyIds.join(",");
    return this.httpRequest.post("/rooms", param);
  }

  /**
   * 自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   * https://developer.chatwork.com/ja/endpoint_incoming_requests.html#GET-incoming_requests
   *
   * @returns {Types.RequestOfContact[]} 自分に対するコンタクト承認依頼一覧
   * @memberof Client
   */
  public getRequestOfContacts(): Types.RequestOfContact[] {
    return this.httpRequest.get("/incoming_requests", null);
  }

  /**
   * 指定したチャットルームへメッセージを送信
   * http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-messages
   *
   * @param {number} roomId 送信先とする相手のRoomId
   * @param {string} message   送信するメッセージ本文
   * @returns {Types.MessageId} 送信したメッセージのMessageId
   * @memberof Client
   */
  public sendMessage(roomId: number, message: string): Types.MessageId {
    const endpoint = "/rooms/" + roomId + "/messages";
    const postData = { body: message };
    return this.httpRequest.post(endpoint, postData);
  }

  /**
   * MyChatへメッセージを送信
   *
   * @param {string} message 送信するメッセージ本文
   * @memberof Client
   */
  public sendMessageToMyChat(message: string): Types.MessageId {
    let me = this.httpRequest.get("/me", null);
    return this.sendMessage(me.room_id, message);
  }
}
