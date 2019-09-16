import { Component, OnInit } from '@angular/core';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';

import { SelectsService } from '../../../core/selects/selects.service';
import { animalQueryFormKeys } from '../../../constant/form-keys/animal-query-form-keys.const';

@Component({
  selector: 'app-shelter-modal',
  templateUrl: './shelter-modal.component.html',
  styleUrls: ['./shelter-modal.component.scss']
})
export class ShelterModalComponent implements OnInit {

  constructor(
    public modalRef: ModalRef<ShelterModalComponent>,
    public selects: SelectsService
  ) { }

  ngOnInit() { }

  /**
   * 查詢
   *
   * @param {string} areaId - 收容所代碼
   * @memberof AreaModalComponent
   */
  query(shelterId: string): void {

    const params = {
      [animalQueryFormKeys.shelterId]: shelterId
    };

    this.modalRef.close(params);

  }

}
