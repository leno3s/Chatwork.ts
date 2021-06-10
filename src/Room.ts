import { ChatType } from "./ChatType";
import { IHttpRequest } from "./IHttpRequest";
import { RoledUser, Types } from "./index";
import { Link } from "./Link";
import { Message } from "./Message";
import { RoomMemberPermissions } from "./RoomMemberPermissions";
import { RoomTask } from "./RoomTask";
import { Task } from "./Task";

/**
 * チャットルームを表すクラス
 *
 * @class Room
 * @implements {Types.Room}
 */
export class Room implements Types.Room {
  name: string;
  chatType: ChatType;
  role: string;
  sticky: boolean;
  unreadNum: number;
  mentionNum: number;
  myTaskNum: number;
  messageNum: number;
  fileNum: number;
  taskNum: number;
  iconUrl: string;
  lastUpdateTime: number;
  description: string;
  roomId: number;
  httpRequest: IHttpRequest;

  /**
   * Creates an instance of Room.
   * @param {*} roomInfo
   * @param {IHttpRequest} httpRequest
   * @memberof Room
   */
  public constructor(roomInfo: any, httpRequest: IHttpRequest) {
    this.name = roomInfo.name;
    this.chatType = roomInfo.type;
    this.role = roomInfo.role;
    this.sticky = roomInfo.sticky;
    this.unreadNum = roomInfo.unread_num;
    this.mentionNum = roomInfo.mention_num;
    this.myTaskNum = roomInfo.mytask_num;
    this.messageNum = roomInfo.message_num;
    this.fileNum = roomInfo.file_num;
    this.taskNum = roomInfo.task_num;
    this.iconUrl = roomInfo.icon_path;
    this.lastUpdateTime = roomInfo.last_update_time;
    this.description = roomInfo.description;
    this.roomId = roomInfo.room_id;
    this.httpRequest = httpRequest;
  }

  /**
   * チャットの名前、アイコンをアップデート
   * https://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id
   *
   * @param {string} roomName グループチャットのチャット名
   * @param {string} description グループチャットの概要説明テキスト
   * @param {Types.iconPreset} icon_preset グループチャットのアイコン種類
   * @returns {Types.RoomId} アップデートしたチャットルームのID
   * @memberof Room
   */
  public update(
    roomName?: string,
    description?: string,
    icon_preset?: Types.iconPreset
  ): Types.RoomId {
    const endpoint = "/rooms/" + this.roomId;
    if (!(roomName || description || icon_preset)) {
      throw Error("At least one argument is required.");
    }
    let payload: {
      name?: string;
      description?: string;
      icon_preset?: Types.iconPreset;
    } = {};
    if (roomName !== undefined) {
      payload.name = roomName;
    }
    if (description !== undefined) {
      payload.description = description;
    }
    if (icon_preset !== undefined) {
      payload.icon_preset = icon_preset;
    }
    return this.httpRequest.put(endpoint, payload);
  }

  /**
   * グループチャットを退席する
   * https://developer.chatwork.com/ja/endpoint_rooms.html#DELETE-rooms-room_id
   *
   * @return {void}
   * @memberof Room
   */
  public leave(): void {
    const endpoint = "/rooms/" + this.roomId;
    const payload = { action_type: "leave" };
    this.httpRequest.delete(endpoint, payload);
    return;
  }

  /**
   * グループチャットを削除する
   * https://developer.chatwork.com/ja/endpoint_rooms.html#DELETE-rooms-room_id
   *
   * @return {void}
   * @memberof Room
   */
  public delete(): void {
    const endpoint = "/rooms/" + this.roomId;
    const payload = { action_type: "delete" };
    this.httpRequest.delete(endpoint, payload);
    return;
  }

  /**
   * チャットルームのメンバー一覧を取得
   * http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-members
   *
   * @return {Types.RoledUser[]} チャットルームのメンバー一覧
   * @memberof Room
   */
  public getMembers(): Types.RoledUser[] {
    const endpoint = "/rooms/" + this.roomId + "/members";
    const response = this.httpRequest.get(endpoint, null) as Array<any>;
    return response.map((r) => new RoledUser(r));
  }

