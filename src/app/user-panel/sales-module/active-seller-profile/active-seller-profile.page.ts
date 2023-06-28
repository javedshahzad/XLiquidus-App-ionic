import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-active-seller-profile',
  templateUrl: './active-seller-profile.page.html',
  styleUrls: ['./active-seller-profile.page.scss'],
})
export class ActiveSellerProfilePage implements OnInit {
  isDataLoad = false;
  UserCurrentMarketProfile: any;
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    private activatedroute: ActivatedRoute,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.GetCurrentMarketProfile();
  }
  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/dashboard']);
  }

  GetCurrentMarketProfile(){
    this._appservices.presentLoading();
    this.isDataLoad=true;
    var UrlParameters = `CustomerMarkets/GetCurrentMarketProfile?email=${this._appservices.loggedInUserDetails.email}`;
    console.log(UrlParameters);
    this._appservices.getDataByHttp(UrlParameters).subscribe(res => {
      console.log("GetCurrentMarketProfile Response",res);
      if(res.status === 200){
        this.UserCurrentMarketProfile=res?.data;
        if(this.UserCurrentMarketProfile.data.status === "Pending"){
          this._appservices.presentToast(`You don't have active Seller profile. Please activate your profile to continue!`);
          this._nav.navigateRoot("/user-panel/no-active-seller-profile");
        }
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
}
