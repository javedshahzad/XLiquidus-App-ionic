import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AppApiService } from 'src/app/services/app-apis.service';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.scss'],
})
export class SignupStep2Component implements OnInit {
  date: any;
  maxDate: any;
  isshowtip = false;
  isshowtipc = false;
  countries: any;
  genders: any;
  maskemailId: any;
  checkbackground: boolean = false;
  emailId: any;
  Callname: any;
  language: any;
  ShowSpinner = false;
  RegistrationId: any;
  createProfile: any;
  noteighteen: any;
  userDetails: any="";
  GetLanguages: any;
  GetCurrencies =  [
  "AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN",
  "BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL",
  "BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY",
  "COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP",
  "ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP",
  "GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR",
  "ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY",
  "KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK",
  "LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK",
  "MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD",
  "NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP",
  "PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD",
  "SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STN",
  "SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD",
  "TZS","UAH","UGX","USD","UYU","UZS","VES","VND","VUV","WST",
  "XAF","XCD","XOF","XPF","YER","ZAR","ZMW","ZWL"
];
GetCryptoCurrencies = []

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public _nav: NavController,
    public activatedroute: ActivatedRoute,
    public _appservices: AppService,
    public _encServices: EncryptionDecryptionService,
    private _appApi: AppApiService
  ) {
    this.date = new Date();
    this.maxDate = new Date(this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDate()).toISOString();
    this.date = this.date.toISOString()
  }

  ngOnInit() { }
