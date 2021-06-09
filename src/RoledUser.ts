import * as Types from "./Types";
import { User } from "./User";

/**
 * ロールを割り当てられたユーザーを表すクラス
 *
 * @export
 * @class RoledUser
 * @extends {User}
 * @implements {Types.RoledUser}
 */
export class RoledUser extends User implements Types.RoledUser {
  role: string;

  /**
   * Creates an instance of RoledUser.
   * @param {*} roledUser
   * @memberof RoledUser
   */
  public constructor(roledUser: any) {
    super(roledUser);
    this.role = roledUser.role;
  }
}
