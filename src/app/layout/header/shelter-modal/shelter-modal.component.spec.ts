import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '../../../core/core.module';

import { ShelterModalComponent } from './shelter-modal.component';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';

import { animalQueryFormKeys } from '../../../constant/form-keys/animal-query-form-keys.const';

describe('ShelterModalComponent', () => {
  let component: ShelterModalComponent;
  let fixture: ComponentFixture<ShelterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShelterModalComponent],
      imports: [
        CoreModule
      ],
      providers: [{ provide: ModalRef, useValue: { close: () => { } } }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('query()，應該使用傳入的參數進行傳遞，且關閉modal，並送出查詢資料  ', () => {

    const mockData = {
      [animalQueryFormKeys.shelterId]: '1',
    };

    const modalRef = TestBed.get(ModalRef);
    const spyFunc = spyOn(modalRef, 'close');

    component.query(mockData[animalQueryFormKeys.shelterId]);

    const args = spyFunc.calls.first().args;

    expect(args[0]).toEqual(mockData);

  });

});
