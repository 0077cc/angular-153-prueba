import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { LoginFormModule } from 'src/main/components/login/login-form/login-form.module';

@NgModule({
  imports: [
    LoginRoutingModule,
    LoginFormModule
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: [],
})
export class LoginModule { }
