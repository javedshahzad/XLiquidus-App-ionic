import {
    Component,
    NgZone,
    OnInit
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import {
    NavController,
    Platform
} from '@ionic/angular';
import {
    AppService
} from 'src/app/services/app.service';
import {
    EncryptionDecryptionService
} from 'src/app/services/encryption.service';
import {
    GlobalService
} from 'src/app/services/global.service';
import * as Square from '@square/web-sdk';
import {
    InAppBrowser
} from '@ionic-native/in-app-browser/ngx';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
@Component({
    selector: 'app-sales-profile-signup',
    templateUrl: './sales-profile-signup.page.html',
    styleUrls: ['./sales-profile-signup.page.scss'],
})
export class SalesProfileSignupPage implements OnInit {
    isDataLoad = false;
    fundingOtions: any = [{
            paymentOption: "USD",
            FundingOption: "Card"
        },
        {
            paymentOption: "BTC",
            FundingOption: "Crypto"
        },
        {
            paymentOption: "ETH",
            FundingOption: "Crypto"
        },
        {
            paymentOption: "LTC",
            FundingOption: "Crypto"
        },
        {
            paymentOption: "USDC",
            FundingOption: "Crypto"
        },
    ];
    paymentCurrency: any = "";
    isChecked: boolean = false;
    card: Square.Card;
    applicationId = 'sandbox-sq0idb-5uDFG_CVw2RXUQj7IQ9zMQ';
    locationId = 'PD6X914EJ0C5F';
    IsPay: boolean = false;
    IsSignup: boolean = true;
    UserCurrentMarketProfile: any;
    PostCheckoutRespone: any = "";
    PaymentAddress: any = "";
    FiatPaymentData: any = "";
    userDetails: any = "";
    public billingInformation: FormGroup
    countriesList: any=[];
    constructor(
        public _nav: NavController,
        public router: Router,
        public platform: Platform,
        private activatedroute: ActivatedRoute,
        public _encServices: EncryptionDecryptionService,
        public _appservices: AppService,
        private global: GlobalService,
        private ngZone: NgZone,
        public iab: InAppBrowser,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {

    }
    ionViewWillEnter() {
        this.GetFudingOptionsTypes();
        this.GetCurrentMarketProfile();
        this.initForm();
        this.GetUser();
        this.getCountries();
        this.card?.clear();
    }
    backtomarktplace() {
        this._nav.back();
    }
    GetFudingOptionsTypes() {
        var UrlParameters = `Global/GetFudingOptionsTypes`;
        console.log(UrlParameters);
        this._appservices.getDataByHttp(UrlParameters).subscribe(res => {
            console.log("Global/GetFudingOptionsTypes Response", res);
            this._appservices.loaderDismiss();
        }, err => {
            console.log(err);
            this._appservices.loaderDismiss();
        });
    }
    GetUser() {
        this._appservices.presentLoading();
        var UserDetailsUrl = `Users/GetUser?emailAddress=${encodeURIComponent(this._appservices.loggedInUserDetails['email'])}&clientIpAddress=${this._appservices.ipAddress.ip}`
        this._appservices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
            if (_res.status == 200) {
                this.userDetails = _res.data;
                console.log(this.userDetails)
                if(this.userDetails.preferredName){
                    this.billingInformation.controls["fullname"].setValue(this.userDetails.preferredName);
                    this.billingInformation.controls["fullname"].disable();
                }
                if(this.userDetails.addressCountryName){
                    this.billingInformation.controls["country"].setValue(this.userDetails.addressCountryName);
                    this.billingInformation.controls["country"].disable();
                }
                if(this.userDetails.email){
                    this.billingInformation.controls["email"].setValue(this.userDetails.email);
                    this.billingInformation.controls["email"].disable();
                }
            }
            this._appservices.loaderDismiss();
        });
    }
    CreateMarketProfile() {
        if (this.userDetails?.firstName || this.userDetails?.lastName || this.userDetails?.gender) {
            if (this.paymentCurrency) {
                this.isDataLoad = true;
                this._appservices.presentLoading();
                let payload = {
                    email: this._appservices.loggedInUserDetails.email,
                    paymentCurrency: this.paymentCurrency.paymentOption,
                    fundingOption: this.paymentCurrency.FundingOption,
                    marketName: this._appservices.loggedInUserDetails.name
                }
                var UrlParameters = `CustomerMarkets/PostCreateMarketProfile?email=${this._appservices.loggedInUserDetails.email}&marketName=${this._appservices.loggedInUserDetails.name}&paymentCurrency=${this.paymentCurrency.paymentOption}&fundingOption=${this.paymentCurrency.FundingOption}`;
                console.log(UrlParameters);
                this._appservices.postDataByHttp(UrlParameters, payload).subscribe(res => {
                    console.log("PostCreateMarketProfile Response", res);
                    if (res.status === 200) {
                        this._appservices.loaderDismiss();
                        this._appservices.presentToast("Congrats! Your profile has been created.Please follow the next steps to activate profile!");
                        this.UserCurrentMarketProfile = res.data;
                        this.PostCheckoutProfile();
                        //this._nav.navigateRoot("/user-panel/active-seller-profile");
                    } else {
                        var errors = JSON.parse(res.error);
                        this._appservices.presentToast(errors.message);
                    }
                    this._appservices.loaderDismiss();
                    this.isDataLoad = false;
                }, err => {
                    console.log(err);
                    this._appservices.loaderDismiss();
                    this.isDataLoad = false;
                    if (err.status === 400) {
                        this.global.CreateToast('Seems like your profile is not completed yet. Please complete your profile to continue!');
                        this._nav.navigateRoot("/user-panel/myprofile")
                    } else if (err.status != 400) {
                        if (err.error) {
                            var errorsMsg = JSON.parse(err.error);
                            this._appservices.presentToast(errorsMsg?.message);
                        }

                    }
                });
            } else {
                this.global.CreateToast("Please select deposit type!")
            }
        } else {
            this.global.CreateToast('Seems like your profile is not completed yet. Please complete your profile and try again!');
            this._nav.navigateRoot("/user-panel/myprofile");
        }

    }
    Signup() {
        console.log(this.paymentCurrency);
        this.CreateMarketProfile();
    }
    CheckBox(event) {
        this.isChecked = event.target.checked;
    }

    PostCheckoutProfile() {
        this.isDataLoad = true;
        this._appservices.presentLoading();
        let payload = {
            email: this._appservices.loggedInUserDetails.email,
            orderId: this.UserCurrentMarketProfile.data.orderRequest.id,
        }
        var UrlParameters = `CustomerMarkets/PostCheckout?orderId=${this.UserCurrentMarketProfile.data.orderRequest.id}&email=${this._appservices.loggedInUserDetails.email}`;
        console.log(UrlParameters);
        this._appservices.postDataByHttp(UrlParameters, payload).subscribe(res => {
            console.log("PostCheckout Response", res);
            if (res.status === 200) {
                this.PostCheckoutRespone = res.data;
                if (this.PostCheckoutRespone.data.fundingOption === "Card") {
                    console.log(this.PostCheckoutRespone);
                    this.applicationId = this.PostCheckoutRespone.data.fiatPaymentIntent.applicationId ? this.PostCheckoutRespone.data.fiatPaymentIntent.applicationId : this.applicationId;
                    this.locationId = this.PostCheckoutRespone.data.fiatPaymentIntent.locationId ? this.PostCheckoutRespone.data.fiatPaymentIntent.locationId : this.locationId;
                    this._appservices.loaderDismiss();
                    this._appservices.presentToast("Congrats! Verification code has been sent to your email!");
                    this.IsPay = true;
                    this.IsSignup = false;
                    this.activateAccount();
                } else if (this.PostCheckoutRespone.data.fundingOption === "Crypto") {
                    let paymentAddressArray = this.PostCheckoutRespone.data.cryptoPaymentIntent.paymentAddresses;
                    let RetivedData = paymentAddressArray.filter((a) => a.type === this.PostCheckoutRespone.data.cryptoPaymentIntent.currency);
                    if (RetivedData.length > 0) {
                        this.IsSignup = false;
                        this.PaymentAddress = RetivedData[0];
                    }
                }
            } else {
                var errors = JSON.parse(res.error);
                this._appservices.loaderDismiss();
                this._appservices.presentToast(errors.message);
            }
            this._appservices.loaderDismiss();
            this.isDataLoad = false;
        }, err => {
            console.log(err);
            this._appservices.loaderDismiss();
            this.isDataLoad = false;
        });
    }
    activateAccount() {
        this.ngZone.run(async () => {
            await this.InitSqureCard();
        })
    }
    async InitSqureCard() {
        this.global.presentLoading('').then(async () => {
            this.IsPay = true;
            const payments = await Square.payments(this.applicationId, this.locationId);
            this.card = await payments?.card();
            await this.card?.attach('#card-container');
            console.log('card and payment', this.card, payments);
            this.global.hideLoading();
            if (!payments || !this.card) {
                this.global.hideLoading();
                this.global.CreateToast('Something went wrong!');
            }
        });
    }
    ionViewDidLeave() {
        this.card.clear();
        document.getElementById('card-container').innerHTML = "";
    }
    async ProcessToPay() {
        this.isDataLoad = true;
        this._appservices.presentLoading();
            try {
                const result = await this.card?.tokenize();
                if (result?.status === 'OK') {
                    console.log(result);
                    this.PostProcessFiatPaymentWithCard(result);
                    console.log(`Payment token is: ${result.token}`);
                    console.log(`Payment token is: ${JSON.stringify(result)}`);
                    // this.card.clear();
                }
            } catch (e) {
                this.global.CreateToast(e);
                console.error(e);
            }
    }
    PostProcessFiatPaymentWithCard(CardData) {
        this.isDataLoad = true;
        this._appservices.presentLoading();
        let payload = {
            paymentCode: CardData.token,
            email: this._appservices.loggedInUserDetails.email,
            orderId: this.UserCurrentMarketProfile.data.orderRequest.id,
            verificationCode: this.billingInformation.value.verificationCode
        }
        var UrlParameters = `CustomerMarkets/PostProcessFiatPayment`;
        console.log(UrlParameters);
        this._appservices.postDataByHttp(UrlParameters, payload).subscribe(res => {
            console.log("PostProcessFiatPayment Response", res);
            if (res.status === 200) {
                this.FiatPaymentData = res.data;
                if(this.FiatPaymentData.data.hasError){
                    this.global.CreateToast(this.FiatPaymentData.data.message)
                }else{
                    this.card.clear();
                    this.IsPay = false;
                    this.global.CreateToast("Congratulations! You deposited fee!");
                }
             
            } else {
                var errors = JSON.parse(res.error);
                this._appservices.presentToast(errors.message);
            }
            this._appservices.loaderDismiss();
            this.isDataLoad = false;
        }, err => {
            console.log(err);
            this._appservices.loaderDismiss();
            this.isDataLoad = false;
        });
    }
    GetCurrentMarketProfile() {
        this._appservices.presentLoading();
        this.isDataLoad = true;
        var UrlParameters = `CustomerMarkets/GetCurrentMarketProfile?email=${this._appservices.loggedInUserDetails.email}`;
        console.log(UrlParameters);
        this._appservices.getDataByHttp(UrlParameters).subscribe(res => {
            console.log("GetCurrentMarketProfile Response", res);
            if (res.status === 200) {
                this.UserCurrentMarketProfile = res.data;
                this.PostCheckoutProfile();
            }
            this._appservices.loaderDismiss();
            this.isDataLoad = false;
        }, err => {
            console.log(err);
            this._appservices.presentToast(`No profile was found for ${this._appservices.loggedInUserDetails.email}`);
            this._appservices.loaderDismiss();
            this.isDataLoad = false;
        });
    }
    ViewReceipt(url) {
        var ths = this;
        console.log(url);
        let BaseUrl = url.toString();
        console.log(BaseUrl);
        var browserRef = ths.iab.create(BaseUrl, "_system", ths._appservices.inAppBrowserOption());
        var eventType: any = ths._appservices.inAppBrowserExitEvent();
        console.log(ths.platform.is('android'));
        console.log(eventType);
        browserRef.show();
        browserRef.on(eventType).subscribe(event => {
            console.log(event);
        })
    }
    get fullname() {
        return this.billingInformation.get('fullname');
    }
    get verificationCode() {
        return this.billingInformation.get('verificationCode');
    }
    get email() {
        return this.billingInformation.get('email');
      }
      get country() {
        return this.billingInformation.get('country');
      }
    initForm() {
        this.billingInformation = this.formBuilder.group({
            fullname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
            verificationCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            email: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            country: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        })
    }
    public errorMessages = {
        fullname: [{
            type: 'required',
            message: 'Name is required'
        }, ],
        verificationCode: [{
            type: 'required',
            message: 'Verification code is required'
        }],
        country: [
            { type: 'required', message: 'Country is required' },
          ],
          email: [
            { type: 'pattern', message: 'Enter a valid Email' },
            { type: 'required', message: 'Email is required' }
          ],
    };
    getCountries(){
        this._appservices.presentLoading();
        var UrlParameters = `emailAddress=${this._appservices.loggedInUserDetails.email}&clientIpAddress=${this._appservices.ipAddress.ip}`
        this._appservices.getDataByHttp(`Global/GetCountries?${UrlParameters}`).subscribe(res => {
          if (res.status == 200) {
            this.countriesList = res.data.data;
            console.log(this.countriesList);
          }
          this._appservices.loaderDismiss();
        });
      }
}