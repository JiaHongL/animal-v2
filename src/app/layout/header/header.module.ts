import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';

import { SharedModule } from '../../shared/shared.module';
import { ConditionModalModule } from './condition-modal/condition-modal.module';
import { IdModalModule } from './id-modal/id-modal.module';
import { AreaModalModule } from './area-modal/area-modal.module';
import { ShelterModalModule } from './shelter-modal/shelter-modal.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ConditionModalModule,
    IdModalModule,
    AreaModalModule,
    ShelterModalModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
