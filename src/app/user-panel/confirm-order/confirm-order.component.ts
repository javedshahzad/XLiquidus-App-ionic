import { CardPaymentsComponent } from '../../general-pages/card-payments/card-payments.component';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { UserPanelPage } from '../user-panel.page';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  backButtonSubscription: any;
  cartDetail: any;
  ischeck = false;
  isDataLoad = false;
  CartId: any;
  checkoutCode: any;
  currentDateTime: any;
  isMFARequired: boolean = false;
  mfaCode: string = ''
  otp: boolean = false
  nonce: string = ''
  currencies: Array<any> = [
    'USD', 'BTC', 'USDC', 'ETH', 'LTC'
  ]
  selectedCurrency: string
  userDetails
  billingInformation:any;
  cardNumber: string = ''
  postCheckoutData: any;
  constructor(
    public _appServices: AppService,
    public activatedroute: ActivatedRoute,
    public platform: Platform,
    public _nav: NavController,
    public router: Router,
    public _encServices: EncryptionDecryptionService,
    private userPanel: UserPanelPage,
    private global: GlobalService,
    public modalController: ModalController
  ) { 
    // this.cardNumber = localStorage.getItem('cardNumber').length === 4 ? localStorage.getItem('cardNumber') : ''
  }

  ngOnInit() {

  }

 
  ionViewWillEnter() {
    console.log('will enter')
    this.currentDateTime = new Date();
    this.cartDetail = [];
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/shoping-cart']);
    });
    this.isDataLoad = true;
    this.getCartDetails();
    var UserDetailsUrl = `Users/GetUser?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
      if (_res.status == 200) {
        this.userDetails = _res.data;
        console.log(this.userDetails)
      }
    });
    this.selectedCurrency = "";
    this.mfaCode = '';
    this.ischeck = false;
  }

  async getCartDetails() {
    this._appServices.simpleLoader();
    this._appServices.getCart(this._appServices.loggedInUserDetails.email).then(_res => {
      this._appServices.loaderDismiss();
      this.isDataLoad = false;
      if (_res.status == 200) {
        localStorage.setItem('cartId', _res.data.data.cart.cartId);
        this.cartDetail = _res.data.data.cart;
        console.log(this.cartDetail);
        this.isMFARequired = this.cartDetail?.isMfaRequired;
      }
    }, err => {
      console.log(err);
      this.isDataLoad = false;
      this._appServices.loaderDismiss();
    })
  }
  getCartDetailsFromChechout(){
  if(this.selectedCurrency){
    let body={
      "email": this._appServices.loggedInUserDetails.email,
      "cartId":  this.cartDetail?.id ? this.cartDetail?.id : this.cartDetail?.cartId,
      "cartType": "XL",
      "paymentCurrency": this.selectedCurrency,
      "ipAddress": this._appServices.ipAddress.ip,
      "completeCheckout": false,
      "useExpressService": false,
      "isService": false,
      "saveBillingInformation": false
    }
    this._appServices.simpleLoaderWithMsg("Calculating your fees, please wait for a moment.");
    this._appServices.postCheckout(body).then(res => {
      console.log(res)
      this._appServices.loaderDismiss();
      if(res.status === 200){
        var response = JSON.parse(res.data);
        this.postCheckoutData = response.data;
        console.log(response)
        console.log(this.postCheckoutData)
        this.cartDetail = this.postCheckoutData.checkoutCart;
        if (this.ischeck &&  this.selectedCurrency === 'USD') {
          this.onSelectedCurrency()
        }
      }
    }).catch(err=>{
      this._appServices.loaderDismiss();
    })
  }
    
  }
  // makePayment() {
  //   this.isDataLoad = true;
  //   var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIp=${this._appServices.ipAddress.ip}&cartId=${this.cartDetail?.cartId}&authCode=${''}`
  //   this._appServices.postDataByPromissHttp(`ShoppingCart/CompleteCheckoutByCartId?${UrlParameters}`, {}).then(res => {
  //     console.log("responce data", res);
  //     this.isDataLoad = false;
  //     this._appServices.cartRefresh.next(true);
  //     if (res.status == 200) {
  //       localStorage.setItem('checkOutId', res.data.summary.checkoutCode);
  //       this._nav.navigateRoot(['/user-panel/kyc']);
  //     } else if (res.status == 400) {
  //       console.log(res.data.error);
  //       var result = JSON.parse(res.data.error)
  //       this._appServices.ionicCustomAlert("Minimum Purchase Requirement", "", result.message, "Keep Shopping");
  //     }
  //   });
  // }

  async onCurrencyChange(evt) {
    console.log(evt.detail.value)
    this.selectedCurrency = evt.detail.value;
    this.getCartDetailsFromChechout();
  }
  checkTransactionProfile() {
    return new Promise((resolve, reject) => {
      let url = `Users/CheckTransactionProfile?EmailAddress=${this._appServices.loggedInUserDetails.email}`

      this._appServices.getDataByPromissHttp(url).then(res => {
        console.log('CheckTransactionProfile', res)
        if (res.status === 200) {
          resolve(res?.data)
          // this.global.hideLoading()

        } else {
          if (res.status === 400) {
            // this.global.hideLoading()
            let err = JSON.parse(res?.data?.error)
            console.log('CheckTransactionProfile err:', JSON.parse(res?.data?.error))
            this._appServices.presentToast(err?.message)
            reject(JSON.parse(res?.data?.error))
            // this._appServices.presentToast('Something went wrong please try again!')
          } else {
            // this.global.hideLoading()
            // let error = JSON.parse(res.data.error)
            reject(res)
            this._appServices.presentToast('Transaction profile is not Completed')
            // console.log('getLiquidationUrl err:', error)
            // this._appServices.presentToast(error.message);
          }
        }

      })
    })
  }
  makePayment() {
    // if (this.isMFARequired) {
    //   if (this._appServices.loggedInUserAccountDetails.enableMultiFactorAuthentication) {
    //     this._nav.navigateRoot(['/user-panel/mfa']);
    //   } else {
    //     this.userPanel.getUserDetails();
    //     this._nav.navigateRoot(['/user-panel']);
    //   }
    // } else {



    // this.checkTransactionProfile().then(res =>{
    //   console.log('liquidation res => ',res)
    // }).catch(async err =>{
    //   console.log(err)
    //  const alert =  this._appServices._alertController.create({
    //     header:'Alert!',
    //     message:'Press Update to Complete your transaction report!',
    //     buttons:[
    //       {
    //         role:'submit',
    //         text:'Update',
    //         handler: () =>{
    //           this.router.navigate(['general-pages/signupstep2', { email: this._encServices.encrypt(this.userDetails.email), Preflanguage: this.userDetails.language, registerationId: this._encServices.encrypt(this._appServices.loggedInUserDetails['oid']), prefferedLanguage: this._encServices.encrypt(this.userDetails.preferredName), onlyCreateProfile: 1 }])
    //         }
    //       }, {
    //         role:'close',
    //         text:'Cancel',
    //       }
    //     ]
    //   });
    //   (await alert).present()

    // })


   
    if (this.selectedCurrency === '') {
      this._appServices.presentToast('Please select a currency first!');
      return false;
    } 
    if(this.selectedCurrency == "USD" && this.mfaCode == ""){
      this._appServices.presentToast('Verification code is required for Card Transactions!');
      return false;
    }
      this.isDataLoad = true;
      let billing = {
        "name": this.billingInformation?.fullname ? this.billingInformation?.fullname : "",
        "address": this.billingInformation?.address ? this.billingInformation?.address : "",
        "city": this.billingInformation?.city ? this.billingInformation?.city : "",
        "state": this.billingInformation?.state ? this.billingInformation?.state : "",
        "zipCode": this.billingInformation?.zipcode ? this.billingInformation?.zipcode : "",
        "country": this.billingInformation?.country ? this.billingInformation?.country : ""
      }
      let body = {
        "email": this._appServices.loggedInUserDetails.email,
        "cartId": this.cartDetail?.id ? this.cartDetail?.id : this.cartDetail?.cartId,
        "cartType": "XL",
        "paymentCurrency": this.selectedCurrency,
        "nonce": this.nonce,
        "otpCode": this.selectedCurrency === "USD" ? this.mfaCode : "",
        "ipAddress": this._appServices.ipAddress.ip,
        "completeCheckout": true,
        "useExpressService": false,
        "billingInformation":  billing,
        "saveBillingInformation": false
      }
      console.log('Payload:',body)
      this._appServices.simpleLoader();
      this._appServices.postCheckout(body).then(res => {
        console.log("responce data", res);
        this.isDataLoad = false;
        this._appServices.loaderDismiss();
        this._appServices.cartRefresh.next(true);
        if (res.status == 200) {
          let extras: NavigationExtras = {
            state: {
              data: res?.data
            }
          }
          this.global.navigateWithExtras('/transaction-summary/' + this.selectedCurrency, extras);
          this.selectedCurrency = "";
          this.mfaCode = '';
          this.ischeck = false;
          this.billingInformation=""
        } else if (res.status == 400) {
          var errors=JSON.parse(res?.data?.error);
          this.global.CreateToast1(errors.message);
          console.log(errors.message,"Here error message");
        }

      }, err => {
        console.log(err);
        this._appServices.loaderDismiss();
        this.isDataLoad = false;
      });
    
  }
  onSelectedCurrency() {
    if (this.selectedCurrency === '') {
      this._appServices.presentToast('Please select a currency first!')
    } else {

      if(this.selectedCurrency === "USD"){
        this.otp = true
      this.global.presentLoading('Calculating your fees, please wait for a moment.').then(() => {
        // if (type === 'BankAccount') {
        this._appServices.getCheckoutCode(this.selectedCurrency === 'USD' ? 'CardTransaction' : 'MarketPurchase').then(async res => {
          console.log('checkout code:', res)
          if (res.status === 200) {
            console.log('checkout code:', res)
            this.global.hideLoading()
            const alert = await this._appServices._alertController.create({
              cssClass: 'ionic-Custom-alertBox',
              header: 'Alert',
              subHeader: 'One Time Password',
              mode:"ios",
              message: `A OTP (one-time-pass) code was sent to your email. Please use that code to continue with your ${this.selectedCurrency === 'USD' ? 'Card Transaction' : 'Market Purchase'}.`,
              buttons: [
                {
                  text: 'Ok',
                  cssClass: ['confirmation_ok_button', 'confirmation_popup_button'],
                  handler: () => {
                    if (this.selectedCurrency === 'USD') {
                     // this.global.navigate('/card-payments')
                     this.showCardPayment();
                    }
                  }
                }]
            });

            await alert.present();

          }
          else {
            this.global.hideLoading()
            // let error = JSON.parse(res.data.error)
            console.log('checkout code::', res)
            // this._appServices.presentToast(error.message);
          }
        })
        // }
      })
      }
    }

  }
  async showCardPayment() {
    const modal = await this.modalController.create({
        component: CardPaymentsComponent,
        cssClass: 'card-payments',
        mode: "md",
        backdropDismiss:false,
        componentProps: {
            data: "empty"
        },
    });
    modal.onWillDismiss().then((data:any)=>{
      console.log(data)
      this.billingInformation = data.data.billingInformation;
      this.nonce = data.data.nonce;
      this.cardNumber = data.data.cardNumber;
  
    })
    return await modal.present();
}
  // confirm() {
  //   if (this.mfaCode === '') {
  //     this._appServices.presentToast('Please put the verification code first!')
  //   } else {
  //     this.global.presentLoading('').then(() => {
  //       this._appServices.postCheckout({}).then(res => {
  //         console.log('postCheckout:', res)
  //         if (res.status === 200) {
  //           this.global.hideLoading()
  //           this.global.navigate('user-panel/transaction-status')
  //         } else {
  //           this.global.hideLoading()
  //           let error = JSON.parse(res.data.error)
  //           console.log('PostCheckout err', error)
  //           this._appServices.presentToast(error.message);
  //         }
  //       })
  //     })
  //   }
  // }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/shoping-cart']);
  }
}
