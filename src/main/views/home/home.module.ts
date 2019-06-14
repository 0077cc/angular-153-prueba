import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { ForecastFormModule } from 'src/main/components/forecast/forecast-form/forecast-form.module';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  imports: [
    HomeRoutingModule,
    ForecastFormModule
  ],
  exports: [],
  declarations: [
    HomeComponent
  ],
  providers: [],
})
export class HomeModule { }
