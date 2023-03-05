import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoActiveSellerProfilePage } from './no-active-seller-profile.page';

const routes: Routes = [
  {
    path: '',
    component: NoActiveSellerProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoActiveSellerProfilePageRoutingModule {}
