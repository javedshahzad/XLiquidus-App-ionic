import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenExpiresPage } from './token-expires.page';

const routes: Routes = [
  {
    path: '',
    component: TokenExpiresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenExpiresPageRoutingModule {}
