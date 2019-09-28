import { TestBed } from '@angular/core/testing';

import { Option } from '../../model/option/option.model';


import { SelectType } from './enum/select-type.enum';

// module
import { CoreModule } from '../core.module';

// service
import { SelectsService } from './selects.service';
import { of } from 'rxjs';

describe('SelectsService', () => {

  const mockAllList = {
    [SelectType.STATUS]: [{ code: 'a1', name: 'a1' }],
    [SelectType.SEX]: [{ code: 'a2', name: 'a2' }],
    [SelectType.BODY_TYPE]: [{ code: 'a3', name: 'a3' }],
    [SelectType.AGE]: [{ code: 'a4', name: 'a4' }],
    [SelectType.AREA]: [{ code: 'a5', name: 'a5' }],
    [SelectType.STERILIZATION]: [{ code: 'a6', name: 'a6' }],
    [SelectType.BACTERIN]: [{ code: 'a7', name: 'a7' }],
    [SelectType.KIND]: [{ code: 'a8', name: 'a8' }],
    [SelectType.COLOUR]: [{ code: 'a9', name: 'a9' }],
    [SelectType.SHELTER]: [{ code: 'a10', name: 'a10' }],
    [SelectType.FEEDBACK_TYPE]: [{ code: 'a11', name: 'a11' }],
    [SelectType.ISSUES_STATUS]: [{ code: 'a12', name: 'a12' }]
  };

  /**
   * 獲取 對應的 mock list
   *
   * @param {SelectType} type - 類型
   * @returns {Option[]}
   */
  function getMockList(type: SelectType): Option[] {
    return mockAllList[type];
  }


  beforeEach(() => TestBed.configureTestingModule({
    imports: [CoreModule]
  }));

  it('should be created', () => {
    const service: SelectsService = TestBed.get(SelectsService);
    expect(service).toBeTruthy();
  });

  it('getAllSelects function 應該 取得所有下拉資料', () => {

    const service: SelectsService = TestBed.get(SelectsService);

    expect(service).toBeTruthy();

    const spy = spyOn<any>(service, 'getSelects').and.callFake(type => of(getMockList(type)));

    service.getAllSelects();

    expect(service.statusList).toBe(getMockList(SelectType.STATUS));
    expect(service.issuesStatusList).toBe(getMockList(SelectType.ISSUES_STATUS));
    expect(service.bacterinList).toBe(getMockList(SelectType.BACTERIN));
    expect(service.bodyTypeList).toBe(getMockList(SelectType.BODY_TYPE));
    expect(service.ageList).toBe(getMockList(SelectType.AGE));
    expect(service.kindList).toBe(getMockList(SelectType.KIND));
    expect(service.sexList).toBe(getMockList(SelectType.SEX));
    expect(service.kindList).toBe(getMockList(SelectType.KIND));
    expect(service.colourList).toBe(getMockList(SelectType.COLOUR));
    expect(service.feedbackTypeList).toBe(getMockList(SelectType.FEEDBACK_TYPE));
    expect(service.shelterList).toBe(getMockList(SelectType.SHELTER));
    expect(service.sterilizationList).toBe(getMockList(SelectType.STERILIZATION));

    expect(spy).toHaveBeenCalledTimes(12);

  });

});
