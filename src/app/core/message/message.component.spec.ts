import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';

import { ModalRef } from '../../shared/components/modal/modal-ref.model';
import { MODAL_DATA } from '../../shared/components/modal/modal';

import { MessageConfig } from './message-config.interface';
import { MessageType } from './message-type.enum';

describe('MessageComponent', () => {

  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  const messageConfigMock: MessageConfig = {
    title: 'a',
    content: 'b',
    type: MessageType.ALERT,
    cancelBtnTitle: 'c',
    okBtnTitle: 'd'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [
        { provide: ModalRef, useValue: {} },
        {
          provide: MODAL_DATA,
          useValue: messageConfigMock
        },
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

  it('應根據 MODAL_DATA 傳入的資料，設置元件的相關數值', () => {

    expect(component.title).toBe(messageConfigMock.title);
    expect(component.content).toBe(messageConfigMock.content);
    expect(component.type).toBe(messageConfigMock.type);
    expect(component.okBtnTitle).toBe(messageConfigMock.okBtnTitle);
    expect(component.cancelBtnTitle).toBe(messageConfigMock.cancelBtnTitle);

  });

});
