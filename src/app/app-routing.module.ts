import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { appRoutePaths } from './constant/app-route-paths.const';


const routes: Routes = [
  {
    path: appRoutePaths.adLogin.path,
    loadChildren: () => import('./admin-login/admin-login.module').then(m => m.AdLoginModule)
  },
  {
    path: appRoutePaths.authError.path,
    loadChildren: () => import('./auth-error/auth-error.module').then(m => m.AuthErrorModule)
  },
  {
    path: appRoutePaths.layout,
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
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
