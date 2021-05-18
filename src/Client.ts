import { Chatwork } from "./types/Chatwork";
import { Room } from "./Room";
import { createHttpRequest, IHttpRequest } from "./IHttpRequest";

/**
 * ChatWork API wrapper
 *   公式ドキュメント : http://developer.chatwork.com/ja/
 */
export class Client implements Chatwork.Client {
  httpRequest: IHttpRequest;

  constructor(httpRequest: IHttpRequest) {
    this.httpRequest = httpRequest;
  }

  /**
   * インスタンス生成用のメソッド
   *
   * @param token 利用するアカウントのAPIトークン, 下記URLから取得
   * https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php
   * @param httpRequest Httpリクエストに利用するクラスを指定
   *
   * @returns ChatWork.Clientのインスタンス
   */
  public static factory(
    token: string,
    httpRequest: { new (): IHttpRequest }
  ): Chatwork.Client {
    return new Client(createHttpRequest(token, httpRequest));
  }

  /**
   * 自身の情報を取得
   * http://developer.chatwork.com/ja/endpoint_me.html#GET-me
   *
   * @returns 自分自身の情報
   */
  public getMe(): Chatwork.Me {
    return this.httpRequest.get("/me", null);
  }

  /**
   * 自分の未読数、未読To数、未完了タスク数を返す
   * https://developer.chatwork.com/ja/endpoint_my.html#GET-my-status
   *
   * @returns 自分の未読数、未読To数、未完了タスク数
   */
  getMyStatus(): Chatwork.MyStatus {
    return this.httpRequest.get("/my/status", null);
  }

  /**
   * 自分のタスク一覧を取得
   * http://developer.chatwork.com/ja/endpoint_my.html#GET-my-task
   *
   * @param assignor_id   (オプション) タスク送信者のアカウントID
   * @param status        (オプション) タスクのステータス
   * @returns タスクの一覧
   */
  public getMyTasks(
    assignor_id?: number,
    status?: Chatwork.taskStatus
  ): Chatwork.Task[] {
    const param: {
      assigned_by_account_id?: number;
      status?: Chatwork.taskStatus;
    } = {};
    if (assignor_id !== undefined)
      param["assigned_by_account_id"] = assignor_id;
    if (status !== undefined) param["status"] = status;
    return this.httpRequest.get("/my/tasks", param);
  }

  /**
   * 自分のコンタクト一覧を取得
   * https://developer.chatwork.com/ja/endpoint_contacts.html#GET-contacts
   *
   * @returns 自分のコンタクト一覧
   */
  getContacts(): Chatwork.ContactedUser[] {
    return this.httpRequest.get("/contacts", null);
  }

  /**
   * 自分のチャットルーム一覧を取得
   * http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms
   *
   * @returns 自分のチャット一覧の取得
   */
  public getRooms(): Chatwork.Room[] {
    const rooms: Chatwork.Room[] = [];
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
   * @param roomName
   * @param adminIds 作成したチャットに参加メンバーのうち、管理者権限にしたいユーザーのアカウントIDの配列。最低1人は指定する必要がある。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @param description グループチャットの概要説明テキスト
   * @param iconPreset グループチャットのアイコン種類
   * @param isCreateLink 招待リンクを作成するか
   * @param isNeedAcceptance 参加に管理者の承認を必要とするか。
   * @param linkPath リンクのパス部分。省略するとランダムな文字列となる。
   * @param memberIds 作成したチャットに参加メンバーのうち、メンバー権限にしたいユーザーのアカウントIDの配列。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @param readonlyIds 作成したチャットに参加メンバーのうち、閲覧のみ権限にしたいユーザーのアカウントIDの配列。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @returns 作成したチャットルームのルームID
   */
  createNewRoom(
    roomName: string,
    adminIds: number[],
    description?: string,
    iconPreset?: Chatwork.iconPreset,
    isCreateLink?: boolean,
    isNeedAcceptance?: boolean,
    linkPath?: string,
    memberIds?: number[],
    readonlyIds?: number[]
  ): Chatwork.RoomId {
    let param: {
      name: string;
      members_admin_ids: string;
      description?: string;
      icon_preset?: Chatwork.iconPreset;
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
   * @returns 自分に対するコンタクト承認依頼一覧
   */
  getRequestsToContact(): Chatwork.RequestForContact[] {
    return this.httpRequest.get("/incoming_requests", null);
  }

  /**
   * 自分に対するコンタクト承認依頼を承認する
   * https://developer.chatwork.com/ja/endpoint_incoming_requests.html#PUT-incoming_requests-request_id
   *
   * @param requestId 承認するコンタクト承認依頼のID
   * @returns 承認した相手のユーザー情報
   */
  acceptToContact(requestId: number): Chatwork.ContactedUser {
    const endpoint = "/incoming_requests/" + requestId;
    return this.httpRequest.get(endpoint, null);
  }

  /**
   * 自分に対するコンタクト承認依頼をキャンセルする
   * https://developer.chatwork.com/ja/endpoint_incoming_requests.html#DELETE-incoming_requests-request_id
   *
   * @param requestId キャンセルするコンタクト承認依頼のID
   */
  denyToContact(requestId: number): void {
    const endpoint = "/incoming_requests/" + requestId;
    this.httpRequest.delete(endpoint, null);
  }

  /**
   * 指定したチャットルームへメッセージを送信
   * http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-messages
   *
   * @param roomId 送信先とする相手のRoomId
   * @param message   送信するメッセージ本文
   * @returns 送信したメッセージのMessageId
   */
  public sendMessage(roomId: number, message: string): Chatwork.MessageId {
    const endpoint = "/rooms/" + roomId + "/messages";
    const postData = { body: message };
    return this.httpRequest.post(endpoint, postData);
  }

  /**
   * MyChatへメッセージを送信
   *
   * @param message 送信するメッセージ本文
   */
  public sendMessageToMyChat(message: string): Chatwork.MessageId {
    let me = this.httpRequest.get("/me", null);
    return this.sendMessage(me.room_id, message);
  }

  /**
   * チャットの名前、アイコン、種類(my/direct/group)を取得
   * https://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id
   *
   * @returns チャットの名前、アイコン、種類(my/direct/group)
   */
  getRoom(roomId: number): Chatwork.Room {
    const endpoint = "/rooms/" + roomId;
    return new Room(this.httpRequest.get(endpoint, null), this.httpRequest);
  }
}
