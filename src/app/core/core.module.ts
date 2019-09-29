import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

// Module
import { StorageModule } from './storage/storage.module';
import { NetworkingModule } from './networking/networking.module';
import { SelectsModule } from './selects/selects.module';
import { LoadingModule } from './loading/loading.module';
import { FirebaseModule } from './firebase/firebase.module';
import { MessageModule } from './message/message.module';

// service
import { ApiService } from './api/api.service';
import { UtilityService } from './utility/utility.service';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    CommonModule,
    StorageModule,
    NetworkingModule,
    SelectsModule,
    MessageModule
  ],
  providers: [
    ApiService,
    UtilityService,
    UserService,
    AngularFireAuthGuard
  ],
  exports: [
    LoadingModule,
    FirebaseModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. it in the AppModule only');
    }
  }
}

