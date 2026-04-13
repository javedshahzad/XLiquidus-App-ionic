import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelHeaderComponent } from './user-panel-header/user-panel-header.component';
import { GraphComponent } from './graph/graph.component';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { CreateCartComponent } from './create-cart/create-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountDepositComponent } from './account-deposit/account-deposit.component';


@NgModule({
  declarations: [
    UserPanelHeaderComponent,
    GraphComponent,
    CreateCartComponent,
    AccountDepositComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserPanelHeaderComponent,
    GraphComponent,
    CreateCartComponent,
    AccountDepositComponent
  ]
})
export class SharedModule { }
