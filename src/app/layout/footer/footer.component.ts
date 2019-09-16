import { Component, HostBinding } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router, PRIMARY_OUTLET } from '@angular/router';

// enum
import { SelectType } from './../../core/selects/enum/select-type.enum';

// pipe
import { DataTransformPipe } from '../../shared/pipes/data-transform/data-transform.pipe';

// rxjs
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { animalQueryFormKeys } from '../../constant/form-keys/animal-query-form-keys.const';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  /**
   * class 綁定
   *
   * @memberof FooterComponent
   */
  @HostBinding('class') class = 'footer';

  /**
   * 頁面標題
   *
   * @memberof FooterComponent
   */
  pageTitle = '';

  /**
   * 第二層標題
   *
   * @memberof FooterComponent
   */
  subTitle = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataTransform: DataTransformPipe
  ) {

    const title = 'title';

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((myRoute) => {
          while (myRoute.firstChild) { myRoute = myRoute.firstChild; }
          return myRoute;
        }),
        filter((myRoute) => myRoute.outlet === PRIMARY_OUTLET),
        tap((myRoute) => {

          this.subTitle = '';

          if (Object.keys(myRoute.snapshot.params).length) {
            this.setParamsBreadcrumb(myRoute.snapshot.params);
          }

          if (Object.keys(myRoute.snapshot.queryParams).length) {
            this.setQueryParamsBreadcrumb(myRoute.snapshot.queryParams);
          }

        }),
        mergeMap((myRoute) => myRoute.data)
      )
      .subscribe((data) => {
        this.pageTitle = data[title];
      });

  }

  /**
   * 設定 路由 params 的 麵包屑 第二層 顯示
   *
   * @param {{}} params - 路由 參數
   * @memberof FooterComponent
   */
  setParamsBreadcrumb(params: {}): void {

    Object
      .keys(params)
      .forEach((key) => {
        this.subTitle = params[key];
      });

  }

  /**
   * 設定 路由 queryParams 的 麵包屑 第二層 顯示
   *
   * @param {{}} queryParams - 路由 query 參數
   * @memberof FooterComponent
   */
  setQueryParamsBreadcrumb(queryParams: {}): void {

    const breadcrumb = [];

    Object
      .keys(queryParams)
      .forEach((key) => {

        const type = key;
        const value = queryParams[key];

        let content = '';

        switch (type) {

          case animalQueryFormKeys.id:
          case animalQueryFormKeys.subId:
          case animalQueryFormKeys.kind:
          case animalQueryFormKeys.colour:
            content = value;
            break;

          case animalQueryFormKeys.sex:
            content = this.dataTransform.transform(value, SelectType.SEX);
            break;

          case animalQueryFormKeys.bodyType:
            content = this.dataTransform.transform(value, SelectType.BODY_TYPE);
            break;

          case animalQueryFormKeys.age:
            content = this.dataTransform.transform(value, SelectType.AGE);
            break;

          case animalQueryFormKeys.areaId:
            content = this.dataTransform.transform(value, SelectType.AREA);
            break;

          case animalQueryFormKeys.shelterId:
            content = this.dataTransform.transform(value, SelectType.SHELTER);
            break;

          case animalQueryFormKeys.sterilization:
            content = '是否絕育：' + this.dataTransform.transform(value, SelectType.STERILIZATION);
            break;

          case animalQueryFormKeys.bacterin:
            content = '是否施打狂犬病：' + this.dataTransform.transform(value, SelectType.BACTERIN);
            break;

          default:
            this.subTitle = '';
            break;

        }


        breadcrumb.push(content);

        this.subTitle = breadcrumb.join(', ');

      });


  }

}
