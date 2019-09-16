import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '../../shared/components/modal/modal.module';

import { MessageComponent } from './message.component';

import { MessageService } from './message.service';

@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    ModalModule
  ],
  providers: [
    MessageService
  ],
  exports: [MessageComponent],
  entryComponents: [MessageComponent]
})
export class MessageModule { }
