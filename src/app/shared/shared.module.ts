
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListModule } from './components/card-list/card-list.module';
import { ImageModalModule } from './components/image-modal/image-modal.module';
import { ModalModule } from './components/modal/modal.module';
import { GoTopModule } from './directives/go-top/go-top.module';
import { DataTransformModule } from './pipes/data-transform/data-transform.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CardListModule,
    ImageModalModule,
    ModalModule,
    DataTransformModule,
    GoTopModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
