import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageModalComponent } from './image-modal.component';

@NgModule({
  declarations: [ImageModalComponent],
  imports: [
    CommonModule
  ],
  exports: [ImageModalComponent],
  entryComponents: [ImageModalComponent]
})
export class ImageModalModule { }
