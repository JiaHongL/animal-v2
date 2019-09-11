import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueTableComponent } from './issue-table.component';

import { DataTransformModule } from '../../pipes/data-transform/data-transform.module';

@NgModule({
  declarations: [IssueTableComponent],
  imports: [
    CommonModule,
    DataTransformModule
  ],
  exports: [IssueTableComponent]
})
export class IssueTableModule { }
