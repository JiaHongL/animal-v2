import { UtilityService } from '../../utility/utility.service';

const utilityService = UtilityService.prototype;

/**
 * 動物查詢的參數模型
 *
 * @export
 * @class QueryParams
 */
export class QueryParams {

  /**
   * 取得前幾筆
   *
   * @memberof QueryParams
   */
  private $top = 100;

  /**
   * 跳過幾筆
   *
   * @memberof QueryParams
   */
  private $skip = 0;

  /**
   * 流水編號
   *
   * @memberof QueryParams
   */
  animal_id = null;

  /**
   * 區域編號
   *
   * @memberof QueryParams
   */
  animal_subid = null;

  /**
   * 收容所代碼
   *
   * @memberof QueryParams
   */
  animal_shelter_pkid = null;

  /**
   * 種類
   *
   * @memberof QueryParams
   */
  animal_kind = null;

  /**
   * 性別
   *
   * @memberof QueryParams
   */
  animal_sex = null;

  /**
   * 體型
   *
   * @memberof QueryParams
   */
  animal_bodytype = null;

  /**
   * 年紀
   *
   * @memberof QueryParams
   */
  animal_age = null;

  /**
   * 毛色
   *
   * @memberof QueryParams
   */
  animal_colour = null;

  /**
   * 是否絕育
   *
   * @memberof QueryParams
   */
  animal_sterilization = null;

  /**
   * 是否施打狂犬病疫苗
   *
   * @memberof QueryParams
   */
  animal_bacterin = null;

  /**
   * 區域代碼
   *
   * @memberof QueryParams
   */
  animal_area_pkid = null;

  constructor(page: number, params: any) {

    this.$top = utilityService.isMobile ? 30 : 80;
    this.$skip = this.$top * (page - 1);

    Object.assign(this, params);

    Object
      .keys(this)
      .forEach((key) => {

        if (
          this[key] === undefined ||
          this[key] === null
        ) {
          delete this[key];
        }

      });

  }

}
