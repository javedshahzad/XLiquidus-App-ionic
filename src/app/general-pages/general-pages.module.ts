import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from '../general-pages/login/login.component';
import { SignUpComponent } from '../general-pages/sign-up/sign-up.component';
import { HomeComponent } from '../general-pages/home/home.component';
import { SignupConfirmmessageComponent } from '../general-pages/signup-confirmmessage/signup-confirmmessage.component';
import { SignupStep2Component } from '../general-pages/signup-step2/signup-step2.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BrMaskerModule } from 'br-mask';
import { TncComponent } from './tnc/tnc.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AppUpdateComponent } from './app-update/app-update.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SignupOptionsComponent } from './signup-options/signup-options.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CardPaymentsComponent } from './card-payments/card-payments.component';
import { CheckoutTransactionSummaryComponent } from './checkout-transaction-summary/checkout-transaction-summary.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordStepOneComponent } from './reset-password-step-one/reset-password-step-one.component';
import { ResetPasswordStepTwoComponent } from './reset-password-step-two/reset-password-step-two.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'HomeComponent' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'signup-options',
    component: SignupOptionsComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'signupconfirm',
    component: SignupConfirmmessageComponent,
    data: { title: 'Sign Up Confirm Message' }
  },
  {
    path: 'signupstep2',
    component: SignupStep2Component,
    data: { title: 'Sign Up Step2' }
  },
  {
    path: 'tnc',
    component: TncComponent,
    data: { title: 'Terms & Condition' }
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { title: 'Maintenance' }
  },
  {
    path: 'app-update',
    component: AppUpdateComponent,
    data: { title: 'App Update Available' }
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: { title: 'Privacy Policy' }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' }
  },
  {
    path: 'card-payments',
    component: CardPaymentsComponent,
    data: { title: 'Card Payments' }
  },
  {
    path: 'transaction-summary/:id',
    component: CheckoutTransactionSummaryComponent,
    data: { title: 'Transaction Summary' }
  },
  {
    path: 'reset-password-setp-one',
    component: ResetPasswordStepOneComponent,
    data: { title: 'Reset password' }
  },
  {
    path: 'reset-password-setp-two',
    component: ResetPasswordStepTwoComponent,
    data: { title: 'Reset password' }
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    SignupConfirmmessageComponent,
    SignupStep2Component,
    TncComponent,
    MaintenanceComponent,
    AppUpdateComponent,
    PrivacyComponent,
    SignupOptionsComponent,
    ForgotPasswordComponent,
    CardPaymentsComponent,
    CheckoutTransactionSummaryComponent,
    ResetPasswordStepOneComponent,
    ResetPasswordStepTwoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule,
    TranslateModule,
    SharedModule
  ],
  providers: [
    InAppBrowser,
  ]
})

export class GenralPagesModule { }
