import { Room, Types } from "src";

/**
 * ルームのメンバーの権限を表すクラス
 * レスポンスに対して使用される
 *
 * @export
 * @class RoomMemberPermissions
 * @implements {Types.RoomMemberPermissions}
 */
export class RoomMemberPermissions implements Types.RoomMemberPermissions {
  admin: number[];
  member: number[];
  readonly: number[];
  /**
   * Creates an instance of RoomMemberPermissions.
   * @param {*} roomMemberPermission
   * @memberof RoomMemberPermissions
   */
  constructor(roomMemberPermission: any) {
    this.admin = roomMemberPermission.admin;
    this.member = roomMemberPermission.member;
    this.readonly = roomMemberPermission.readonly;
  }
}