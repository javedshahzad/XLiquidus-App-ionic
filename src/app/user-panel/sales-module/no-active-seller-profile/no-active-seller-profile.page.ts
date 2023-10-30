import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-no-active-seller-profile',
  templateUrl: './no-active-seller-profile.page.html',
  styleUrls: ['./no-active-seller-profile.page.scss'],
})
export class NoActiveSellerProfilePage implements OnInit {
  isDataLoad = false;
  UserCurrentMarketProfile: any;
 
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    private activatedroute: ActivatedRoute,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService,
    private global: GlobalService,
    public iab: InAppBrowser,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
   
  }
  ionViewWillEnter() {
    this.GetCurrentMarketProfile();
  }
  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/active-seller-profile']);
  }

  GetCurrentMarketProfile(){
    this._appservices.presentLoading();
    this.isDataLoad=true;
    var UrlParameters = `CustomerMarkets/GetCurrentMarketProfile?email=${this._appservices.loggedInUserDetails.email}`;
    console.log(UrlParameters);
    this._appservices.getDataByHttp(UrlParameters).subscribe(res => {
      console.log("GetCurrentMarketProfile Response",res);
      if(res.status === 200){
        this.UserCurrentMarketProfile=res.data;
      }else{
        this._appservices.presentToast(`No profile was found for ${this._appservices.loggedInUserDetails.email}`);
        this._nav.navigateRoot("/user-panel/sales-profile-signup");
      }
      this._appservices.loaderDismiss();
      this.isDataLoad=false;
    }, err => {
     console.log(err);
     this._appservices.presentToast(`No profile was found for ${this._appservices.loggedInUserDetails.email}`);
     this._nav.navigateRoot("/user-panel/sales-profile-signup");
      this._appservices.loaderDismiss();
      this.isDataLoad=false;
    });
   }
   KYCIdentityVerification(url){
    let checkStatus = this.UserCurrentMarketProfile?.data?.activationRequests[0].requirements.filter((a)=>a.name === "KYC Screening");
    if(checkStatus[0].status === "Completed"){
      this.global.CreateToast(`You already completed your KYC Screening!`);
    }else{
      var ths = this;
      console.log(url);
      let BaseUrl=url.toString();
      console.log(BaseUrl);
      var browserRef = ths.iab.create(BaseUrl, "_system", ths._appservices.inAppBrowserOption());
      var eventType: any = ths._appservices.inAppBrowserExitEvent();
      console.log(ths.platform.is('android'));
      console.log(eventType);
      browserRef.show();
      browserRef.on(eventType).subscribe(event => {
        console.log(event);
      })
    }

   }
  gotoSellSignUp(){
   let checkStatus = this.UserCurrentMarketProfile?.data?.activationRequests[0].requirements.filter((a)=>a.name === "Activation Deposit");
    if(checkStatus[0].status === "Completed"){
      this.global.CreateToast(`You already paid activation fee!`);
    }else{
      this._nav.navigateRoot("/user-panel/sales-profile-signup");
    }
  }
}
