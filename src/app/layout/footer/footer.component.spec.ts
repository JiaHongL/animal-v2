import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

import { FooterComponent } from './footer.component';

import { SharedModule } from './../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

import { DataTransformPipe } from '../../shared/pipes/data-transform/data-transform.pipe';

import { SelectType } from './../../core/selects/enum/select-type.enum';

import { animalQueryFormKeys } from '../../constant/form-keys/animal-query-form-keys.const';

import { of } from 'rxjs';

describe('FooterComponent', () => {

  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const formKeys = animalQueryFormKeys;

  const mockPageTitle = 'webTitle';

  const mockSelectLists = {

    [SelectType.KIND]: [{
      code: '1',
      name: 'n1'
    }],
    [SelectType.SEX]: [{
      code: '2',
      name: 'n2'
    }],
    [SelectType.BODY_TYPE]: [{
      code: '3',
      name: 'n3'
    }],
    [SelectType.AGE]: [{
      code: '4',
      name: 'n4'
    }],
    [SelectType.COLOUR]: [{
      code: '5',
      name: 'n5'
    }],
    [SelectType.STERILIZATION]: [{
      code: '6',
      name: 'n6'
    }],
    [SelectType.BACTERIN]: [{
      code: '7',
      name: 'n7'
    }]

  };

  /**
   * mock datatrans form
   *
   * @param {*} code - 代碼
   * @param {SelectType} type - 參數
   * @returns
   */
  const mockTransform = (code: any, type) => {

    let name = '';

    if (
      type === formKeys.id ||
      type === formKeys.subId ||
      type === formKeys.kind ||
      type === formKeys.colour
    ) {
      return name;
    }

    const findedItem = mockSelectLists[type].find(v => v.code === code);

    name = !!findedItem ? findedItem.name : '';

    return name;

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        CoreModule
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            events: of(
              new NavigationEnd(1, '/home?animal_kind=%E8%B2%93', '/home?animal_kind=%E8%B2%93')
            )
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
            },
            data: of({ title: mockPageTitle }),
            outlet: PRIMARY_OUTLET
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('應該從 router data 取得 title', () => {
    expect(component.pageTitle).toBe(mockPageTitle);
  });

  it('setQueryParamsBreadcrumb()，應該 『直接顯示』 或 『code轉換為對應的代碼內容』，並使用『,』串接再一起', () => {

    const queryParams = {
      [formKeys.kind]: mockSelectLists[SelectType.KIND][0].code,
      [formKeys.sex]: mockSelectLists[SelectType.SEX][0].code,
      [formKeys.bodyType]: mockSelectLists[SelectType.BODY_TYPE][0].code,
      [formKeys.age]: mockSelectLists[SelectType.AGE][0].code,
      [formKeys.colour]: mockSelectLists[SelectType.COLOUR][0].code,
      [formKeys.sterilization]: mockSelectLists[SelectType.STERILIZATION][0].code,
      [formKeys.bacterin]: mockSelectLists[SelectType.BACTERIN][0].code,
    };

    const dataTransform = TestBed.get(DataTransformPipe);

    spyOn(dataTransform, 'transform').and.callFake((code, type) => mockTransform(code, type));

    component.setQueryParamsBreadcrumb(queryParams);

    const contents = {
      [formKeys.kind]: mockSelectLists[SelectType.KIND][0].code,
      [formKeys.sex]: mockSelectLists[SelectType.SEX][0].name,
      [formKeys.bodyType]: mockSelectLists[SelectType.BODY_TYPE][0].name,
      [formKeys.age]: mockSelectLists[SelectType.AGE][0].name,
      [formKeys.colour]: mockSelectLists[SelectType.COLOUR][0].code,
      [formKeys.sterilization]: '是否絕育：' + mockSelectLists[SelectType.STERILIZATION][0].name,
      [formKeys.bacterin]: '是否施打狂犬病：' + mockSelectLists[SelectType.BACTERIN][0].name,
    };

    const subTitle = Object.values(contents).join(', ');

    expect(component.subTitle).toBe(subTitle);

  });

  it('setParamsBreadcrumb()，直接顯示查詢的值', () => {

    const mockId = '1';

    const params = {
      [formKeys.id]: mockId
    };

    component.setParamsBreadcrumb(params);

    expect(component.subTitle).toBe(mockId);

  });


});
