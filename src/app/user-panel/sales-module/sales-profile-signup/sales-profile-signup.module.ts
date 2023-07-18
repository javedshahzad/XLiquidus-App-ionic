import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesProfileSignupPageRoutingModule } from './sales-profile-signup-routing.module';

import { SalesProfileSignupPage } from './sales-profile-signup.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrMaskerModule } from 'br-mask';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesProfileSignupPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BrMaskerModule,
    TranslateModule,
  ],
  declarations: [SalesProfileSignupPage]
})
export class SalesProfileSignupPageModule {}
