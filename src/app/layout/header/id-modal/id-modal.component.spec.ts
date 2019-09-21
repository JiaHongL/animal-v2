import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdModalComponent } from './id-modal.component';

import { MODAL_DATA } from './../../../shared/components/modal/modal';
import { ModalRef } from '../../../shared/components/modal/modal-ref.model';

import { animalQueryFormKeys } from './../../../constant/form-keys/animal-query-form-keys.const';

describe('IdModalComponent', () => {
  let component: IdModalComponent;
  let fixture: ComponentFixture<IdModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdModalComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ModalRef, useValue: { close: () => { } } },
        { provide: MODAL_DATA, useValue: null }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('query()，應該取得表單欄位內容，且關閉modal，並送出查詢資料  ', () => {

    
    const mockData = {
      [animalQueryFormKeys.id]: '1',
      [animalQueryFormKeys.subId]: '2'
    }

    const modalRef = TestBed.get(ModalRef);
    const spyFunc = spyOn(modalRef, 'close');

    component.form.get(component.formKeys.id).setValue(mockData[animalQueryFormKeys.id]);
    component.form.get(component.formKeys.subId).setValue(mockData[animalQueryFormKeys.subId]);

    component.query();

    const args = spyFunc.calls.first().args;

    expect(args[0]).toEqual(mockData);

  });

  it('query()，若表單欄位有空值時，需排除空的欄位，且關閉modal，並送出查詢資料  ', () => {

    
    const mockData = {
      [animalQueryFormKeys.id]: '1'
    }

    const modalRef = TestBed.get(ModalRef);
    const spyFunc = spyOn(modalRef, 'close');

    component.form.get(component.formKeys.id).setValue(mockData[animalQueryFormKeys.id]);

    component.query();

    const args = spyFunc.calls.first().args;

    expect(args[0]).toEqual(mockData);

  });

});
