// Type definitions for Chatwork
// Project: https://github.com/leno3s/Chatwork.ts (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: leno3s <https://github.com/leno3s>

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

export interface ReadInformation {
  unread_num: number;
  mention_num: number;
}

export interface MyStatus extends ReadInformation {
  unread_room_num: number;
  mention_room_num: number;
  mytask_room_num: number;
  mytask_num: number;
}

export interface RoomId {
  room_id: number;
}

export interface RoomMemberPermissions {
  admin: Array<number>;
  member: Array<number>;
  readonly: Array<number>;
}

export interface MessageId {
  message_id: string;
}

export interface TaskId {
  task_id: number;
}

export interface FileId {
  file_id: number;
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
  getRoom(roomId: number): Room;
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
  getRequestOfContacts(): Array<RequestOfContact>;
}

export interface Room extends RoomId, ReadInformation {
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

  update(
    roomName?: string,
    description?: string,
    icon_preset?: iconPreset
  ): RoomId;
  leave(): void;
  delete(): void;
  getMembers(): Array<RoledUser>;
  updateMembers(
    adminIds: Array<number>,
    memberIds?: Array<number>,
    readonlyIds?: Array<number>
  ): RoomMemberPermissions;
  getMessage(messageId: number): Message;
  getMessages(force: 0 | 1): Array<Message>;
  sendMessage(message: string, isSelfUnread?: 0 | 1): MessageId;
  read(): ReadInformation;
  getTask(taskId: number): Task;
  getTasks(
    accountId?: number,
    assignorId?: number,
    status?: taskStatus
  ): Array<Task>;
  addTask(
    message: string,
    toIds: Array<number>,
    limit?: number,
    limitType?: limitType
  ): TaskId[];
  getFiles(uploaderId?: number): Array<File>;
  uploadFile(file: any, message?: string): FileId;
  getFileDetail(fileId: number, isCreateLink?: boolean): File;
  getLink(): Link;
  createLink(
    path?: string,
    description?: string,
    needAcceptance?: boolean
  ): Link;
}

export interface Message extends MessageId {
  account: Account;
  body: string;
  send_time: number;
  update_time: number;
  update(body: string): MessageId;
  delete(): MessageId;
  read(): ReadInformation;
  unread(): ReadInformation;
}

export interface Link {
  public: boolean;
  url: string;
  need_acceptance: boolean;
  description: string;
  update(path?: string, description?: string, needAcceptance?: boolean): Link;
  delete(): { public: false };
}

export interface Task extends TaskId {
  account: Account;
  assigned_by_account: Account;
  message_id: string;
  body: string;
  limit_time: number;
  status: string;
  update(status: taskStatus): TaskId;
}

export interface File extends FileId {
  file_id: number;
  account: Account;
  message_id: string;
  filename: string;
  filesize: number;
  upload_time: number;
}

export interface RequestOfContact {
  request_id: number;
  message: string;
  chatwork_id: string;
  organization_id: number;
  organization_name: string;
  department: string;
  account_id: number;
  name: string;
  avatar_image_url: string;
  accept(): ContactedUser;
  deny(): void;
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
