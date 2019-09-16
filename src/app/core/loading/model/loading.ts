import { LoadingType } from '../enum/loading-type.enum';

/**
 * loading class
 *
 * @export
 * @class Loading
 */
export class Loading {

  /**
   * 是否顯示
   *
   * @memberof Loading
   */
  show = false;

  /**
   * loading 樣式
   *
   * @memberof Loading
   */
  loadingType: LoadingType = null;

  /**
   * Creates an instance of Loading.
   * @param {Partial<Loading>} [config] - 設定
   * @memberof Loading
   */
  constructor(config?: Partial<Loading>) {
    Object.assign(this, config);
  }

}
