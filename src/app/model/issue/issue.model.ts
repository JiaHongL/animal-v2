import { History } from '../history/history.model';

/**
 *  議題 的 資料模型
 *
 * @export
 * @class Issue
 */
export class Issue {

  /**
   * 編號
   *
   * @memberof Issue
   */
  id = '';

  /**
   * 狀態
   *
   * @memberof Issue
   */
  status: number = null;

  /**
   * 意見類型
   *
   * @memberof Issue
   */
  type: number = null;

  /**
   * 標題
   *
   * @memberof Issue
   */
  title = '';

  /**
   * 建立者
   *
   * @memberof Issue
   */
  createUser = '';

  /**
   * 建立時間
   *
   * @memberof Issue
   */
  createTime = '';

  /**
   * 意見
   *
   * @memberof Issue
   */
  comment = '';

  /**
   * 電子信箱
   *
   * @memberof Issue
   */
  email = '';

  /**
   * 案件歷程
   *
   * @memberof Issue
   */
  history = null;

  constructor(data: any) {

    if (!data) {
      return;
    }

    this.id = data.id || '';
    this.status = data.status;
    this.type = data.type;
    this.title = data.title || '';
    this.createUser = data.createUser || '';
    this.createTime = data.createTime || '';
    this.comment = data.comment || '';
    this.email = data.email || '';

    const history: any[] = data.history;

    if (Array.isArray(history)) {
      this.history = history.map(v => new History(v));
    }

  }

}
