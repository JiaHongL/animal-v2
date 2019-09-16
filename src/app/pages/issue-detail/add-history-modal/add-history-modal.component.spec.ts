import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddHistoryModalComponent } from './add-history-modal.component';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../../shared/components/modal/modal';

import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../../shared/shared.module';

describe('AddHistoryModalComponent', () => {
  let component: AddHistoryModalComponent;
  let fixture: ComponentFixture<AddHistoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddHistoryModalComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule
      ],
      providers: [
        { provide: ModalRef, useValue: {} },
        {
          provide: MODAL_DATA, useValue: {
            userName: ''
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
