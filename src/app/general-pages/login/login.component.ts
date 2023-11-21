import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { B2C_config_setting } from 'src/app/B2C_config_setting';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { AppEnum } from 'src/app/appEnum/appenum';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {OAuth2Client} from "@byteowls/capacitor-oauth2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ShowSpinner = false;
  public deviceId;
  public geolocationparam;
  public authtoken: any;
  refreshToken: any;
  IsAppleLogin: boolean;

  constructor(
    private router: Router,
    public _nav: NavController,
    public iab: InAppBrowser,
    public _appServices: AppService,
    public _appEnum: AppEnum,
    public platform: Platform,
    public _B2C_config: B2C_config_setting,
    public _encrypDecrypService: EncryptionDecryptionService,
    private geolocation: Geolocation,
    private uniqueDeviceID: UniqueDeviceID,
    public _encServices: EncryptionDecryptionService
  ) {

    this.uniqueDeviceID.get().then((uuid: any) => {
      this.deviceId = uuid;
    }).catch((error: any) => {
      this.deviceId = this._encServices.getUUID();
    });
  }



  ngOnInit() {
      if(this.platform.is("ios")){
        this.IsAppleLogin=true;
      }else{
        this.IsAppleLogin=false;
      }
  }

  goToCreateAccount() {
    // this.router.navigate(['/signup']);
    this.router.navigate(['/signup-options']);
  }

  Login(url) {
    this._appServices.simpleLoader();
    this.thirdPartyLogin(url).then(async success => {
      console.log('success', success);
      // this.getUserDetails(success['access_token']);
      this.authtoken = success['access_token'];
      this._encrypDecrypService.localstorageSetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.access_token, this.authtoken);
      await this._appServices.deCodeJwtToken(this.authtoken);
      this._appServices.loaderDismiss();
      this.postSyncUserDetails();
    }, (error) => {
      this._appServices.loaderDismiss();
      // if(error = "forgetPassword"){
      //   alert("forget password reset");
      //   return
      // } 
      this._encrypDecrypService.localstorageRemoveWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.access_token)
      console.log("error in B2cLogin", error);
    });
  }

 async appleloginwithOauth(url){
  this._appServices.simpleLoader();
    OAuth2Client.authenticate(
      this._B2C_config.getAzureB2cOAuth2Options()
  ).then(async response => {
    console.log(response);
      let accessToken = response["access_token"];
      this.authtoken = response['access_token'];
      this._encrypDecrypService.localstorageSetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.access_token, this.authtoken);
      await this._appServices.deCodeJwtToken(this.authtoken);
      this._appServices.loaderDismiss();
      this.postSyncUserDetails();
    
  }).catch(reason => {
    this._appServices.loaderDismiss();
      console.error("OAuth rejected", reason);
  });
  }
  async getUserDetails() {
    this._appServices.presentLoading();
    var UserDetailsUrl = `Users/GetUser?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`;
    console.log('UserDetailsUrl', UserDetailsUrl)
    this._appServices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
      console.log("loggedInUserAccountDetails details",_res)
      if (_res.status == 200) {
        this._appServices.loggedInUserAccountDetails = _res.data;
        this._nav.navigateRoot(['/user-panel/dashboard']);
        // this.postSyncUserDetails();  
      }
      this._appServices.loaderDismiss();
    });
  }


  async postSyncUserDetails() {
    this._appServices.simpleLoader();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geolocationparam = resp.coords.latitude + ',' + resp.coords.longitude;
    }).catch((error) => {
      this._appServices.loaderDismiss();
      console.log('Error getting location');
    });

    var postJson = {
      "userObjectId": this._appServices.loggedInUserDetails.oid,
      "emailAddress": this._appServices.loggedInUserDetails.email,
      "date": this._appServices.getAppDateTime(new Date()),
      "appId": "com.usscyber.xliquidus",
      "deviceId": this.deviceId,
      // "deviceOs": this._platform.is('android') ? 'android' : 'ios',
      "deviceOs": 'android',
      "deviceName": "Samsung",
      "locationGeoTag": this.geolocationparam,
      "signature": "",
      "status": "NewRequest",
      "type": "ReSync",
      "networkInterface": " XLiquidusExchange",
      "nonce": ((new Date().getTime() * 10000) + 621355968000000000)
    }
    console.log('postJson', postJson);
    var UrlParameters = `clientIpAddress=${this._appServices.ipAddress.ip}`

    await this._appServices.postDataByNativePromiss(`Users/PostSync?${UrlParameters}`, postJson).then(async _res1 => {

      console.log("reesync set data", this._encServices.localstorageGetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.communicationAccessKey));
      // if(this._appServices.loggedInUserDetails.isFirstTimeLoggedIn){
      if (!this._encServices.localstorageGetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.communicationAccessKey)) {
        postJson['type'] = "Sync";
        await this._appServices.postDataByNativePromiss(`Users/PostSync?${UrlParameters}`, postJson).then(_res2 => {
          console.log(_res1, _res2);
          this.ShowSpinner = false;
          this._encServices.localstorageSetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.communicationAccessKey, _res2.communicationAccessKey);
          this._appServices.loaderDismiss();
          this._nav.navigateRoot(['/user-panel/dashboard']);
         
          // this._nav.navigateRoot(['/user-panel/dashboard']);  
          // this.router.navigate(['/user-panel/dashboard']);
          // this.router.navigate(['/signupconfirm', { email: this._encServices.encrypt(res.data.emailAddress), RegistraionId: this._encServices.encrypt(res.data.registrationId), language: this._encServices.encrypt(res.data.preferredLanguage), prefName: this._encServices.encrypt(res.data.preferredName) }]);
        });
      } else {
        this._appServices.loaderDismiss();
        this._nav.navigateRoot(['/user-panel/dashboard']);
        // this._nav.navigateRoot(['/user-panel/dashboard']); 
      }
    }, err => console.log('err', err));
  }


  getUrlParameter(name, url) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\#?&]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };


  thirdPartyLogin(url) {
    var ths = this;
    return new Promise(function (resolve, reject) {
      var browserRef = ths.iab.create(url, "_blank", ths._appServices.inAppBrowserOption());
      var eventType: any = ths._appServices.inAppBrowserExitEvent();
      console.log(ths.platform.is('android'));
      console.log(eventType);
      browserRef.on(eventType).subscribe(event => {
        console.log(event, ths._B2C_config.redirect_uri);
        if ((event.url).startsWith(decodeURIComponent(ths._B2C_config.redirect_uri))) {
          console.log(ths._B2C_config.redirect_uri);
          browserRef.on("exit").subscribe((event) => { })
          browserRef.close();
          console.log(event.url);
          var responseParameters = ths.getUrlParameter('access_token', event.url);
          console.log(responseParameters);
          var parsedResponse = {
            access_token: responseParameters
          };
          if (parsedResponse["access_token"] !== "" && parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
            resolve(parsedResponse);
          } else {
            reject("Problem in authenticating with B2c");
          }
        }
      });
      browserRef.on("exit").subscribe((event) => {
        reject("The b2c sign in flow was canceled");
      });
    });
  }

  inAppBrowserScript() {
    console.log('hiiiiiiii')
  }

  gotoForgotPassword() {
    this.router.navigate(["/reset-password-setp-one", { root: 'Forgot Password' }]);
  }
}
