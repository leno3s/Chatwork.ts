/// <reference types="google-apps-script" />
import { IHttpRequest } from "./IHttpRequest";

/**
 * http requestの処理のクラス
 * Google Apps ScriptのFetchAppを使う実装
 *
 * @class HttpRequestGAS
 * @implements {IHttpRequest}
 */
export class HttpRequestGAS implements IHttpRequest {
  BASE_URL: string = "https://api.chatwork.com/v2";
  header: { "X-ChatWorkToken": string };

  constructor(token: string) {
    this.header = { "X-ChatWorkToken": token };
  }

  private sendRequest(
    method: GoogleAppsScript.URL_Fetch.HttpMethod,
    path: string,
    payload: Object,
    contentType?: string
  ) {
    const url = this.BASE_URL + path;
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: method,
      headers: this.header,
      payload: payload || {},
    };
    const result = UrlFetchApp.fetch(url, options);

    if (result.getResponseCode() === 204) {
      return [];
    }
    if (result.getResponseCode() !== 200) {
      throw new Error(result.getContentText());
    }
    return JSON.parse(result.getContentText());
  }

  public get(endpoint: string, payload: any) {
    payload = payload || {};
    let path = endpoint;
    let querystringList: Array<string> = [];

    for (let key in payload) {
      querystringList.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(payload[key])
      );
    }
    if (querystringList.length > 0) {
      path += "?" + querystringList.join("&");
    }

    return this.sendRequest("get", path, {});
  }

  public post(endpoint: string, payload: any) {
    return this.sendRequest("post", endpoint, payload);
  }

  public put(endpoint: string, payload: any) {
    return this.sendRequest("put", endpoint, payload);
  }

  public delete(endpoint: string, payload: any) {
    return this.sendRequest("delete", endpoint, payload);
  }
}
