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
      loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
    },
    {
      path: appRoutePaths.detail.path,
      loadChildren: () => import('../pages/detail/detail.module').then(m => m.DetailModule)
    },
    {
      path: appRoutePaths.favorite.path,
      loadChildren: () => import('../pages/favorite/favorite.module').then(m => m.FavoriteModule)
    },
    {
      path: appRoutePaths.feedback.path,
      loadChildren: () => import('../pages/feedback/feedback.module').then(m => m.FeedbackModule)
    },
    {
      path: appRoutePaths.issues.path,
      loadChildren: () => import('../pages/issues/issues.module').then(m => m.IssuesModule),
      canActivate: [AuthGuard]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
