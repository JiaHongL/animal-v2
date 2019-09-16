import { Component, OnInit, Inject } from '@angular/core';
import { ModalRef } from '../modal/modal-ref.model';
import { MODAL_DATA } from '../modal/modal';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  /**
   * 圖片路徑
   *
   * @memberof ImageModalComponent
   */
  pictureUrl = '';

  constructor(
    public modalRef: ModalRef<ImageModalComponent>,
    @Inject(MODAL_DATA) public data
  ) {
    this.pictureUrl = data.url;
  }

  ngOnInit() { }

}
