import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NetworkingService } from './networking.service';
import { NetworkInterceptor } from './networking-interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    },
    NetworkingService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class NetworkingModule { }
