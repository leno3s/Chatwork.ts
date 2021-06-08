import { Room, Types } from "src";
import { IHttpRequest } from "./IHttpRequest";

/**
 * ルームIDを表すクラス
 *
 * @export
 * @class RoomId
 * @implements {Types.RoomId}
 */
export class RoomId implements Types.RoomId {
  roomId: number;
  httpRequest: IHttpRequest;

  /**
   * Creates an instance of RoomId.
   * @param {*} roomId
   * @param {IHttpRequest} httpRequest
   * @memberof RoomId
   */
  public constructor(roomId: any, httpRequest: IHttpRequest) {
    this.roomId = roomId.room_id;
    this.httpRequest = httpRequest;
  }

  /**
   * ルームの取得
   *
   * @return {Room}
   * @memberof RoomId
   */
  public getRoom(): Room {
    const endpoint = "/rooms/" + this.roomId;
    const response = this.httpRequest.get(endpoint, null);
    return new Room(response, this.httpRequest);
  }
}
