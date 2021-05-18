/**
 * http requestの処理のクラス
 */
export interface IHttpRequest {
  BASE_URL: string;
  header: { "X-ChatWorkToken": string };

  get(endpoint: string, payload: any): any;
  post(endpoint: string, payload: any): any;
  put(endpoint: string, payload: any): any;
  delete(endpoint: string, payload: any): any;
}

export interface HttpRequestConstructor {
  new (token: string): IHttpRequest;
}

export function createHttpRequest(token: string, ctor: HttpRequestConstructor) {
  return new ctor(token);
}
