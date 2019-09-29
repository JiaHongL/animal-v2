import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// module
import { AppRoutingModule } from './app-routing.module';
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
    HttpClientModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
