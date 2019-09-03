import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalPipe } from './animal.pipe';

@NgModule({
  declarations: [AnimalPipe],
  imports: [
    CommonModule
  ],
  exports: [AnimalPipe]
})
export class AnimalModule { }
