import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

import { AdminLoginComponent } from './admin-login.component';

import { appRoutePaths } from '../constant/app-route-paths.const';

const redirectLoggedInToLanding = redirectLoggedInTo([appRoutePaths.issues.path]);

const routes: Routes = [{
  path: '',
  component: AdminLoginComponent,
  ...canActivate(redirectLoggedInToLanding)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLoginRoutingModule { }
