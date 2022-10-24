import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCurrencyPipe } from './dashboard-currency.pipe';
import { FullObjectFilterPipe } from './full-object-filter.pipe';



@NgModule({
  declarations: [
    DashboardCurrencyPipe,
    FullObjectFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DashboardCurrencyPipe,
    FullObjectFilterPipe
  ]
})
export class PipesModule { }
