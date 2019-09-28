import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';

// module
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoreModule } from './../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

// component
import { HomeComponent } from './home.component';
import { ImageModalComponent } from '../../shared/components/image-modal/image-modal.component';

// service
import { ApiService } from './../../core/api/api.service';
import { LoadingService } from '../../core/loading/loading.service';
import { StorageService } from './../../core/storage/storage.service';
import { MessageService } from '../../core/message/message.service';
import { ModalService } from '../../shared/components/modal/modal.service';

// class
import { Animal } from '../../model/animal/animal.model';

// rxjs
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';
import { Subject } from 'rxjs';

describe('HomeComponent', () => {

  let apiService: ApiService;
  let storageService: StorageService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let getAnimalsSpy: jasmine.Spy = null;
  let mockQueryParamMap$: Subject<ParamMap> = null;

  const mockApiResponse = {
    success: true,
    result: [{
      animal_id: 120729,
      animal_subid: 'S08C0921-01',
      animal_area_pkid: 16,
      animal_shelter_pkid: 74,
      animal_place: 'a',
      animal_kind: 'b',
      animal_sex: 'M',
      animal_bodytype: 'SMALL',
      animal_colour: 'c',
      animal_age: '',
      animal_sterilization: 'F',
      animal_bacterin: 'F',
      animal_foundplace: ' ',
      animal_title: '',
      animal_status: 'OPEN',
      animal_remark: 'd',
      animal_caption: '',
      animal_opendate: '2019-09-21',
      animal_closeddate: '2999-12-31',
      animal_update: '2019\/09\/23',
      animal_createtime: '2019\/09\/21',
      shelter_name: 'f',
      album_file: '',
      album_update: '',
      cDate: 'g',
      shelter_address: 'v',
      shelter_tel: 'v'
    }],
    errorMessage: null
  };

  beforeEach(async(() => {

    mockQueryParamMap$ = new Subject<ParamMap>();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        SharedModule,
        InfiniteScrollModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: mockQueryParamMap$.asObservable()
          }
        }
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();

  }));

  beforeEach(() => {

    apiService = TestBed.get(ApiService);

    // 因為 animal 的 函式使用到 storageService 的實例，所以需建立storageService的實例.
    storageService = TestBed.get(StorageService);
    storageService.getData(null, null);

    getAnimalsSpy = spyOn(apiService, 'getAnimals');
    getAnimalsSpy
      .and
      .callFake(() => {

        return of(mockApiResponse)
          .pipe(delay(0));

      });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('應該監聽路由queryParamMap的變化，進行頁面重新查詢', () => {

    const spy = spyOn(component, 'searchAnimals').and.stub();

    mockQueryParamMap$.next(convertToParamMap({ id: 'bb' }));

    const firstArgs = spy.calls.mostRecent().args;

    expect(firstArgs[0]).toEqual(1);
    expect(firstArgs[1]).toEqual({ id: 'bb' });

    mockQueryParamMap$.next(convertToParamMap({ kind: 'c' }));

    const secondArgs = spy.calls.mostRecent().args;

    expect(secondArgs[0]).toEqual(1);
    expect(secondArgs[1]).toEqual({ kind: 'c' });

  });

  it('searchAnimals()，應顯示Loading，並呼API查詢，查詢後關閉Loading', fakeAsync(() => {

    const mockQueryParams = {
      animal_kind: '貓'
    };

    const loading = TestBed.get(LoadingService);

    const showLoadingSpy = spyOn(loading, 'show');
    const hideLoadingSoy = spyOn(loading, 'hide');

    component.isQuerying = true;
    component.searchAnimals(1, mockQueryParams);

    // 『呼異步api之前』 => 函式內同步的程式碼
    expect(component.isQuerying).toBeTruthy();
    expect(showLoadingSpy).toHaveBeenCalled();
    expect(component.animals).toEqual([]);

    // async time 快轉
    tick();

    const args = getAnimalsSpy.calls.mostRecent().args;

    // 『異步api完成後』 => 函式內異步的程式碼
    expect(args[0]).toBe(1);
    expect(args[1]).toEqual(mockQueryParams);
    expect(hideLoadingSoy).toHaveBeenCalled();
    expect(component.isQuerying).toBeFalsy();
    expect(component.animals).toEqual(mockApiResponse.result.map(animal => new Animal(animal)));

  }));

  it('searchAnimals()，應累加之前的資料', fakeAsync(() => {

    const mockQueryParams = {
      animal_kind: '貓'
    };

    component.animals = [];

    component.searchAnimals(1, mockQueryParams);

    tick();

    expect(component.animals).toEqual(mockApiResponse.result.map(animal => new Animal(animal)));

    component.searchAnimals(2, mockQueryParams);

    tick();

    const data = mockApiResponse.result.map(animal => new Animal(animal)).concat(mockApiResponse.result.map(animal => new Animal(animal)));

    expect(component.animals).toEqual(data);

  }));

  it('searchAnimals()，若API有錯誤訊息回覆，需跳視窗提示', fakeAsync(() => {

    getAnimalsSpy
      .and
      .callFake(() => {

        return of({
          success: false,
          result: [],
          errorMessage: 'has error'
        })
          .pipe(delay(0));

      });

    const mockQueryParams = {
      animal_kind: '貓'
    };

    component.animals = [];

    const message = TestBed.get(MessageService);
    const alertSpy = spyOn(message, 'alert');

    component.searchAnimals(1, mockQueryParams);

    tick();

    const args = alertSpy.calls.first().args;

    expect(alertSpy).toHaveBeenCalled();
    expect(args[0]).toEqual('has error');

  }));

  it('scrolled()，應 增加當前頁碼 與 呼 searchAnimals 函式', () => {

    component.searchParams = { id: 'a' };
    component.currentPage = 1;

    const spy = spyOn(component, 'searchAnimals').and.stub();

    component.scrolled();

    const firstArgs = spy.calls.mostRecent().args;

    expect(component.currentPage).toEqual(2);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(firstArgs[0]).toEqual(2);
    expect(firstArgs[1]).toEqual(component.searchParams);

    component.scrolled();

    const secondArgs = spy.calls.mostRecent().args;

    expect(component.currentPage).toEqual(3);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(secondArgs[0]).toEqual(3);
    expect(secondArgs[1]).toEqual(component.searchParams);

  });

  it('openImageModal()，應根據傳入的url設定資料，並打開相片顯示的Modal', () => {

    const expectConfig = {
      data: {
        url: 'aa',
      }
    };

    const modalService = TestBed.get(ModalService);
    const spy = spyOn(modalService, 'open');

    component.openImageModal(expectConfig.data.url);

    const args = spy.calls.first().args;

    expect(spy).toHaveBeenCalled();
    expect(args[0]).toEqual(ImageModalComponent);
    expect(args[1]).toEqual(expectConfig);

  });

});
