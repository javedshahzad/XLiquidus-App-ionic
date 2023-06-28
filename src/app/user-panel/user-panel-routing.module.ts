import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KYCComponent } from './kyc/kyc.component';
import { LimitsComponent } from './limits/limits.component';
import { LiquidateComponent } from './liquidate/liquidate.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { TransactionHistoryDetailsComponent } from './transaction-history-details/transaction-history-details.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransactionStatusKycComponent } from './transaction-status-kyc/transaction-status-kyc.component';
import { TransactionStatusComponent } from './transaction-status/transaction-status.component';
import { UserPanelPage } from './user-panel.page';
import { PaywithcrptoComponent } from './paywithcrpto/paywithcrpto.component';
import { MfaComponent } from './mfa/mfa.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { AddBankDetailComponent } from './add-bank-detail/add-bank-detail.component';
import { AddCryptoWalletComponent } from './add-crypto-wallet/add-crypto-wallet.component';
import { PayWithCardComponent } from './pay-with-card/pay-with-card.component';
import { AboutXliquidusComponent } from './about-xliquidus/about-xliquidus.component';
import { FaqComponent } from './faq/faq.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { LetsLiquidateComponent } from './lets-liquidate/lets-liquidate.component';
import { SalesComponent } from './sales-module/sales/sales.component';
const routes: Routes = [
  {
    path: '',
    component: UserPanelPage,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent
      },
      {
        path: 'transaction-history-details',
        component: TransactionHistoryDetailsComponent
      },
      {
        path: 'kyc',
        component: KYCComponent
      },
      {
        path: 'shoping-cart',
        component: ShopingCartComponent
      },
      {
        path: 'confirm-order',
        component: ConfirmOrderComponent
      },
      {
        path: 'product-page',
        component: ProductPageComponent
      },
      {
        path: 'wallet-page',
        component: MyWalletComponent
      },
      {
        path: "transaction-status",
        component: TransactionStatusComponent
      },
      {
        path: 'Transaction-Status-Kyc',
        component: TransactionStatusKycComponent
      },
      {
        path: 'PayWithCrypto',
        component: PaywithcrptoComponent
      },
      {
        path: 'liquidate',
        component: LiquidateComponent
      },
      {
        path: 'notification',
        component: NotificationPageComponent,
      },
      {
        path: 'watchlist',
        component: WatchlistPageComponent,
      },
      {
        path: 'buy-now',
        component: BuyNowComponent
      },
      {
        path: 'mfa',
        component: MfaComponent
      },
      {
        path: 'transfer-money',
        component: TransferMoneyComponent
      },
      {
        path: 'add-bank-detail',
        component: AddBankDetailComponent
      },
      {
        path: 'add-crypto-wallet',
        component: AddCryptoWalletComponent
      },
      {
        path: 'pay-with-card',
        component: PayWithCardComponent
      },
      {
        path: 'helpfaq',
        component: FaqComponent
      },
      {
        path: 'aboutxl',
        component: AboutXliquidusComponent
      },

      // {
      //   path:'product-page',
      //   component:ProductPageComponent
      // }, 
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'limits',
        component: LimitsComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'pay-with-card',
        component: PayWithCardComponent,
      },
      {
        path: 'lets-liquidate',
        component: LetsLiquidateComponent,
      },
      {
        path:'sales',
        component:SalesComponent
      },
      {
        path: 'sales-profile-signup',
        children: [
        {
          path:"",
          loadChildren: () => import('./sales-module/sales-profile-signup/sales-profile-signup.module').then( m => m.SalesProfileSignupPageModule)
        }
        ]
      },
      {
        path: 'no-active-seller-profile',
        children: [
        {
          path:"",
          loadChildren: () => import('./sales-module/no-active-seller-profile/no-active-seller-profile.module').then( m => m.NoActiveSellerProfilePageModule)
        }
        ]
      },
      {
        path: 'active-seller-profile',
        children: [
        {
          path:"",
          loadChildren: () => import('./sales-module/active-seller-profile/active-seller-profile.module').then( m => m.ActiveSellerProfilePageModule)
        }
        ]
      },
      {
        path: 'list-crypto-sales',
        children: [
        {
          path:"",
          loadChildren: () => import('./sales-module/list-crypto-sales/list-crypto-sales.module').then( m => m.ListCryptoSalesPageModule)
        }
        ]
      },
      {
        path: 'list-crypto-sales-details',
        children: [
        {
          path:"",
          loadChildren: () => import('./sales-module/list-crypto-sales-details/list-crypto-sales-details.module').then( m => m.ListCryptoSalesDetailsPageModule)
        }
        ]
      },
      {
        path: 'myprofile',
        loadChildren: () => import('../user-panel/my-profile/my-profile.module').then(m => m.MyProfilePageModule)
      },

    ]

  },
  {
    path: '',
    redirectTo: '/user-panel/tab1',
    pathMatch: 'full'
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfilePageModule)
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPanelPageRoutingModule { }
