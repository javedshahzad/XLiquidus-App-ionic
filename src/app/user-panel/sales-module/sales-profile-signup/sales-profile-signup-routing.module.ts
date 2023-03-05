import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesProfileSignupPage } from './sales-profile-signup.page';

const routes: Routes = [
  {
    path: '',
    component: SalesProfileSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesProfileSignupPageRoutingModule {}
