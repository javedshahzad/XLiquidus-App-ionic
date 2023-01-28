import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPanelPageRoutingModule } from './user-panel-routing.module';

import { UserPanelPage } from './user-panel.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { KYCComponent } from './kyc/kyc.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { TransactionHistoryDetailsComponent } from './transaction-history-details/transaction-history-details.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { LiquidateComponent } from './liquidate/liquidate.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { TransactionStatusKycComponent } from './transaction-status-kyc/transaction-status-kyc.component';
import { TransactionStatusComponent } from './transaction-status/transaction-status.component';
import { AboutComponent } from './about/about.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LimitsComponent } from './limits/limits.component';
import { PaywithcrptoComponent } from './paywithcrpto/paywithcrpto.component'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MfaComponent } from './mfa/mfa.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { AddBankDetailComponent } from './add-bank-detail/add-bank-detail.component';
import { AddCryptoWalletComponent } from './add-crypto-wallet/add-crypto-wallet.component';
import { BrMaskerModule } from 'br-mask';
import { PayWithCardComponent } from './pay-with-card/pay-with-card.component';

import { AboutXliquidusComponent } from './about-xliquidus/about-xliquidus.component';
import { FaqComponent } from './faq/faq.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { LetsLiquidateComponent } from './lets-liquidate/lets-liquidate.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { SalesComponent } from './sales-module/sales/sales.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PipesModule,
    SharedModule,
    UserPanelPageRoutingModule,
    BrMaskerModule,
    NgSelectModule
  ],
  declarations: [
    UserPanelPage,
    KYCComponent,
    DashboardComponent,
    WatchlistPageComponent,
    NotificationPageComponent,
    TransactionHistoryComponent,
    TransactionHistoryDetailsComponent,
    ShopingCartComponent,
    ConfirmOrderComponent,
    ProductPageComponent,
    MyWalletComponent,
    TransactionStatusKycComponent,
    TransactionStatusComponent,
    LiquidateComponent,
    BuyNowComponent,
    AboutComponent,
    LimitsComponent,
    ChangePasswordComponent,
    PaywithcrptoComponent,
    MfaComponent,
    TransferMoneyComponent,
    AddBankDetailComponent,
    AddCryptoWalletComponent,
    PayWithCardComponent,
    AboutXliquidusComponent,
    FaqComponent,
    LetsLiquidateComponent,
    SalesComponent
  ],
  providers: [
    InAppBrowser,
    Clipboard
  ]
})
export class UserPanelPageModule { }
