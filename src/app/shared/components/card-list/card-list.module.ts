import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardListComponent } from './card-list.component';

@NgModule({
  declarations: [CardListComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [CardListComponent]
})
export class CardListModule { }
