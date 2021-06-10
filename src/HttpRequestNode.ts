import { IHttpRequest } from "./IHttpRequest";
import request = require("sync-request");

/**
 * http requestの処理のクラス
 * node上でsync-requestを使って動かす実装
 *
 * @class HttpRequestNode
 * @implements {IHttpRequest}
 */
export class HttpRequestNode implements IHttpRequest {
  BASE_URL: string = "https://api.chatwork.com/v2";
  header: { "X-ChatWorkToken": string };

  public constructor(token: string) {
    this.header = { "X-ChatWorkToken": token };
  }

  private fetch(method: request.HttpVerb, path: string, options?: Object) {
    const url = this.BASE_URL + path;
    const opt = {
      headers: this.header,
    };

    if (options !== undefined) {
      const form = new request.FormData();
      Object.keys(options).forEach((key) => {
        console.log(key);
        //@ts-expect-error
        form.append(key, options[key]);
      });
      //@ts-expect-error
      opt.form = form;
    }

    const response = request.default(method, url, opt);
    if (response.statusCode === 204) {
      return [];
    }
    if (response.statusCode !== 200) {
      throw new Error(response.getBody("utf-8"));
    }
    return JSON.parse(response.getBody("utf-8"));
  }

  public get(path: string, payload: any) {
    payload = payload || {};
    let pathWithQuery = path;
    let querystringList: Array<string> = [];

    for (let key in payload) {
      querystringList.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(payload[key])
      );
    }
    if (querystringList.length > 0) {
      pathWithQuery += "?" + querystringList.join("&");
    }

    return this.fetch("GET", pathWithQuery);
  }

  public post(path: string, payload: any) {
    return this.fetch("POST", path, payload);
  }

  public put(path: string, payload: any) {
    return this.fetch("PUT", path, payload);
  }

  public delete(path: string, payload: any) {
    return this.fetch("DELETE", path, payload);
  }
}
