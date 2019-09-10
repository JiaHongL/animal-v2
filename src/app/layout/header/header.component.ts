import { Component, OnInit, ElementRef, HostBinding, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

// component
import { ConditionModalComponent } from './condition-modal/condition-modal.component';
import { IdModalComponent } from './id-modal/id-modal.component';
import { AreaModalComponent } from './area-modal/area-modal.component';
import { ShelterModalComponent } from './shelter-modal/shelter-modal.component';

// service
import { ModalService } from './../../shared/components/modal/modal.service';

// const
import { ModalConfig } from '../../shared/components/modal/modal-config';
import { appRoutePaths } from './../../constant/app-route-paths.const';

// enum
import { QueryModalType } from './enum/query-modal-type.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * 是否已登入系統
   *
   * @memberof HeaderComponent
   */
  @Input() isLoggedIn = false;

  /**
   * 是否為管理員登入
   *
   * @memberof HeaderComponent
   */
  @Input() isAdmin = false;

  /**
   * 使用者名稱
   *
   * @memberof HeaderComponent
   */
  @Input() userName = '';

  /**
   * 登出
   *
   * @memberof HeaderComponent
   */
  @Output() signOut = new EventEmitter<any>();

  /**
   * 查詢使用 的 Modal元件
   *
   * @private
   * @memberof HeaderComponent
   */
  private queryComponents = [
    {
      type: QueryModalType.CONDITION,
      component: ConditionModalComponent,
      minWidth: '350px',
      minHeight: '85%',
      mobileFullScreen: true
    },
    {
      type: QueryModalType.ID,
      component: IdModalComponent,
      minWidth: '300px',
      minHeight: '300px',
      mobileFullScreen: true
    },
    {
      type: QueryModalType.AREA,
      component: AreaModalComponent,
      minWidth: '300px',
      minHeight: '400px',
      mobileFullScreen: true
    },
    {
      type: QueryModalType.SHELTER,
      component: ShelterModalComponent,
      minWidth: '400px',
      minHeight: '400px',
      mobileFullScreen: true
    }
  ];

  /**
   * 查詢視窗類型
   *
   * @type {QueryModalType}
   * @memberof HeaderComponent
   */
  queryModalType = QueryModalType;

  /**
   * 全站路由
   *
   * @memberof HeaderComponent
   */
  appRoutePaths = appRoutePaths;

  /**
   * 是否開啟選單
   *
   * @memberof HeaderComponent
   */
  isMenuOpen = false;

  /**
   * class 綁定
   *
   * @memberof FooterComponent
   */
  @HostBinding('class') class = 'header';

  /**
   * 監聽 document 點擊事件 - 關閉選單
   *
   * @memberof HeaderComponent
   */
  @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {

    const isClickNav = this.elementRef.nativeElement.querySelector('.nav').contains(event.target);

    if (!isClickNav) {
      this.isMenuOpen = false;
    }

  }

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private modalService: ModalService
  ) { }

  ngOnInit() { }

  /**
   * 獲取 margin-right px 設定
   *
   * @readonly
   * @type {(0 | -284)}
   * @memberof HeaderComponent
   */
  get marginRightPx(): 0 | -284 {
    return this.isMenuOpen ? 0 : -284;
  }

  /**
   * 開啟查詢視窗
   *
   * @param {QueryModalType} type - 哪種類型的視窗
   * @memberof HeaderComponent
   */
  openQueryModal(type: QueryModalType): void {

    const findComponentInfo = this.queryComponents.find(item => item.type === type);

    const config: ModalConfig = {};

    config.minHeight = findComponentInfo.minHeight;
    config.minWidth = findComponentInfo.minWidth;
    config.mobileFullScreen = findComponentInfo.mobileFullScreen;

    this
      .modalService
      .open(findComponentInfo.component, config)
      .afterClosed()
      .subscribe((result) => {

        if (!result) {
          return;
        }

        this.router.navigate(['/' + appRoutePaths.home.path], { queryParams: result });

      });

  }

}
