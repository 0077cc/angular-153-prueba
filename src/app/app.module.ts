import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SuiModule } from 'ng2-semantic-ui';
import { RoutesModule } from 'src/routes/routes.module';

import { LoginLayoutModule, MainLayoutModule } from 'src/main/layouts/modules';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SuiModule,
    BrowserModule,
    RoutesModule,
    LoginLayoutModule,
    MainLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
