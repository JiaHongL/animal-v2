import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemarkModalComponent } from './remark-modal.component';

@NgModule({
  declarations: [RemarkModalComponent],
  imports: [
    CommonModule
  ],
  exports: [RemarkModalComponent],
  entryComponents: [RemarkModalComponent]
})
export class RemarkModalModule { }
