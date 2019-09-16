import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthErrorRoutingModule } from './auth-error-routing.module';

import { AuthErrorComponent } from './auth-error.component';


@NgModule({
  declarations: [AuthErrorComponent],
  imports: [
    CommonModule,
    AuthErrorRoutingModule
  ]
})
export class AuthErrorModule { }
