import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCryptoSalesPageRoutingModule } from './list-crypto-sales-routing.module';

import { ListCryptoSalesPage } from './list-crypto-sales.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCryptoSalesPageRoutingModule,
    SharedModule
  ],
  declarations: [ListCryptoSalesPage]
})
export class ListCryptoSalesPageModule {}
