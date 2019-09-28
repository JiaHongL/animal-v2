import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CoreModule } from '../../core/core.module';

import { AuthGuard } from './auth.guard';

import { ApiService } from '../../core/api/api.service';
import { UserService } from '../../core/user/user.service';

import { appRoutePaths } from '../../constant/app-route-paths.const';

import { of, Observable } from 'rxjs';

describe('AuthGuard', () => {

  let authGuard: AuthGuard;
  let getLogInStatusSpy: jasmine.Spy;
  let getUserInfoSpy: jasmine.Spy;
  let userSpy: jasmine.Spy;
  let storeDataSpy: jasmine.Spy;
  const navigateSpy: jasmine.Spy = jasmine.createSpy('navigate');

  const authErrorPage = [appRoutePaths.authError.path];

  const mockLoginInfo = {
    uid: 'abc',
  };

  const mockUserInfoResponse = [{
    uid: mockLoginInfo.uid,
    name: '王小明',
    role: 'User',
    email: 'a@gmail.com'
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [
        AuthGuard,
        UserService,
        ApiService,
        {
          provide: Router,
          useValue: {
            navigate: navigateSpy
          }
        }
      ]
    });
  }));

  beforeEach(() => {

    // get inject
    authGuard = TestBed.get(AuthGuard);
    const apiService = TestBed.get(ApiService);
    const userService = TestBed.get(UserService);

    // spies
    getLogInStatusSpy = spyOn(apiService, 'getLogInStatus');
    getUserInfoSpy = spyOn(userService, 'getUserInfo');
    userSpy = spyOnProperty(userService, 'user', 'get');
    storeDataSpy = spyOn(userService, 'storeData').and.stub();

  });

  it('若 非已登入狀態，則不允許進入路由，且導到無權限頁面', () => {

    getLogInStatusSpy.and.returnValue(of(null));

    const authGuard$ = authGuard.canActivate() as Observable<boolean>;

    authGuard$.subscribe((canActivate) => {
      expect(canActivate).toBeFalsy();
    });

    const navigateArgs = navigateSpy.calls.mostRecent().args;

    expect(getLogInStatusSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateArgs[0]).toEqual(authErrorPage);

  });

  it('當是 已登入狀態，但 localstorage 的 user資料 為空時，將重新 call api 取得，若查無user資料，則不允許進入路由，且導到無權限頁面', () => {

    getLogInStatusSpy.and.returnValue(of(mockLoginInfo));
    userSpy.and.returnValue(null);
    getUserInfoSpy.and.returnValue(of([]));

    const authGuard$ = authGuard.canActivate() as Observable<boolean>;

    authGuard$.subscribe((canActivate) => {
      expect(canActivate).toBeFalsy();
    });

    const navigateArgs = navigateSpy.calls.mostRecent().args;

    expect(getLogInStatusSpy).toHaveBeenCalled();
    expect(getUserInfoSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateArgs[0]).toEqual(authErrorPage);

  });

  it('當是 已登入狀態，但 localstorage 的 user資料 為空時，將重新 call api 取得，api查有user資料時，將儲存user資料，且允許進入路由', () => {

    getLogInStatusSpy.and.returnValue(of(mockLoginInfo));
    userSpy.and.returnValue(null);
    getUserInfoSpy.and.returnValue(of(mockUserInfoResponse));

    const authGuard$ = authGuard.canActivate() as Observable<boolean>;

    authGuard$.subscribe((canActivate) => {
      expect(canActivate).toBeTruthy();
    });

    const storeDataArgs = storeDataSpy.calls.mostRecent().args;

    expect(getLogInStatusSpy).toHaveBeenCalled();
    expect(getUserInfoSpy).toHaveBeenCalled();
    expect(storeDataSpy).toHaveBeenCalled();
    expect(storeDataArgs[0]).toEqual(mockUserInfoResponse[0]);

  });

  it('當 已是登入狀態 且 localstorage 有 user資料，則允許進入路由', () => {

    getLogInStatusSpy.and.returnValue(of(mockLoginInfo));
    userSpy.and.returnValue(mockUserInfoResponse);

    const authGuard$ = authGuard.canActivate() as Observable<boolean>;

    authGuard$.subscribe((canActivate) => {
      expect(canActivate).toBeTruthy();
    });

    expect(getLogInStatusSpy).toHaveBeenCalled();

  });

});
