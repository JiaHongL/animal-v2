import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdModalComponent } from './id-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [IdModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [IdModalComponent],
  entryComponents: [IdModalComponent]
})
export class IdModalModule { }
