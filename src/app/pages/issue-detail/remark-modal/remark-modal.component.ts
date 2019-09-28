import { Component, OnInit, Inject } from '@angular/core';
import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../../shared/components/modal/modal';

@Component({
  selector: 'app-remark-modal',
  templateUrl: './remark-modal.component.html',
  styleUrls: ['./remark-modal.component.scss']
})
export class RemarkModalComponent implements OnInit {

  /**
   * 備註
   *
   * @memberof RemarkModalComponent
   */
  remark = '';

  constructor(
    public modalRef: ModalRef<RemarkModalComponent>,
    @Inject(MODAL_DATA) public data
  ) { }


  ngOnInit() {
    this.remark = this.data.remark;
  }

}
