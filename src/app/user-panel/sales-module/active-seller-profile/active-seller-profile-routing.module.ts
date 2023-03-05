import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveSellerProfilePage } from './active-seller-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveSellerProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveSellerProfilePageRoutingModule {}
