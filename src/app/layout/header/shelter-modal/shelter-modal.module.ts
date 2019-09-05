import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelterModalComponent } from './shelter-modal.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [ShelterModalComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ShelterModalComponent],
  entryComponents: [ShelterModalComponent]
})
export class ShelterModalModule { }
