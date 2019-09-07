import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

// const
import { feedbackFormKeys } from '../../constant/form-keys/feedback-form-keys.const';
import { historyFormKeys } from '../../constant/form-keys/history-form-keys.const';

// service
import { SelectsService } from './../../core/selects/selects.service';
import { ApiService } from '../../core/api/api.service';
import { LoadingService } from '../../core/loading/loading.service';

// rxjs
import { filter, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  /**
   *  表單
   *
   * @type {FormGroup}
   * @memberof FeedbackComponent
   */
  form: FormGroup;

  /**
   * 表單 key 值
   *
   * @memberof FeedbackComponent
   */
  formKeys = feedbackFormKeys;

  /**
   *  歷程 key 值
   *
   * @memberof FeedbackComponent
   */
  historyFormKeys = historyFormKeys;

  /**
   * router 的 subscription
   *
   * @memberof FeedbackComponent
   */
  subscription: Subscription = null;

  /**
   * 是否已送出
   *
   * @memberof FeedbackComponent
   */
  isPosted = false;

  constructor(
    public selects: SelectsService,
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService,
    private loading: LoadingService
  ) {

    this.form = this.createFeedbackFg();

    this.createUserCtrlValueChanges();
    this.createTimeCtrlValueChange();

  }

  ngOnInit() {

    this.subscription = this
      .router
      .events
      .pipe(
        filter((event => event instanceof NavigationEnd))
      )
      .subscribe(_ => {

        this.isPosted = false;
        this.restForm();

      });

  }

  /**
   * 獲取 建立者 FormControl
   *
   * @readonly
   * @type {FormControl}
   * @memberof FeedbackComponent
   */
  get createUserCtrl(): FormControl {
    return this.getFormControl(this.formKeys.createUser);
  }

  /**
   *  獲取 第一個歷程 的 建立使用者 ctrl
   *
   * @readonly
   * @type {FormControl}
   * @memberof FeedbackComponent
   */
  get firstHistoryCreateUserCtrl(): FormControl {

    return this.getFormArray(this.formKeys.history)
      .at(0)
      .get(this.historyFormKeys.createUser) as FormControl;

  }

  /**
   * 獲取 建立者 FormControl
   *
   * @readonly
   * @type {FormControl}
   * @memberof FeedbackComponent
   */
  get createTimeCtrl(): FormControl {
    return this.getFormControl(this.formKeys.createTime);
  }

  /**
   *  獲取 第一個歷程 的 建立使用者 ctrl
   *
   * @readonly
   * @type {FormControl}
   * @memberof FeedbackComponent
   */
  get firstHistoryCreateTimeCtrl(): FormControl {

    return this.getFormArray(this.formKeys.history)
      .at(0)
      .get(this.historyFormKeys.createTime) as FormControl;

  }


  /**
   * 建立 feedback表單 FormGroup
   *
   * @returns
   * @memberof FeedbackComponent
   */
  createFeedbackFg(): FormGroup {

    return this.fb.group({
      [this.formKeys.id]: ['', ''],
      [this.formKeys.status]: [0, ''],
      [this.formKeys.type]: [1, Validators.required],
      [this.formKeys.title]: ['', Validators.required],
      [this.formKeys.createTime]: ['', ''],
      [this.formKeys.createUser]: ['', Validators.required],
      [this.formKeys.comment]: ['', Validators.required],
      [this.formKeys.email]: ['', Validators.email],
      [this.formKeys.history]: this.createHistoryFa()
    });

  }

  /**
   * 建立 歷程表單 FormArray
   *
   * @returns {FormArray}
   * @memberof FeedbackComponent
   */
  createHistoryFa(): FormArray {

    return this.fb.array([
      this.fb.group({
        [this.historyFormKeys.status]: [0, ''],
        [this.historyFormKeys.createTime]: ['', ''],
        [this.historyFormKeys.createUser]: ['', ''],
        [this.historyFormKeys.remark]: ['使用者提交', '']
      }),
    ]);

  }

  /**
   * 重置表單
   *
   * @memberof FeedbackComponent
   */
  restForm(): void {
    this.form.reset(this.createFeedbackFg().getRawValue());
  }

  /**
   * 送出 意見回饋
   *
   * @memberof FeedbackComponent
   */
  postFeedback(): void {

    this.getFormControl(this.formKeys.createTime).setValue(new Date());

    const issue = this.form.getRawValue();

    this.loading.show();

    this
      .api
      .postFeedback(issue)
      .pipe(
        finalize(() => this.loading.hide())
      ).subscribe(_ => {
        this.isPosted = true;
      });

  }

  /**
   * 建立使用者 ctrl 的 連動邏輯
   *
   * @memberof FeedbackComponent
   */
  createUserCtrlValueChanges(): void {

    this
      .createUserCtrl
      .valueChanges
      .subscribe(user => {
        this.firstHistoryCreateUserCtrl.setValue(user);
      });

  }

  /**
   * 建立時間 ctrl 的 連動邏輯
   *
   * @memberof FeedbackComponent
   */
  createTimeCtrlValueChange(): void {

    this
      .createTimeCtrl
      .valueChanges
      .subscribe(time => {
        this.firstHistoryCreateTimeCtrl.setValue(time);
      });

  }


  /**
   * 是否有驗證未通過
   *
   * @returns {boolean}
   * @memberof FeedbackComponent
   */
  hasError(key: string): boolean {
    return this.form.get(key).touched && this.form.get(key).invalid;
  }

  /**
   * 取得 FormControl 物件
   *
   * @param {string} key
   * @returns {FormControl}
   * @memberof FeedbackComponent
   */
  getFormControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  /**
   * 獲取 歷程的 FormControl
   *
   * @param {string} key
   * @returns {FormControl}
   * @memberof FeedbackComponent
   */
  getFormArray(key: string): FormArray {
    return this.form.get(key) as FormArray;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
