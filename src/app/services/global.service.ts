import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { ToastController, AlertController, LoadingController, ModalController, Platform, ActionSheetController } from '@ionic/angular';
// import { Contacts } from '@capacitor-community/contacts';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
 
  previousUrl: string
 
  constructor(public toast: ToastController,
    public alertCtlr: AlertController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public router: Router,
    public plt: Platform,
    private http: HttpClient,
    private tService:TranslateService,
    private actionSheet:ActionSheetController
  ) {
   
    // this.initUsers()

  }
  dark = false;
  isLoading: any = false;
  navigator: any;
  path: any;
  currentModal;
  notificationCount: number = 0
  contacts: Array<any> = []
  founder: boolean = false;
  newNotification: boolean


  public async CreateToast(msg) {
    const check = await this.toast.getTop();
    if (check) {
      this.toast.dismiss();
    }
    const toast = await this.toast.create({
      message: msg,
      duration: 4000,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          handler: () => {
            toast.dismiss()
          }
        }
      ]
    });

    toast.present();
  }
  public async CreateToast1(msg) {
    const check = await this.toast.getTop();
    if (check) {
      this.toast.dismiss();
    }
    const toast = await this.toast.create({
      message: msg,
      duration: 5000,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          handler: () => {
            toast.dismiss()
          }
        }
      ]
    });
    toast.present();
  }
  async alertController(header: any, msg: any) {
    let alert = this.alertCtlr.create({
      header:header,
      message: msg,
      cssClass: 'custom-alert',
      mode: 'ios',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert.canceled.')
          }
        },
        {
          text: 'ok',
          role: 'ok',
          handler: () => {
            console.log('Alert.canceled.')
          }
        }
      ]
    });
    ((await alert).present())
  }
  async alertController1(header: any, msg: any) {
    let alert = this.alertCtlr.create({
      header:header,
      message: msg,
      cssClass: 'custom-alert',
      mode: 'ios',
      buttons: [
        {
          text: 'ok',
          role: 'ok',
          handler: () => {
            console.log('Alert.canceled.')
          }
        }
      ]
    });
    ((await alert).present())
  }

 
  // previousUrl() {
  //   return this.router.events.pipe(filter(event => event instanceof NavigationEnd))
  // }



  async presentModal(page: any, data: any) {
    const modal = await this.modalController.create({
      component: page,
      mode: 'ios',
      swipeToClose: true,
      presentingElement: document.querySelector('ion-router-outlet'),
      componentProps: { data: data }
    });
    this.currentModal = modal;
    return await modal.present();
  }

  async startLoad() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        duration: 9000,
        message: "Please wait...",
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => { });
          }
        });
      });
  }
  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  async presentLoading(msg: any) {
    const check = await this.loadingController.getTop();
    if (check) {
      this.loadingController.dismiss();
    }
    const loading = await this.loadingController.create({
      message: msg,
      cssClass: 'loader-dir',
      spinner: 'crescent',
      mode: 'ios'
    });
    loading.present();
  }
  async hideLoading() {
    this.loadingController.dismiss();
  }
  async timeoutHide(time: number) {
    setTimeout(async () => {
      const check = await this.loadingController.getTop();
      if (check) {
        this.loadingController.dismiss();
      }
    }, time);
  }

  navigateWithExtras(route: string, extras: NavigationExtras) {
    this.router.navigate([route], extras);
  }
  navigate(route: string) {
    this.router.navigate([route]);
  }
  async changeLanguage() {
    const sheet = await this.actionSheet.create({
      header: `${this.tService.instant('changeLang')}`,
      mode: 'ios',
      buttons: [
        {
          text: `${this.tService.instant('english')}`,
          handler: () => {
            this.setLanguage('en');
          },
        },
        {
          text: `${this.tService.instant('spanish')}`,
          handler: () => {
            this.setLanguage('es');
          },
        },
        {
          text: `${this.tService.instant('portuguese')}`,
          handler: () => {
            this.setLanguage('pt-br');
          },
        },
        {
          text: `${this.tService.instant('cancel')}`,
          role: 'cancel',
        },
      ],
    });
    await sheet.present();
  }
  setLanguage(setLang) {
    localStorage.setItem('lang', setLang);
    this.tService.use(setLang)
  }

}

