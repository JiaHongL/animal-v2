import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './detail.component';

import { appRoutePaths } from './../../constant/app-route-paths.const';

import { AnimalDetailResolver } from './../../resolver/animal-detail-resolver/animal-detail.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: DetailComponent,
    resolve: {
      animal: AnimalDetailResolver
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
export class DetailRoutingModule { }
