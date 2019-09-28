import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaModalComponent } from './area-modal.component';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { CoreModule } from '../../../core/core.module';

import { animalQueryFormKeys } from '../../../constant/form-keys/animal-query-form-keys.const';

describe('AreaModalComponent', () => {

  let component: AreaModalComponent;
  let fixture: ComponentFixture<AreaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreaModalComponent],
      imports: [
        CoreModule
      ],
      providers: [{ provide: ModalRef, useValue: { close: () => { } } }]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AreaModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('query()，應該使用傳入的參數進行傳遞，且關閉modal，並送出查詢資料  ', () => {

    const mockData = {
      [animalQueryFormKeys.areaId]: '1',
    };

    const modalRef = TestBed.get(ModalRef);
    const spy = spyOn(modalRef, 'close');

    component.query(mockData[animalQueryFormKeys.areaId]);

    const args = spy.calls.first().args;

    expect(args[0]).toEqual(mockData);

  });

});
