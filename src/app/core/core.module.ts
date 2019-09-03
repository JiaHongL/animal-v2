import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { StorageModule } from './storage/storage.module';
import { NetworkingModule } from './networking/networking.module';
import { SelectsModule } from './selects/selects.module';
import { LoadingModule } from './loading/loading.module';

// service
import { ApiService } from './api/api.service';
import { UtilityService } from './utility/utility.service';

@NgModule({
  imports: [
    CommonModule,
    StorageModule,
    NetworkingModule,
    SelectsModule
  ],
  providers: [
    ApiService,
    UtilityService
  ],
  exports: [
    LoadingModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. it in the AppModule only');
    }
  }
}

