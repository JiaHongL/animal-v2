import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConditionModalComponent } from './condition-modal.component';

import { CoreModule } from '../../../core/core.module';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../../shared/components/modal/modal';
import { animalQueryFormKeys } from '../../../constant/form-keys/animal-query-form-keys.const';

describe('ConditionModalComponent', () => {
  let component: ConditionModalComponent;
  let fixture: ComponentFixture<ConditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionModalComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule
      ],
      providers: [
        { provide: ModalRef, useValue: { close: () => { } } },
        { provide: MODAL_DATA, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('query()，應該取得表單欄位內容，且關閉modal，並送出查詢資料  ', () => {

    const mockData = {
      [animalQueryFormKeys.kind]: '1',
      [animalQueryFormKeys.sex]: '2',
      [animalQueryFormKeys.bodyType]: '3',
      [animalQueryFormKeys.age]: '4',
      [animalQueryFormKeys.colour]: '5',
      [animalQueryFormKeys.sterilization]: '6',
      [animalQueryFormKeys.bacterin]: '7'
    };

    const modalRef = TestBed.get(ModalRef);
    const spy = spyOn(modalRef, 'close');

    component.form.get(component.formKeys.kind).setValue(mockData[animalQueryFormKeys.kind]);
    component.form.get(component.formKeys.sex).setValue(mockData[animalQueryFormKeys.sex]);
    component.form.get(component.formKeys.bodyType).setValue(mockData[animalQueryFormKeys.bodyType]);
    component.form.get(component.formKeys.age).setValue(mockData[animalQueryFormKeys.age]);
    component.form.get(component.formKeys.colour).setValue(mockData[animalQueryFormKeys.colour]);
    component.form.get(component.formKeys.sterilization).setValue(mockData[animalQueryFormKeys.sterilization]);
    component.form.get(component.formKeys.bacterin).setValue(mockData[animalQueryFormKeys.bacterin]);

    component.query();

    const args = spy.calls.first().args;

    expect(args[0]).toEqual(mockData);

  });

  it('query()，若表單欄位有空值時，需排除空的欄位，且關閉modal，並送出查詢資料  ', () => {


    const mockData = {
      [animalQueryFormKeys.kind]: '1',
    };

    const modalRef = TestBed.get(ModalRef);
    const spy = spyOn(modalRef, 'close');

    component.form.get(component.formKeys.kind).setValue(mockData[animalQueryFormKeys.kind]);

    component.query();

    const args = spy.calls.first().args;

    expect(args[0]).toEqual(mockData);

  });


});
