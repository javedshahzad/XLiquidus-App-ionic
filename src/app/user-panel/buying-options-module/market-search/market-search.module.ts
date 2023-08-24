import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketSearchPageRoutingModule } from './market-search-routing.module';

import { MarketSearchPage } from './market-search.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketSearchPageRoutingModule,
    SharedModule
  ],
  declarations: [MarketSearchPage]
})
export class MarketSearchPageModule {}
