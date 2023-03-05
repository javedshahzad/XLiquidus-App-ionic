import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveSellerProfilePageRoutingModule } from './active-seller-profile-routing.module';

import { ActiveSellerProfilePage } from './active-seller-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveSellerProfilePageRoutingModule,
    SharedModule
  ],
  declarations: [ActiveSellerProfilePage]
})
export class ActiveSellerProfilePageModule {}
