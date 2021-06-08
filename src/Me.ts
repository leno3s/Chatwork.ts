import { ContactedUser, IHttpRequest, Types } from "src";

/**
 * 自身の情報を表すクラス
 *
 * @export
 * @class Me
 * @extends {ContactedUser}
 * @implements {Types.Me}
 */
export class Me extends ContactedUser implements Types.Me {
  title: string;
  url: string;
  introduction: string;
  mail: string;
  telOrganization: string;
  telExtension: string;
  telMobile: string;
  skype: string;
  facebook: string;
  twitter: string;
  loginMail: string;

  /**
   * Creates an instance of Me.
   * @param {*} me
   * @param {IHttpRequest} httpRequest
   * @memberof Me
   */
  constructor(me: any, httpRequest: IHttpRequest) {
    super(me, httpRequest);
    this.title = me.title;
    this.url = me.url;
    this.introduction = me.introduction;
    this.mail = me.mail;
    this.telOrganization = me.tel_organization;
    this.telExtension = me.tel_extension;
    this.telMobile = me.tel_mobile;
    this.skype = me.skype;
    this.facebook = me.facebook;
    this.twitter = me.twitter;
    this.loginMail = me.login_mail;
  }
}
