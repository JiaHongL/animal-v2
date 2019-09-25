import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DetailComponent } from './detail.component';
import { ImageModalComponent } from '../../shared/components/image-modal/image-modal.component';

import { CoreModule } from './../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { DetailRoutingModule } from './detail-routing.module';

import { Animal } from '../../model/animal/animal.model';

import { AnimalDetailResolver } from '../../resolver/animal-detail-resolver/animal-detail.resolver';

import { ModalService } from '../../shared/components/modal/modal.service';
import { UtilityService } from '../../core/utility/utility.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [
        RouterTestingModule,
        DetailRoutingModule,
        SharedModule,
        CoreModule
      ],
      providers: [{
        provide: AnimalDetailResolver,
        useValue: {
          snapshot: {
            data: {
              animal: new Animal(null)
            }
          }
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit()時，為解決 ios touch 問題，應該呼叫 utilityService 的 iosRemoveNoTouch', () => {

    const utilityService = TestBed.get(UtilityService);
    const spyFunc = spyOn(utilityService, 'iosRemoveNoTouch');

    component.ngOnInit();

    expect(spyFunc).toHaveBeenCalled();

  });

  it('openImageModal()，應該根據傳入的參數，打開相片Modal', () => {

    const mockConfig = {
      data: {
        url: 'a'
      }
    };

    const modal = TestBed.get(ModalService);
    const spyFunc = spyOn(modal, 'open');

    component.openImageModal(mockConfig.data.url);

    const args = spyFunc.calls.first().args;

    expect(spyFunc).toHaveBeenCalled();
    expect(args[0]).toEqual(ImageModalComponent);
    expect(args[1]).toEqual(mockConfig);

  });

});
