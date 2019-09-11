/**
 * 議題狀態
 *
 * @export
 * @enum {number}
 */
export enum IssueStatus {

  /**
   * 全部
   */
  ALL = '-1',

  /**
   * 送出
   */
  SUBMIT = '0',

  /**
   * 已追蹤
   */
  TRACKED = '1',

  /**
   * 處理中
   */
  PROCESSED = '2',

  /**
   * 已解決
   */
  SOLVED = '3'

}
