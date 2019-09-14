import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

// modal
import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../../shared/components/modal/modal';

// const
import { historyFormKeys } from './../../../constant/form-keys/history-form-keys.const';

// enum
import { IssueStatus } from './../../../enum/issue-status.enum';
import { SelectsService } from '../../../core/selects/selects.service';

@Component({
  selector: 'app-add-history-modal',
  templateUrl: './add-history-modal.component.html',
  styleUrls: ['./add-history-modal.component.scss']
})
export class AddHistoryModalComponent implements OnInit {

  /**
   * 新增歷程的表單
   *
   * @memberof AddHistoryModalComponent
   */
  form: FormGroup;

  /**
   * 表單 key
   *
   * @memberof AddHistoryModalComponent
   */
  formKeys = historyFormKeys;

  /**
   *  議題狀態選項
   *
   * @memberof AddHistoryModalComponent
   */
  issueStatusOptions = [];

  constructor(
    public modalRef: ModalRef<AddHistoryModalComponent>,
    @Inject(MODAL_DATA) public data,
    private fb: FormBuilder,
    public selects: SelectsService
  ) {

    this.issueStatusOptions = this
      .selects
      .issuesStatusList
      .filter((issueStatus) => issueStatus.code !== IssueStatus.SUBMIT)
      .filter((issueStatus) => {

        if (
          !data.isAdmin &&
          issueStatus.code === IssueStatus.ARCHIVE
        ) {
          return false;
        }
        return true;

      });

    this.form = this.fb.group({
      [this.formKeys.status]: [IssueStatus.TRACKED, ''],
      [this.formKeys.createTime]: ['', ''],
      [this.formKeys.createUser]: [data.userName, ''],
      [this.formKeys.remark]: ['', Validators.required],
    });

  }

  /**
   * 送出表單
   *
   * @memberof AddHistoryModalComponent
   */
  submitForm(): void {

    const history = this.form.getRawValue();
    history.createTime = new Date();

    this.modalRef.close(history);

  }

  ngOnInit() {
  }

}
