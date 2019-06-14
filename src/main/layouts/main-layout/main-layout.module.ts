import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiTabsModule, SuiModalModule } from 'ng2-semantic-ui';

import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  imports: [
    CommonModule,
    SuiTabsModule,
    SuiModalModule
  ],
  exports: [],
  declarations: [
    MainLayoutComponent
  ],
  providers: [],
})
export class MainLayoutModule { }
