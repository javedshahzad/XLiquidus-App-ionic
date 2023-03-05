import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesProfileSignupPageRoutingModule } from './sales-profile-signup-routing.module';

import { SalesProfileSignupPage } from './sales-profile-signup.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesProfileSignupPageRoutingModule,
    SharedModule
  ],
  declarations: [SalesProfileSignupPage]
})
export class SalesProfileSignupPageModule {}
