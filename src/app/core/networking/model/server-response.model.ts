/**
 * 後端回傳的資料模型
 *
 * @export
 * @class ServerResponse
 */
export class ServerResponse {

  /**
   * 是否成功
   *
   * @memberof ServerResponse
   */
  success = false;

  /**
   * 回傳資料
   *
   * @memberof ServerResponse
   */
  result = null;

  /**
   * 錯誤訊息
   *
   * @memberof ServerResponse
   */
  errorMessage = '';


  constructor(data: any) {

    if (!data) {
      return;
    }

    this.result = data.result || null;
    this.errorMessage = data.errorMessage || '';

    if (data.success) {
      this.success = true;
    }

  }

}
