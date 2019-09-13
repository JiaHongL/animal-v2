import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueDetailComponent } from './issue-detail.component';

import { appRoutePaths } from '../../constant/app-route-paths.const';

const routes: Routes = [
  {
    path: ':id',
    component: IssueDetailComponent
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
