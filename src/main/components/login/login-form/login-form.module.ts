import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiSelectModule } from 'ng2-semantic-ui';

import { LoginFormComponent } from './login-form.component';
import { AuthService } from 'src/providers/services/auth.services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuiSelectModule,
    HttpClientModule
  ],
  exports: [
    LoginFormComponent
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [AuthService],
})
export class LoginFormModule { }
