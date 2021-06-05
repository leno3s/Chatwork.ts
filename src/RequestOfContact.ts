import * as Types from "./Types";
import { IHttpRequest } from "./IHttpRequest";

/**
 * コンタクト追加依頼を表すクラス
 *
 * @export
 * @class RequestOfContact
 * @implements {Types.RequestOfContact}
 */
export class RequestOfContact implements Types.RequestOfContact {
  request_id: number;
  message: string;
  chatwork_id: string;
  organization_id: number;
  organization_name: string;
  department: string;
  account_id: number;
  name: string;
  avatar_image_url: string;
  httpRequest: IHttpRequest;

  /**
   * Creates an instance of RequestOfContact.
   * @param {*} request
   * @param {IHttpRequest} httpRequest
   * @memberof RequestOfContact
   */
  constructor(request: any, httpRequest: IHttpRequest) {
    this.request_id = request.request_id;
    this.message = request.message;
    this.chatwork_id = request.chatwork_id;
    this.organization_id = request.organization_id;
    this.organization_name = request.organization_name;
    this.department = request.department;
    this.account_id = request.account_id;
    this.name = request.name;
    this.avatar_image_url = request.avatar_image_url;
    this.httpRequest = httpRequest;
  }

  /**
   * コンタクト承認依頼を承認する
   * https://developer.chatwork.com/ja/endpoint_incoming_requests.html#PUT-incoming_requests-request_id
   *
   * @returns {Types.ContactedUser} 承認した相手のユーザー情報
   * @memberof RequestOfContact
   */
  accept(): Types.ContactedUser {
    const endpoint = "/incoming_requests/" + this.request_id;
    return this.httpRequest.put(endpoint, null);
  }

  /**
   * コンタクト承認依頼をキャンセルする
   * https://developer.chatwork.com/ja/endpoint_incoming_requests.html#DELETE-incoming_requests-request_id
   *
   * @memberof RequestOfContact
   */
  deny(): void {
    const endpoint = "/incoming_requests/" + this.request_id;
    this.httpRequest.delete(endpoint, null);
    return;
  }
}
