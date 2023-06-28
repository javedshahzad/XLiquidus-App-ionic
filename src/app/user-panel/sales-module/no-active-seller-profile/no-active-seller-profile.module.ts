import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoActiveSellerProfilePageRoutingModule } from './no-active-seller-profile-routing.module';

import { NoActiveSellerProfilePage } from './no-active-seller-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoActiveSellerProfilePageRoutingModule,
    SharedModule
  ],
  declarations: [NoActiveSellerProfilePage],
  providers: [
    InAppBrowser
  ]
})
export class NoActiveSellerProfilePageModule {}
