import { appRoutePaths } from './../constant/app-route-paths.const';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

import { AuthGuard } from '../guard/auth/auth.guard';

const routes: Routes = [{
  path: appRoutePaths.layout,
  component: LayoutComponent,
  children: [
    {
      path: '',
      redirectTo: appRoutePaths.home.path,
      pathMatch: 'full'
    },
    {
      path: appRoutePaths.home.path,
      data: {
        title: appRoutePaths.home.title,
      },
      loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
    },
    {
      path: appRoutePaths.detail.path,
      data: {
        title: appRoutePaths.detail.title,
      },
      loadChildren: () => import('../pages/detail/detail.module').then(m => m.DetailModule)
    },
    {
      path: appRoutePaths.favorite.path,
      data: {
        title: appRoutePaths.favorite.title,
      },
      loadChildren: () => import('../pages/favorite/favorite.module').then(m => m.FavoriteModule)
    },
    {
      path: appRoutePaths.feedback.path,
      data: {
        title: appRoutePaths.feedback.title,
      },
      loadChildren: () => import('../pages/feedback/feedback.module').then(m => m.FeedbackModule)
    },
    {
      path: appRoutePaths.issues.path,
      data: {
        title: appRoutePaths.issues.title,
      },
      loadChildren: () => import('../pages/issues/issues.module').then(m => m.IssuesModule),
      canActivate: [AuthGuard]
    },
    {
      path: appRoutePaths.issueDetail.path,
      data: {
        title: appRoutePaths.issueDetail.title,
      },
      loadChildren: () => import('../pages/issue-detail/issue-detail.module').then(m => m.IssueDetailModule)
    },
    {
      path: appRoutePaths.archive.path,
      data: {
        title: appRoutePaths.archive.title,
      },
      loadChildren: () => import('../pages/archive/archive.module').then(m => m.ArchiveModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
