import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCryptoSalesDetailsPage } from './list-crypto-sales-details.page';

const routes: Routes = [
  {
    path: '',
    component: ListCryptoSalesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCryptoSalesDetailsPageRoutingModule {}
