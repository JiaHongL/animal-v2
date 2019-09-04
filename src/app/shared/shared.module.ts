
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListModule } from './components/card-list/card-list.module';
import { ImageModalModule } from './components/image-modal/image-modal.module';
import { ModalModule } from './components/modal/modal.module';

import { AnimalModule } from './pipes/animal/animal.module';

import { GoTopModule } from './directives/go-top/go-top.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CardListModule,
    ImageModalModule,
    ModalModule,
    AnimalModule,
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
