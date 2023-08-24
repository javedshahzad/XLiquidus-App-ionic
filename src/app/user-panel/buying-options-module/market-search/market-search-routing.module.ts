import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketSearchPage } from './market-search.page';

const routes: Routes = [
  {
    path: '',
    component: MarketSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketSearchPageRoutingModule {}
