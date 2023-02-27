import { Component, QueryList, VERSION, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, Platform, IonRouterOutlet, ToastController } from '@ionic/angular';
import { AppEnum } from './appEnum/appenum';
import { AppService } from './services/app.service';
import { EncryptionDecryptionService } from './services/encryption.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { v4 as uuidv4 } from 'uuid';
import { AppVersion } from '@ionic-native/app-version/ngx';


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

  constructor(
    private platform: Platform,
    public toast: ToastController,
    public router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _nav: NavController,
    public _encrypDecrypService: EncryptionDecryptionService,
    public _appnum: AppEnum,
    public _appServices: AppService,
    public geolocation: Geolocation,
    private uniqueDeviceID: UniqueDeviceID,
    private appVersion: AppVersion
  ) {
    //this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(async () => {
      this.device = await this.platform['win'].device;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backButtonEvent();
      this.setDeviceID();

      this._appServices.checkConnection();
      this.geolocation.getCurrentPosition().then((resp) => {
      }).catch((error) => {
      });
      if (!this.device) {
        this.checkUserloggedInOrNot();
      } else {
        this.getSettings();
      }
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

      if ((this.device.platform == 'Android' && this.appSettings["maintenance-android"] == true) || (this.device.platform == 'IOS' && this.appSettings["maintenance-ios"] == true)) {
        this._nav.navigateRoot(['/maintenance']);
      } else if (this.device.platform == 'Android' && `'${this.appSettings["android-version"]}'` > `'${this.currentAppVersion}'`) {
        this._nav.navigateRoot(['/app-update', { force: this.appSettings.mandatory }]);
      } else if (this.device.platform == 'IOS' && `'${this.appSettings["ios-version"]}'` > `'${this.currentAppVersion}'`) {
        this._nav.navigateRoot(['/app-update', { force: this.appSettings.mandatory }]);
      } else {
        this.checkUserloggedInOrNot();
      }
    }, err => {
      console.log(err);
      this.checkUserloggedInOrNot();
    });
  }

  async checkUserloggedInOrNot() {
    var getToken = this._encrypDecrypService.decrypt(this._encrypDecrypService.localstorageGetWithEncrypt(this._appnum.EntityOfLocalStorageKeys.access_token));
    if (getToken) {
      await this._appServices.deCodeJwtToken(getToken);
      this._nav.navigateRoot(['/user-panel']);
    } else {
      this._nav.navigateRoot(['.']);
    }
  }

  setDeviceID() {
    let deviceId;
    this.uniqueDeviceID.get().then((uuid: any) => {
      deviceId = uuid;
    }).catch((error: any) => {
      deviceId = this._encrypDecrypService.getUUID();
      if (!deviceId) {
        deviceId = uuidv4();
        this._encrypDecrypService.setUUID(deviceId);
      }
    });
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
}