  /**
   * チャットのメンバーを一括変更
   * https://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-members
   *
   * @param {number[]} adminIds 作成したチャットに参加メンバーのうち、管理者権限にしたいユーザーのアカウントIDの配列。最低1人は指定する必要がある。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @param {number[]} memberIds 作成したチャットに参加メンバーのうち、メンバー権限にしたいユーザーのアカウントIDの配列。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @param {number[]} readonlyIds 作成したチャットに参加メンバーのうち、閲覧のみ権限にしたいユーザーのアカウントIDの配列。コンタクト済みユーザーか組織内ユーザーのアカウントIDのみ指定できる。
   * @returns {RoomMemberPermissions} チャットルームのメンバーの権限のリスト
   * @memberof Room
   */
  public updateMembers(
    adminIds: number[],
    memberIds?: number[],
    readonlyIds?: number[]
  ): RoomMemberPermissions {
    const endpoint = "/rooms/" + this.roomId + "/members";
    const payload: {
      members_admin_ids: string;
      members_member_ids?: string;
      members_readonly_ids?: string;
    } = { members_admin_ids: adminIds.join(",") };
    if (memberIds !== undefined)
      payload.members_member_ids = memberIds.join(",");
    if (readonlyIds !== undefined)
      payload.members_readonly_ids = readonlyIds.join(",");
    return this.httpRequest.put(endpoint, payload);
  }

  /**
   * メッセージ情報を取得
   * https://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-messages-message_id
   *
   * @param {number} messageId 取得するメッセージのID
   * @returns {Types.Message} メッセージの情報
   * @memberof Room
   */
  public getMessage(messageId: number): Types.Message {
    const endpoint = "/rooms/" + this.roomId + "/messages/" + messageId;
    const response = this.httpRequest.get(endpoint, null);
    return new Message(response, this.roomId, this.httpRequest);
  }

  /**
   * チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)
   * https://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-messages
   *
   * @param {0|1} force 未取得にかかわらず最新の100件を取得するか
   * 1を指定すると未取得にかかわらず最新の100件を取得します（デフォルトは0）
   * @returns {Types.Message[]} チャットルームのメッセージ
   * @memberof Room
   */
  public getMessages(force: 0 | 1): Types.Message[] {
    const endpoint = "/rooms/" + this.roomId + "/messages";
    const payload: { force?: 0 | 1 } = {};
    if (force !== undefined) payload.force = force;
    const response = this.httpRequest.get(endpoint, payload) as Array<any>;
    return response.map((m) => new Message(m, this.roomId, this.httpRequest));
  }

  /**
   * 指定したチャットルームへメッセージを送信
   * http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-messages
   *
   * @param {string} message   送信するメッセージ本文
   * @param {0|1} isSelfUnread 追加したメッセージを自分から見て未読とするか
   * 1を指定した場合、自分が追加したメッセージを自分から見て未読にします(デフォルトは0：既読にする)
   * @returns {Types.MessageId} 送信したメッセージのMessageID
   * @memberof Room
   */
  public sendMessage(message: string, isSelfUnread?: 0 | 1): Types.MessageId {
    const endpoint = "/rooms/" + this.roomId + "/messages";
    const payload: { body: string; self_unread?: 0 | 1 } = { body: message };
    if (isSelfUnread !== undefined) payload.self_unread = isSelfUnread;
    return this.httpRequest.post(endpoint, payload);
  }

  /**
   * メッセージを既読にする
   * https://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-messages-read
   *
   * @param {string} messageId ここで指定するIDのメッセージまでを既読にする。すでに既読済みの場合はエラー(400)
   * @returns {Types.ReadInformation} 未読メッセージの情報
   * @memberof Room
   */
  public read(messageId?: string): Types.ReadInformation {
    const endpoint = "/rooms/" + this.roomId + "/messages/read";
    const payload: { message_id?: string } = {};
    if (messageId !== undefined) payload.message_id = messageId;
    return this.httpRequest.put(endpoint, payload);
  }

