// Type definitions for Chatwork x.x
// Project: https://github.com/baz/foo (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: My Self <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
// export as namespace myLib;
export as namespace Chatwork;

/*~ If this module has methods, declare them as functions like so.
 */
// export function myMethod(a: string): string;
// export function myOtherMethod(a: number): number;

/*~ You can declare types that are available via importing the module */
// export interface someType {
//     name: string;
//     length: number;
//     extras?: string[];
// }

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

export interface MyStatus {
    unread_room_num: number;
    mention_room_num: number;
    mytask_room_num: number;
    unread_num: number;
    mention_num: number;
    mytask_num: number;
}

export interface RequestForContact extends User {
    request_id: number;
    message: string;
}

export interface Room extends RoomId {
    name: string;
    type: string;
    role: string;
    sticky: boolean;
    unread_num: number;
    mention_num: number;
    mytask_num: number;
    message_num: number;
    file_num: number;
    task_num: number;
    icon_path: string;
    last_update_time: number;
    description: string;
}

export interface RoomId {
    room_id: number;
}

export interface RoomMembers {
    admin: Array<number>;
    member: Array<number>;
    readonly: Array<number>;
}

export interface Message {
    message_id: number;
    account: Account;
    body: string;
    send_time: number;
    update_time: number;
}

export interface Task {
    task_id: number;
    account: Account;
    assigned_by_account: Account;
    message_id: number;
    body: string;
    limit_time: number;
    status: string;
}

export interface File {
    file_id: number;
    account: Account;
    message_id: number;
    filename: string;
    filesize: number;
    upload_time: number;
}

export interface Link {
    public: boolean;
    url: string;
    need_acceptance: boolean;
    description: string;
}

/*~ You can declare properties of the module using const, let, or var */
// export const myField: number;

/*~ If there are types, properties, or methods inside dotted names
 *~ of the module, declare them inside a 'namespace'.
 */
// export namespace subProp {
//     /*~ For example, given this definition, someone could write:
//      *~   import { subProp } from 'yourModule';
//      *~   subProp.foo();
//      *~ or
//      *~   import * as yourMod from 'yourModule';
//      *~   yourMod.subProp.foo();
//      */
//     export function foo(): void;
// }

export declare class Client {

    BASE_URL: string;
    header: { 'X-ChatWorkToken': string };

    private constructor(config: { token: string });

    public static factory(token: string): Client;
    public getMe(): Me;
    public getRooms(): Array<Room>;
    public sendMessage(roomId: number, message: string): any;
    public sendMessageToMyChat(message: string): any;
    public getRoomMembers(roomId: number): Array<RoledUser>;
    public sendTask(message: string, roomId: number, limit: number, to_ids: Array<number>): any;
    public getRoomTasks(roomId: number, account_id?: number, assignor_id?: number, status?: 'open' | 'done'): Array<Task>;
    public getMyTasks(assignor_id?: number, status?: 'open' | 'done'): Array<Task>;
}