import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkModalComponent } from './remark-modal.component';

import { ModalRef } from '../../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../../shared/components/modal/modal';

describe('RemarkModalComponent', () => {
  let component: RemarkModalComponent;
  let fixture: ComponentFixture<RemarkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemarkModalComponent],
      providers: [
        { provide: ModalRef, useValue: {} },
        { provide: MODAL_DATA, useValue: { remark: '111' } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
