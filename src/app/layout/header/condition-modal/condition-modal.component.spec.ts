import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConditionModalComponent } from './condition-modal.component';

import { CoreModule } from '../../../core/core.module';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../../shared/components/modal/modal';

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
        { provide: ModalRef, useValue: null },
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
});
