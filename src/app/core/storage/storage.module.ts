import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// module
import { NgxWebstorageModule } from 'ngx-webstorage';

// service
import { StorageService } from './storage.service';

@NgModule({
  imports: [
    CommonModule,
    NgxWebstorageModule.forRoot()
  ],
  declarations: [],
  providers: [StorageService]
})
export class StorageModule { }
