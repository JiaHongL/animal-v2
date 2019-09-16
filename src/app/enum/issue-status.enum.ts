/**
 * 議題狀態
 *
 * @export
 * @enum {number}
 */
export enum IssueStatus {

  /**
   * 全部 (-1)
   */
  ALL = -1,

  /**
   * 送出 (0)
   */
  SUBMIT = 0,

  /**
   * 已追蹤 (1)
   */
  TRACKED = 1,

  /**
   * 處理中 (2)
   */
  PROCESSED = 2,

  /**
   * 已解決 (3)
   */
  SOLVED = 3,

  /**
   * 歸檔 (99)
   */
  ARCHIVE = 99

}
