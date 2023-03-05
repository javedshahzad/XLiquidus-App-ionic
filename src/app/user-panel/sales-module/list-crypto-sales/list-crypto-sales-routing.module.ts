import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCryptoSalesPage } from './list-crypto-sales.page';

const routes: Routes = [
  {
    path: '',
    component: ListCryptoSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCryptoSalesPageRoutingModule {}
