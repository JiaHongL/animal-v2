import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module
import { StorageModule } from './storage/storage.module';
import { NetworkingModule } from './networking/networking.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StorageModule,
    NetworkingModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. it in the AppModule only');
    }
  }
}