  /**
   * 指定したチャットルームのタスクを全て取得
   * http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-tasks
   *
   * @param {number} account_id タスク担当者のアカウントID
   * @param {number} assignor_id タスク送信者のアカウントID
   * @param {Types.taskStatus} status タスクのステータス
   * @returns {Types.Task[]} タスクのリスト
   * @memberof Room
   */
  public getTasks(
    account_id?: number,
    assignor_id?: number,
    status?: Types.taskStatus
  ): RoomTask[] {
    const endpoint = "/rooms/" + this.roomId + "/tasks";
    const payload: {
      account_id?: number;
      assigned_by_account_id?: number;
      status?: Types.taskStatus;
    } = {};
    if (account_id !== undefined) payload.account_id = account_id;
    if (assignor_id !== undefined) payload.assigned_by_account_id = assignor_id;
    if (status !== undefined) payload.status = status;
    const response = this.httpRequest.get(endpoint, payload) as Array<any>;
    return response.map(
      (t: any) => new RoomTask(t, this.roomId, this.httpRequest)
    );
  }

  /**
   * チャットルームへ新しいタスクを追加
   * http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-tasks
   *
   * @param {string} message タスクの内容
   * @param {number[]} toIds 担当者のアカウントID
   * @param {number} limit タスクの期限(Unix timeで指定)
   * @param {Types.limitType} limitType タスク期限の種別
   * 'none'を指定した場合、期限なしのタスクを作成します。 'date'を指定した場合、日付期限のタスクを作成します。 'time'を指定した場合、時間期限のタスクを作成します。
   * @returns {Types.TaskId[]}
   * @memberof Room
   */
  public addTask(
    message: string,
    toIds: number[],
    limit?: number,
    limitType?: Types.limitType
  ): Types.TaskId[] {
    const endpoint = "/rooms/" + this.roomId + "/tasks";
    const ids: string = toIds.join(",");
    const payload: {
      body: string;
      to_ids: string;
      limit?: string;
      limit_type?: Types.limitType;
    } = {
      body: message,
      to_ids: ids,
    };
    if (limit !== undefined) payload.limit = new Number(limit).toFixed(); // 指数表記で来ることがあるので、intにする
    if (limitType !== undefined) payload.limit_type = limitType;
    return this.httpRequest.post(endpoint, payload);
  }

  /**
   * タスク情報を取得
   * https://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-tasks
   *
   * @param {number} taskId 取得するタスクのID
   * @returns {Types.Task} タスクの情報
   * @memberof Room
   */
  public getTask(taskId: number): Types.Task {
    const endpoint = "/rooms/" + this.roomId + "/tasks/" + taskId;
    const response = this.httpRequest.get(endpoint, null);
    return new Task(response, this.roomId, this.httpRequest);
  }

  public getFiles(uploaderId?: number): Types.File[] {
    throw new Error("Method not implemented.");
  }

  public uploadFile(file: any, message?: string): Types.FileId {
    throw new Error("Method not implemented.");
  }

  public getFileDetail(fileId: number, isCreateLink?: boolean): Types.File {
    throw new Error("Method not implemented.");
  }

  /**
   * 招待リンクを取得する
   * https://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-link
   *
   * @returns {Link} リンクの情報
   * @memberof Room
   */
  public getLink(): Link {
    const endpoint = "/rooms/" + this.roomId + "/link";
    return this.httpRequest.get(endpoint, null);
  }

  /**
   * 招待リンクを作成する
   * https://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-link
   *
   * @param {string} path リンク文字列
   * リンクのパス部分。省略するとランダムな文字列となる。
   * @param {string} description リンク説明文
   * リンクページに表示される説明文。
   * @param {boolean} needAcceptance 承認要否
   * 参加に管理者の承認を必要とするか。
   * @returns {Link} リンクの情報
   * @memberof Room
   */
  public createLink(
    path?: string,
    description?: string,
    needAcceptance?: boolean
  ): Link {
    const endpoint = "/rooms/" + this.roomId + "/link";
    const payload: {
      code?: string;
      description?: string;
      need_acceptance?: boolean;
    } = {};
    if (path !== undefined) payload.code = path;
    if (description !== undefined) payload.description = description;
    if (needAcceptance !== undefined) payload.need_acceptance = needAcceptance;
    return this.httpRequest.post(endpoint, payload);
  }
}
