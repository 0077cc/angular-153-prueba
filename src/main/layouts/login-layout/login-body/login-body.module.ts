import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginBodyComponent } from './login-body.component';
import { LoginFormModule } from 'src/main/components/login/login-form/login-form.module';

@NgModule({
  imports: [
    RouterModule,
    LoginFormModule
  ],
  exports: [
    LoginBodyComponent
  ],
  declarations: [
    LoginBodyComponent
  ],
  providers: [],
})
export class LoginBodyModule { }
