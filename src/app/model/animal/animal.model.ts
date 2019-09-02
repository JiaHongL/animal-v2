
// service
import { StorageService } from '../../core/storage/storage.service';

// const
import { storageKeys } from 'src/app/core/storage/storage-key.const';

// enum
import { StorageType } from 'src/app/core/storage/storage-type.enum';

/**
 *  動物資訊的資料模型
 *
 * @export
 * @class Animal
 */
export class Animal {

  /**
   * 動物所屬收容所代碼
   *
   * @type {number}
   * @memberof Animal
   */
  animal_shelter_pkid = '';

  /**
   * 動物的流水編號
   *
   * @type {number}
   * @memberof Animal
   */
  animal_id = '';

  /**
   * 動物所屬縣市代碼
   *
   * @type {number}
   * @memberof Animal
   */
  animal_area_pkid = '';

  /**
   * 圖片名稱
   *
   * @type {string}
   * @memberof Animal
   */
  album_file = '';

  /**
   * 異動時間
   *
   * @type {string}
   * @memberof Animal
   */
  album_update = '';

  /**
   * 動物年紀 [CHILD | ADULT](幼年、成年)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_age = '';

  /**
   * 是否施打狂犬病疫苗 [T | F | N](是、否、未輸入)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_bacterin = '';

  /**
   * 動物體型 [MINI | SMALL | MEDIUM | BIG](迷你、小 型、中型、大型)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_bodytype = '';

  /**
   * 其他說明
   *
   * @type {string}
   * @memberof Animal
   */
  animal_caption = '';

  /**
   * 開放認養時間(迄)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_closeddate = '';

  /**
   * 動物毛色
   *
   * @type {string}
   * @memberof Animal
   */
  animal_colour = '';

  /**
   * 動物資料建立時間
   *
   * @type {string}
   * @memberof Animal
   */
  animal_createtime = '';

  /**
   * 動物尋獲地(文字敘述)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_foundplace = '';

  /**
   * 動物的類型
   *
   * @type {string}
   * @memberof Animal
   */
  animal_kind = '';

  /**
   * 開放認養時間(起)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_opendate = '';
  /**
   * 動物的實際所在地
   *
   * @type {string}
   * @memberof Animal
   */
  animal_place = '';

  /**
   * 資料備註(文字敘述)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_remark = '';

  /**
   * 動物性別 M | F | N](公、母、未輸入)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_sex = '';


  /**
   * 動物狀態 [NONE | OPEN | ADOPTED | OTHER | DEAD] (未公告、開放認養、已認養、其他、死亡)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_status = '';

  /**
   * 是否絕育 [T | F | N](是、否、未輸入)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_sterilization = '';

  /**
   * 動物的區域編號
   *
   * @type {string}
   * @memberof Animal
   */
  animal_subid = '';

  /**
   * 動物網頁標題(文字敘述)
   *
   * @type {string}
   * @memberof Animal
   */
  animal_title = '';

  /**
   * 動物資料異動時間
   *
   * @type {string}
   * @memberof Animal
   */
  animal_update = '';

  /**
   * 資料更新時間
   *
   * @type {string}
   * @memberof Animal
   */
  cDate = '';

  /**
   * 地址
   *
   * @type {string}
   * @memberof Animal
   */
  shelter_address = '';

  /**
   * 動物所屬收容所名稱
   *
   * @type {string}
   * @memberof Animal
   */
  shelter_name = '';

  /**
   * 連絡電話
   *
   * @type {string}
   * @memberof Animal
   */
  shelter_tel = '';

  /**
   * 是否喜歡
   *
   * @type {boolean}
   * @memberof Animal
   */
  isLike = false;

  /**
   * 獲取 storageService 實體
   * ps: only work with singleton services (injected at app root)
   *
   * @readonly
   * @memberof Animal
   */
  private get storageService(): StorageService {
    return StorageService.instance;
  }

  constructor(data: any) {

    if (!data) {
      return;
    }

    this.album_file = data.album_file || '';
    this.album_update = data.album_update || '';
    this.animal_age = data.animal_age || '';
    this.animal_area_pkid = data.animal_area_pkid || '';
    this.animal_bacterin = data.animal_bacterin || '';
    this.animal_bodytype = data.animal_bodytype || '';
    this.animal_caption = data.animal_caption || '';
    this.animal_closeddate = data.animal_closeddate || '';
    this.animal_colour = data.animal_colour || '';
    this.animal_createtime = data.animal_createtime || '';
    this.animal_foundplace = data.animal_foundplace || '';
    this.animal_id = data.animal_id || '';
    this.animal_kind = data.animal_kind || '';
    this.animal_opendate = data.animal_opendate || '';
    this.animal_place = data.animal_place || '';
    this.animal_remark = data.animal_remark || '';
    this.animal_sex = data.animal_sex || '';
    this.animal_shelter_pkid = data.animal_shelter_pkid || '';
    this.animal_status = data.animal_status || '';
    this.animal_sterilization = data.animal_sterilization || '';
    this.animal_subid = data.animal_subid || '';
    this.animal_title = data.animal_title || '';
    this.animal_update = data.animal_update || '';
    this.cDate = data.cDate || '';
    this.shelter_address = data.shelter_address || '';
    this.shelter_name = data.shelter_name || '';
    this.shelter_tel = data.shelter_tel || '';

    const favoriteList = this.storageService.getData(storageKeys.favoriteList, StorageType.LOCAL) || [];
    const subIdList = favoriteList.map((item: Animal) => item.animal_subid);

    if (subIdList.includes(this.animal_subid)) {
      this.isLike = true;
    }

  }

  /**
   * 設定我的最愛
   *
   * @memberof Animal
   */
  setFavorite(): void {

    let favoriteList = this.storageService.getData(storageKeys.favoriteList, StorageType.LOCAL) || [];

    this.isLike = !this.isLike;

    if (this.isLike) {
      favoriteList.push(this);
    } else {
      favoriteList = favoriteList.filter((item: Animal) => item.animal_subid !== this.animal_subid);
    }

    this.storageService.store(storageKeys.favoriteList, favoriteList, StorageType.LOCAL);

  }

}
