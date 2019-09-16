/**
 * 使用者的資料物件模型
 *
 * @export
 * @class User
 */
export class User {

  /**
   * uid
   *
   * @memberof User
   */
  uid = '';

  /**
   * 姓名
   *
   * @memberof User
   */
  name = '';

  /**
   * 角色
   *
   * @memberof User
   */
  role = '';

  /**
   * 信箱
   *
   * @memberof User
   */
  email = '';

  /**
   * Creates an instance of User.
   * @param {*} data - 建立物件的資料
   * @memberof User
   */
  constructor(data: any) {

    if (!data) {
      return;
    }

    this.uid = data.uid || '';
    this.name = data.name || '';
    this.role = data.role || '';
    this.email = data.email || '';

  }

}
