import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardListComponent } from './card-list.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { UtilityService } from '../../../core/utility/utility.service';

@NgModule({
  declarations: [CardListComponent],
  imports: [
    CommonModule,
    RouterModule,
    LazyLoadImageModule
  ],
  exports: [CardListComponent],
  providers: [
    UtilityService
  ]
})
export class CardListModule { }
