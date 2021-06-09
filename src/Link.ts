import * as Types from "./Types";
import { IHttpRequest } from "./IHttpRequest";
import { Room } from "./Room";

/**
 * グループチャットへの招待リンクを表すクラス
 *
 * @export
 * @class Link
 * @implements {Types.Link}
 */
export class Link implements Types.Link {
  public: boolean;
  url: string;
  needAcceptance: boolean;
  description: string;
  roomId: number;
  httpRequest: IHttpRequest;

  /**
   * Creates an instance of Link.
   * @param {*} link
   * @param {number} roomId
   * @param {IHttpRequest} httpRequest
   * @memberof Link
   */
  public constructor(link: any, roomId: number, httpRequest: IHttpRequest) {
    this.public = link.public;
    this.url = link.url;
    this.needAcceptance = link.need_acceptance;
    this.description = link.description;
    this.roomId = roomId;
    this.httpRequest = httpRequest;
  }

  /**
   * リンクの情報を更新
   *
   * @param {string} [path]
   * @param {string} [description]
   * @param {boolean} [needAcceptance]
   * @return {Link}  {Types.Link}
   * @memberof Link
   */
  public update(
    path?: string,
    description?: string,
    needAcceptance?: boolean
  ): Link {
    const endpoint = "/rooms/" + this.roomId + "/link";
    let options: {
      path?: string;
      description?: string;
      need_acceptance?: boolean;
    } = {};
    if (path !== undefined) options.path = path;
    if (description !== undefined) options.description = description;
    if (needAcceptance !== undefined) options.need_acceptance = needAcceptance;
    const response = this.httpRequest.put(endpoint, options);
    return new Link(response, this.roomId, this.httpRequest);
  }

  /**
   * リンクを削除、無効化
   *
   * @return {{public:false}}  {{ public: false }}
   * @memberof Link
   */
  public delete(): { public: false } {
    const endpoint = "/rooms/" + this.roomId + "/link";
    const response = this.httpRequest.delete(endpoint, null);
    return response;
  }

  /**
   * ルームを取得
   *
   * @return {Room}
   * @memberof Link
   */
  public getRoom(): Room {
    const endpoint = "/rooms/" + this.roomId;
    const response = this.httpRequest.get(endpoint, null);
    return new Room(response, this.httpRequest);
  }
}
