import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// component
import { IssueDetailComponent } from './issue-detail.component';
import { RemarkModalComponent } from './remark-modal/remark-modal.component';
import { AddHistoryModalComponent } from './add-history-modal/add-history-modal.component';

// module
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

// service
import { ModalService } from '../../shared/components/modal/modal.service';
import { UserService } from '../../core/user/user.service';
import { UtilityService } from '../../core/utility/utility.service';
import { ApiService } from '../../core/api/api.service';
import { LoadingService } from './../../core/loading/loading.service';

// class
import { Issue } from '../../model/issue/issue.model';

// const
import { appRoutePaths } from '../../constant/app-route-paths.const';

// enum
import { SelectType } from '../../core/selects/enum/select-type.enum';
import { IssueStatus } from '../../enum/issue-status.enum';

// rxjs
import { Subject, Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('IssueDetailComponent', () => {

  let component: IssueDetailComponent;
  let fixture: ComponentFixture<IssueDetailComponent>;
  const eventsSubject = new Subject();

  const mockResponse = {
    id: '201909140021',
    status: 0,
    type: 3,
    title: '測試其他',
    createUser: 'Joe',
    createTime: '2019-09-14T09:42:09.897Z',
    comment: '測試內容',
    email: '',
    history: [
      {
        status: 0,
        createTime: '2019-09-14T09:42:09.897Z',
        createUser: 'Joe',
        remark: '使用者提交'
      }
    ]
  };

  const mockResponseForAddHistory = {
    id: '201909140021',
    status: 1,
    type: 3,
    title: '測試其他',
    createUser: 'Joe',
    createTime: '2019-09-14T09:42:09.897Z',
    comment: '測試內容',
    email: '',
    history: [
      {
        status: 1,
        createTime: '2019-09-26T13:23:22.011Z',
        createUser: '李主管',
        remark: '希望能增加上傳圖片功能'
      },
      {
        status: 0,
        createTime: '2019-09-14T09:42:09.897Z',
        createUser: 'Joe',
        remark: '使用者提交'
      }
    ]
  };

  /**
   * 模擬 刷新 resolver 取得資料
   *
   */
  const mockReloadResolver = (): void => {

    const route = TestBed.get(ActivatedRoute);
    Object.defineProperty(route.snapshot.data, 'issue', { value: new Issue(mockResponseForAddHistory) });

  };

  /**
   * 模擬 觸發相同路由導航
   *
   */
  const triggerSameNavigate = (): void => {

    mockReloadResolver();
    eventsSubject.next(new NavigationEnd(1, '/issue-detail/aaa', '/issue-detail/aaa'));

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IssueDetailComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
        CoreModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                issue: new Issue(mockResponse)
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            events: eventsSubject.asObservable(),
            navigate: jasmine.createSpy()
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(IssueDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('應該 宣告 元件所需的 變數 與 預設值', () => {

    fixture = TestBed.createComponent(IssueDetailComponent);
    component = fixture.componentInstance;

    expect(component).toEqual(
      jasmine.objectContaining({
        class: 'no-touch',
        issue: null,
        selectType: SelectType,
        issueStatus: IssueStatus,
        subscription: null
      })
    );

    fixture.detectChanges();

  });

  it('ngOnInit()後，應該從 route 取得 resolver 的 issue，並儲存 subscribe router events 的 subscription', () => {

    fixture = TestBed.createComponent(IssueDetailComponent);
    component = fixture.componentInstance;

    expect(component.issue).toBeNull();
    expect(component.subscription).toBeNull();

    component.ngOnInit();

    expect(component.issue).toEqual(new Issue(mockResponse));
    expect(component.subscription).not.toBeNull();
    expect(component.subscription instanceof Subscription).toBeTruthy();

  });

  it('若 router events 通知有變動時，需重新取得 resolver 的資料', () => {

    fixture = TestBed.createComponent(IssueDetailComponent);
    component = fixture.componentInstance;

    expect(component.issue).toBeNull();

    component.ngOnInit();

    expect(component.issue).toEqual(new Issue(mockResponse));

    triggerSameNavigate();

    expect(component.issue).toEqual(new Issue(mockResponseForAddHistory));

  });

  it('ngOnInit()後，應該從 route 取得 resolver 的 issue，並儲存 subscribe router events 的 subscription', () => {

    fixture = TestBed.createComponent(IssueDetailComponent);
    component = fixture.componentInstance;

    expect(component.issue).toBeNull();
    expect(component.subscription).toBeNull();

    component.ngOnInit();

    expect(component.issue).toEqual(new Issue(mockResponse));
    expect(component.subscription).not.toBeNull();
    expect(component.subscription instanceof Subscription).toBeTruthy();

  });

  it('ngOnDestroy()，應該 unsubscribe component.subscription', () => {

    const spy = spyOn(component.subscription, 'unsubscribe');

    expect(spy).not.toHaveBeenCalled();

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();

  });

  it('openRemarkModal()，應該根據傳入的內容，打開『備註視窗』', () => {

    const expectedConfig = {
      minHeight: '250px',
      minWidth: '350px',
      data: {
        remark: 'a'
      }
    };

    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'open');

    component.openRemarkModal(expectedConfig.data.remark);

    const args = spy.calls.first().args;

    expect(spy).toHaveBeenCalled();
    expect(args[0]).toEqual(RemarkModalComponent);
    expect(args[1]).toEqual(expectedConfig);

  });

  it('openAddHistoryModal()，應該打開『新增歷程視窗』，在點擊『送出』後，根據填寫的內容進行『call api 新增歷程』，api新增成功後，navigate 相同網址', fakeAsync(() => {

    // 預期的測試資料
    const expected = {
      issue: JSON.parse(JSON.stringify(mockResponse)),
      component: AddHistoryModalComponent,
      config: {
        minHeight: '400px',
        minWidth: '350px',
        mobileFullScreen: true,
        data: {
          userName: 'joe',
          isAdmin: true
        }
      },
      addHistory: {
        status: 2,
        createTime: null,
        createUser: '李主管',
        remark: '評估中'
      }
    };

    expected.issue.status = expected.addHistory.status;
    expected.issue.history.push(expected.addHistory);

    // Inject Services
    const modal = TestBed.get(ModalService);
    const loading = TestBed.get(LoadingService);
    const utility = TestBed.get(UtilityService);
    const api = TestBed.get(ApiService);
    const router = TestBed.get(Router);
    const userService = TestBed.get(UserService);

    // Spies
    const openModalSpy = spyOn(modal, 'open');
    const showLoadingSpy = spyOn(loading, 'show');
    const deepCopySpy = spyOn(utility, 'deepCopy').and.callThrough();
    const updateIssueSpy = spyOn(api, 'updateIssue');
    const hideLoadingSpy = spyOn(loading, 'hide');
    const navigateSpy = router.navigate as jasmine.Spy;

    // Mock Function

    // 1. mock userService user && isAdmin
    Object.defineProperties(userService, {
      user: {
        value: {
          name: expected.config.data.userName
        },
        writable: true
      },
      isAdmin: {
        value: expected.config.data.isAdmin,
        writable: false
      }
    });

    // 2. mock『新增歷程視窗』關閉時，回傳填寫內容
    openModalSpy.and.callFake(() => {

      const mockModalRef = {
        afterClosed: () => {

          expected.addHistory.createTime = new Date(Date.now() + 2000);

          return of(expected.addHistory).pipe(delay(2000));

        }
      };

      return mockModalRef;

    });

    // 3. mock update api response
    updateIssueSpy.and.callFake(() => of('').pipe(delay(1000)));

    // Testing

    component.openAddHistoryModal();

    const openModalArgs = openModalSpy.calls.first().args;

    expect(openModalSpy).toHaveBeenCalled();
    expect(openModalArgs[0]).toEqual(expected.component);
    expect(openModalArgs[1]).toEqual(expected.config);

    // 快轉 2s (關閉Modal)
    tick(2000);

    const updateIssueArgs = updateIssueSpy.calls.first().args;

    expect(showLoadingSpy).toHaveBeenCalled();
    expect(deepCopySpy).toHaveBeenCalled();
    expect(updateIssueSpy).toHaveBeenCalled();
    expect(updateIssueArgs[0]).toEqual(expected.issue);

    // 快轉 1s (updateIssue response time)
    tick(1000);

    const navigateArgs = navigateSpy.calls.first().args;

    expect(hideLoadingSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateArgs[0]).toEqual([appRoutePaths.issueDetail.path, expected.issue.id]);

  }));

  it('openAddHistoryModal()，應該打開『新增歷程視窗』，若不是按『送出』，則 不須『顯示 Loading』 與 『 call update api』 ', fakeAsync(() => {

    // 預期的測試資料
    const expected = {
      issue: JSON.parse(JSON.stringify(mockResponse)),
      component: AddHistoryModalComponent,
      config: {
        minHeight: '400px',
        minWidth: '350px',
        mobileFullScreen: true,
        data: {
          userName: 'joe',
          isAdmin: true
        }
      },
      addHistory: null
    };

    // Inject Services
    const modal = TestBed.get(ModalService);
    const loading = TestBed.get(LoadingService);
    const api = TestBed.get(ApiService);
    const userService = TestBed.get(UserService);

    // Spies
    const openModalSpy = spyOn(modal, 'open');
    const showLoadingSpy = spyOn(loading, 'show');
    const updateIssueSpy = spyOn(api, 'updateIssue');

    // Mock Function

    // 1. mock userService user && isAdmin
    Object.defineProperties(userService, {
      user: {
        value: {
          name: expected.config.data.userName
        },
        writable: true
      },
      isAdmin: {
        value: expected.config.data.isAdmin,
        writable: false
      }
    });

    // 2. mock 『新增歷程視窗』關閉時，回傳 null
    openModalSpy.and.callFake(() => {

      const mockModalRef = {
        afterClosed: () => of(null).pipe(delay(2000))
      };

      return mockModalRef;

    });

    // Testing

    component.openAddHistoryModal();

    const openModalArgs = openModalSpy.calls.first().args;

    expect(openModalSpy).toHaveBeenCalled();
    expect(openModalArgs[0]).toEqual(expected.component);
    expect(openModalArgs[1]).toEqual(expected.config);

    // 快轉 2s (關閉Modal)
    tick(2000);

    expect(showLoadingSpy).not.toHaveBeenCalled();
    expect(updateIssueSpy).not.toHaveBeenCalled();

  }));

});
