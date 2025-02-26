import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { B2C_config_setting } from 'src/app/B2C_config_setting';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { AppEnum } from 'src/app/appEnum/appenum';
import {OAuth2Client} from "@byteowls/capacitor-oauth2";
import LogtoClient from '@logto/capacitor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ShowSpinner = false;
  public geolocationparam;
  public authtoken: any;
  refreshToken: any;
  IsAppleLogin: boolean;
  IsLoginAllowedAsyncData: any;
  CloudLoginConfig: any;
  logtoClient: LogtoClient;

  constructor(
    private router: Router,
    public _nav: NavController,
    public iab: InAppBrowser,
    public _appServices: AppService,
    public _appEnum: AppEnum,
    public platform: Platform,
    public _B2C_config: B2C_config_setting,
    public _encrypDecrypService: EncryptionDecryptionService,
   
  
  ) {


  }



  ngOnInit() {


    this.logtoClient = new LogtoClient({
    endpoint: 'https://upfbti.logto.app/',
    appId: 'em5nk725e3ujfr20v740y',
    });
    this._encrypDecrypService.getUserCurrentLocartion();
    this._encrypDecrypService.AppBundeID();
    this._encrypDecrypService.GetDeviceID();
    this._encrypDecrypService.DeviceDetails();
    this.getCloudConfig();
      if(this.platform.is("ios")){
        this.IsAppleLogin=true;
      }else{
        this.IsAppleLogin=false;
      }
  }
  getCloudConfig(){
    let url = "https://dyse8jtzjt9yv.cloudfront.net/xl/xl-app-config.json";
    this._appServices.getDataByNative(url).subscribe((response:any)=>{
      console.log(response);
      this.CloudLoginConfig = response.data;
    });
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
    this._encrypDecrypService.getUserCurrentLocartion();
    console.log(this._appServices.getHttpHeaders(),"Headers")
    var postJson = {
      "userObjectId": this._appServices.loggedInUserDetails.oid,
      "emailAddress": this._appServices.loggedInUserDetails.email,
      "date": this._appServices.getAppDateTime(new Date()),
      "appId":this._encrypDecrypService.PackageName,
      "deviceId": this._encrypDecrypService.deviceId,
      "deviceOs": this.platform.is('android') ? 'android' : 'ios',
      "deviceName": this._encrypDecrypService.DeviceName,
      "locationGeoTag": this._encrypDecrypService.geolocationparam,
      "signature": "",
      "status": "NewRequest",
      "type": "ReSync",
      "networkInterface": " XLiquidusExchange",
      "nonce": ((new Date().getTime() * 10000) + 621355968000000000)
    }
    console.log('POST SYNC PAULOAD = ', postJson);
    var UrlParameters = `clientIpAddress=${this._appServices.ipAddress.ip}`
    await this._appServices.postDataByNativePromiss(`Users/PostSync?${UrlParameters}`, postJson).then(async _res1 => {
      console.log("reesync set data", this._encrypDecrypService.localstorageGetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.communicationAccessKey))
      if (!this._encrypDecrypService.localstorageGetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.communicationAccessKey)) {
        postJson['type'] = "Sync";
        await this._appServices.postDataByNativePromiss(`Users/PostSync?${UrlParameters}`, postJson).then(_res2 => {
          console.log(_res1, _res2);
          console.log("POST SYNC Data here")
          this.ShowSpinner = false;
          this._encrypDecrypService.localstorageSetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.communicationAccessKey, _res2.communicationAccessKey);
          this._appServices.loaderDismiss();
          this.IsLoginAllowedAsync();

          // this.router.navigate(['/signupconfirm', { email: this._encServices.encrypt(res.data.emailAddress), RegistraionId: this._encServices.encrypt(res.data.registrationId), language: this._encServices.encrypt(res.data.preferredLanguage), prefName: this._encServices.encrypt(res.data.preferredName) }]);
        });
      } else {
        console.log("POST RESYNC Data there...")
        this._appServices.loaderDismiss();
        this.IsLoginAllowedAsync(); 
      }
    }, err => console.log('err', err));
  }
IsLoginAllowedAsync(){
  this._appServices.simpleLoader();
  var UrlParameters = `Auth/IsLoginAllowedAsync?email=${this._appServices.loggedInUserDetails.email}&applicationType=XL`;
  this._appServices.getDataByHttp(UrlParameters).subscribe(res => {
    console.log("Auth/IsLoginAllowedAsync Response", res);
    this._appServices.loaderDismiss();
    if(res.status === 200){
       this.IsLoginAllowedAsyncData = res.data.data;
       if(this.IsLoginAllowedAsyncData.isAllowedToLogin === true){
        this._nav.navigateRoot(['/user-panel/dashboard']);
       }else{
        this._nav.navigateRoot(['/beta-program']);
       }
    }
  }, err => {
    console.log(err);
    this._appServices.presentToast("You are not allowed to login!.");
    this._appServices.loaderDismiss();
  });
}
async LoginWithKinde(url){
  this._appServices.simpleLoader();
  let paramters = this.platform.is("ios") === true ? this._B2C_config.kindeLoginDetailsIOS() : this._B2C_config.kindeLoginDetails();
    OAuth2Client.authenticate(
      paramters
  ).then(async response => {
    console.log(response);
    if(this.platform.is("ios")){
      this.authtoken = response['id_token'];
    }else{
      this.authtoken = response.authorization_response['id_token'];
    }
      this._encrypDecrypService.localstorageSetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.access_token, this.authtoken);
      await this._appServices.deCodeJwtToken(this.authtoken);
      this._appServices.loaderDismiss();
      this.postSyncUserDetails();
    
  }).catch(reason => {
    this._appServices.loaderDismiss();
      console.error("OAuth rejected", reason);
  });
  }
  async signOut(url){
    console.log(await this.logtoClient.isAuthenticated());
    if(await this.logtoClient.isAuthenticated()){
      console.log(await this.logtoClient.getAccessToken())
    }
  
    await this.logtoClient.signOut("com.usscyber.xliquiduss.app://kinde_callback")
  }
  async LoginWithLogto(url){
      await this.logtoClient.signIn('com.usscyber.xliquiduss.app://kinde_callback');
      console.log(await this.logtoClient.isAuthenticated()); // true
      console.log(await this.logtoClient.getIdTokenClaims()); // { sub: '...', ... }
    // this._appServices.simpleLoader();
    // let paramters = this.platform.is("ios") === true ? this._B2C_config.LogtoLoginDetailsIOS() : this._B2C_config.LogtoLoginDetails();
    //   OAuth2Client.authenticate(
    //     paramters
    // ).then(async response => {
    //   console.log(response);
    //   if(this.platform.is("ios")){
    //     this.authtoken = response['id_token'];
    //   }else{
    //     this.authtoken = response.authorization_response['id_token'];
    //   }
    //     this._encrypDecrypService.localstorageSetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.access_token, this.authtoken);
    //     await this._appServices.deCodeJwtToken(this.authtoken);
    //     this._appServices.loaderDismiss();
    //     this.postSyncUserDetails();
      
    // }).catch(reason => {
    //   this._appServices.loaderDismiss();
    //     console.error("OAuth rejected", reason);
    // });
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
