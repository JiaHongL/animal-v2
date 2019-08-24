/**
 *  選項 的 model
 *
 * @export
 * @class Option
 */
export class Option {

  /**
   * Key
   *
   * @memberof Option
   */
  key = '';

  /**
   * Value
   *
   * @memberof Option
   */
  value = '';


  constructor(data) {

    if (!data) {
      return;
    }

    this.key = data.key || '';
    this.value = data.value || '';

  }

}
