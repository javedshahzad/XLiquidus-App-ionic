import { ADD_TO_CART_PAYLOAD, CART_ITEM } from './../../services/app.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss'],
})
export class ShopingCartComponent implements OnInit {
  cartDetail: any;
  isDataLoad = false;
  ShowSpinner = false;
  showCart = false;
  currentDateTime: any;
  public backButtonSubscription: any;
  @ViewChild('myModal', { static: false }) myModal: ElementRef;
  elm1: HTMLElement;
  constructor(public _appServices: AppService, public iab: InAppBrowser, public alertController: AlertController, public platform: Platform, public _nav: NavController, public router: Router, public _encServices: EncryptionDecryptionService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.currentDateTime = new Date();
    this.showCart = false;
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    });

    this.isDataLoad = true;
    this.getCartDetails();
    // document.getElementById('cartMessage').innerHTML = 'Payment In Processing';
    // this.elm1.classList.add('show');
    // this.elm1.style.width = '100vw';
  }


  async getCartDetails() {
    this._appServices.simpleLoader();
    // var UserDetailsUrl = `ShoppingCart/GetActiveCart?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.getCart(this._appServices.loggedInUserDetails.email).then(_res => {
      console.log(_res.status);
      console.log(_res);
      this._appServices.loaderDismiss();
      if (_res.status == 200) {
        this.showCart = true;
        this.isDataLoad = false;
        localStorage.setItem('cartId', _res.data.data.cart.cartId);
        this.cartDetail = _res?.data?.data?.cart;
        console.log(this.cartDetail);
      } else if (_res.status == 202) {
        console.log(_res.data.error);
        // var result = JSON.parse(_res.data.error)
        this.isDataLoad = false;
        this.getCheckoutCode(_res.data.message);
      }
      else if (_res.status == 402) {
        console.log(_res.data.error);
        var result = JSON.parse(_res.data.error)
        this.isDataLoad = false;
        this.getCheckoutCode(result.message);
      }else if (_res.status == 404){
        this.showCart = true;
        this.isDataLoad = false;
        this._appServices.createCart(this._appServices.loggedInUserDetails.email)
      }
    }, (err) => {
      this.isDataLoad = false;
      this._appServices.loaderDismiss();
      console.log(err);
      console.log(err.status)
      
      if (err.status == 402) {
        var result = JSON.parse(err.error)
        this.getCheckoutCode(result.message);
      }
      if (err.status == 202) {
        var result = JSON.parse(err.error)
        this.getCheckoutCode(result.message);
        // this.confirmation(result.message)
      }
    });
  }

  getCheckoutCode(message) {
    var getCheckoutId = `ShoppingCart/GetCurrentCheckoutDetails?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}`
    this._appServices.getDataByHttp(getCheckoutId).subscribe(_res => {
      console.log(_res);
      if (_res.status == 200) {
        console.log('checkoutcode', _res.data.summary.checkoutCode)
        localStorage.setItem('checkOutId', _res.data.summary.checkoutCode);
        this.confirmation(message)
      }
    })
  }

  async confirmation(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: message,
      buttons: [
        {
          text: 'Cancel Cart',
          cssClass: 'secondary',
          handler: () => {
            this.cancelCart();
          }
        }, {
          text: 'Confirm Payment',
          handler: () => {
            this.confrimPayment();
          }
        }
      ]
    });
    await alert.present();
  }

  confrimPayment() {
    this._nav.navigateRoot(['/user-panel/kyc']);
    var checkOutId = localStorage.getItem('checkOutId');
    // var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&checkoutId=${checkOutId}&currency=USD`;
    // console.log(UrlParameters);
    // this._appServices.postDataByPromissHttp(`Users/GeneratePaymentRequestByCheckoutId?${UrlParameters}`,{}).then(res=>{
    //   console.log("responce data GeneratePaymentRequestByCheckoutId",res); 
    //   this.isDataLoad = false;
    //   if(res.status == 200){
    //       console.log("openBrowser");
    //       this.thirdPartyLogin().then(async success => {

    //       }, (error) => {
    //         this.router.navigate(['/user-panel/']); 
    //       }); 
    //   }
    // });
  }

  thirdPartyLogin() {
    var ths = this;
    var url = 'https://inversepayments.usscyber.com/'
    return new Promise(function (resolve, reject) {
      var browserRef = ths.iab.create(url, "_blank", ths._appServices.inAppBrowserOption());
      // var eventType:any = ths.platform.is('android') ?  'loadstop': 'loadstart'; 
      var eventType: any = ths._appServices.inAppBrowserExitEvent();
      console.log(eventType);
      browserRef.on("exit").subscribe((event) => {
        reject("Payment Flow Cancel");
      });
    });
  }


  cancelCart() {
    this.isDataLoad = true;
    var checkOutId = localStorage.getItem('checkOutId');
    console.log("checkOut Id:", checkOutId)
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&useForceCancel=true&checkoutCode=${checkOutId}`
    this._appServices.postDataByPromissHttp(`ShoppingCart/CancelPendingSaleByCheckoutId?${UrlParameters}`, {}).then(res => {
      console.log("responce data", res);
      this.isDataLoad = false;
      if (res.status == 200) {
        this.router.navigate(['/user-panel/']);
      } else if (res.status == 400) {
        console.log(res.data.error);
        var result = JSON.parse(res.data.error)
        this._appServices.ionicCustomAlert("", "", result.message);
        this._nav.navigateRoot(['/user-panel']);
      }
    });
  }


  checkout() {
    this.router.navigate(['/user-panel/confirm-order']);
  }

  delete(val) {
    this.isDataLoad = true;
    this._appServices.simpleLoader();
    // this.router.navigate(['/user-panel/kyc']); 
    // var UrlParameters = `teamId=${val.teamId}&emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`;
    console.log(val);
    this._appServices.removeFromCart(this._appServices.loggedInUserDetails.email,val.id).then(res => {
      console.log("responce data", res);
      this._appServices.cartRefresh.next(true);
      this._appServices.loaderDismiss();
      this.isDataLoad = false;
      this.cartDetail = [];
      if (res.status == 200) {
        this.showCart = true;
        this.cartDetail = res.data.data.cart;
      } else {
        console.log(res);
      }
    }, (err) => {
      this.showCart = true;
      this.isDataLoad = false;
      this._appServices.loaderDismiss();
      this.cartDetail = [];
      this.getCartDetails();
      this._appServices.cartRefresh.next(true);
    });
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  updateqty(val:any, qty) {
    this.isDataLoad = true;
    var UrlParameters = `teamId=${val.teamId}&emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}&amount=${qty}`;
    var itemsData:any=[]
    if(val?.isSecondaryMarketItem){
       itemsData= [{ amount: qty, item: val.listingId,isSecondaryMarketItem:true }]
    }
    else{
      itemsData = [{ amount: qty, item: val.tokenIndexId,isSecondaryMarketItem:false }]
    }
    let payload:ADD_TO_CART_PAYLOAD = {
      email:this._appServices.loggedInUserDetails['email'],
      type:'XL',
      items:itemsData
    }
    console.log('val:',val,'Payload:',payload);

    this._appServices.updateCart(payload).then(res => {
      console.log("responce data", res);
      this.isDataLoad = false;
      if (res.status == 200) {
        this._appServices.cartRefresh.next(true);
        this.showCart = true;
        this.cartDetail = res.data.data.cart;
      }
    },(err) => {
      console.log(err)
      this.isDataLoad = false;
    });
  }

  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/dashboard']);
  }

  gotomarketplace() {
    this._nav.navigateRoot(['/user-panel/']);
  }
}
