import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';

import { CoreModule } from './../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

// query modal
import { ConditionModalModule } from './condition-modal/condition-modal.module';
import { IdModalModule } from './id-modal/id-modal.module';
import { ShelterModalModule } from './shelter-modal/shelter-modal.module';

// enum
import { QueryModalType } from './enum/query-modal-type.enum';

// service
import { ModalService } from '../../shared/components/modal/modal.service';

// const
import { ModalConfig } from '../../shared/components/modal/modal-config';
import { appRoutePaths } from '../../constant/app-route-paths.const';

// rxjs
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        SharedModule,
        ConditionModalModule,
        IdModalModule,
        ShelterModalModule
      ],
      declarations: [HeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openQueryModal()，應該根據資料，打開對應的查詢框，並在按查詢後，把查詢參數帶入url，進行查詢', () => {

    const mockQueryParams = {
      id: '1',
      subId: '2'
    };

    // spy on modal open function and mock return
    const modal = TestBed.get(ModalService);

    const openSpy = spyOn(modal, 'open').and.callFake(() => {

      const mockModalRef = {
        afterClosed: () => {
          return of(mockQueryParams);
        }
      };

      return mockModalRef;

    });

    // spy on router navigate function
    const router = TestBed.get(Router);

    const navigateSpy = spyOn(router, 'navigate');

    component.openQueryModal(QueryModalType.CONDITION);

    const openArgs = openSpy.calls.first().args;
    const naviagteArgs = navigateSpy.calls.first().args;

    const expectedComponent = component[`queryComponents`].find(item => item.type === QueryModalType.CONDITION);
    const expectConfig: ModalConfig = {};

    expectConfig.minHeight = expectedComponent.minHeight;
    expectConfig.minWidth = expectedComponent.minWidth;
    expectConfig.mobileFullScreen = expectedComponent.mobileFullScreen;

    expect(openArgs[0]).toEqual(expectedComponent.component);
    expect(openArgs[1]).toEqual(expectConfig);
    expect(naviagteArgs[0]).toEqual(['/' + appRoutePaths.home.path]);
    expect(naviagteArgs[1]).toEqual({ queryParams: mockQueryParams });

  });

});
