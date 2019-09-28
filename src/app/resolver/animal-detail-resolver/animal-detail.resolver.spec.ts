import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { AnimalDetailResolver } from './animal-detail.resolver';

import { CoreModule } from '../../core/core.module';

// service
import { ApiService } from '../../core/api/api.service';
import { LoadingService } from '../../core/loading/loading.service';
import { MessageService } from '../../core/message/message.service';

// enum
import { LoadingType } from '../../core/loading/enum/loading-type.enum';

// class
import { Animal } from '../../model/animal/animal.model';

// rxjs
import { of } from 'rxjs';
import { delay } from 'rxjs/internal/operators/delay';

describe('AnimalDetailResolver', () => {

  let animalDetailResolver: AnimalDetailResolver;
  let spyOnGetAnimalDetail: jasmine.Spy;
  let spyOnShowLoading: jasmine.Spy;
  let spyOnHideLoading: jasmine.Spy;
  let spyOnAlert: jasmine.Spy;
  let route: ActivatedRouteSnapshot;

  const mockResponse = {
    success: true,
    result: [
      {
        animal_id: 121704,
        animal_subid: 'CAAAG1080928001',
        animal_area_pkid: 6,
        animal_shelter_pkid: 61,
        animal_place: '桃園市動物保護教育園區',
        animal_kind: '狗',
        animal_sex: 'F',
        animal_bodytype: 'SMALL',
        animal_colour: '咖啡色',
        animal_age: 'CHILD',
        animal_sterilization: 'F',
        animal_bacterin: 'F',
        animal_foundplace: '五族街',
        animal_title: '',
        animal_status: 'OPEN',
        animal_remark: '',
        animal_caption: '',
        animal_opendate: '2019-09-28',
        animal_closeddate: '2999-12-31',
        animal_update: '2019/09/28',
        animal_createtime: '2019/09/28',
        shelter_name: '桃園市動物保護教育園區',
        album_file: 'http://asms.coa.gov.tw/amlapp/upload/pic/84e24eb5-3422-47f8-b0a3-4abcff624150_org.JPG',
        album_update: '',
        cDate: '2019/09/28',
        shelter_address: '桃園市新屋區永興里大牛欄117號',
        shelter_tel: '03-4861760'
      }
    ],
    errorMessage: ''
  };

  const mockErrorResponse = {
    success: false,
    result: [],
    errorMessage: 'aaa'
  };

  const expectedId = 'abc';

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule
      ],
      providers: [
        AnimalDetailResolver,
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

    animalDetailResolver = TestBed.get(AnimalDetailResolver);
    route = TestBed.get(ActivatedRoute);

    const apiService = TestBed.get(ApiService);
    const loadindService = TestBed.get(LoadingService);
    const messageService = TestBed.get(MessageService);

    spyOnShowLoading = spyOn(loadindService, 'show');
    spyOnGetAnimalDetail = spyOn(apiService, 'getAnimalDetail');
    spyOnHideLoading = spyOn(loadindService, 'hide');
    spyOnAlert = spyOn(messageService, 'alert');

  });

  it('應該 show loading，api 回應後 hide loading，若api失敗，則跳錯誤提示窗', fakeAsync(() => {

    spyOnGetAnimalDetail.and.returnValue(of(mockErrorResponse).pipe(delay(1000000)));

    animalDetailResolver.resolve(route).subscribe((animal) => expect(animal).toEqual(new Animal(null)));

    const showLoadingArgs = spyOnShowLoading.calls.mostRecent().args;
    const getAnimalDetailArgs = spyOnGetAnimalDetail.calls.mostRecent().args;

    expect(spyOnShowLoading).toHaveBeenCalled();
    expect(showLoadingArgs[0]).toBe(LoadingType.ROLLER);

    expect(spyOnGetAnimalDetail).toHaveBeenCalled();
    expect(getAnimalDetailArgs[0]).toBe(expectedId);

    tick(1000000);

    const alertArgs = spyOnAlert.calls.mostRecent().args;

    expect(spyOnHideLoading).toHaveBeenCalled();
    expect(spyOnAlert).toHaveBeenCalled();
    expect(alertArgs[0]).toBe(mockErrorResponse.errorMessage);

  }));

  it('應該 show loading，api 回應後 hide loading，若api成功，則傳遞資料', (done: DoneFn) => {

    spyOnGetAnimalDetail.and.callFake(() => {
      done();
      return of(mockResponse).pipe(delay(100000));
    });

    animalDetailResolver.resolve(route).subscribe((animal) => {

      expect(spyOnHideLoading).toHaveBeenCalled();
      expect(animal).toEqual(new Animal(mockResponse[0]));

    });

    const showLoadingArgs = spyOnShowLoading.calls.mostRecent().args;
    const getAnimalDetailArgs = spyOnGetAnimalDetail.calls.mostRecent().args;

    expect(spyOnShowLoading).toHaveBeenCalled();
    expect(showLoadingArgs[0]).toBe(LoadingType.ROLLER);

    expect(spyOnGetAnimalDetail).toHaveBeenCalled();
    expect(getAnimalDetailArgs[0]).toBe(expectedId);

  });

});
