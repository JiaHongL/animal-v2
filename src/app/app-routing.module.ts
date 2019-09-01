import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { appRoutePaths } from './constant/app-route-paths.const';


const routes: Routes = [
  {
    path: appRoutePaths.layout,
    loadChildren: './layout/layout.module#LayoutModule'
  },
  {
    path: '**',
    redirectTo: appRoutePaths.layout
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
