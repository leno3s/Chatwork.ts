import * as Types from "./Types";
import { IHttpRequest } from "./IHttpRequest";
import { Room } from "./Room";
import { User } from "./User";

/**
 * コンタクトに追加済みのユーザーを表すクラス
 *
 * @export
 * @class ContactedUser
 * @extends {User}
 * @implements {Types.ContactedUser}
 */
export class ContactedUser extends User implements Types.ContactedUser {
  roomId: number;
  httpRequest: IHttpRequest;

  /**
   * Creates an instance of ContactedUser.
   * @param {*} contactedUser
   * @param {IHttpRequest} httpRequest
   * @memberof ContactedUser
   */
  public constructor(contactedUser: any, httpRequest: IHttpRequest) {
    super(contactedUser);
    this.roomId = contactedUser.room_id;
    this.httpRequest = httpRequest;
  }

  /**
   * ルームを取得
   *
   * @return {Room}
   * @memberof ContactedUser
   */
  public getRoom(): Room {
    const endpoint = "/rooms/" + this.roomId;
    const response = this.httpRequest.get(endpoint, null);
    return new Room(response, this.httpRequest);
  }
}
