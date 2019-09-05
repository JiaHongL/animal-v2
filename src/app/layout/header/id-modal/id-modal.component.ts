import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

// class
import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from './../../../shared/components/modal/modal';

// const
import { animalQueryFormKeys } from '../../../constant/form-keys/animal-query-form-keys.const';

@Component({
  selector: 'app-id-modal',
  templateUrl: './id-modal.component.html',
  styleUrls: ['./id-modal.component.scss']
})
export class IdModalComponent implements OnInit {

  /**
   * 查詢表單
   *
   * @type {FormGroup}
   * @memberof IdModalComponent
   */
  form: FormGroup;

  /**
   * 表單 key 值
   *
   * @memberof IdModalComponent
   */
  formKeys = animalQueryFormKeys;

  constructor(
    public modalRef: ModalRef<IdModalComponent>,
    @Inject(MODAL_DATA) public data,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      [this.formKeys.id]: ['', ''],
      [this.formKeys.subId]: ['', '']
    });

  }

  ngOnInit() {
  }

  /**
   * 查詢
   *
   * @memberof IdModalComponent
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

}
