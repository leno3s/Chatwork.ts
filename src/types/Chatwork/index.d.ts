// Type definitions for Chatwork
// Project: https://github.com/leno3s/Chatwork.ts (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: leno3s <https://github.com/leno3s>

export namespace Chatwork {
  export interface Account {
    account_id: number;
    name: string;
    avatar_image_url: string;
  }

  export interface User extends Account {
    chatwork_id: string;
    organization_id: number;
    organization_name: string;
    department: string;
  }

  export interface RoledUser extends User {
    role: string;
  }

  export interface ContactedUser extends User {
    room_id: number;
  }

  export interface Me extends ContactedUser {
    title: string;
    url: string;
    introduction: string;
    mail: string;
    tel_organization: string;
    tel_extension: string;
    tel_mobile: string;
    skype: string;
    facebook: string;
    twitter: string;
    login_mail: string;
  }

  export interface MyStatus extends ReadInfomation {
    unread_room_num: number;
    mention_room_num: number;
    mytask_room_num: number;
    mytask_num: number;
  }

  export interface RequestForContact extends User {
    request_id: number;
    message: string;
  }

  export interface RoomId {
    room_id: number;
  }

  export interface RoomMemberPermissions {
    admin: Array<number>;
    member: Array<number>;
    readonly: Array<number>;
  }

  export interface Message extends MessageId {
    account: Account;
    body: string;
    send_time: number;
    update_time: number;
  }

  export interface MessageId {
    message_id: number;
  }

  export interface ReadInfomation {
    unread_num: number;
    mention_num: number;
  }

  export interface Task extends TaskId {
    account: Account;
    assigned_by_account: Account;
    message_id: number;
    body: string;
    limit_time: number;
    status: string;
  }

  export interface TaskId {
    task_id: number;
  }

  export interface TaskIds {
    task_ids: Array<number>;
  }

  export interface File extends FileId {
    file_id: number;
    account: Account;
    message_id: number;
    filename: string;
    filesize: number;
    upload_time: number;
  }

  export interface FileId {
    file_id: number;
  }

  export interface Link {
    public: boolean;
    url: string;
    need_acceptance: boolean;
    description: string;
  }

  export interface Client {
    // endpoint of /me
    getMe(): Me;

    // endpoint of /my/...
    getMyStatus(): MyStatus;
    getMyTasks(assignor_id?: number, status?: taskStatus): Array<Task>;

    // endpoint of /contacts
    getContacts(): Array<ContactedUser>;

    // endpoint of /rooms/...
    getRooms(): Array<Room>;
    createNewRoom(
      roomName: string,
      adminIds: Array<number>,
      description?: string,
      icon_preset?: iconPreset,
      isCreateLink?: boolean,
      isNeedAcceptance?: boolean,
      linkPath?: string,
      memberIds?: Array<number>,
      readonlyIds?: Array<number>
    ): RoomId;

    // endpoint of /incoming_requests/...
    getRequestsToContact(): Array<RequestForContact>;
    acceptToContact(requestId: number): ContactedUser;
    denyToContact(requestId: number): void;
  }

  export interface Room extends RoomId, ReadInfomation {
    name: string;
    type: chatType;
    role: string;
    sticky: boolean;
    mytask_num: number;
    message_num: number;
    file_num: number;
    task_num: number;
    icon_path: string;
    last_update_time: number;
    description: string;

    getRoomInfomation(): Room;
    updateRoom(
      roomName?: string,
      description?: string,
      icon_preset?: iconPreset
    ): RoomId;
    leaveRoom(): void;
    deleteRoom(): void;
    getRoomMembers(): Array<RoledUser>;
    updateRoomMembers(
      adminIds: Array<number>,
      memberIds?: Array<number>,
      readonlyIds?: Array<number>
    ): RoomMemberPermissions;
    getMessages(force: 0 | 1): Array<Message>;
    sendMessage(message: string, isSelfUnread?: 0 | 1): MessageId;
    read(messageId?: number): ReadInfomation;
    unread(messageId: number): ReadInfomation;
    getMessageDetail(messageId: number): Message;
    updateSentMessage(messageId: string, body: string): MessageId;
    deleteMessage(messageId: number): MessageId;
    getTasks(
      account_id?: number,
      assignor_id?: number,
      status?: taskStatus
    ): Array<Task>;
    addTask(
      message: string,
      to_ids: Array<number>,
      limit?: number,
      limitType?: limitType
    ): TaskIds;
    getTaskDetail(taskId: number): Task;
    updateTask(taskId: number, status: taskStatus): TaskId;
    getRoomFiles(uploaderId?: number): Array<File>;
    uploadFile(file: any, message?: string): FileId;
    getFileDetail(fileId: number, isCreateLink?: boolean): File;
    getLinkForInvite(): Link;
    createLinkForInvite(
      path?: string,
      description?: string,
      needAcceptance?: boolean
    ): Link;
    updateLinkForInvite(
      path?: string,
      description?: string,
      needAcceptance?: boolean
    ): Link;
    deleteLinkForInvite(): { public: boolean };
  }

  export type chatType = "my" | "direct" | "group";
  export type taskStatus = "open" | "done";
  export type limitType = "none" | "date" | "time";
  export type iconPreset =
    | "group"
    | "check"
    | "document"
    | "meeting"
    | "event"
    | "project"
    | "business"
    | "study"
    | "security"
    | "star"
    | "idea"
    | "heart"
    | "magcup"
    | "beer"
    | "music"
    | "sports"
    | "travel";
}
