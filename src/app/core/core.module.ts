import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { StorageModule } from './storage/storage.module';
import { NetworkingModule } from './networking/networking.module';
import { SelectsModule } from './selects/selects.module';

// service
import { ApiService } from './api/api.service';
import { LoadingService } from './loading/loading.service';
import { UtilityService } from './utility/utility.service';

// component
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    StorageModule,
    NetworkingModule,
    SelectsModule
  ],
  providers: [
    ApiService,
    LoadingService,
    UtilityService
  ],
  exports: [LoadingComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. it in the AppModule only');
    }
  }
}

