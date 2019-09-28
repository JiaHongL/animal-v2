import { FormsModule, ReactiveFormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';

import { FeedbackComponent } from './feedback.component';

// module
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

// enum
import { LoadingService } from './../../core/loading/loading.service';

// const
import { historyFormKeys } from '../../constant/form-keys/history-form-keys.const';
import { feedbackFormKeys } from '../../constant/form-keys/feedback-form-keys.const';

// rxjs
import { Subject, Subscription, of } from 'rxjs';
import { ApiService } from '../../core/api/api.service';
import { LoadingType } from '../../core/loading/enum/loading-type.enum';
import { delay } from 'rxjs/operators';

describe('FeedbackComponent', () => {

  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let events$: Subject<any> = null;

  const initHistory = [{
    [historyFormKeys.status]: 0,
    [historyFormKeys.createTime]: '',
    [historyFormKeys.createUser]: '',
    [historyFormKeys.remark]: '使用者提交'
  }];

  const initFeedback = {
    [feedbackFormKeys.id]: '',
    [feedbackFormKeys.status]: 0,
    [feedbackFormKeys.type]: 1,
    [feedbackFormKeys.title]: '',
    [feedbackFormKeys.createTime]: '',
    [feedbackFormKeys.createUser]: '',
    [feedbackFormKeys.comment]: '',
    [feedbackFormKeys.email]: '',
    [feedbackFormKeys.history]: initHistory
  };

  const fakeFeedback = {
    [feedbackFormKeys.id]: 'a',
    [feedbackFormKeys.status]: 'a',
    [feedbackFormKeys.type]: 'a',
    [feedbackFormKeys.title]: 'a',
    [feedbackFormKeys.createTime]: 'a',
    [feedbackFormKeys.createUser]: 'a',
    [feedbackFormKeys.comment]: 'a',
    [feedbackFormKeys.email]: 'a',
    [feedbackFormKeys.history]: [{
      [historyFormKeys.status]: 'a',
      [historyFormKeys.createTime]: 'a',
      [historyFormKeys.createUser]: 'a',
      [historyFormKeys.remark]: 'a'
    }]
  };

  const triggerSameNavigate = () => events$.next(new NavigationEnd(1, '/feedback', '/feedback'));

  beforeEach(async(() => {

    events$ = new Subject();

    TestBed.configureTestingModule({
      declarations: [FeedbackComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        CoreModule,
        SharedModule
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            events: events$.asObservable()
          }
        }
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createHistoryFa()，應該建立 History FormArray，且狀態為有效', () => {

    const historyFa = component.createHistoryFa();

    expect(historyFa.valid).toBeTruthy();
    expect(historyFa instanceof FormArray).toBeTruthy();
    expect(historyFa.value).toEqual(initHistory);

  });

  it('createFeedbackFg()，應該建立 FeedbackFg FormGroup', () => {

    const feedbackFg = component.createFeedbackFg();

    expect(feedbackFg.valid).toBeFalsy();
    expect(feedbackFg instanceof FormGroup).toBeTruthy();
    expect(feedbackFg.value).toEqual(initFeedback);

  });

  it('createFeedbackFg()，FeedbackFg 所建立的 FormGroup，部分欄位應該要有檢核規則', () => {

    const feedbackFg = component.createFeedbackFg();

    const idCtrl = feedbackFg.get(feedbackFormKeys.id);
    const statusCtrl = feedbackFg.get(feedbackFormKeys.status);
    const typeCtrl = feedbackFg.get(feedbackFormKeys.type);
    const titleCtrl = feedbackFg.get(feedbackFormKeys.title);
    const createTimeCtrl = feedbackFg.get(feedbackFormKeys.createTime);
    const createUserCtrl = feedbackFg.get(feedbackFormKeys.createUser);
    const commentCtrl = feedbackFg.get(feedbackFormKeys.comment);
    const emailCtrl = feedbackFg.get(feedbackFormKeys.email);
    const historyCtrl = feedbackFg.get(feedbackFormKeys.history);

    // 1. id 欄位  => 無
    expect(idCtrl.valid).toBeTruthy();

    // 2. status 欄位  => 無
    expect(statusCtrl.valid).toBeTruthy();

    // 3. typeCtrl 欄位  => 必填
    typeCtrl.setValue('');
    expect(typeCtrl.hasError(`required`)).toBeTruthy();

    // 4. titleCtrl 欄位  => 必填
    titleCtrl.setValue('');
    expect(titleCtrl.hasError(`required`)).toBeTruthy();

    // 5. createTime 欄位  => 無
    expect(createTimeCtrl.valid).toBeTruthy();

    // 6. createUser 欄位  => 必填
    createUserCtrl.setValue('');
    expect(createUserCtrl.hasError(`required`)).toBeTruthy();

    // 7. comment 欄位  => 必填
    commentCtrl.setValue('');
    expect(commentCtrl.hasError(`required`)).toBeTruthy();

    // 8. email 欄位  => 必填
    emailCtrl.setValue('a');
    expect(emailCtrl.hasError(`email`)).toBeTruthy();

    // 9. history 欄位  => 無
    expect(historyCtrl.valid).toBeTruthy();

  });

  it('restForm()，應該重置表單內容', () => {

    component.form.setValue(fakeFeedback);

    expect(component.form.value).toEqual(fakeFeedback);
    expect(component.form.value).not.toEqual(initFeedback);

    component.restForm();

    expect(component.form.value).toEqual(initFeedback);

  });

  it('getFormControl()，應根據傳入的key，取得對應的 表單控制項', () => {

    const idCtrl = component.form.get(feedbackFormKeys.id) as FormControl;
    const statusCtrl = component.form.get(feedbackFormKeys.status) as FormControl;

    expect(component.getFormControl(feedbackFormKeys.id)).toEqual(idCtrl);
    expect(component.getFormControl(feedbackFormKeys.status)).toEqual(statusCtrl);

  });

  it('getFormArray()，應根據傳入的key，取得對應的 表單陣列控制項', () => {

    const historyFg = component.form.get(feedbackFormKeys.history) as FormArray;

    expect(component.getFormArray(feedbackFormKeys.history)).toEqual(historyFg);

  });

  it('createUserCtrl，應該取得 createUser 表單控制項', () => {

    const createUserCtrl = component.form.get(feedbackFormKeys.createUser) as FormControl;

    expect(component.createUserCtrl).toEqual(createUserCtrl);

  });

  it('createTimeCtrl，應該取得 createTime 表單控制項', () => {

    const createTimeCtrl = component.form.get(feedbackFormKeys.createTime) as FormControl;

    expect(component.createTimeCtrl).toEqual(createTimeCtrl);

  });

  it('firstHistoryCreateUserCtrl，應該取得 history FormArray 的 第一個 FormGroup  的 createUser 表單控制項', () => {

    const historyFg = component.form.get(feedbackFormKeys.history) as FormArray;
    const firstCreateUser = historyFg.at(0).get(historyFormKeys.createUser) as FormControl;

    expect(component.firstHistoryCreateUserCtrl).toEqual(firstCreateUser);

  });

  it('firstHistoryCreateTimeCtrl，應該取得 history FormArray 的 第一個 FormGroup  的 createTime 表單控制項', () => {

    const historyFg = component.form.get(feedbackFormKeys.history) as FormArray;
    const firstCreateTime = historyFg.at(0).get(historyFormKeys.createUser) as FormControl;

    expect(component.firstHistoryCreateTimeCtrl).toEqual(firstCreateTime);

  });

  it('ngOnInit()，應該 建立表單、呼叫 createFeedbackFg / createUserCtrlValueChanges / createTimeCtrlValueChange 函式、儲存 subscription', () => {

    fixture = TestBed.createComponent(FeedbackComponent);

    const ngOnInitSpy = spyOn(fixture.componentInstance, 'ngOnInit').and.callThrough();

    component = fixture.componentInstance;

    const spyOnCreateFeedbackFg = spyOn(component, 'createFeedbackFg').and.callThrough();
    const spyOnCreateUserCtrlValueChanges = spyOn(component, 'createUserCtrlValueChanges').and.callThrough();
    const spyOnCreateTimeCtrlValueChanges = spyOn(component, 'createTimeCtrlValueChanges').and.callThrough();

    expect(ngOnInitSpy).not.toHaveBeenCalled();
    expect(component.form).toBeUndefined();
    expect(component.subscription).toBeNull();
    expect(spyOnCreateFeedbackFg).not.toHaveBeenCalled();
    expect(spyOnCreateUserCtrlValueChanges).not.toHaveBeenCalled();
    expect(spyOnCreateTimeCtrlValueChanges).not.toHaveBeenCalled();

    component.ngOnInit();

    expect(ngOnInitSpy).toHaveBeenCalled();
    expect(component.form).not.toBeUndefined();
    expect(component.form.value).toEqual(component.createFeedbackFg().value);
    expect(component.subscription).not.toBeNull();
    expect(component.subscription instanceof Subscription).toBeTruthy();
    expect(spyOnCreateFeedbackFg).toHaveBeenCalled();
    expect(spyOnCreateUserCtrlValueChanges).toHaveBeenCalled();
    expect(spyOnCreateTimeCtrlValueChanges).toHaveBeenCalled();

  });

  it('createUserCtrlValueChanges()，應該建立 FeedBack CreateUser 的 連動邏輯，連動 更新 History FormArray 第一個 Fg 的 createUser', () => {

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;

    component.form = component.createFeedbackFg();

    const spy = spyOn(component, 'createUserCtrlValueChanges').and.callThrough();
    const createUserCtr = component.form.get(feedbackFormKeys.createUser);

    createUserCtr.setValue('a');

    expect(spy).not.toHaveBeenCalled();
    expect(createUserCtr.value).toBe('a');
    expect(component.firstHistoryCreateUserCtrl.value).toBe('');

    component.createUserCtrlValueChanges();

    createUserCtr.setValue('b');

    expect(spy).toHaveBeenCalled();
    expect(createUserCtr.value).toBe('b');
    expect(component.firstHistoryCreateUserCtrl.value).toBe('b');

    // 跑一次 ngOnInit，避免跑完 spec 後，執行 ngOnDestroy 出錯. (ex: unsubscribe)
    fixture.detectChanges(); // 僅會在第一次呼叫時，觸發ngOnInit.

  });

  it('createTimeCtrlValueChanges()，應該建立 FeedBack CreateUser 的 連動邏輯，連動 更新 History FormArray 第一個 Fg 的 createUser', () => {

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;

    component.form = component.createFeedbackFg();

    const spy = spyOn(component, 'createTimeCtrlValueChanges').and.callThrough();
    const createTimeCtr = component.form.get(feedbackFormKeys.createTime);

    createTimeCtr.setValue('a');

    expect(spy).not.toHaveBeenCalled();
    expect(createTimeCtr.value).toBe('a');
    expect(component.firstHistoryCreateTimeCtrl.value).toBe('');

    component.createTimeCtrlValueChanges();

    createTimeCtr.setValue('b');

    expect(spy).toHaveBeenCalled();
    expect(createTimeCtr.value).toBe('b');
    expect(component.firstHistoryCreateTimeCtrl.value).toBe('b');

    fixture.detectChanges();

  });

  it('若router被觸發導航相同路由，需『重置表單』與『送單狀態』', () => {

    const spy = spyOn(component, 'restForm');
    component.isPosted = true;

    expect(component.isPosted).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();

    triggerSameNavigate();

    expect(component.isPosted).toBeFalsy();
    expect(spy).toHaveBeenCalled();

  });

  it('hasError()，應該根據傳入的表單控制項key值，由『已被觸碰過』且『狀態為無效』來判斷是否顯示『欄位的錯誤提示』', () => {

    const createUserCtrl = component.form.get(feedbackFormKeys.createUser);

    expect(component.hasError(feedbackFormKeys.createUser)).toBeFalsy();

    createUserCtrl.markAllAsTouched();

    expect(component.hasError(feedbackFormKeys.createUser)).toBeTruthy();

    createUserCtrl.setValue('testMan');

    expect(component.hasError(feedbackFormKeys.createUser)).toBeFalsy();

    createUserCtrl.setValue('');

    expect(component.hasError(feedbackFormKeys.createUser)).toBeTruthy();

  });

  it('postFeedback()，應該設定表單的『建立時間』，並 『show loading』 與 『送出API』，送出成功後，『hide loading』與 設定 『送出狀態』 為 已送出', fakeAsync(() => {

    const loading = TestBed.get(LoadingService);
    const showLoadingSpy = spyOn(loading, 'show');
    const hideLoadingSpy = spyOn(loading, 'hide');
    const createTime = new Date();
    const fakePostData = JSON.parse(JSON.stringify(fakeFeedback));

    fakePostData.createTime = createTime;
    fakePostData.history[0].createTime = createTime;

    const api = TestBed.get(ApiService);
    const postFeedbackSpy = spyOn(api, 'postFeedback').and.returnValue(of('').pipe(delay(0)));

    component.form.setValue(fakeFeedback);

    component.postFeedback();

    const showLoadingArgs = showLoadingSpy.calls.first().args;
    const postFeedbackArgs = postFeedbackSpy.calls.first().args;

    expect(component.form.get(feedbackFormKeys.createTime).value).toEqual(createTime);
    expect(showLoadingSpy).toHaveBeenCalled();
    expect(showLoadingArgs[0]).toBe(LoadingType.SPINNER);
    expect(postFeedbackSpy).toHaveBeenCalled();
    expect(postFeedbackArgs[0]).toEqual(fakePostData);
    expect(component.isPosted).toBeFalsy();

    tick();

    expect(hideLoadingSpy).toHaveBeenCalled();
    expect(component.isPosted).toBeTruthy();

  }));

});
