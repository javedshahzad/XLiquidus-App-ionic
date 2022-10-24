import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-paywithcrpto',
  templateUrl: './paywithcrpto.component.html',
  styleUrls: ['./paywithcrpto.component.scss'],
})
export class PaywithcrptoComponent implements OnInit {
  amount: any;
  processingfee: any;
  totalchargeamount: any;
  processfees: any;
  coinname: any;
  backButtonSubscription: any;
  isDataLoad = false;
  checkoutCode: any;
  constructor(
    public platform: Platform,
    public _encServices: EncryptionDecryptionService,
    public _appServices: AppService,
    public iab: InAppBrowser, public router: Router,
    public activatedroute: ActivatedRoute,
    public _nav: NavController
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.isDataLoad = true;
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/kyc']);
    });
    this.amount = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('amount'));
    this.processingfee = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('processingfee'));
    this.processfees = parseFloat(this.processingfee).toFixed(2);
    this.checkoutCode = localStorage.getItem('checkOutId');
    this.totalchargeamount = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('totalpay'));
    this.totalchargeamount = parseFloat(this.totalchargeamount).toFixed(2);
    this.coinname = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('payname'));
    this.isDataLoad = false;
  }

  dopayment() {
    var UrlParameters = `email=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&checkoutId=${this.checkoutCode}&networkInterface=XLiquidusExchange`;
    console.log(UrlParameters);
    this._appServices.postDataByPromissHttp(`Users/GenerateCryptoCharge?${UrlParameters}`, {}).then(res => {
      console.log("responce data GenerateCryptoCharge", res);
      this._appServices.cartRefresh.next(true);
      this.isDataLoad = false;
      if (res.status == 200) {
        this.thirdPartyLogin(res.data.interactivePaymentFlowUrl).then(async success => {
        }, (error) => {
          this.router.navigate(['/user-panel/']);
        });
      }
    });
  }

  thirdPartyLogin(url) {
    var ths = this;
    // var url = 'https://inversepayments.usscyber.com/';
    return new Promise(function (resolve, reject) {
      var browserRef = ths.iab.create(url, "_blank", ths._appServices.inAppBrowserOption());
      var eventType: any = ths._appServices.inAppBrowserExitEvent();
      console.log(eventType);
      browserRef.on("exit").subscribe((event) => {
        reject("Payment Flow Cancel");
      });
    });
  }


  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
}
