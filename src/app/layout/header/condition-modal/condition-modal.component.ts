import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// class
import { ModalRef } from '../../../shared/components/modal/modal-ref.model';

// const
import { MODAL_DATA } from '../../../shared/components/modal/modal';
import { animalQueryFormKeys } from '../../../constant/form-keys/animal-query-form-keys.const';

// service
import { SelectsService } from './../../../core/selects/selects.service';

@Component({
  selector: 'app-condition-modal',
  templateUrl: './condition-modal.component.html',
  styleUrls: ['./condition-modal.component.scss']
})
export class ConditionModalComponent implements OnInit {

  /**
   *  表單key值
   *
   * @memberof ConditionModalComponent
   */
  formKeys = animalQueryFormKeys;

  /**
   *  表單
   *
   * @type {FormGroup}
   * @memberof ConditionModalComponent
   */
  form: FormGroup;

  constructor(
    public modalRef: ModalRef<ConditionModalComponent>,
    @Inject(MODAL_DATA) public data,
    private fb: FormBuilder,
    public selects: SelectsService
  ) {

    this.form = this.fb.group({
      [this.formKeys.kind]: ['', ''],
      [this.formKeys.sex]: ['', ''],
      [this.formKeys.bodyType]: ['', ''],
      [this.formKeys.age]: ['', ''],
      [this.formKeys.colour]: ['', ''],
      [this.formKeys.sterilization]: ['', ''],
      [this.formKeys.bacterin]: ['', ''],
    });

  }

  /**
   * 查詢
   *
   * @memberof ConditionModalComponent
   */
  query(): void {

    const params = this.form.getRawValue();

    Object
      .keys(params)
      .forEach((key) => {

        if (
          params[key] === '' ||
          params[key] === 'none'
        ) {
          delete params[key];
        }

      });

    this.modalRef.close(params);

  }

  ngOnInit() {
  }

}
