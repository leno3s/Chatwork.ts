import * as Types from "./Types";
import { Account } from "./Account";

export class File implements Types.File {
	fileId: number;
	account: Account;
	messageId: string;
	filename: string;
	fileSize: number;
	uploadTime: number;

  public constructor(file: any){
    this.fileId = file.file_id;
    this.account = new Account(file.account);
    this.messageId = file.message_id;
    this.filename = file.filename;
    this.fileSize = file.filesize;
    this.uploadTime = file.upload_time;
  }
}