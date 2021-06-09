import * as Types from "./Types";
import { IHttpRequest } from "./IHttpRequest";
import { ContactedUser } from "./index";

/**
 * コンタクト追加依頼を表すクラス
 *
 * @export
 * @class RequestOfContact
 * @implements {Types.RequestOfContact}
 */
export class RequestOfContact implements Types.RequestOfContact {
  requestId: number;
  message: string;
  chatworkId: string;
  organizationId: number;
  organizationName: string;
  department: string;
  accountId: number;
  name: string;
  avatarImageUrl: string;
  httpRequest: IHttpRequest;

  /**
   * Creates an instance of RequestOfContact.
   * @param {*} request
   * @param {IHttpRequest} httpRequest
   * @memberof RequestOfContact
   */
  public constructor(request: any, httpRequest: IHttpRequest) {
    this.requestId = request.request_id;
    this.message = request.message;
    this.chatworkId = request.chatwork_id;
    this.organizationId = request.organization_id;
    this.organizationName = request.organization_name;
    this.department = request.department;
    this.accountId = request.account_id;
    this.name = request.name;
    this.avatarImageUrl = request.avatar_image_url;
    this.httpRequest = httpRequest;
  }

  /**
   * コンタクト承認依頼を承認する
   * https://developer.chatwork.com/ja/endpoint_incoming_requests.html#PUT-incoming_requests-request_id
   *
   * @returns {ContactedUser} 承認した相手のユーザー情報
   * @memberof RequestOfContact
   */
  public accept(): ContactedUser {
    const endpoint = "/incoming_requests/" + this.requestId;
    return this.httpRequest.put(endpoint, null);
  }

  /**
   * コンタクト承認依頼をキャンセルする
   * https://developer.chatwork.com/ja/endpoint_incoming_requests.html#DELETE-incoming_requests-request_id
   *
   * @memberof RequestOfContact
   */
  public deny(): void {
    const endpoint = "/incoming_requests/" + this.requestId;
    this.httpRequest.delete(endpoint, null);
    return;
  }
}
