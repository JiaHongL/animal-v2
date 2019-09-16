import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaModalComponent } from './area-modal.component';

import { SharedModule } from './../../../shared/shared.module';

@NgModule({
  declarations: [AreaModalComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AreaModalComponent],
  entryComponents: [AreaModalComponent]
})
export class AreaModalModule { }
