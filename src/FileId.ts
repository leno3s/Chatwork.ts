import { Types } from "src";

/**
 * ファイルIDを表すクラス
 *
 * @export
 * @class FileId
 * @implements {Types.FileId}
 */
export class FileId implements Types.FileId {
  fileId: number;

  /**
   * Creates an instance of FileId.
   * @param {*} fileId
   * @memberof FileId
   */
  public constructor(fileId: any) {
    this.fileId = fileId.file_id;
  }
}
