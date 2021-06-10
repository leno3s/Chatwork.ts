// Type definitions for Chatwork
// Project: https://github.com/leno3s/Chatwork.ts (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: leno3s <https://github.com/leno3s>

export interface Account {
  accountId: number;
  name: string;
  avatarImageUrl: string;
}

export interface User extends Account {
  chatworkId: string;
  organizationId: number;
  organizationName: string;
  department: string;
}

export interface RoledUser extends User {
  role: string;
}

export interface ContactedUser extends User {
  roomId: number;
}

export interface Me extends ContactedUser {
  title: string;
  url: string;
  introduction: string;
  mail: string;
  telOrganization: string;
  telExtension: string;
  telMobile: string;
  skype: string;
  facebook: string;
  twitter: string;
  loginMail: string;
}

export interface ReadInformation {
  unreadNum: number;
  mentionNum: number;
}

export interface MyStatus extends ReadInformation {
  unreadRoomNum: number;
  mentionRoomNum: number;
  myTaskRoomNum: number;
  myTaskNum: number;
}

export interface RoomId {
  roomId: number;
}

export interface RoomMemberPermissions {
  admin: Array<number>;
  member: Array<number>;
  readonly: Array<number>;
}

export interface MessageId {
  messageId: string;
}

export interface TaskId {
  taskId: number;
}

export interface FileId {
  fileId: number;
}

export interface Client {
  // endpoint of /me
  getMe(): Me;

  // endpoint of /my/...
  getMyStatus(): MyStatus;
  getMyTasks(assignorId?: number, status?: taskStatus): Array<Task>;

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
  chatType: chatType;
  role: string;
  sticky: boolean;
  myTaskNum: number;
  messageNum: number;
  fileNum: number;
  taskNum: number;
  iconUrl: string;
  lastUpdateTime: number;
  description: string;

  update(
    roomName?: string,
    description?: string,
    iconPreset?: iconPreset
  ): RoomId;
  leave(): void;
  delete(): void;
  getMembers(): Array<RoledUser>;
  updateMembers(
    adminIds: Array<number>,
    memberIds?: Array<number>,
    readonlyIds?: Array<number>
  ): RoomMemberPermissions;
  getMessage(messageId: string): Message;
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
  sendTime: number;
  updateTime: number;
  update(body: string): MessageId;
  delete(): MessageId;
  read(): ReadInformation;
  unread(): ReadInformation;
}

export interface Link {
  public: boolean;
  url: string;
  needAcceptance: boolean;
  description: string;
  update(path?: string, description?: string, needAcceptance?: boolean): Link;
  delete(): { public: false };
}

export interface Task extends TaskId {
  assignedByAccount: Account;
  messageId: string;
  body: string;
  limitTime: number;
  status: string;
  update(status: taskStatus): TaskId;
}

export interface File extends FileId {
  fileId: number;
  account: Account;
  messageId: string;
  filename: string;
  fileSize: number;
  uploadTime: number;
}

export interface RequestOfContact {
  requestId: number;
  message: string;
  chatworkId: string;
  organizationId: number;
  organizationName: string;
  department: string;
  accountId: number;
  name: string;
  avatarImageUrl: string;
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
