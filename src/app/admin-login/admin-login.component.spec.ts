import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AdminLoginComponent } from './admin-login.component';

import { CoreModule } from '../core/core.module';

// const
import { adminLoginFormKeys } from '../constant/form-keys/admin-login-form-keys.const';
import { appRoutePaths } from '../constant/app-route-paths.const';
import { alertMessage } from '../constant/alert-message.const';

// service
import { UserService } from '../core/user/user.service';
import { LoadingService } from '../core/loading/loading.service';
import { MessageService } from '../core/message/message.service';

// rxjs
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('AdminLoginComponent', () => {

  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  const formKeys = adminLoginFormKeys;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLoginComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('應該 宣告 元件 所需 變數 與 預設值', () => {

    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;

    expect(component).toEqual(
      jasmine.objectContaining({
        form: null,
        formKeys: adminLoginFormKeys
      })
    );

    fixture.detectChanges();

  });

  it('初始化，當表單為空時，表單『有效狀態』應該為false', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('電子信箱為空時，『電子信箱欄位』的『有效狀態』應該為false，且 檢核驗證 為『必填』與『信箱格式』', () => {

    let errors = {};
    const emailCtrl = component.form.get(formKeys.email);
    errors = emailCtrl.errors || {};

    expect(emailCtrl.valid).toBeFalsy();
    expect(errors[`required`]).toBeTruthy();

    emailCtrl.setValue('aaaa');
    errors = emailCtrl.errors || {};

    expect(emailCtrl.valid).toBeFalsy();
    expect(errors[`email`]).toBeTruthy();

  });

  it('密碼為空時，『密碼欄位』的『有效狀態』應該為false，且 檢核驗證 為『必填』', () => {

    let errors = {};
    const passwordCtrl = component.form.get(formKeys.password);
    errors = passwordCtrl.errors || {};

    expect(passwordCtrl.valid).toBeFalsy();
    expect(errors[`required`]).toBeTruthy();

  });

  it('『電子信箱欄位』與『密碼欄位』的『有效狀態』皆為true時，表單的『有效狀態』應該為true', () => {

    const emailCtrl = component.form.get(formKeys.email);
    const passwordCtrl = component.form.get(formKeys.password);

    emailCtrl.setValue('a@gmail.com');
    passwordCtrl.setValue('abc');

    expect(passwordCtrl.valid).toBeTruthy();
    expect(passwordCtrl.valid).toBeTruthy();
    expect(component.form.valid).toBeTruthy();

  });

  it('hasError()，應該根據傳入的表單控制項key值，由『已被觸碰過』且『狀態為無效』來判斷是否顯示『欄位的錯誤提示』', () => {

    const emailCtrl = component.form.get(formKeys.email);

    expect(component.hasError(formKeys.email)).toBeFalsy();

    emailCtrl.markAllAsTouched();

    expect(component.hasError(formKeys.email)).toBeTruthy();

    emailCtrl.setValue('a@gmail.com');

    expect(component.hasError(formKeys.email)).toBeFalsy();

    emailCtrl.setValue('a');

    expect(component.hasError(formKeys.email)).toBeTruthy();

  });

  it('getLabelName()，應該根據傳入的表單控制項key值，回傳對應的Label名稱', () => {

    expect(component.getLabelName(formKeys.email)).toBe('信箱');
    expect(component.getLabelName(formKeys.password)).toBe('密碼');
    expect(component.getLabelName('')).toBe('');

  });

  it('getErrorMsg()，應該根據傳入的表單控制項的key值，回傳對應的錯誤訊息', () => {

    const emailCtrl = component.form.get(formKeys.email);

    expect(component.getErrorMsg(formKeys.email)).toBe('請填寫信箱');
    expect(component.getErrorMsg(formKeys.password)).toBe('請填寫密碼');

    emailCtrl.setValue('a');

    expect(component.getErrorMsg(formKeys.email)).toBe('請確認信箱格式');

  });

  it('login()，應根據帳密進行『帳號登入』，登入成功後再得取『使用者資訊』，若成功則進行『store儲存』與『轉頁進入系統』', fakeAsync(() => {

    // inject 的 service
    const userService = TestBed.get(UserService);
    const loading = TestBed.get(LoadingService);
    const router = TestBed.get(Router);

    // mock response
    const mockLoginInfo = { user: { uid: 'aaa' } };
    const mockUserInfo = [{
      email: 'a@gmail.com',
      name: 'joe',
      role: 'Admin',
      uid: 'aaa'
    }];

    // 需要 spyOn 的 obj function 與 callFake return
    const showLoadingSpy = spyOn(loading, 'show');
    const hideLoadingSpy = spyOn(loading, 'hide');
    const loginSpy = spyOn(userService, 'login').and.callFake(() => of(mockLoginInfo).pipe(delay(100)));
    const getUserInfoSpy = spyOn(userService, 'getUserInfo').and.callFake(() => of(mockUserInfo).pipe(delay(200)));
    const storeDataSpy = spyOn(userService, 'storeData');
    const routerNavigateSpy = spyOn(router, 'navigate');

    // 表單控制項目
    const emailCtrl = component.form.get(formKeys.email);
    const passwordCtrl = component.form.get(formKeys.password);

    // 輸入 信箱 與 密碼，然後呼 login
    emailCtrl.setValue('a@gmail.com');
    passwordCtrl.setValue('abc');
    component.login();

    // 1. 預期 顯示 Loading畫面 並 呼叫 userService.login 進行登入
    const loginArgs = loginSpy.calls.first().args;

    expect(showLoadingSpy).toHaveBeenCalled();
    expect(loginSpy).toHaveBeenCalled();
    expect(loginArgs[0]).toBe(emailCtrl.value);
    expect(loginArgs[1]).toBe(passwordCtrl.value);

    // 快轉 100 ms
    tick(100);

    // 2.若登入成功，繼續呼叫 userService.getUserInfo 取得使用者資料
    const getUserInfoArgs = getUserInfoSpy.calls.first().args;

    expect(getUserInfoArgs[0]).toBe(mockLoginInfo.user.uid);

    // 快轉 200 ms
    tick(200);

    // 3.取得使用者資料後，應 使用 userService.storeData進行儲存 並 跳轉到 意見處理 頁面
    const storeDataArgs = storeDataSpy.calls.first().args;
    const routerNavigateArgs = routerNavigateSpy.calls.first().args;

    expect(hideLoadingSpy).toHaveBeenCalled();
    expect(storeDataArgs[0]).toEqual(mockUserInfo[0]);
    expect(routerNavigateArgs[0]).toEqual([appRoutePaths.issues.path]);

  }));


  it('login()，若帳號登入失敗時，需根據後端回傳的錯誤代碼，轉換為對應中文訊息，然後彈出Alert提示', fakeAsync(() => {

    // inject 的 service
    const userService = TestBed.get(UserService);
    const loading = TestBed.get(LoadingService);
    const message = TestBed.get(MessageService);

    // mock response
    const mockLoginInfo = {
      code: 'auth/user-not-found',
      message: 'There is no user record corresponding to this identifier. The user may have been deleted.'
    };

    // 需要 spyOn 的 obj function 與 callFake return
    const showLoadingSpy = spyOn(loading, 'show');
    const hideLoadingSpy = spyOn(loading, 'hide');
    const loginSpy = spyOn(userService, 'login').and.callFake(() => throwError(mockLoginInfo).pipe(delay(0)));
    const alertSpy = spyOn(message, 'alert');

    // 表單控制項目
    const emailCtrl = component.form.get(formKeys.email);
    const passwordCtrl = component.form.get(formKeys.password);

    // 輸入 信箱 與 密碼，然後呼 login
    emailCtrl.setValue('a@gmail.com');
    passwordCtrl.setValue('aaa');
    component.login();

    // 1. 預期 顯示 Loading畫面 並 呼叫 userService.login 進行登入
    const loginArgs = loginSpy.calls.first().args;

    expect(showLoadingSpy).toHaveBeenCalled();
    expect(loginSpy).toHaveBeenCalled();
    expect(loginArgs[0]).toBe(emailCtrl.value);
    expect(loginArgs[1]).toBe(passwordCtrl.value);

    // 快轉
    tick();

    // 2. 預期 登入失敗，則根據 error code，彈出對應顯示的 Alert
    const alertArgs = alertSpy.calls.first().args;

    expect(hideLoadingSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();
    expect(alertArgs[0]).toBe(alertMessage.userNotFound);

  }));

  it('login()，帳號登入失敗時，當後端回傳的錯誤代碼無法轉換為對應中文訊息，則使用後端回傳的 error message，彈出Alert提示', fakeAsync(() => {

    // inject 的 service
    const userService = TestBed.get(UserService);
    const message = TestBed.get(MessageService);

    // mock response
    const mockLoginInfo = {
      code: 'aaa',
      message: 'a error message'
    };

    // 需要 spyOn 的 obj function 與 callFake return
    spyOn(userService, 'login').and.callFake(() => throwError(mockLoginInfo).pipe(delay(0)));
    const alertSpy = spyOn(message, 'alert');

    // 表單控制項目
    const emailCtrl = component.form.get(formKeys.email);
    const passwordCtrl = component.form.get(formKeys.password);

    // 輸入 信箱 與 密碼，然後呼 login
    emailCtrl.setValue('a@gmail.com');
    passwordCtrl.setValue('aaa');
    component.login();

    // 快轉
    tick();

    // 1. 預期 登入失敗 ，當 無法轉換 訊息錯誤代碼時，則直接回傳後端的error message ，彈出提示的 Alert
    const alertArgs = alertSpy.calls.first().args;

    expect(alertSpy).toHaveBeenCalled();
    expect(alertArgs[0]).toBe(mockLoginInfo.message);

  }));

});
