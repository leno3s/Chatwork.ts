/**
 * http requestの処理のクラス
 */
export interface IHttpRequest {
  BASE_URL: string;
  header: { "X-ChatWorkToken": string };

  get(endpoint: string, payload);
  post(endpoint: string, payload);
  put(endpoint: string, payload);
  delete(endpoint: string, payload);
}

export interface HttpRequestConstructor {
  new (token: string): IHttpRequest;
}

export function createHttpRequest(token: string, ctor: HttpRequestConstructor){
    return new ctor(token);
}