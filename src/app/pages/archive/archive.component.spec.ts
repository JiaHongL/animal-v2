import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ArchiveComponent } from './archive.component';

// module
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

// service
import { ApiService } from '../../core/api/api.service';

// enum
import { IssueStatus } from '../../enum/issue-status.enum';

// class
import { Issue } from '../../model/issue/issue.model';

// rxjs
import { of } from 'rxjs';
import { delay } from 'rxjs/internal/operators/delay';

describe('ArchiveComponent', () => {

  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;
  let api: ApiService;
  let getIssuesSpy: jasmine.Spy;

  const mockResponse = {
    total: 18,
    pages: [
      [
        {
          comment: '希望能增加更多查詢功能',
          createTime: '2018-10-08T16:00:00.000Z',
          createUser: 'Joe',
          email: 'joe@yahoo.com.tw',
          history: [
            {
              createTime: {
                seconds: 1568454218,
                nanoseconds: 88000000
              },
              createUser: '李主管',
              remark: '已請工程師處理中',
              status: 2
            },
            {
              createTime: {
                seconds: 1568473104,
                nanoseconds: 633000000
              },
              createUser: '李主管',
              remark: '測試ID',
              status: 1
            }
          ],
          id: '201810090001',
          status: 1,
          title: '增加更多查詢',
          type: 1
        },
        {
          comment: '希望背景顏色加深',
          createTime: '2018-10-09T11:16:56.056Z',
          createUser: 'Domin',
          email: 'domin@gmail.com',
          history: [
            {
              createTime: {
                seconds: 1539090592,
                nanoseconds: 150000000
              },
              createUser: '李主管',
              remark: '工程師處理中',
              status: 2
            },
            {
              createTime: {
                seconds: 1539090571,
                nanoseconds: 75000000
              },
              createUser: '李主管',
              remark: '追蹤中',
              status: 1
            },
            {
              createTime: {
                seconds: 1539088824,
                nanoseconds: 391000000
              },
              createUser: '李主管',
              remark: '持續追中',
              status: 1
            },
            {
              createTime: {
                seconds: 1539087597,
                nanoseconds: 310000000
              },
              createUser: '李主管',
              remark: '已通知相關人員修改',
              status: 1
            },
            {
              createTime: {
                seconds: 1539083816,
                nanoseconds: 56000000
              },
              createUser: 'Domin',
              remark: '使用者提交',
              status: 0
            },
            {
              createTime: {
                seconds: 1539153476,
                nanoseconds: 140000000
              },
              createUser: '王小明',
              remark: '已處理與更新完成,待複測後歸檔.',
              status: 3
            }
          ],
          id: '201810090002',
          status: 3,
          title: '希望背景加深',
          type: 1
        },
        {
          comment: '希望手機版字體大小能變大',
          createTime: '2018-10-09T11:19:10.679Z',
          createUser: 'Mark',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539083950,
                nanoseconds: 679000000
              },
              createUser: 'Mark',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201810090005',
          status: 0,
          title: '字體大小',
          type: 2
        },
        {
          comment: '如題,希望能夠改善查詢速度.',
          createTime: '2018-10-09T11:19:44.327Z',
          createUser: 'Joe',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539083984,
                nanoseconds: 327000000
              },
              createUser: 'Joe',
              remark: '使用者提交',
              status: 0
            },
            {
              createTime: {
                seconds: 1539118365,
                nanoseconds: 357000000
              },
              createUser: '王小明',
              remark: '已通知相關人員,並持續追蹤問題.',
              status: 1
            }
          ],
          id: '201810090006',
          status: 1,
          title: '查詢速度有點慢',
          type: 3
        },
        {
          comment: '希望能加增地區地圖',
          createTime: '2018-10-09T11:20:35.155Z',
          createUser: 'Joe',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539084035,
                nanoseconds: 155000000
              },
              createUser: 'Joe',
              remark: '使用者提交',
              status: 0
            },
            {
              createTime: {
                seconds: 1539088170,
                nanoseconds: 276000000
              },
              createUser: '李主管',
              remark: '已通知相關人員',
              status: 1
            },
            {
              createTime: {
                seconds: 1539090759,
                nanoseconds: 243000000
              },
              createUser: '李主管',
              remark: '工程師建議納入下一版規格後,再進行相關功能添加.',
              status: 3
            }
          ],
          id: '201810090007',
          status: 3,
          title: '增加地區地圖',
          type: 2
        },
        {
          comment: '如題',
          createTime: '2018-10-09T11:21:39.242Z',
          createUser: 'Domin',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539084099,
                nanoseconds: 242000000
              },
              createUser: 'Domin',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201810090008',
          status: 0,
          title: '希望能增加晶片查詢',
          type: 3
        },
        {
          comment: '希望有條列式列表',
          createTime: '2018-10-09T11:37:57.686Z',
          createUser: 'Joe',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539085077,
                nanoseconds: 686000000
              },
              createUser: 'Joe',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201810090010',
          status: 0,
          title: '條列式列表',
          type: 2
        },
        {
          comment: '希望圖片能再放大些',
          createTime: '2018-10-09T11:42:05.386Z',
          createUser: 'Joe',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539153733,
                nanoseconds: 328000000
              },
              createUser: '王小明',
              remark: '已通知相關人員進行處理',
              status: 1
            },
            {
              createTime: {
                seconds: 1539085325,
                nanoseconds: 386000000
              },
              createUser: 'Joe',
              remark: '使用者提交',
              status: 0
            },
            {
              createTime: {
                seconds: 1539153771,
                nanoseconds: 137000000
              },
              createUser: '王小明',
              remark: '工程師預計下次更新前修改完成.',
              status: 2
            }
          ],
          id: '201810090011',
          status: 2,
          title: '圖片放大',
          type: 2
        },
        {
          comment: '如題',
          createTime: '2018-10-09T13:17:28.999Z',
          createUser: 'Joe',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539091048,
                nanoseconds: 999000000
              },
              createUser: 'Joe',
              remark: '使用者提交',
              status: 0
            },
            {
              createTime: {
                seconds: 1539118518,
                nanoseconds: 938000000
              },
              createUser: '王小明',
              remark: '已通知相關人員,等開會完再考量是否納入下一版規格內.',
              status: 1
            }
          ],
          id: '201810090012',
          status: 1,
          title: '希望從新到舊排序',
          type: 2
        },
        {
          comment: '有看到動物醫院開放資料,希望網站也能串接顯示.',
          createTime: '2018-10-10T06:45:04.625Z',
          createUser: 'Alice',
          email: 'alice@gmail.com',
          history: [
            {
              createTime: {
                seconds: 1539153904,
                nanoseconds: 625000000
              },
              createUser: 'Alice',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201810100013',
          status: 0,
          title: '希望能夠增加動物醫院api串接',
          type: 2
        }
      ],
      [
        {
          comment: '是否可以提供模糊查詢',
          createTime: '2018-10-10T15:09:24.155Z',
          createUser: 'Allen',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539185611,
                nanoseconds: 807000000
              },
              createUser: '王小明',
              remark: '已把問題轉達給工程師',
              status: 1
            },
            {
              createTime: {
                seconds: 1539184164,
                nanoseconds: 155000000
              },
              createUser: 'Allen',
              remark: '使用者提交',
              status: 0
            },
            {
              createTime: {
                seconds: 1539185725,
                nanoseconds: 758000000
              },
              createUser: '王小明',
              remark: '工程師表示這是接open api, 對方並未提供模糊查詢, 已向對方詢問是否能夠增加模糊查詢, 等待回復中. ',
              status: 2
            }
          ],
          id: '201810100014',
          status: 2,
          title: '編號收尋問題',
          type: 3
        },
        {
          comment: '網站的圖片都壞掉了!!',
          createTime: '2018-10-12T03:29:47.118Z',
          createUser: 'Domin',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539314987,
                nanoseconds: 118000000
              },
              createUser: 'Domin',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201810120015',
          status: 0,
          title: '圖片無法顯示',
          type: 3
        },
        {
          comment: '如題',
          createTime: '2018-10-12T06:58:10.314Z',
          createUser: 'domin',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1539327490,
                nanoseconds: 314000000
              },
              createUser: 'domin',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201810120016',
          status: 0,
          title: '希望能夠增加失蹤寵物api串接',
          type: 2
        },
        {
          comment: '測試',
          createTime: '2018-11-27T06:07:07.806Z',
          createUser: 'joe',
          email: 'joe@gmail.com',
          history: [
            {
              createTime: {
                seconds: 1543298827,
                nanoseconds: 806000000
              },
              createUser: 'joe',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201811270018',
          status: 0,
          title: '測試',
          type: 3
        },
        {
          comment: '222',
          createTime: '2019-09-07T08:36:12.794Z',
          createUser: '123',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1567845372,
                nanoseconds: 794000000
              },
              createUser: '123',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201909070019',
          status: 0,
          title: '111',
          type: 1
        },
        {
          comment: '測試內容',
          createTime: '2019-09-07T08:37:34.016Z',
          createUser: '你的名字',
          email: 'joeyou30140@yahoo.com.tw',
          history: [
            {
              createTime: {
                seconds: 1567845454,
                nanoseconds: 16000000
              },
              createUser: '你的名字',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201909070020',
          status: 0,
          title: '測試標題',
          type: 1
        },
        {
          comment: '測試是',
          createTime: '2019-09-14T09:42:09.897Z',
          createUser: 'Joe',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1568454129,
                nanoseconds: 897000000
              },
              createUser: 'Joe',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201909140021',
          status: 0,
          title: '測試其他',
          type: 3
        },
        {
          comment: '',
          createTime: '2019-09-25T15:42:23.186Z',
          createUser: '',
          email: '',
          history: [
            {
              createTime: {
                seconds: 1569426143,
                nanoseconds: 186000000
              },
              createUser: '',
              remark: '使用者提交',
              status: 0
            }
          ],
          id: '201909250022',
          status: 0,
          title: '',
          type: 1
        }
      ]
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveComponent],
      imports: [
        CoreModule,
        SharedModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    api = TestBed.get(ApiService);
    getIssuesSpy = spyOn(api, 'getIssues').and.returnValue(of(mockResponse).pipe(delay(0)));

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('應該 宣告 app-issue-table 元件 所需參數 與 預設值，issues 預設 undefined， currentPage 預設 1', () => {

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;

    expect(component).toEqual(
      jasmine.objectContaining({
        issues: undefined,
        currentPage: 1
      })
    );

    fixture.detectChanges();

  });

  it('應該 宣告 app-pagination 元件 所需參數 與 預設值， total 預設 0 ，itemsPerPage 預設 10 ，setCurrentPage 串接 函式 ', () => {

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;

    expect(component).toEqual(
      jasmine.objectContaining({
        total: 0,
        itemsPerPage: 10,
        setCurrentPage: component.setCurrentPage
      })
    );

    fixture.detectChanges();

  });

  it('setCurrentPage()，應該根據傳入的參數，設定當前頁碼 ', () => {

    expect(component.currentPage).toBe(1);

    component.setCurrentPage(10);

    expect(component.currentPage).toBe(10);

  });

  it('issues()，應該回傳當前頁碼的列表資料 ', () => {

    const expectedList = mockResponse.pages.map(issues => issues.map(issue => new Issue(issue)));

    component.pageList = expectedList;

    expect(component.currentPage).toBe(1);
    expect(component.issues).toEqual(expectedList[0]);

    component.currentPage = 2;

    expect(component.currentPage).toBe(2);
    expect(component.issues).toEqual(expectedList[1]);

  });

  it('ngOnInit()，應該 預設 查詢歸檔議題', () => {

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;

    const spy = spyOn(component, 'queryIssues');

    expect(spy).not.toHaveBeenCalled();

    component.ngOnInit();

    const args = spy.calls.first().args;

    expect(spy).toHaveBeenCalled();
    expect(args[0]).toBe(IssueStatus.ARCHIVE);

  });

  it('queryIssues()，應重新設定 當前議題狀態、當前頁碼、頁面資料列表、總數，並根據傳入的參數做查詢', fakeAsync(() => {

    component.currentPage = null;
    component.pageList = null;
    component.total = null;

    getIssuesSpy.calls.reset();

    expect(getIssuesSpy).not.toHaveBeenCalled();

    component.queryIssues(IssueStatus.ARCHIVE);

    const args = getIssuesSpy.calls.mostRecent().args;

    expect(component.currentPage).toEqual(1);
    expect(component.pageList).toEqual([]);
    expect(component.total).toEqual(0);
    expect(getIssuesSpy).toHaveBeenCalled();
    expect(args[0]).toEqual(IssueStatus.ARCHIVE);

    tick();

    const expectedList = mockResponse.pages.map(issues => issues.map(issue => new Issue(issue)));

    expect(component.total).toEqual(mockResponse.total);
    expect(component.pageList).toEqual(expectedList);

  }));

});
