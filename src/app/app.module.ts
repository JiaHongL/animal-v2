import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// module
import { AppRoutingModule } from './app-routing.module';
import { FirebaseModule } from './firebase.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

// component
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirebaseModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
