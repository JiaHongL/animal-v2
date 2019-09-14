import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueDetailRoutingModule } from './issue-detail-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { RemarkModalModule } from './remark-modal/remark-modal.module';

import { IssueDetailComponent } from './issue-detail.component';

import { IssueDetailResolver } from '../../resolver/issue-detail-resolver/issue-detail.resolver';

@NgModule({
  declarations: [IssueDetailComponent],
  imports: [
    CommonModule,
    IssueDetailRoutingModule,
    SharedModule,
    RemarkModalModule
  ],
  providers: [
    IssueDetailResolver
  ]
})
export class IssueDetailModule { }
