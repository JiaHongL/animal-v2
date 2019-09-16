import { Injectable } from '@angular/core';

// model
import { Option } from '../../model/option/option.model';

// enum
import { SelectType } from './enum/select-type.enum';
import { StorageType } from '../storage/storage-type.enum';

// service
import { ApiService } from './../api/api.service';
import { StorageService } from '../storage/storage.service';
import { MessageService } from './../message/message.service';

// rxjs
import { Observable, of, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class SelectsService {

  /**
   * 動物狀態代碼列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  statusList: Option[] = [];

  /**
   * 動物性別 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  sexList: Option[] = [];

  /**
   * 動物體型 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  bodyTypeList: Option[] = [];

  /**
   * 動物年紀 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  ageList: Option[] = [];

  /**
   * 地區 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  areaList: Option[] = [];

  /**
   * 收容所 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  sterilizationList: Option[] = [];

  /**
   * 是否狂犬病 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  bacterinList: Option[] = [];

  /**
   * 動物種類 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  kindList: Option[] = [];

  /**
   * 毛色 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  colourList: Option[] = [];

  /**
   * 收容所 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  shelterList: Option[] = [];

  /**
   * 回饋類型 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  feedbackTypeList: Option[] = [];

  /**
   * 議題狀態 列表
   *
   * @type {Option[]}
   * @memberof SelectsService
   */
  issuesStatusList: Option[] = [];

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private message: MessageService
  ) {

  }

  /**
   * 取得所有選項列表
   *
   * @memberof SelectsService
   */
  getAllSelects(): void {

    const combined = combineLatest([
      this.getList(SelectType.STATUS),
      this.getList(SelectType.SEX),
      this.getList(SelectType.BODY_TYPE),
      this.getList(SelectType.AGE),
      this.getList(SelectType.AREA),
      this.getList(SelectType.STERILIZATION),
      this.getList(SelectType.BACTERIN),
      this.getList(SelectType.KIND),
      this.getList(SelectType.COLOUR),
      this.getList(SelectType.SHELTER),
      this.getList(SelectType.FEEDBACK_TYPE),
      this.getList(SelectType.ISSUES_STATUS)
    ]);

    combined.subscribe((list) => {

      this.statusList = list[0];
      this.sexList = list[1];
      this.bodyTypeList = list[2];
      this.ageList = list[3];
      this.areaList = list[4];
      this.sterilizationList = list[5];
      this.bacterinList = list[6];
      this.kindList = list[7];
      this.colourList = list[8];
      this.shelterList = list[9];
      this.feedbackTypeList = list[10];
      this.issuesStatusList = list[11];

    });

  }

  /**
   * 清除所有選項
   *
   * @memberof SelectsService
   */
  clearAllSelections(): void {

    this.storage.clean(StorageType.LOCAL, SelectType.STATUS);
    this.storage.clean(StorageType.LOCAL, SelectType.SEX);
    this.storage.clean(StorageType.LOCAL, SelectType.BODY_TYPE);
    this.storage.clean(StorageType.LOCAL, SelectType.AGE);
    this.storage.clean(StorageType.LOCAL, SelectType.AREA);
    this.storage.clean(StorageType.LOCAL, SelectType.STERILIZATION);
    this.storage.clean(StorageType.LOCAL, SelectType.BACTERIN);
    this.storage.clean(StorageType.LOCAL, SelectType.KIND);
    this.storage.clean(StorageType.LOCAL, SelectType.COLOUR);
    this.storage.clean(StorageType.LOCAL, SelectType.SHELTER);
    this.storage.clean(StorageType.LOCAL, SelectType.FEEDBACK_TYPE);
    this.storage.clean(StorageType.LOCAL, SelectType.ISSUES_STATUS);

  }

  /**
   * 取得下拉選單的 API
   *
   * @private
   * @param {string} type - 取得什麼類型的下拉選單
   * @param {boolean} [canStore=true] - 是否要儲存到 Local Storage ，預設是
   * @returns {Observable<Option[]>}
   * @memberof SelectsService
   */
  private getSelects(type: string, canStore = true): Observable<Option[]> {

    return this
      .api
      .getSelects(type)
      .pipe(
        map((res) => {

          let options = [];

          if (res.success) {
            options = res.result;
          } else {
            this.message.alert(res.errorMessage);
          }

          return options.map(option => new Option(option));

        }),
        tap((options) => {

          if (canStore) {
            this.storeSelects(options, type);
          }

        })
      );

  }

  /**
   * 儲存下拉選單的資料
   *
   * @private
   * @param {Option[]} options - 要儲存的下拉選單的資料
   * @param {string} key - 要儲存在哪個位置
   * @memberof SelectsService
   */
  private storeSelects(options: Option[], key: string): void {

    this.storage.store(key, options, StorageType.LOCAL);

  }

  /**
   * 透過 Key 值取得選單
   *
   * @private
   * @param {string} key - 欲取得哪個 Key 值的選單
   * @returns {Observable<Option[]>}
   * @memberof SelectsService
   */
  private getList(key: string): Observable<Option[]> {

    const datas: any[] = this.storage.getData(key, StorageType.LOCAL) || [];

    if (datas.length) {
      return of(datas.map(data => new Option(data)));
    } else {
      return this.getSelects(key);
    }

  }

}
