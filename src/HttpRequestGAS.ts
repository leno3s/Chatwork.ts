import { HttpRequestConstructor, IHttpRequest } from "./IHttpRequest";

/**
 * http requestの処理のクラス
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

    // return response if 200
    if (result.getResponseCode() == 200) {
      return JSON.parse(result.getContentText());
    }
    // failed
    throw new Error(result.getContentText());
  }

  public get(endpoint: string, payload) {
    payload = payload || {};
    let path = endpoint;
    let querystringList: Array<string> = [];

    for (let key in payload) {
      querystringList.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(payload[key])
      );
    }
    if (querystringList.length > 0) {
      path = "?" + querystringList.join("&");
    }

    return this.sendRequest("get", path, null);
  }

  public post(endpoint: string, payload) {
    return this.sendRequest("post", endpoint, payload);
  }

  public put(endpoint: string, payload) {
    return this.sendRequest("put", endpoint, payload);
  }

  public delete(endpoint: string, payload) {
    return this.sendRequest("delete", endpoint, payload);
  }
}
