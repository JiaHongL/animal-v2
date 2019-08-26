import { Component, OnInit, SimpleChange, OnChanges, OnDestroy } from '@angular/core';

// service
import { LoadingService } from './loading.service';

// const
import { defaultName } from './const/default-name.const';
import { defaultLoadingType } from './const/default-loading-type.const';

// model
import { Loading } from './model/loading';

// enum
import { LoadingType } from './enum/loading-type.enum';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  /**
   * LoadingType
   *
   * @memberof LoadingComponent
   */
  loadingType = LoadingType;

  /**
   * 名稱
   *
   * @memberof LoadingComponent
   */
  name = defaultName;

  /**
   *  是否顯示
   *
   * @memberof LoadingComponent
   */
  show = false;

  /**
   * 本身的 loading 的樣式
   *
   * @type {LoadingType}
   * @memberof LoadingComponent
   */
  selfLoadingType: LoadingType = defaultLoadingType;

  /**
   * 取消訂閱 loading 的 observable
   *
   * @type {Subject<void>}
   * @memberof LoadingComponent
   */
  componentUnsubscribe: Subject<void> = new Subject();

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {

    this
      .loadingService
      .getLoading(this.name)
      .pipe(
        takeUntil(this.componentUnsubscribe)
      )
      .subscribe((loading) => {

        this.show = loading.show;
        this.selfLoadingType = loading.loadingType;

      });

  }

  ngOnDestroy() {
    this.componentUnsubscribe.unsubscribe();
  }

}
