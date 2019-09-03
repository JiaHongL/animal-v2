import { Component, OnInit, Inject, ElementRef } from '@angular/core';

// const
import { MODAL_CONFIG } from './modal';

// class
import { ModalRef } from './modal-ref.model';
import { ModalConfig } from './modal-config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  /**
   * 內容元件
   *
   * @memberof ModalComponent
   */
  contentComponent = null;

  constructor(
    @Inject(MODAL_CONFIG) public config: ModalConfig,
    public modalRef: ModalRef<ModalComponent>,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() { }

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
    return this.config.minWidth ? this.config.minWidth : '300px';
  }

  /**
   * 獲取 設定的最小高度 數值
   *
   * @readonly
   * @type {string}
   * @memberof ModalComponent
   */
  get minHeight(): string {
    return this.config.minHeight ? this.config.minHeight : '400px';
  }

}
