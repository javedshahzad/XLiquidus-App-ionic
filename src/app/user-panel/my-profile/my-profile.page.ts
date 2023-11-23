import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AppEnum } from 'src/app/appEnum/appenum';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { B2C_config_setting } from 'src/app/B2C_config_setting';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { Router } from '@angular/router';
import { UserPanelPage } from '../user-panel.page';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  providers: [InAppBrowser]
})
export class MyProfilePage implements OnInit {
  userDetails: any="";
  registrationId: any;
  showCountryTooltip: boolean;
  showProfileTooltip: boolean;

  constructor(
    public router: Router,
    public _encServices: EncryptionDecryptionService,
    public iab: InAppBrowser,
    public _appServices: AppService,
    public _appEnum: AppEnum,
    public _nav: NavController,
    public platform: Platform,
    public _B2C_config: B2C_config_setting,
    public _encrypDecrypService: EncryptionDecryptionService,
    private userPanel: UserPanelPage
  ) {
  }

  ionViewWillEnter() {
    this._appServices.presentLoading();
    var UserDetailsUrl = `Users/GetUser?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
      if (_res.status == 200) {
        this.userDetails = _res.data;
        console.log(this.userDetails)
      }
      this._appServices.loaderDismiss();
    });
    console.log(this._B2C_config.B2CResetPasswordUrl);
  }

  ngOnInit() {
  }

  changePasswordPage() {
    
    //this.router.navigate(['/forgot-password', { root: 'Reset Password' }]);
    this.router.navigate(['/reset-password-setp-one', { root: 'Reset Password' }]);
  }

  changePassword(url) {
    console.log(url);
    this._appServices.presentLoading();
    var ths = this;
    console.log(url);
    ths.thirdPartyChangePassword(url).then(success => {
      console.log(success);
      ths._appServices.loaderDismiss();
      ths._nav.navigateRoot(['/']);
    }, (error) => {
      ths._appServices.loaderDismiss();
      console.log("error in Change password", error);
      // alert("error in B2c Change password- \n"+ error);
    });
  }


  thirdPartyChangePassword(url) {
    var ths = this;
    console.log(url);
    return new Promise(function (resolve, reject) {
      var browserRef = ths.iab.create(url, "_blank", ths._appServices.inAppBrowserOption());
      // var eventType:any = ths.platform.is('android') ?  'loadstop': 'loadstart'; 
      var eventType: any = ths._appServices.inAppBrowserExitEvent();
      console.log(eventType);
      browserRef.on(eventType).subscribe(event => {
        console.log(event, ths._B2C_config.redirect_uri);
        if ((event.url).startsWith(decodeURIComponent(ths._B2C_config.redirect_uri))) {
          browserRef.on("exit").subscribe((event) => { })
          browserRef.close();
          console.log(event.url);
          console.log("success")
          ths._nav.navigateRoot(['/']);
          resolve(event.url);
        } else {
          reject("error in Change password.");
        }
      });
      browserRef.on("exit").subscribe((event) => {
        reject("The b2c Change password flow was canceled");
      });
    });
  }


  createmyprofile() {
    console.log(this._appServices.loggedInUserDetails);
    var language = this.userDetails.language ? this.userDetails.language : "English";
    this.router.navigate(['/signupstep2', { email: this._encServices.encrypt(this.userDetails?.email ? this.userDetails?.email : this._appServices.loggedInUserDetails.email), Preflanguage: language, registerationId: this._encServices.encrypt(this._appServices.loggedInUserDetails['oid']), prefferedLanguage: this._encServices.encrypt(this.userDetails.preferredName ? this.userDetails.preferredName : this._appServices.loggedInUserDetails.name), onlyCreateProfile: 1 }])
  }

  gotoVerifyMFA() {
    this.userPanel.getUserDetails();
    this._nav.navigateRoot(['/user-panel']);
  }

  toggleCountryFlag() {
    setTimeout(() => {
      this.showCountryTooltip = !this.showCountryTooltip;
    }, 100);
  }

  toggleProfileFlag() {
    setTimeout(() => {
      this.showProfileTooltip = !this.showProfileTooltip;
    }, 200);
  }

  closeTooltips() {
    this.showProfileTooltip = false;
    this.showCountryTooltip = false;
  }
}
