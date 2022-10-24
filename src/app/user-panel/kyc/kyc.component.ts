import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { forkJoin } from 'rxjs';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { ActivatedRoute, Router } from '@angular/router';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
})
export class KYCComponent implements OnInit {
  iscardshow = false;
  cardvalue: any;
  date: any;
  maxDate: any;
  step: any = 1;
  userDetails: any;
  cryptoCoins: any;
  userCoinMetricsList: any;
  currencyType: any;
  CartId: any;
  case: any;
  isDataLoad = false;
  checkoutCode: any;
  backButtonSubscription: any;
  totalpayableamt: any;
  currency: any;
  processingfee: any;
  amount: any;
  constructor(
    public _appServices: AppService,
    public platform: Platform,
    public router: Router,
    public iab: InAppBrowser,
    public _encServices: EncryptionDecryptionService,
    public activatedroute: ActivatedRoute,
    private _nav: NavController,
    public alertController: AlertController
  ) {
    this.date = new Date();
    this.maxDate = new Date(this.date.getFullYear() + 1, this.date.getMonth(), this.date.getDate()).toISOString();
    this.date = this.date.toISOString();
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/shoping-cart']);
    });
    this.CartId = localStorage.getItem('cartId');
    this.checkoutCode = localStorage.getItem('checkOutId');
    console.log(this._appServices.loggedInUserAccountDetails)
    this.userDetails = this._appServices.loggedInUserAccountDetails;
  }

  onChange(value) {
    this._appServices.presentLoading();
    this.iscardshow = value.detail.value;
    this.currencyType = value.detail.value;
    if (value.detail.value == 'crypto') {
      var UserDetailsUrl = `Global/GetCryptoCurrencies?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
      this._appServices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
        if (_res.status == 200) {
          this.cryptoCoins = _res.data;
          console.log(this.cryptoCoins)
        }
        this._appServices.loaderDismiss();
      });
    }
    if (value.detail.value == 'credit-card') {
      alert("Redirect to link");
    }
    if (value.detail.value == 'my-wallet') {
      var GetUserCoinMetrics = `Wallets/GetUserCoinMetrics?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
      var CoinDetailApi = this._appServices.getDataByHttp(GetUserCoinMetrics);
      forkJoin([CoinDetailApi]).subscribe(res => {
        var userCoinMetricsList = res[0].status == '200' ? res[0].data : [];
        this.mapCoinMatrics(userCoinMetricsList)
        this._appServices.loaderDismiss();
      })
    }
  }

  onChangeCurrency(val) {
    console.log(val.detail.value);
    if (this.currencyType == 'crypto') {
      var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&type=${this._appServices.ipAddress.ip}&checkoutCode=${this._appServices.ipAddress.ip}`;
      console.log(UrlParameters);
      this._appServices.postDataByPromissHttp(`ShoppingCart/UpdateRequestedPaymentTypeByCheckoutId?${UrlParameters}`, {}).then(res => {
        console.log("responce data", res);
        if (res.status == 200) {
          this.generatePaymentRequest();
        }
      });
    }
  }


  doKyc() {
    this.step = this.step + 1;
  }

  goToNext() {
    this.step = this.step + 1;
    console.log(this.step)
  }

  goToPrev() {
    this._nav.navigateRoot(['/user-panel/shoping-cart']);

    // this.step= this.step-1;
    // console.log(this.step)
  }


  mapCoinMatrics(userCoinMetricsList) {

    this.userCoinMetricsList = userCoinMetricsList.userWallet.inWallet.tokens.map((token, i) => {

      var teams = userCoinMetricsList?.teams.filter(t => t.team.id == token.teamId);
      return Object.assign(token, teams[0].price.fxRate);
    });

    console.log(this.userCoinMetricsList);
  }



  //New Flow

  async confirmation() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'To get checkout code from their email and use into the payment portal to unlock the payment details screen.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.UpdatePaymentRequest();
          }
        }
      ]
    });
    await alert.present();
  }


  //Pay By Crypto
  paywithcrypto() {
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&type='USD'&checkoutCode=${this.CartId}`;
    console.log(UrlParameters);
    this._appServices.postDataByPromissHttp(`ShoppingCart/UpdateRequestedPaymentTypeByCheckoutId?${UrlParameters}`, {}).then(res => {
      console.log("responce data", res);
      if (res.status == 200) {
        this.generateCrypto();
      }
    });
  }


  generateCrypto() {
    var UrlParameters = `email=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&checkoutCode=${this.CartId}&networkInterface='XLiquidusExchange'`;
    console.log(UrlParameters);
    this._appServices.postDataByPromissHttp(`Users/GenerateCryptoCharge?${UrlParameters}`, {}).then(res => {
      console.log("responce data", res);

      if (res.status == 200) {
        this.router.navigate(['/user-panel/PayWithCrypto']);
      }
    });
  }

  UpdatePaymentRequest() {
    this.isDataLoad = true;
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&type=USD&checkoutCode=${this.checkoutCode}`;
    console.log(UrlParameters);
    this._appServices.postDataByPromissHttp(`ShoppingCart/UpdateRequestedPaymentTypeByCheckoutId?${UrlParameters}`, {}).then(res => {
      console.log("responce data UpdateRequestedPaymentTypeByCheckoutId", res);
      if (res.status == 200) {
        this.generatePaymentRequest();
      }
    });
  }

  generatePaymentRequest() {
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&checkoutId=${this.checkoutCode}&currency=USD`;
    console.log(UrlParameters);
    this._appServices.postDataByPromissHttp(`Users/GeneratePaymentRequestByCheckoutId?${UrlParameters}`, {}).then(res => {
      console.log("responce data GeneratePaymentRequestByCheckoutId", res);
      this._appServices.cartRefresh.next(true);
      this.amount = res.data.amount;
      this.totalpayableamt = res.data.totalChargeAmount;
      this.processingfee = res.data.totalChargeAmount - res.data.amount;
      this.currency = res.data.currency;
      this.isDataLoad = false;
      if (res.status == 200) {
        this.thirdPartyLogin().then(async success => {
        }, (error) => {
          this.router.navigate(['/user-panel/']);
        });
      }
    });
  }


  thirdPartyLogin() {
    var ths = this;
    var url = 'https://inversepayments.usscyber.com/'
    return new Promise(function (resolve, reject) {
      var browserRef = ths.iab.create(url, "_blank", ths._appServices.inAppBrowserOption());
      // var eventType:any = ths.platform.is('android') ?  'loadstop': 'loadstart'; 
      var eventType: any = ths._appServices.inAppBrowserExitEvent();
      console.log(eventType);
      // browserRef.on(eventType).subscribe(event => {  
      //   if ((event.url).startsWith(decodeURIComponent(ths._B2C_config.redirect_uri))) {
      //     console.log(ths._B2C_config.redirect_uri);
      //     browserRef.on("exit").subscribe((event) => { })
      //     browserRef.close();  
      //     console.log(event.url);
      //     console.log(responseParameters);  
      //     var parsedResponse = {
      //       access_token:responseParameters
      //     };  
      //     if (parsedResponse["access_token"] !== "" && parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
      //       resolve(parsedResponse);
      //     } else {
      //       reject("Problem in authenticating with B2c");
      //     }
      //   }
      // });
      browserRef.on("exit").subscribe((event) => {
        reject("Payment Flow Cancel");
      });
    });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }



  doPayment() {
    console.log(this.case)
    if (this.case == 'paybycard') {
      // this.confirmation(); 
      this._nav.navigateRoot(['/user-panel/pay-with-card', { 'email': this._encServices.encrypt(this._appServices.loggedInUserDetails.email) }])
    } else {
      this.updatepaymentbycrypto();
    }
  }

  updatepaymentbycrypto() {
    this.isDataLoad = true;
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&type=${this.case}&checkoutCode=${this.checkoutCode}`;
    console.log(UrlParameters);
    this._appServices.postDataByPromissHttp(`ShoppingCart/UpdateRequestedPaymentTypeByCheckoutId?${UrlParameters}`, {}).then(res => {
      console.log("responce data UpdateRequestedPaymentTypeByCheckoutId", res);
      if (res.status == 200) {
        this.generatePaymentRequestbycrypto();
      }
    });
  }

  generatePaymentRequestbycrypto() {
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&checkoutId=${this.checkoutCode}&currency=USD`;
    console.log(UrlParameters);
    this._appServices.postDataByPromissHttp(`Users/GeneratePaymentRequestByCheckoutId?${UrlParameters}`, {}).then(res => {
      console.log("responce data GeneratePaymentRequestByCheckoutId", res);
      this._appServices.cartRefresh.next(true);
      this.amount = res.data.amount;
      this.totalpayableamt = res.data.totalChargeAmount;
      this.processingfee = res.data.totalChargeAmount - res.data.amount;
      this.currency = res.data.currency;
      this.isDataLoad = false;
      if (res.status == 200) {
        this._nav.navigateRoot(['/user-panel/PayWithCrypto', { 'payname': this._encServices.encrypt(this.case), 'amount': this._encServices.encrypt(this.amount), 'processingfee': this._encServices.encrypt(this.processingfee), 'totalpay': this._encServices.encrypt(this.totalpayableamt) }]);
      }
    });
  }
}
