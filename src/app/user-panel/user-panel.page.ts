import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, MenuController, NavController, ToastController } from '@ionic/angular';
import { AppEnum } from '../appEnum/appenum';
import { AppService } from '../services/app.service';
import { EncryptionDecryptionService } from '../services/encryption.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.page.html',
  styleUrls: ['./user-panel.page.scss'],
})
export class UserPanelPage {
  @ViewChild('bottomTabBar', { static: true }) bottomTabBar: IonTabs;
  showModal: boolean;
  showVerifyModal: boolean;
  code: string;
  walletInfo: any;
  allowLiquidate: boolean;
  public userDetails;
  public selectedTab;
  mfaKey: string;
  qrCode;

  public appPages = [
    // { title: 'My Watchlist', url: '', icon: '' },
    { title: 'My Wallet', url: '/user-panel/wallet-page', icon: '' },

    { title: 'Shop the Marketplace', url: '/user-panel/dashboard', icon: '' },

    { title: 'Liquidate Assets', url: '/user-panel/lets-liquidate', icon: '' },

    { title: 'My Transactions', url: '/user-panel/transaction-history', icon: '' },

    // { title: 'Product Page', url: '/user-panel/product-page', icon: '' },  

    // { title: 'Buy Now', url: '/user-panel/buy-now', icon: ''},
    // { title: 'Pay With Card', url: '/user-panel/pay-with-card', icon: ''},
    // { title: 'Terms & Condition', url: '/user-panel/termscondition', icon: ''},
    { title: 'Help and FAQs', url: '/user-panel/helpfaq', icon: '' },

    // { title: 'Shoping Card', url: '/user-panel/shoping-cart', icon: '' },
    // { title: 'Confirm Order', url: '/user-panel/confirm-order', icon: '' }, 
    // { title: 'KYC', url: '/user-panel/kyc', icon: '' },

    // { title: 'PayWithCrypto', url: '/user-panel/PayWithCrypto', icon: ''},
    { title: 'About XLiquidus', url: '/user-panel/aboutxl', icon: '' },
  ];


  constructor(
    public menu: MenuController,
    public _appServices: AppService,
    public _nav: NavController,
    public _encrypDecrypService: EncryptionDecryptionService,
    public _appEnum: AppEnum,
    private router: Router,
    private clipboard: Clipboard,
    public toast: ToastController,
  ) {
    if (!this.router.url.includes('user-panel/dashboard')) {
      this.showModal = false;
    }
  }

  ionViewDidLoad() {
    this.setCurrentTab();
  }

  setCurrentTab() {
    this.selectedTab = this.bottomTabBar.getSelected();
  }

  ionViewWillEnter() {
    this.getUserDetails();
    this.GetUserCoinMetrics();
  }

  getUserDetails() {
    this._appServices.presentLoading();
    var UserDetailsUrl = `Users/GetUser?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
      if (_res.status == 200) {
        this._appServices.loggedInUserAccountDetails = this.userDetails = _res.data;
        if (!this.userDetails.enableMultiFactorAuthentication) {
          this.showModal = true;
        }
      }
      this._appServices.loaderDismiss();
    }, err => {
      if (err.status == 401) {
        this.presentToast("Token Expires Please Relogin");
        this.logout();
      }
      this._appServices.loaderDismiss();
    });
  }

  async GetUserCoinMetrics() {
    // this._appServices.presentLoading();
    var UserDetailsUrl2 = `Wallets/GetUserCoinMetrics?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.getDataByHttp(UserDetailsUrl2).subscribe(_res => {
      if (_res.status == 200) {
        this.walletInfo = _res.data;
        console.log(this.walletInfo);
        if (this.walletInfo.totalCost > 0) {
          this.allowLiquidate = true;
          this.appPages[2].url = '/user-panel/liquidate';
        }
      }
      //this._appServices.loaderDismiss();
    });
  }

  closeMenu() {
    this.menu.close();
  }

  logout() {
    var deviceID = this._encrypDecrypService.getUUID();
    localStorage.clear();
    this._encrypDecrypService.setUUID(deviceID);
    this._nav.navigateRoot('/token-expires');
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  hideModal() {
    this.showModal = false;
    this.showVerifyModal = false;
  }

  showVerifyPage() {
    this._appServices.presentLoading();
    var RegisterMfaURL = `Users/RegisterMfa?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.postDataByHttp(RegisterMfaURL, {}).subscribe(_res => {
      console.log(_res);
      if (_res.status == 200) {
        this.code = _res.data.code;
        this.qrCode = _res.data.qrCode;
        this.showModal = false;
        this.showVerifyModal = true;
      } else {
        this.presentToast("MFA is already register");
        this.hideModal();
      }
      this._appServices.loaderDismiss();
    }, err => {
      console.log(err)
      if(err.status == 400) {
        this.presentToast("MFA is already register");
        this.hideModal();
      } else {
        this.presentToast("Error in registering MFA");
      }
      this._appServices.loaderDismiss();
    });
  }

  copy() {
    this.clipboard.copy(this.code);
    this.presentToast('Code copied to clipboard');
  }

  verify() {
    var VerifyMFACodeURL = `Users/VerifyMFACode?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}&code=${this.mfaKey}`
    this._appServices.postDataByHttp(VerifyMFACodeURL, {}).subscribe(res => {
      if (res.status == 200) {
        this.presentToast(res.data.message);
        this.hideModal();
      } else {
        this.presentToast('Validation Failed');
      }
    }, err => {
      this.presentToast('Validation Failed');
    });
  }
}
