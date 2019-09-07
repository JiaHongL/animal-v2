import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
