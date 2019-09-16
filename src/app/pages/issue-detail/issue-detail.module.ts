import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueDetailComponent } from './issue-detail.component';

import { IssueDetailRoutingModule } from './issue-detail-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { RemarkModalModule } from './remark-modal/remark-modal.module';
import { AddHistoryModalModule } from './add-history-modal/add-history-modal.module';

import { IssueDetailResolver } from '../../resolver/issue-detail-resolver/issue-detail.resolver';

@NgModule({
  declarations: [IssueDetailComponent],
  imports: [
    CommonModule,
    IssueDetailRoutingModule,
    SharedModule,
    RemarkModalModule,
    AddHistoryModalModule
  ],
  providers: [
    IssueDetailResolver
  ]
})
export class IssueDetailModule { }
