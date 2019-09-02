import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListModule } from './components/card-list/card-list.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CardListModule
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
