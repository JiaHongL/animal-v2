import { Injectable } from '@angular/core';

// const
import { defaultName } from './const/default-name.const';
import { defaultLoadingType } from './const/default-loading-type.const';

// model
import { Loading } from './model/loading';

// enum
import { LoadingType } from './enum/loading-type.enum';

// rxjs
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';


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
   * 獲取 loading設定通知 的 Observable
   *
   * @param {string} name
   * @returns {Observable<Loading>}
   * @memberof LoadingService
   */
  getLoading(name: string): Observable<Loading> {

    return this
      .loadingObservable
      .asObservable()
      .pipe(
        filter((v: Loading) => v && v.name === name)
      );

  }

  /**
   * 顯示
   *
   * @param {Partial<{ name: string; loadingType: LoadingType }>} config - 選項設定
   * @returns {Promise<{}>}
   * @memberof LoadingService
   */
  show(config?: Partial<{ name: string; loadingType: LoadingType }>): Promise<{}> {

    const loading = Object.assign(
      {
        name: defaultName,
        loadingType: defaultLoadingType,
        show: true
      },
      config
    );

    const showPromise = new Promise((resolve) => {

      this.loadingObservable.next(loading);
      resolve(true);

    });

    return showPromise;

  }

  /**
   * 隱藏
   *
   * @param {string} [name=defaultName] - 哪個Loading的名稱
   * @returns {Promise<{}>}
   * @memberof LoadingService
   */
  hide(name: string = defaultName): Promise<{}> {

    const hidePromise = new Promise((resolve) => {

      this.loadingObservable.next({ name, show: false });
      resolve(true);

    });

    return hidePromise;

  }

}
