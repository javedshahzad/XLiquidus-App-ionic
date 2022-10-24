import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-pay-with-card',
  templateUrl: './pay-with-card.component.html',
  styleUrls: ['./pay-with-card.component.scss'],
})
export class PayWithCardComponent implements OnInit {

  backButtonSubscription: any;
  email: String;

  isDataLoad = false;
  checkoutCode: any;
  constructor(
    public platform: Platform,
    public _encServices: EncryptionDecryptionService,
    public _appServices: AppService,
    public iab: InAppBrowser,
    public router: Router,
    public activatedroute: ActivatedRoute,
    public _nav: NavController) { }

  ngOnInit() {

  }


  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/kyc']);
    });
    this.checkoutCode = localStorage.getItem('checkOutId');
    this.email = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('email'));
  }


  goToPrev() {
    this._nav.navigateRoot(['/user-panel/kyc']);
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  process() {
    this.UpdatePaymentRequest()
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
      var eventType: any = ths._appServices.inAppBrowserExitEvent();
      console.log(eventType);
      browserRef.on("exit").subscribe((event) => {
        reject("Payment Flow Cancel");
      });
    });
  }


}
