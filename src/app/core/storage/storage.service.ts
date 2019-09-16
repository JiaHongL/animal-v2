import { Injectable } from '@angular/core';

// service
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

// enum
import { StorageType } from './storage-type.enum';

// rxjs
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Storage的底層
 *
 * @export
 * @class StorageService
 */
@Injectable()
export class StorageService {

  /**
   * 儲存 instance (單一實例)
   * ps : only work with singleton services (injected at app root)
   *
   * @static
   * @type {StorageService}
   * @memberof StorageService
   */
  static instance: StorageService;

  constructor(
    private sessionStorage: SessionStorageService,
    private localStorage: LocalStorageService
  ) {
    StorageService.instance = this;
  }

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
   * 取得儲存的資料 Observable
   *
   * @param {string} key
   * @param {number} type
   * @returns {*}
   * @memberof StorageService
   */
  getDataObs(key: string, type: number): Observable<any> {

    switch (type) {

      case StorageType.LOCAL:
        return this.localStorage.observe(key).pipe(map(v => JSON.parse(v)));

      case StorageType.SESSION:
        return this.sessionStorage.observe(key).pipe(map(v => JSON.parse(v)));

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
