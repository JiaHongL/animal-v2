import { MessageType } from './message-type.enum';

/**
 *  訊息設定
 *
 * @export
 * @interface MessageConfig
 */
export interface MessageConfig {

  /**
   * 視窗標題
   *
   * @type {string}
   * @memberof MessageConfig
   */
  title?: string;

  /**
   * 內容
   *
   * @type {string}
   * @memberof MessageConfig
   */
  content: string;

  /**
   * 視窗類型
   *
   * @type {MessageType}
   * @memberof MessageConfig
   */
  type: MessageType;

  /**
   * 取消按鈕 標題
   *
   * @type {string}
   * @memberof MessageConfig
   */
  cancelBtnTitle?: string;

  /**
   * 確定按鈕 標題
   *
   * @type {string}
   * @memberof MessageConfig
   */
  okBtnTitle?: string;

}
