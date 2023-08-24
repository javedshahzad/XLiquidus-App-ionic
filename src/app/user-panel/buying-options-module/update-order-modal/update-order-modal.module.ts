import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateOrderModalPageRoutingModule } from './update-order-modal-routing.module';

import { UpdateOrderModalPage } from './update-order-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateOrderModalPageRoutingModule
  ],
  declarations: [UpdateOrderModalPage]
})
export class UpdateOrderModalPageModule {}
