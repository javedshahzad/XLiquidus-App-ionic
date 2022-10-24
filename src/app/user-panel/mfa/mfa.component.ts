import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss'],
})
export class MfaComponent implements OnInit {
  tooltipFlag: boolean = false;
  mfaKey: any;
  cartID: any;

  constructor(
    public _appServices: AppService,
    private toast: ToastController,
    private _nav: NavController
  ) {
    this.cartID = localStorage.getItem('cartId')
   }

  ngOnInit() { }

  toggleTooltip() {
    setTimeout(() => {
      this.tooltipFlag = !this.tooltipFlag;
    }, 200);
  }

  verify() {
    this._appServices.presentLoading();
    var VerifyMFACodeURL = `Users/VerifyMFACode?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}&code=${this.mfaKey}`
    this._appServices.postDataByHttp(VerifyMFACodeURL, {}).subscribe(res => {
      if (res.status == 200) {
        this.presentToast(res.data.message);
        this.gotoKYC();
      } else {
        this.presentToast('Validation Failed');
      }
      this._appServices.loaderDismiss();
    }, err => {
      this.presentToast('Validation Failed');
      this._appServices.loaderDismiss();
    });
  }

  gotoKYC() {
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}&cartId=${this.cartID}&cartType=XCH&authCode=${''}`
    this._appServices.postDataByPromissHttp(`ShoppingCart/PostCompleteCheckout?${UrlParameters}`, {}).then(res => {
      this._appServices.cartRefresh.next(true);
      if (res.status == 200) {
        localStorage.setItem('checkOutId', res.data.summary.checkoutCode);
        this._nav.navigateRoot(['/user-panel/kyc']);
      } else if (res.status == 400) {
        var result = JSON.parse(res.data.error)
        this._appServices.ionicCustomAlert("Minimum Purchase Requirement", "", result.message, "Keep Shopping");
        this._nav.navigateRoot(['/user-panel/confirm-order']);
      }
    })
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  closeTooltips() {
    this.tooltipFlag = false;
  }
}
