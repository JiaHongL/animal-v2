import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';

import { SharedModule } from '../../shared/shared.module';
import { ConditionModalModule } from './condition-modal/condition-modal.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConditionModalModule,
    RouterModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
