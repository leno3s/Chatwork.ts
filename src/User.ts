import { Types } from "src";
import { Account } from "./Account";

/**
 * ユーザーを表すクラス
 *
 * @export
 * @class User
 * @extends {Account}
 * @implements {Types.User}
 */
export class User extends Account implements Types.User {
  chatworkId: string;
  organizationId: number;
  organizationName: string;
  department: string;

  /**
   * Creates an instance of User.
   * @param {*} account
   * @memberof User
   */
  public constructor(account: any) {
    super(account);
    this.chatworkId = account.chatwork_id;
    this.organizationId = account.organization_id;
    this.organizationName = account.organization_name;
    this.department = account.department;
  }
}
