import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueDetailRoutingModule } from './issue-detail-routing.module';

import { IssueDetailComponent } from './issue-detail.component';


@NgModule({
  declarations: [IssueDetailComponent],
  imports: [
    CommonModule,
    IssueDetailRoutingModule
  ]
})
export class IssueDetailModule { }
