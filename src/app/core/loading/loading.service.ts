import { Injectable } from '@angular/core';

// const
import { defaultLoadingType } from './const/default-loading-type.const';

// model
import { Loading } from './model/loading';

// enum
import { LoadingType } from './enum/loading-type.enum';

// rxjs
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class LoadingService {

  /**
   * loading 狀態 subject
   *
   * @private
   * @memberof LoadingService
   */
  private loadingObservable = new ReplaySubject<Partial<Loading>>(1);

  constructor() { }

  /**
   * 獲取 loading 改變通知 的 Observable
   *
   * @readonly
   * @type {Observable<Partial<Loading>>}
   * @memberof LoadingService
   */
  get valueChanges(): Observable<Partial<Loading>> {
    return this.loadingObservable.asObservable();
  }

  /**
   * 顯示
   *
   * @param {LoadingType} [loadingType] - loading樣式
   * @returns {Promise<{}>}
   * @memberof LoadingService
   */
  show(loadingType?: LoadingType): Promise<{}> {

    const showPromise = new Promise((resolve) => {

      this.loadingObservable.next({
        loadingType: loadingType ? loadingType : defaultLoadingType,
        show: true
      });

      resolve(true);

    });

    return showPromise;

  }

  /**
   * 隱藏
   *
   * @returns {Promise<{}>}
   * @memberof LoadingService
   */
  hide(): Promise<{}> {

    const hidePromise = new Promise((resolve) => {

      this.loadingObservable.next({ show: false });

      resolve(true);

    });

    return hidePromise;

  }

}
