import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

import { CoreModule } from '../core.module';
import { ModalModule } from './../../shared/components/modal/modal.module';

import { ModalService } from '../../shared/components/modal/modal.service';

import { MessageType } from './message-type.enum';

describe('MessageService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CoreModule,
      ModalModule
    ]
  }));

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it('alert function 應該根據傳入的參數，傳給 Message Component 所需資料，並 開啟 alert message modal',
    inject([MessageService, ModalService], (message: MessageService, modal: ModalService) => {

      const spy = spyOn(modal, 'open');

      const dataKey = 'data';

      const mockData = {
        content: 'a',
        title: 'b',
        okBtnTitle: 'c',
        type: MessageType.ALERT
      };

      message.alert(mockData.content, mockData.title, mockData.okBtnTitle);

      const args = spy.calls.first().args;

      expect(args[1][dataKey]).toEqual(mockData);

    })
  );

  it('confirm function 應該根據傳入的參數，傳給 Message Component 所需資料，並 開啟 confirm message modal',
    inject([MessageService, ModalService], (message: MessageService, modal: ModalService) => {

      const spy = spyOn(modal, 'open');

      const dataKey = 'data';

      const mockData = {
        content: 'a',
        title: 'b',
        okBtnTitle: 'c',
        cancelBtnTitle: 'd',
        type: MessageType.CONFIRM
      };

      message.confirm(mockData.content, mockData.title, mockData.okBtnTitle , mockData.cancelBtnTitle);

      const args = spy.calls.first().args;

      expect(args[1][dataKey]).toEqual(mockData);

    })
  );

});
