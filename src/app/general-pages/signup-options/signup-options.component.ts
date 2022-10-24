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

@Component({
  selector: 'app-signup-options',
  templateUrl: './signup-options.component.html',
  styleUrls: ['./signup-options.component.scss'],
})
export class SignupOptionsComponent implements OnInit {
  ShowSpinner = false;
  public deviceId;
  public geolocationparam;
  public authtoken: any;
  data: any;

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
      console.log(this.deviceId);
    }).catch((error: any) => {
      this.deviceId = this._encServices.getUUID();
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.geolocationparam = resp.coords.latitude + ',' + resp.coords.longitude;
    }).catch((error) => {
      this.geolocationparam = '28.482098,77.0851379';
    });
  }



  ngOnInit() {
    console.log(this._B2C_config.GoogleSignupUrl);
    console.log(this._B2C_config.MicrosoftSignupUrl);
    console.log(this._B2C_config.AppleSignupUrl)
  }

  goToCreateAccount() {
    this.router.navigate(['/signup'])
  }

  Login(url) {
    this._appServices.presentLoading();
    this.thirdPartyLogin(url).then(async success => {
      console.log('success', success);
      // this.getUserDetails(success['access_token']);
      this.authtoken = success['access_token'];
      this._encrypDecrypService.localstorageSetWithEncrypt(this._appEnum.EntityOfLocalStorageKeys.access_token, this.authtoken);
      await this._appServices.deCodeJwtToken(this.authtoken);

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

  async getUserDetails() {
    this._appServices.presentLoading();
    var UserDetailsUrl = `Users/GetUser?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
      if (_res.status == 200) {
        console.log("g", _res);
        this._appServices.loggedInUserAccountDetails = _res.data;
        this._nav.navigateRoot(['/user-panel/dashboard']);
        // this.postSyncUserDetails();  
      }
      this._appServices.loaderDismiss();
    });
  }


  async postSyncUserDetails() {
    console.log('this._appServices.loggedInUserDetails', this._appServices.loggedInUserDetails);

    var postJson = {
      "emailAddress": this._appServices.loggedInUserDetails.email,
      "preferredName": this._appServices.loggedInUserDetails.name,
      "preferredLanguage": 'English'
    }
    this._appServices.postDataByPromissHttp(`Users/LiteMobileRegistration`, postJson).then(res => {
      console.log("responce data", res);
      if (res.status == 200) {
        console.log(res.data);
        localStorage.setItem('registrationId', this._encServices.encrypt(res.data.registrationId));
        this.data = res.data;
        this.acceptTermsConditions(res);
      } else {
        this.ShowSpinner = false;
        this._appServices.loaderDismiss();
        this._appServices.presentToast('The specified Email (User ID) is not available. Please choose a different one.');
      }
    }).catch(err => {
      console.log('err', err)
      this._appServices.loaderDismiss();
    });
  }

  acceptTermsConditions(res) {
    console.log('In tnc')
    var postJson = {
      "id": 0,
      "userId": res.data.emailAddress,
      "acceptanceDate": this._appServices.getAppDateTime(new Date()),
      "geoLocation": this.geolocationparam,
      "deviceId": this.deviceId,
      "deviceOs": 'android',
      "userIpAddress": this._appServices.ipAddress.ip,
      "hasAccepted": true
    }
    console.log(JSON.stringify(postJson));
    this._appServices.postDataByPromissHttp(`Users/AcceptedTerms`, postJson).then(res => {
      console.log("responce data", res);
      this.ShowSpinner = false;
      this._appServices.loaderDismiss();
      this.router.navigate(['/signupstep2', { email: this._encServices.encrypt(this.data.emailAddress), RegistraionId: this._encServices.encrypt(this.data.registrationId), language: this._encServices.encrypt(res.data.preferredLanguage), prefName: this._encServices.encrypt(this.data.preferredName) }])
      // if (res.status == 200) {
      //   console.log(res.data);
      //   this.router.navigate(['/signupconfirm', { email: this._encServices.encrypt(this.data.emailAddress), RegistraionId: this._encServices.encrypt(this.data.registrationId), language: this._encServices.encrypt(this.data.preferredLanguage), prefName: this._encServices.encrypt(this.data.preferredName) }]);
      // } else {
      //   this.router.navigate(['/signupconfirm', { email: this._encServices.encrypt(this.data.emailAddress), RegistraionId: this._encServices.encrypt(this.data.registrationId), language: this._encServices.encrypt(res.data.preferredLanguage), prefName: this._encServices.encrypt(this.data.preferredName) }]);

      //   // alert("something went wrong")
      // }
    }).catch(err => {
      this._appServices.loaderDismiss();
    });

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

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
