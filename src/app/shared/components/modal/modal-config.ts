/**
 * modal 設定檔案 class
 *
 * @export
 * @class ModalConfig
 * @template D
 */
export declare class ModalConfig<D = any> {

  /**
   *   min-width of the modal
   *
   * @type {string}
   * @memberof ModalConfig
   */
  minWidth?: string;

  /**
   * min-height of the modal
   *
   * @type {string}
   * @memberof ModalConfig
   */
  minHeight?: string;

  /**
   * Data being injected into the child component
   *
   * @type {(D | null)}
   * @memberof ModalConfig
   */
  data?: D | null;

}
