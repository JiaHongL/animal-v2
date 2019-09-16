import { SelectType } from './../../../core/selects/enum/select-type.enum';
import { TestBed } from '@angular/core/testing';

import { DataTransformPipe } from './data-transform.pipe';

import { CoreModule } from '../../../core/core.module';

import { SelectsService } from '../../../core/selects/selects.service';

describe('DataTransformPipe', () => {

  const mockList = [{
    code: 'a',
    name: 'b'
  }];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [CoreModule]
  }));

  it('create an instance', () => {

    const selectsService: SelectsService = TestBed.get(SelectsService);
    const pipe = new DataTransformPipe(selectsService);

    expect(pipe).toBeTruthy();

  });

  it('傳入代碼，應該轉換為對應的名稱', () => {

    const selectsService: SelectsService = TestBed.get(SelectsService);

    selectsService[SelectType.ISSUES_STATUS] = mockList;

    const pipe = new DataTransformPipe(selectsService);

    expect(pipe.transform(mockList[0].code, SelectType.ISSUES_STATUS)).toBe(mockList[0].name);

  });

});
