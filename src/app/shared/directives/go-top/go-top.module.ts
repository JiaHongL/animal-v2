import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoTopDirective } from './go-top.directive';

@NgModule({
  declarations: [GoTopDirective],
  imports: [
    CommonModule
  ],
  exports: [GoTopDirective]
})
export class GoTopModule { }
