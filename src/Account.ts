import { Types } from "src";

/**
 * アカウントを表すクラス
 *
 * @export
 * @class Account
 * @implements {Types.Account}
 */
export class Account implements Types.Account {
  accountId: number;
  name: string;
  avatarImageUrl: string;

  /**
   * Creates an instance of Account.
   * @param {*} account
   * @memberof Account
   */
  public constructor(account: any) {
    this.accountId = account.account_id;
    this.name = account.name;
    this.avatarImageUrl = account.avatar_image_url;
  }
}
