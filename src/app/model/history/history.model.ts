/**
 *  歷程紀錄 的 資料模型
 *
 * @export
 * @class History
 */
export class History {

  /**
   * 編號
   *
   * @type {number}
   * @memberof History
   */
  id = '';

  /**
   * 狀態
   *
   * @type {number}
   * @memberof History
   */
  status = '';

  /**
   * 建立時間
   *
   * @type {number}
   * @memberof History
   */
  createTime = '';

  /**
   * 建立者
   *
   * @type {string}
   * @memberof History
   */
  createUser = '';

  /**
   * 備註
   *
   * @type {string}
   * @memberof History
   */
  remark = '';

  constructor(data: any) {

    if (!data) {
      return;
    }

    this.id = data.id || '';
    this.status = data.status || '';
    this.createUser = data.createUser || '';
    this.createTime = data.createTime || '';
    this.remark = data.remark || '';

  }

}
