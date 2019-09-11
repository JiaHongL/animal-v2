/**
 *  選項 的 model
 *
 * @export
 * @class Option
 */
export class Option {

  /**
   * 代碼
   *
   * @memberof Option
   */
  code = '';

  /**
   * 名稱
   *
   * @memberof Option
   */
  name = '';


  constructor(data) {

    if (!data) {
      return;
    }

    this.code = data.code || '';
    this.name = data.name || '';

  }

}
