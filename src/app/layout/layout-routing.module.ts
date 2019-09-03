import { appRoutePaths } from './../constant/app-route-paths.const';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

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
      loadChildren: '../pages/home/home.module#HomeModule',
    },
    {
      path: appRoutePaths.detail.path,
      loadChildren: '../pages/detail/detail.module#DetailModule',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
