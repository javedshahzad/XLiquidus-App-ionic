import { Component, NgZone, QueryList, VERSION, ViewChildren } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, Platform, IonRouterOutlet, ToastController } from '@ionic/angular';
import { AppEnum } from './appEnum/appenum';
import { AppService } from './services/app.service';
import { EncryptionDecryptionService } from './services/encryption.service';
import { v4 as uuidv4 } from 'uuid';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SplashScreen } from '@capacitor/splash-screen';
import { Device } from '@capacitor/device';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Browser, OpenOptions } from '@capacitor/browser';
import { AppApiService } from './services/app-apis.service';
import { B2C_config_setting } from './B2C_config_setting';
import { LogtoService } from './services/logto.service';

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
  CloudLoginConfig: any;

  constructor(
    private platform: Platform,
    public toast: ToastController,
    public router: Router,
    private _nav: NavController,
    public _encrypDecrypService: EncryptionDecryptionService,
    public _appnum: AppEnum,
    public _appServices: AppService,
    private appVersion: AppVersion,
    private zone:NgZone,
    private _appApi: AppApiService,
    private logtoService:LogtoService,
    public _B2C_config: B2C_config_setting,
  ) {
    this.initializeApp();
  }
  initializeDeeppLink() {
    App.addListener('appUrlOpen',async (data: any) => {
        this.zone.run( async () => {
          console.log('App opened with URL:', data.url);

      if (data.url.startsWith('com.usscyber.xliquiduss.app://callback')) {
        
        const url = new URL(data.url);
        const code = url.searchParams.get('code');
        console.log('OAuth Code:', code);
        try {
        await this._appServices.InitLogtoIoAndroid().handleSignInCallback(data.url);
        var isAuthenticated =  await this._appServices.InitLogtoIoAndroid().isAuthenticated();
         await this._appServices.InitLogtoIoAndroid().getIdTokenClaims();
        var access_token = await this._appServices.InitLogtoIoAndroid().getAccessToken(this._appServices.apiResourceUrl);
        var id_token = await this._appServices.InitLogtoIoAndroid().getIdToken();
        console.log("isAuthenticated =", isAuthenticated);
        console.log("id_token=",id_token);
        console.log("access_token=",access_token);
        this._encrypDecrypService.localstorageSetWithEncrypt(this._appnum.EntityOfLocalStorageKeys.access_token, access_token);
        this._encrypDecrypService.localstorageSetWithEncrypt(this._appnum.EntityOfLocalStorageKeys.id_token, id_token);
        await this._appServices.deCodeJwtToken(id_token);
        this.CheckUserAuth();
        } catch (error) {
          var call_back_url = this.platform.is("ios") === true ? this._B2C_config.LogtoLoginDetails().iOS_logout_call_Back : this._B2C_config.LogtoLoginDetails().android_logout_call_back;
          if(this.platform.is("android")){
          await this._appServices.InitLogtoIoAndroid().signOut(call_back_url);
          }else{
          await this.logtoService.InitLogtoIoIOS().signOut(call_back_url);
          }
        }
        
     
      }
        });
    });
}
CheckUserAuth() {
  this._appServices.simpleLoaderWithoutDuration();

  this._appApi.validateToken().subscribe(
    (response: any) => {
      console.log('token validate = ', response);

      if (response?.data?.valid === true) {
        this.getUserData_Me();
      } else {
        this._appServices.loaderDismiss();
        this._nav.navigateRoot(['/']);
      }
    },
    error => {
      this._nav.navigateRoot(['/']);
      this._appServices.loaderDismiss();
      console.error(error);
    }
  );
}

getUserData_Me() {
  this._appApi.getMe().subscribe(
    (response: any) => {
      this._appServices.loaderDismiss();
      console.log('auth/me = ', response);

      const resData = response.data;

      if (resData?.isRegistered === false && resData?.registrationRequired === true) {
        this._appServices.presentToast(resData.message, false);
        this.router.navigate(['/signupstep2', { onlyCreateProfile: 1 }]);
      } else {
        this._appServices.setXLUserId(resData.id);
        this._appServices.presentToast('Login successfull!');
        this._nav.navigateRoot(['/user-panel']);
      }
    },
    error => {
      this._appServices.loaderDismiss();
      console.error(error);
    }
  );
}
  async initializeApp() {
    this.platform.ready().then(async () => {
      this.device = await this.platform.platforms();
      this.backButtonEvent();
      this.setDeviceID();
      await this._encrypDecrypService.getUserCurrentLocartion();
      this._appServices.checkConnection();
      //this.getSettings();
      await this.checkUserloggedInOrNot();
      await StatusBar.setStyle({ style: Style.Default });
      await SplashScreen.hide();
      this.initializeDeeppLink();
    });
  }
  async checkUserloggedInOrNot() {
    var getToken = this._encrypDecrypService.decrypt(this._encrypDecrypService.localstorageGetWithEncrypt(this._appnum.EntityOfLocalStorageKeys.id_token));
    if (getToken) {
      await this._appServices.deCodeJwtToken(getToken);
     this.CheckUserAuth();
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
