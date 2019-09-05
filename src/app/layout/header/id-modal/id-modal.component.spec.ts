import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from './../../../core/core.module';

import { IdModalComponent } from './id-modal.component';

import { MODAL_DATA } from './../../../shared/components/modal/modal';
import { ModalRef } from '../../../shared/components/modal/modal-ref.model';

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
        { provide: ModalRef, useValue: null },
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

});