// getUserProfile(){
//   this._appservices.presentLoading();
//   //var UserDetailsUrl = `Users/GetUser?emailAddress=${encodeURIComponent(this._appservices.loggedInUserDetails['email'])}&clientIpAddress=${this._appservices.ipAddress.ip}`
//   var UserDetailsUrl = `v2026/auth/me`
//   this._appservices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
//     if (_res.status == 200) {
//       this.userDetails = _res.data;
//       console.log(this.userDetails)
//       // this.signupForm2.controls["dob"].setValue(this.userDetails.dob);
//     }
//     this._appservices.loaderDismiss();
//   });
// }
  ionViewWillEnter() {
    this.Callname = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('prefferedLanguage'));
    this.RegistrationId = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('registerationId'));
    this.emailId = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('email'));
    this.language = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('Preflanguage'));
    this.createProfile = this.activatedroute.snapshot.paramMap.get('onlyCreateProfile');
    this.maskemailId = this.emailId.replace(/^(.)(.*)(.@.*)$/,
      (_, a, b, c) => a + b.replace(/./g, '*') + c
    );
    console.log(this.maskemailId);
    this.getGlobalData();
  }
  getGlobalData(){
     this._appservices.presentLoading();
    var get_countries =this._appApi.get_Global_GetCountries();
    var GetGenders =this._appApi.get_Global_GetGenders();
    var GetLanguages =this._appApi.get_Global_GetLanguages();
    var GetCryptoCurrencies =this._appApi.get_Global_GetCryptoCurrencies();
    forkJoin([get_countries,GetGenders,GetLanguages,GetCryptoCurrencies]).subscribe(_res => {
      console.log(_res)
      this.countries = _res[0].status == 200 ? _res[0].data : [];
      this.genders = _res[1].status == 200 ? _res[1].data : [];
      this.GetLanguages = _res[2].status == 200 ? _res[2].data : [];
      this.GetCryptoCurrencies = _res[3].status == 200 ? _res[3].data : [];
       this._appservices.loaderDismiss();
    }
    ,error=>{
       this._appservices.loaderDismiss();
    }
  );
  }

  get FirstName() {
    return this.signupForm2.get('FirstName');
  }
  get LastName() {
    return this.signupForm2.get('LastName');
  }
  get country() {
    return this.signupForm2.get('country');
  }
  get dob() {
    return this.signupForm2.get('dob');
  }
  get gender() {
    return this.signupForm2.get('gender');
  }

  get streetAddr() {
    return this.signupForm2.get('streetAddr');
  }

  // get AddnlAddr(){
  //   return this.signupForm2.get('AddnlAddr');
  // }

  get city() {
    return this.signupForm2.get('city');
  }
  get preferredLanguage() {
    return this.signupForm2.get('preferredLanguage');
  }
  get preferredCurrency() {
    return this.signupForm2.get('preferredCurrency');
  }

  get state(){
    return this.signupForm2.get('state');
  }

  // get zipcode(){
  //   return this.signupForm2.get('zipcode');
  // }

  get mobile() {
    return this.signupForm2.get('mobile');
  }
   get email() {
    return this.signupForm2.get('email');
  }



  signupForm2 = this.formBuilder.group({
    FirstName: [this._appservices.loggedInUserAccountDetails.given_name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]], //, Validators.pattern('[a-zA-Z]+[a-zA-Z _]$')
    LastName: [this._appservices.loggedInUserAccountDetails.family_name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]], //, Validators.pattern('[a-zA-Z]+[a-zA-Z _]$')
    country: [this._appservices.getCountry(), [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    preferredLanguage: ["English", [Validators.required]],
    preferredCurrency: ["USD", [Validators.required]],
    email: [this._appservices.loggedInUserAccountDetails.email, []],
    //dob: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100), ageValidator]],
    //gender: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    //streetAddr: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"][a-zA-Z0-9!@#$&()\\-`.+,/\"_ ]+[a-zA-Z0-9!@#$&()\\-`.+,/\" _]$')]],
    // AddnlAddr: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255),Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"][a-zA-Z0-9!@#$&()\\-`.+,/\"_ ]+[a-zA-Z0-9!@#$&()\\-`.+,/\" _]$')]],
    //state: [null, [Validators.required,Validators.maxLength(100)]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100),]], //Validators.pattern('[a-zA-Z][a-zA-Z_ ]+[a-zA-Z _]$')
    mobile: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[+][1-9]{0}[0-9]+/)]], // /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
    //zipcode: [null, [Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
  });
  public errorMessages = {
    FirstName: [
      { type: 'required', message: 'First Name is required' },
      { type: 'pattern', message: 'Enter a valid First Name' }
    ],
    LastName: [
      { type: 'required', message: 'Last Name is required' },
      { type: 'pattern', message: 'Enter a valid Last Name' }
    ],
    country: [
      { type: 'required', message: 'Country is required' },
    ],
    dob: [
      { type: 'required', message: 'Date of birth is required' },
      {
        type: 'isvalid', message: 'You must be 18 years or older'
      }
    ],
    preferredLanguage:[
      { type: 'required', message: 'Language is required' },
    ],
    preferredCurrency:[
      { type: 'required', message: 'Currency is required' },
    ],
    gender: [
      { type: 'required', message: 'Gender is required' },
    ],
    mobile: [
      { type: 'required', message: 'Mobile Number is required' },
      { type: 'pattern', message: 'Enter a valid Mobile Number' }
    ],
    streetAddr: [
      { type: 'required', message: 'Address is required' },
      { type: 'pattern', message: 'Enter a valid Address' },
      { type: 'maxlength', message: 'You have reached max characters limit' }
    ]
    ,
    // AddnlAddr: [
    //   { type: 'required', message: 'Additional Address is required' }, 
    //   { type: 'pattern', message: 'Enter a valid Additional Address'},
    //   { type: 'maxlength', message: 'You have reached max characters limit' }
    // ],
    state: [
      { type: 'required', message: 'State is required' },
      { type: 'maxlength', message: 'You have reached max characters limit' }
    ],
    zipcode: [
      { type: 'required', message: 'ZIP code is required' },
      { type: 'minlength', message: 'Enter a valid ZIP Code' },
      { type: 'maxlength', message: 'You have reached max characters limit' }
    ],
    city: [
      { type: 'required', message: 'City is required' },
      { type: 'pattern', message: 'Enter a valid City' } 
    ]
  };

  toggleshowtip() {
    this.isshowtip = !this.isshowtip;
  }
  toggleshowtipc() {
    this.isshowtipc = !this.isshowtipc;
  }
  submitStep2() {
    console.log(this.signupForm2.value)
    if (!this.signupForm2.valid) {
      Object.keys(this.signupForm2.controls).forEach(field => {
        const control = this.signupForm2.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this.ShowSpinner = true;
    //var newDate = new Date(this.signupForm2.value.dob)
    var postJson = {
      "firstName": this.signupForm2.value.FirstName,
      "lastName": this.signupForm2.value.LastName,
      "phoneNumber": this.signupForm2.value.mobile,
      "email":this._appservices.loggedInUserAccountDetails.email,
      // "address": this.signupForm2.value.streetAddr,
      // "state": this.signupForm2.value.state,
      "city": this.signupForm2.value.city,
      // "postalCode": this.signupForm2.value.zipcode,
      "country": this.signupForm2.value.country,
      // "dateOfBirth": this.signupForm2.value.dob,
      "preferredLanguage":this.signupForm2.value.preferredLanguage,
      "preferredCurrency":this.signupForm2.value.preferredCurrency,
      "acceptTerms":true,
      "acceptPrivacyPolicy":true,
      //"gender": this.signupForm2.value.gender,
      //"language": this.language,
      // "objectId": this.RegistrationId
    }
    console.log(postJson);
    this._appApi.post_v2026_auth_register( postJson).subscribe(async (res) => {
      console.log("responce data", res);
      this.ShowSpinner = false;
      if (res.status == 200 || res.status == 201) {
        await this.postProfile(postJson);
        this._appservices.presentToast(res.data.message);
        if (this.createProfile == 1) {
          this._nav.navigateRoot(['/signup-step3']);
        } else {
          this._nav.navigateRoot(['.']);
        }
      } else {
        if(res.data.message){
          var msg =JSON.parse(res.data.message);
          this._appservices.presentToast(msg);
        }
      
      }
      // this._appservices.presentToast(res);
    },error=>{
      this.ShowSpinner = false;
      console.log(error)
    });

  }
  postProfile(data){
    var postJson={
      email: data.email,
      name: `${data.firstName} ${data.lastname}`,
      logtoId: this._appservices.loggedInUserAccountDetails.LogtoUserId
    }
    this._appApi.post_v2026_auth_profile(postJson).subscribe(res => {
      console.log("profile data", res);
    },error=>{
      console.log(error)
    });
  }
  skipthisstep() {
    this._nav.navigateRoot(['.']);
  }
  ngOnDestroy() {
    this.checkbackground = false;
  }
  changedate(val) {
    var dob = val.split('T')[0]
    console.log(dob)
    var comparedate = new Date(dob)
    var ageDifMs = Date.now() - comparedate.getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age > 17) {
      this.noteighteen = false
    } else {
      this.noteighteen = true;
    }
  }
}

export function ageValidator(control: AbstractControl) {
  if (control.value) {
    var dob = control.value.split('T')[0]
    console.log(dob)
    var comparedate = new Date(dob)
    var ageDifMs = Date.now() - comparedate.getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 17) {
      return { isvalid: true }
    }
  }

  return null;
}
