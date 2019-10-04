import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

import { SelectsService } from './core/selects/selects.service';
import { UtilityService } from './core/utility/utility.service';

import { preloadPicture } from './constant/preload-picture.const';

import { Title } from '@angular/platform-browser';

import { of } from 'rxjs';

describe('AppComponent', () => {

  let selectsService: SelectsService;
  const mockPageTitle = '詳情頁面';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule
      ],
      declarations: [
        AppComponent
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
    }).compileComponents();
  }));

  beforeEach(() => {

    selectsService = TestBed.get(SelectsService);
    spyOn(selectsService, 'getAllSelects').and.stub();

  });

  it('should create the app', () => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

  });

  it('應該根據路由title內容，設定頁面分頁標題', () => {


    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const title = TestBed.get(Title);
    const setTitleSpy = spyOn(title, 'setTitle');

    expect(setTitleSpy).not.toHaveBeenCalled();

    component.ngOnInit();

    const setTitleArgs = setTitleSpy.calls.first().args;

    expect(setTitleArgs[0]).toBe(mockPageTitle);
    expect(setTitleSpy).toHaveBeenCalled();

  });

  it('應該在ngAfterViewInit後，載入要緩存的照片', () => {

    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const utility = TestBed.get(UtilityService);
    const preloadPictureSpy = spyOn(utility, 'preloadPicture');

    expect(preloadPictureSpy).not.toHaveBeenCalled();

    component.ngAfterViewInit();

    const preloadPictureArgs = preloadPictureSpy.calls.first().args;

    expect(preloadPictureSpy).toHaveBeenCalled();
    expect(preloadPictureArgs[0]).toEqual(preloadPicture);

  });

});
