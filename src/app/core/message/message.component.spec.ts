import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';

import { ModalModule } from '../../shared/components/modal/modal.module';
import { ModalRef } from '../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../shared/components/modal/modal';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [
        { provide: ModalRef, useValue: {} },
        { provide: MODAL_DATA, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
