import { Component, OnInit, Inject, ElementRef, OnDestroy } from '@angular/core';

// const
import { MODAL_CONFIG } from './modal';

// class
import { ModalRef, MODAL_REF_OPENED } from './modal-ref.model';
import { ModalConfig } from './modal-config';

// service
import { UtilityService } from '../../../core/utility/utility.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  /**
   * 內容元件
   *
   * @memberof ModalComponent
   */
  contentComponent = null;

  constructor(
    @Inject(MODAL_CONFIG) public config: ModalConfig,
    public modalRef: ModalRef<ModalComponent>,
    private elementRef: ElementRef,
    private utilityService: UtilityService
  ) {
  }

  ngOnInit() {

    this.utilityService.stopBodyScroll(true);
    this.modalRef[MODAL_REF_OPENED]();

  }

  /**
   * 點擊背景
   *
   * @param {MouseEvent} event - MouseEvent
   * @memberof ModalComponent
   */
  clickBackdrop(event: MouseEvent): void {

    if ((this.elementRef.nativeElement.children[0] === (event.target))) {
      this.modalRef.close(null);
    }

  }

  /**
   * 獲取 設定的最小寬度 數值
   *
   * @readonly
   * @type {string}
   * @memberof ModalComponent
   */
  get minWidth(): string {
    return this.config && this.config.hasOwnProperty('minWidth') ? this.config.minWidth : '300px';
  }

  /**
   * 獲取 設定的最小高度 數值
   *
   * @readonly
   * @type {string}
   * @memberof ModalComponent
   */
  get minHeight(): string {
    return this.config && this.config.hasOwnProperty('minHeight') ? this.config.minHeight : '450px';
  }

  /**
   * 是否有行動裝置滿屏顯示設定
   *
   * @readonly
   * @type {boolean}
   * @memberof ModalComponent
   */
  get hasMobileFullScreen(): boolean {
    return this.config && this.config.hasOwnProperty('mobileFullScreen') ? this.config.mobileFullScreen : false;
  }

  /**
   * 是否顯示開啟的動畫
   *
   * @readonly
   * @type {boolean}
   * @memberof ModalComponent
   */
  get animate(): boolean {
    return this.config && this.config.hasOwnProperty('animate') ? this.config.animate : true;
  }

  ngOnDestroy(): void {
    this.utilityService.stopBodyScroll(false);
  }

}
