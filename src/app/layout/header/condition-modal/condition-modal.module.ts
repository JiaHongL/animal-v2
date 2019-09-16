import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ConditionModalComponent } from './condition-modal.component';

@NgModule({
  declarations: [ConditionModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ConditionModalComponent],
  entryComponents: [ConditionModalComponent]
})
export class ConditionModalModule { }
