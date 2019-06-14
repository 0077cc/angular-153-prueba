import { NgModule } from '@angular/core';

import { LoginBodyModule } from './login-body/login-body.module';
import { LoginFooterModule } from './login-footer/login-footer.module';

import { LoginLayoutComponent } from './login-layout.component';

@NgModule({
  imports: [
    LoginBodyModule,
    LoginFooterModule
  ],
  exports: [
    LoginLayoutComponent
  ],
  declarations: [
    LoginLayoutComponent
  ],
  providers: [],
})
export class LoginLayoutModule { }
