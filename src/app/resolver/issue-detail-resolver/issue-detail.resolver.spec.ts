import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { CoreModule } from '../../core/core.module';

import { IssueDetailResolver } from './issue-detail.resolver';

import { Issue } from '../../model/issue/issue.model';

import { LoadingType } from '../../core/loading/enum/loading-type.enum';

import { ApiService } from '../../core/api/api.service';
import { LoadingService } from '../../core/loading/loading.service';

import { of } from 'rxjs';
import { delay } from 'rxjs/internal/operators/delay';

describe('IssueDetailResolver', () => {

  let issueDetailResolver: IssueDetailResolver;
  let getIssueDetailSpy: jasmine.Spy;
  let showLoadingSpy: jasmine.Spy;
  let hideLoadingSpy: jasmine.Spy;
  let route: ActivatedRouteSnapshot;

  const expectedId = '201810090001';

  const mockResponse = [
    {
      comment: '希望能增加更多查詢功能',
      createTime: '2018-10-08T16:00:00.000Z',
      createUser: 'Joe',
      email: 'joe@yahoo.com.tw',
      history: [
        {
          createTime: '2019-09-27T09:48:53.937Z',
          createUser: '李主管',
          remark: '已分配給工程師處理',
          status: 2
        },
        {
          createTime: '2019-09-27T04:15:52.191Z',
          createUser: '李主管',
          remark: '評估中',
          status: 2
        },
        {
          createTime: '2019-09-14T14:58:24.633Z',
          createUser: '李主管',
          remark: '測試ID',
          status: 1
        },
        {
          createTime: '2019-09-14T09:43:38.088Z',
          createUser: '李主管',
          remark: '已請工程師處理中',
          status: 2
        }
      ],
      id: expectedId,
      status: 2,
      title: '增加更多查詢',
      type: 1
    }
  ];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule
      ],
      providers: [
        IssueDetailResolver,
        {
          provide: ActivatedRoute,
          useValue: {
            params: {
              id: expectedId
            }
          }
        }
      ]
    });

  }));

  beforeEach(() => {

    issueDetailResolver = TestBed.get(IssueDetailResolver);
    route = TestBed.get(ActivatedRoute);

    const apiService = TestBed.get(ApiService);
    const loadindService = TestBed.get(LoadingService);

    showLoadingSpy = spyOn(loadindService, 'show');
    getIssueDetailSpy = spyOn(apiService, 'getIssueDetail');
    hideLoadingSpy = spyOn(loadindService, 'hide');

  });

  it('應該 show loading，api 回應後 hide loading，然後回傳資料', fakeAsync(() => {

    getIssueDetailSpy.and.returnValue(of(mockResponse).pipe(delay(1000000)));

    issueDetailResolver.resolve(route).subscribe((animal) => expect(animal).toEqual(new Issue(mockResponse[0])));

    const showLoadingArgs = showLoadingSpy.calls.first().args;
    const getIssueDetailArgs = getIssueDetailSpy.calls.first().args;

    expect(showLoadingSpy).toHaveBeenCalled();
    expect(showLoadingArgs[0]).toBe(LoadingType.ROLLER);

    expect(getIssueDetailSpy).toHaveBeenCalled();
    expect(getIssueDetailArgs[0]).toBe(expectedId);

    tick(1000000);

    expect(hideLoadingSpy).toHaveBeenCalled();

  }));

});
