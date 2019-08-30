import { Component, OnInit, Inject, ElementRef } from '@angular/core';

// const
import { MODAL_DATA } from './modal';

// class
import { ModalRef } from './modal-ref.model';

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
    @Inject(MODAL_DATA) public data: any,
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

}
