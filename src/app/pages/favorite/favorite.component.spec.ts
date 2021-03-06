import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// component
import { FavoriteComponent } from './favorite.component';
import { ImageModalComponent } from '../../shared/components/image-modal/image-modal.component';

// module
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from './../../core/core.module';

// class
import { Animal } from '../../model/animal/animal.model';

// enum
import { StorageType } from '../../core/storage/storage-type.enum';

// const
import { storageKeys } from '../../core/storage/storage-key.const';

// service
import { StorageService } from '../../core/storage/storage.service';
import { ModalService } from '../../shared/components/modal/modal.service';

// rxjs
import { Subject, Subscription } from 'rxjs';

describe('FavoriteComponent', () => {

  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;
  let storageService: StorageService;
  let getDataSpy: jasmine.Spy;
  let getDataObsSpy: jasmine.Spy;
  let animals$: Subject<any> = null;

  const mockData = [
    {
      animal_shelter_pkid: 53,
      animal_id: 120979,
      animal_area_pkid: 3,
      album_file: 'http://asms.coa.gov.tw/amlapp/upload/pic/f831560f-23d5-4ac8-8037-34b34bf1c608_org.jpg',
      album_update: '',
      animal_age: 'CHILD',
      animal_bacterin: 'F',
      animal_bodytype: 'SMALL',
      animal_caption: '',
      animal_closeddate: '2999-12-31',
      animal_colour: '黃虎斑色',
      animal_createtime: '2019/09/24',
      animal_foundplace: '橋和路160巷',
      animal_kind: '貓',
      animal_opendate: '2019-09-24',
      animal_place: '新北市中和區公立動物之家',
      animal_remark: '我在寵翻天',
      animal_sex: 'M',
      animal_status: 'OPEN',
      animal_sterilization: 'F',
      animal_subid: 'AAAEG1080924011',
      animal_title: '',
      animal_update: '2019/09/25',
      cDate: '2019/09/25',
      shelter_address: '新北市中和區興南路三段100號',
      shelter_name: '新北市中和區公立動物之家',
      shelter_tel: '02-86685547',
      isLike: true
    }
  ];

  const mockData2 = [
    {
      animal_shelter_pkid: 53,
      animal_id: 120979,
      animal_area_pkid: 3,
      album_file: 'http://asms.coa.gov.tw/amlapp/upload/pic/f831560f-23d5-4ac8-8037-34b34bf1c608_org.jpg',
      album_update: '',
      animal_age: 'CHILD',
      animal_bacterin: 'F',
      animal_bodytype: 'SMALL',
      animal_caption: '',
      animal_closeddate: '2999-12-31',
      animal_colour: '黃虎斑色',
      animal_createtime: '2019/09/24',
      animal_foundplace: '橋和路160巷',
      animal_kind: '貓',
      animal_opendate: '2019-09-24',
      animal_place: '新北市中和區公立動物之家',
      animal_remark: '我在寵翻天',
      animal_sex: 'M',
      animal_status: 'OPEN',
      animal_sterilization: 'F',
      animal_subid: 'AAAEG1080924011',
      animal_title: '',
      animal_update: '2019/09/25',
      cDate: '2019/09/25',
      shelter_address: '新北市中和區興南路三段100號',
      shelter_name: '新北市中和區公立動物之家',
      shelter_tel: '02-86685547',
      isLike: true
    },
    {
      animal_shelter_pkid: 53,
      animal_id: 120974,
      animal_area_pkid: 3,
      album_file: 'http://asms.coa.gov.tw/amlapp/upload/pic/5da367cf-d384-4e31-8915-16ec83f4df4f_org.jpg',
      album_update: '',
      animal_age: 'CHILD',
      animal_bacterin: 'F',
      animal_bodytype: 'SMALL',
      animal_caption: '',
      animal_closeddate: '2999-12-31',
      animal_colour: '虎斑色',
      animal_createtime: '2019/09/24',
      animal_foundplace: '橋和路160巷',
      animal_kind: '貓',
      animal_opendate: '2019-09-24',
      animal_place: '新北市中和區公立動物之家',
      animal_remark: '我在寵翻天',
      animal_sex: 'F',
      animal_status: 'OPEN',
      animal_sterilization: 'F',
      animal_subid: 'AAAEG1080924008',
      animal_title: '',
      animal_update: '2019/09/25',
      cDate: '2019/09/25',
      shelter_address: '新北市中和區興南路三段100號',
      shelter_name: '新北市中和區公立動物之家',
      shelter_tel: '02-86685547',
      isLike: true
    }
  ];

  beforeEach(async(() => {

    animals$ = new Subject();

    TestBed.configureTestingModule({
      declarations: [FavoriteComponent],
      imports: [
        CoreModule,
        SharedModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {

    storageService = TestBed.get(StorageService);

    getDataSpy = spyOn(storageService, 'getData').and.returnValue(mockData);
    getDataObsSpy = spyOn(storageService, 'getDataObs').and.callFake(() => animals$.asObservable());

    getDataSpy.calls.reset();
    getDataObsSpy.calls.reset();

    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('初始化時，應該從 LocalStorage 的 favoriteList 取得資料', () => {

    const localStorageData = mockData.map(animal => new Animal(animal));

    const getDataArgs = getDataSpy.calls.first().args;

    expect(getDataArgs[0]).toEqual(storageKeys.favoriteList);
    expect(getDataArgs[1]).toEqual(StorageType.LOCAL);
    expect(component.animals).toEqual(localStorageData);

  });

  it('若storage資料有變動，應該從storage重新取得新資料', () => {

    const localStorageData = mockData.map(animal => new Animal(animal));

    const getDataObsArgs = getDataObsSpy.calls.first().args;

    expect(getDataObsArgs[0]).toEqual(storageKeys.favoriteList);
    expect(getDataObsArgs[1]).toEqual(StorageType.LOCAL);

    expect(component.animals).toEqual(localStorageData);

    animals$.next(mockData2);

    const newLocalStorageData = mockData2.map(animal => new Animal(animal));

    expect(component.animals).toEqual(newLocalStorageData);

  });

  it('應該儲存 getDataObs subscribe 的 subscription，在 Destroy 時，做 unsubscribe ', () => {

    const spy = spyOn(component.subscription, 'unsubscribe');

    expect(component.subscription instanceof Subscription).toBeTruthy();

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();

  });

  it('應該儲存 getDataObs subscribe 的 subscription，在 Destroy 時，做 unsubscribe ', () => {

    const spy = spyOn(component.subscription, 'unsubscribe');

    expect(component.subscription instanceof Subscription).toBeTruthy();

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();

  });

  it('openImageModal()，應該根據傳入的參數，打開相片Modal', () => {

    const mockConfig = {
      data: {
        url: 'a'
      }
    };

    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'open');

    component.openImageModal(mockConfig.data.url);

    const args = spy.calls.first().args;

    expect(spy).toHaveBeenCalled();
    expect(args[0]).toEqual(ImageModalComponent);
    expect(args[1]).toEqual(mockConfig);

  });

});
