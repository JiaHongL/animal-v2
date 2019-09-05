import { Component, OnInit } from '@angular/core';

// service
import { SelectsService } from '../../../core/selects/selects.service';

// class
import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { animalQueryFormKeys } from '../../../constant/form-keys/animal-query-form-keys.const';

@Component({
  selector: 'app-area-modal',
  templateUrl: './area-modal.component.html',
  styleUrls: ['./area-modal.component.scss']
})
export class AreaModalComponent implements OnInit {

  constructor(
    public modalRef: ModalRef<AreaModalComponent>,
    public selects: SelectsService
  ) { }

  ngOnInit() {}

  /**
   * 查詢
   *
   * @param {string} areaId - 所屬縣市代碼
   * @memberof AreaModalComponent
   */
  query(areaId: string): void {

    const params = {
      [animalQueryFormKeys.areaId]: areaId
    };

    this.modalRef.close(params);

  }

}
