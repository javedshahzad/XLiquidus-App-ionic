import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { UserPanelPage } from '../user-panel.page';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  backButtonSubscription: any;
  cartDetail: any;
  ischeck = false;
  isDataLoad = false;
  CartId: any;
  checkoutCode: any;
  currentDateTime: any;
  isMFARequired: boolean = false;
  constructor(
    public _appServices: AppService,
    public activatedroute: ActivatedRoute,
    public platform: Platform,
    public _nav: NavController,
    public router: Router,
    public _encServices: EncryptionDecryptionService,
    private userPanel: UserPanelPage
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.currentDateTime = new Date();
    this.cartDetail = [];
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/shoping-cart']);
    });
    this.isDataLoad = true;
    this.getCartDetails();
  }

  async getCartDetails() {
    this._appServices.presentLoading();
    var UserDetailsUrl = `ShoppingCart/GetActiveCart?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
      if (_res.status == 200) {
        localStorage.setItem('cartId', _res.data.cartId);
        this.isDataLoad = false;
        this.cartDetail = _res.data;
        console.log(this.cartDetail);
        this.isMFARequired = this.cartDetail.isMfaRequired;
      }
      this._appServices.loaderDismiss();
    });
  }

  // makePayment() {
  //   this.isDataLoad = true;
  //   var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIp=${this._appServices.ipAddress.ip}&cartId=${this.cartDetail.cartId}&authCode=${''}`
  //   this._appServices.postDataByPromissHttp(`ShoppingCart/CompleteCheckoutByCartId?${UrlParameters}`, {}).then(res => {
  //     console.log("responce data", res);
  //     this.isDataLoad = false;
  //     this._appServices.cartRefresh.next(true);
  //     if (res.status == 200) {
  //       localStorage.setItem('checkOutId', res.data.summary.checkoutCode);
  //       this._nav.navigateRoot(['/user-panel/kyc']);
  //     } else if (res.status == 400) {
  //       console.log(res.data.error);
  //       var result = JSON.parse(res.data.error)
  //       this._appServices.ionicCustomAlert("Minimum Purchase Requirement", "", result.message, "Keep Shopping");
  //     }
  //   });
  // }

  makePayment() {
    if (this.isMFARequired) {
      if (this._appServices.loggedInUserAccountDetails.enableMultiFactorAuthentication) {
        this._nav.navigateRoot(['/user-panel/mfa']);
      } else {
        this.userPanel.getUserDetails();
        this._nav.navigateRoot(['/user-panel']);
      }
    } else {
      this.isDataLoad = true;
      var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}&cartId=${this.cartDetail.cartId}&cartType=XCH&authCode=${''}`
      this._appServices.postDataByPromissHttp(`ShoppingCart/PostCompleteCheckout?${UrlParameters}`, {}).then(res => {
        console.log("responce data", res);
        this.isDataLoad = false;
        this._appServices.cartRefresh.next(true);
        if (res.status == 200) {
          localStorage.setItem('checkOutId', res.data.summary.checkoutCode);
          this._nav.navigateRoot(['/user-panel/kyc']);
        } else if (res.status == 400) {
          console.log(res.data.error);
          var result = JSON.parse(res.data.error)
          this._appServices.ionicCustomAlert("Minimum Purchase Requirement", "", result.message, "Keep Shopping");
        }
      });
    }
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/shoping-cart']);
  }
}
