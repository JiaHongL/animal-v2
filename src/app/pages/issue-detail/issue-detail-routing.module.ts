import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueDetailComponent } from './issue-detail.component';

import { appRoutePaths } from '../../constant/app-route-paths.const';
import { IssueDetailResolver } from '../../resolver/issue-detail-resolver/issue-detail.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: IssueDetailComponent,
    resolve: {
      issue: IssueDetailResolver
    }
  },
  {
    path: '',
    redirectTo: '/' + appRoutePaths.home.path,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueDetailRoutingModule { }
