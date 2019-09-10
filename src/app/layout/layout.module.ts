import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent } from './layout.component';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { SharedModule } from './../shared/shared.module';

import { AuthGuard } from '../guard/auth/auth.guard';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FooterModule,
    HeaderModule,
    SharedModule
  ],
  providers: [
    AuthGuard
  ]
})
export class LayoutModule { }
