import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateOrderModalPage } from './update-order-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateOrderModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateOrderModalPageRoutingModule {}
