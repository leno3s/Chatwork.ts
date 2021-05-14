import { IHttpRequest } from "./IHttpRequest";
import request = require("sync-request");

export class HttpRequestNode implements IHttpRequest {
  BASE_URL: string = "https://api.chatwork.com/v2";
  header: { "X-ChatWorkToken": string };

  constructor(token: string) {
    this.header = { "X-ChatWorkToken": token };
  }

  private fetch(method: request.HttpVerb, path: string, options?: Object) {
    const url = this.BASE_URL + path;
    const opt = options || {};
    const response = request.default(method, url, opt).getBody("utf-8");
    return JSON.parse(response);
  }

  public get(path: string, payload: any) {
    return this.fetch("GET", path, payload);
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
