/**
 * チャットの種類の定数のクラス
 *
 * @export
 * @class ChatType
 */
export class ChatTypes {
  public static readonly MY: ChatType = "my";
  public static readonly DIRECT: ChatType = "direct";
  public static readonly GROUP: ChatType = "group";
  private constructor() {}
}

export type ChatType = "my" | "direct" | "group";
