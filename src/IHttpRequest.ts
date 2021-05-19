/**
 * http requestのインターフェース
 *
 * @interface IHttpRequest
 */
export interface IHttpRequest {
  BASE_URL: string;
  header: { "X-ChatWorkToken": string };

  get(endpoint: string, payload: any): any;
  post(endpoint: string, payload: any): any;
  put(endpoint: string, payload: any): any;
  delete(endpoint: string, payload: any): any;
}

/**
 * HttpRequestのコンストラクタを表すインターフェース
 *
 * @interface HttpRequestConstructor
 */
export interface HttpRequestConstructor {
  new (token: string): IHttpRequest;
}

/**
 * HttpRequestのインスタンスを生成する関数
 *
 * @param {string} token ChatworkのAPIトークン
 * @param {HttpRequestConstructor} ctor IHttpRequestを実装したクラス
 * @returns {IHttpRequest} HttpRequestのインスタンス
 */
export function createHttpRequest(
  token: string,
  ctor: HttpRequestConstructor
): IHttpRequest {
  return new ctor(token);
}
