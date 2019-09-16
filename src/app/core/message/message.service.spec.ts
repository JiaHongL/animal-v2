import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

import { CoreModule } from '../core.module';
import { ModalModule } from './../../shared/components/modal/modal.module';

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
});
