import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { DetailComponent } from './detail.component';

import { AnimalDetailResolver } from '../../resolver/animal-detail-resolver/animal-detail.resolver';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    SharedModule
  ],
  providers: [AnimalDetailResolver]
})
export class DetailModule { }
