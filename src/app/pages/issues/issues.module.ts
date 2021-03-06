import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesComponent } from './issues.component';

import { ButtonGroupModule } from './button-group/button-group.module';
import { SharedModule } from './../../shared/shared.module';


@NgModule({
  declarations: [IssuesComponent],
  imports: [
    CommonModule,
    IssuesRoutingModule,
    ButtonGroupModule,
    SharedModule
  ]
})
export class IssuesModule { }
