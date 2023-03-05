import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCryptoSalesDetailsPageRoutingModule } from './list-crypto-sales-details-routing.module';

import { ListCryptoSalesDetailsPage } from './list-crypto-sales-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCryptoSalesDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [ListCryptoSalesDetailsPage]
})
export class ListCryptoSalesDetailsPageModule {}
