import { Injectable } from '@angular/core';

// service
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

// enum
import { StorageType } from './storage-type.enum';

/**
 * Storage的底層
 *
 * @export
 * @class StorageService
 */
@Injectable()
export class StorageService {

  constructor(
    private sessionStorage: SessionStorageService,
    private localStorage: LocalStorageService
  ) { }

  /**
   * 儲存資料
   *
   * @param {string} key - 資料的Key值
   * @param {*} data - 儲存的資料
   * @param {number} type - 儲存的類型
   * @memberof StorageService
   */
  store(key: string, data: any, type: number): void {

    switch (type) {

      case StorageType.LOCAL:
        this.localStorage.store(key, JSON.stringify(data));
        break;

      case StorageType.SESSION:
        this.sessionStorage.store(key, JSON.stringify(data));
        break;

    }

  }

  /**
   * 取得儲存的資料
   *
   * @param {string} key - 資料的Key值
   * @param {number} type - 從哪裡取得儲存的資料
   * @returns {any}
   * @memberof StorageService
   */
  getData(key: string, type: number): any {

    switch (type) {

      case StorageType.LOCAL:
        return JSON.parse(this.localStorage.retrieve(key));

      case StorageType.SESSION:
        return JSON.parse(this.sessionStorage.retrieve(key));

    }

  }

  /**
   * 清除已儲存的資料
   *
   * @param {number} type - 要清除的空間
   * @param {string} [key] - 清除某個特定的資料時才傳入
   * @memberof StorageService
   */
  clean(type: number, key?: string): void {

    switch (type) {

      case StorageType.LOCAL:
        this.localStorage.clear(key);
        break;

      case StorageType.SESSION:
        this.sessionStorage.clear(key);
        break;

    }

  }

}
