import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent } from './layout.component';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FooterModule,
    HeaderModule
  ]
})
export class LayoutModule { }
