import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTransformPipe } from './data-transform.pipe';

@NgModule({
  declarations: [DataTransformPipe],
  imports: [
    CommonModule
  ],
  exports: [DataTransformPipe]
})
export class DataTransformModule { }
