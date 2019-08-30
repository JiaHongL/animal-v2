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
import { ModalService } from './modal/modal.service';

// component
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';

const components = [
  LoadingComponent,
  ModalComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    StorageModule,
    NetworkingModule,
    SelectsModule
  ],
  providers: [
    ApiService,
    LoadingService,
    UtilityService,
    ModalService
  ],
  exports: components,
  entryComponents: [ModalComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. it in the AppModule only');
    }
  }
}

