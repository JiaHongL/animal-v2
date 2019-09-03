import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// component
import { ImageModalComponent } from '../../shared/components/image-modal/image-modal.component';

// class
import { Animal } from '../../model/animal/animal.model';
import { ModalConfig } from '../../shared/components/modal/modal-config';

// service
import { UtilityService } from '../../core/utility/utility.service';
import { ModalService } from '../../shared/components/modal/modal.service';

// enum
import { SelectType } from '../../core/selects/enum/select-type.enum';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  /**
   * 下拉選項清單 類型
   *
   * @memberof DetailComponent
   */
  selectType = SelectType;

  /**
   * 動物資料
   *
   * @type {Animal}
   * @memberof DetailComponent
   */
  animal: Animal = null;

  constructor(
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private modalService: ModalService
  ) {
    this.animal = this.route.snapshot.data.animal;
  }

  ngOnInit() {
    this.utilityService.iosRemoveNoTouch();
  }

  /**
   * 打開 相片 modal
   *
   * @param {string} url - 路徑
   * @memberof HomeComponent
   */
  openImageModal(url: string): void {

    const data: any = {};
    data.url = url;

    const config: ModalConfig = {};
    config.data = data;

    this.modalService.open(ImageModalComponent, config);

  }

}
