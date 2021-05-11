/**
 * http requestの処理のクラス
 */
export class HttpRequest {
  BASE_URL: string = "https://api.chatwork.com/v2";
  header: { "X-ChatWorkToken": string };

  constructor(token: string) {
    this.header = { "X-ChatWorkToken": token };
  }

  private sendRequest(params: { method; path: string; payload: string, contentType?: string}) {
    const url = this.BASE_URL + params.path;
    const options = {
      method: params.method,
      headers: this.header,
      payload: params.payload || {},
    };
    const result = UrlFetchApp.fetch(url, options);

    // return response if 200
    if (result.getResponseCode() == 200) {
      return JSON.parse(result.getContentText());
    }
    // failed
    return false;
  }

  public get(endpoint: string, getData) {
    getData = getData || {};
    let path = endpoint;
    let querystringList: Array<string> = [];

    for (let key in getData) {
      querystringList.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(getData[key])
      );
    }
    if (querystringList.length > 0) {
      path = "?" + querystringList.join("&");
    }

    return this.sendRequest({
      method: "get",
      path: path,
      payload: null,
    });
  }

  public post(endpoint: string, payload) {
    return this.sendRequest({
      method: "post",
      path: endpoint,
      payload: payload,
    });
  }

  public put(endpoint: string, payload) {
    return this.sendRequest({
      method: "put",
      path: endpoint,
      payload: payload,
    });
  }

  public delete(endpoint: string, payload) {
    return this.sendRequest({
      method: "delete",
      path: endpoint,
      payload: payload,
    });
  }
}
