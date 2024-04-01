import { Component, QueryList, VERSION, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform, IonRouterOutlet, ToastController } from '@ionic/angular';
import { AppEnum } from './appEnum/appenum';
import { AppService } from './services/app.service';
import { EncryptionDecryptionService } from './services/encryption.service';
import { v4 as uuidv4 } from 'uuid';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SplashScreen } from '@capacitor/splash-screen';
import { Device } from '@capacitor/device';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 3000;
  appSettings: any;
  currentAppVersion: any;
  device: any;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  IsLoginAllowedAsyncData: any;

  constructor(
    private platform: Platform,
    public toast: ToastController,
    public router: Router,
    private _nav: NavController,
    public _encrypDecrypService: EncryptionDecryptionService,
    public _appnum: AppEnum,
    public _appServices: AppService,
    private appVersion: AppVersion
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.device = await this.platform.platforms();
      this.backButtonEvent();
      this.setDeviceID();
      await this._encrypDecrypService.getUserCurrentLocartion();
      this._appServices.checkConnection();
      this.getSettings();
      await StatusBar.setStyle({ style: Style.Default });
      await SplashScreen.hide();
    });
  }

  getSettings() {
    let vn = this.appVersion.getVersionNumber();
    vn.then(res => {
      this.currentAppVersion = res;
    }).catch(err => this.currentAppVersion = '0.0.9');

    const url = 'https://cdn.usscyber.com/files/settings/xl-settings.json';
    this._appServices.getDataByNativePromiss(url).then((res: any) => {
      this.appSettings = res.data;

      if ((this.platform.is("android") && this.appSettings["maintenance-android"] == true) || (this.platform.is("ios") && this.appSettings["maintenance-ios"] == true && this.appSettings["mandatory"] == true)) {
        this._nav.navigateRoot(['/maintenance']);
      } else if (this.platform.is("android") && `'${this.appSettings["android-version"]}'` > `'${this.currentAppVersion}'` && this.appSettings["mandatory"] == true) {
        this._nav.navigateRoot(['/app-update', { force: this.appSettings.mandatory }]);
      } else if (this.platform.is("ios") && `'${this.appSettings["ios-version"]}'` > `'${this.currentAppVersion}'` && this.appSettings["mandatory"] == true) {
        this._nav.navigateRoot(['/app-update', { force: this.appSettings.mandatory }]);
      } else {
        this.checkUserloggedInOrNot();
      }
    }, err => {
      console.log(err);
      this.checkUserloggedInOrNot();
    });
    this.HandleCache();
  }

  async checkUserloggedInOrNot() {
    var getToken = this._encrypDecrypService.decrypt(this._encrypDecrypService.localstorageGetWithEncrypt(this._appnum.EntityOfLocalStorageKeys.access_token));
    if (getToken) {
      await this._appServices.deCodeJwtToken(getToken);
     // this.postSyncUserDetails()
     this.IsLoginAllowedAsync();
    } else {
      this._nav.navigateRoot(['/']);
    }
  }
  logout() {
    var deviceID = this._encrypDecrypService.getUUID();
    localStorage.clear();
    this._encrypDecrypService.setUUID(deviceID);
    this._nav.navigateRoot('/token-expires');
  }
  IsLoginAllowedAsync(){
    this._appServices.simpleLoader();
    var UrlParameters = `Auth/IsLoginAllowedAsync?email=${this._appServices.loggedInUserDetails.email}&applicationType=XL`;
    this._appServices.getDataByHttp(UrlParameters).subscribe(async res => {
      console.log("Auth/IsLoginAllowedAsync Response", res);
      if(res.status === 200){
         this.IsLoginAllowedAsyncData = res.data.data;
         if(this.IsLoginAllowedAsyncData.isAllowedToLogin === true){
          this.postSyncUserDetails();
         }else{
          this._appServices.loaderDismiss();
          this._appServices.presentToast("You are not allowed to login!")
          this._nav.navigateRoot(['/beta-program']);
         }
      }
    }, err => {
      console.log(err);
      this._appServices.loaderDismiss();
      if(err.status === 401){
        this.logout();
        this._appServices.presentToast("Your token has been expired!");
      }else{
        this._appServices.presentToast("You are not allowed to login!");
      }
     
    });
  }
  setDeviceID() {
    let deviceId;
    Device.getId().then((uuid) => {
      deviceId = uuid.identifier;
    }).catch((error: any) => {
      deviceId = this._encrypDecrypService.getUUID();
      if (!deviceId) {
        deviceId = uuidv4();
        this._encrypDecrypService.setUUID(deviceId);
      }
    });
  }
  async postSyncUserDetails() {
    this._encrypDecrypService.AppBundeID();
    this._encrypDecrypService.GetDeviceID();
    this._encrypDecrypService.DeviceDetails();
   await this._encrypDecrypService.getUserCurrentLocartion();
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
    await this._appServices.postDataByNativePromiss(`Users/PostSync?${UrlParameters}`, postJson).then(async (_res1:any) => {
      console.log("Stwp one data response",_res1)
      console.log("reesync set data", this._encrypDecrypService.localstorageGetWithEncrypt(this._appnum.EntityOfLocalStorageKeys.communicationAccessKey))
      if (!this._encrypDecrypService.localstorageGetWithEncrypt(this._appnum.EntityOfLocalStorageKeys.communicationAccessKey)) {
        postJson['type'] = "Sync";
        await this._appServices.postDataByNativePromiss(`Users/PostSync?${UrlParameters}`, postJson).then(_res2 => {
          console.log("step two = ",_res1, _res2);
          console.log("POST SYNC Data here")
          this._encrypDecrypService.localstorageSetWithEncrypt(this._appnum.EntityOfLocalStorageKeys.communicationAccessKey, _res2.communicationAccessKey);
          this._appServices.loaderDismiss();
            this._nav.navigateRoot(['/user-panel']);

          // this.router.navigate(['/signupconfirm', { email: this._encServices.encrypt(res.data.emailAddress), RegistraionId: this._encServices.encrypt(res.data.registrationId), language: this._encServices.encrypt(res.data.preferredLanguage), prefName: this._encServices.encrypt(res.data.preferredName) }]);
        });
      } else {
        console.log("POST RESYNC Data there...")
        this._appServices.loaderDismiss();
          this._nav.navigateRoot(['/user-panel']); 
      }
    }, err => console.log('err', err));
  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url == '/login' || this.router.url == '/user-panel/dashboard') {
          this._appServices.loaderDismiss();
          if ((new Date().getTime() - this.lastTimeBackPress) < this.timePeriodToExit) {
            navigator['app'].exitApp();
          } else {
            this.presentToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        } else {
          this._appServices.loaderDismiss();
          // window.history.back();
        }
      });
    });
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Press back again to exit App.',
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }
  HandleCache(){
    var UrlParameters = `AppGlobalSettings/XL`;
    this._appServices.getDataByHttp(UrlParameters).subscribe(async res => {
      console.log("AppGlobalSettings/XL Response", res);
      
    }, err => {
      console.log(err);
     
    });
  }
}
