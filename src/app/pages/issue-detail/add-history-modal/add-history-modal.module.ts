import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddHistoryModalComponent } from './add-history-modal.component';

@NgModule({
  declarations: [AddHistoryModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AddHistoryModalComponent],
  entryComponents: [AddHistoryModalComponent]
})
export class AddHistoryModalModule { }
