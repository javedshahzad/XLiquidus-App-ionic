import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProfilePageRoutingModule } from './my-profile-routing.module';

import { MyProfilePage } from './my-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({ 
  declarations: [
    MyProfilePage
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MyProfilePageRoutingModule
  ], 
})
export class MyProfilePageModule {}
