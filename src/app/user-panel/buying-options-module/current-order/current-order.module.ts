import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentOrderPageRoutingModule } from './current-order-routing.module';

import { CurrentOrderPage } from './current-order.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentOrderPageRoutingModule,
    SharedModule
  ],
  declarations: [CurrentOrderPage]
})
export class CurrentOrderPageModule {}
