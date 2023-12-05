import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public _nav: NavController,
    public activatedroute: ActivatedRoute,
    public _appservices: AppService,
    public _encServices: EncryptionDecryptionService
  ) {
    this.date = new Date();
    this.maxDate = new Date(this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDate()).toISOString();
    this.date = this.date.toISOString()
  }

  ngOnInit() { }
getUserProfile(){
  this._appservices.presentLoading();
  var UserDetailsUrl = `Users/GetUser?emailAddress=${encodeURIComponent(this._appservices.loggedInUserDetails['email'])}&clientIpAddress=${this._appservices.ipAddress.ip}`
  this._appservices.getDataByHttp(UserDetailsUrl).subscribe(_res => {
    if (_res.status == 200) {
      this.userDetails = _res.data;
      console.log(this.userDetails)
      this.signupForm2.controls["dob"].setValue(this.userDetails.dob);
    }
    this._appservices.loaderDismiss();
  });
}
  ionViewWillEnter() {
    this._appservices.presentLoading();
    this.Callname = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('prefferedLanguage'));
    this.RegistrationId = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('registerationId'));
    this.emailId = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('email'));
    this.language = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('Preflanguage'));
    this.createProfile = this.activatedroute.snapshot.paramMap.get('onlyCreateProfile');
    this.maskemailId = this.emailId.replace(/^(.)(.*)(.@.*)$/,
      (_, a, b, c) => a + b.replace(/./g, '*') + c
    );
    console.log(this.maskemailId);

    var UrlParameters = `emailAddress=${this._appservices.loggedInUserDetails.email}&clientIpAddress=${this._appservices.ipAddress.ip}`
    this._appservices.getDataByHttp(`Global/GetCountries?${UrlParameters}`).subscribe(res => {
      if (res.status == 200) {
        this.countries = res.data.data;
        console.log(this.countries);
      }
    });

    this._appservices.getDataByHttp(`Global/GetGenders?${UrlParameters}`).subscribe(res => {
      if (res.status == 200) {
        this.genders = res.data.data;
        console.log(this.genders);
      }
    });
    this.getUserProfile();
    this._appservices.presentLoading();
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

  // get state(){
  //   return this.signupForm2.get('state');
  // }

  // get zipcode(){
  //   return this.signupForm2.get('zipcode');
  // }

  get mobile() {
    return this.signupForm2.get('mobile');
  }



  signupForm2 = this.formBuilder.group({
    FirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z]+[a-zA-Z _]$')]],
    LastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[a-zA-Z]+[a-zA-Z _]$')]],
    country: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    dob: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50), ageValidator]],
    gender: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    streetAddr: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"][a-zA-Z0-9!@#$&()\\-`.+,/\"_ ]+[a-zA-Z0-9!@#$&()\\-`.+,/\" _]$')]],
    // AddnlAddr: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255),Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"][a-zA-Z0-9!@#$&()\\-`.+,/\"_ ]+[a-zA-Z0-9!@#$&()\\-`.+,/\" _]$')]],
    // state: [null, [Validators.required]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),Validators.pattern('[a-zA-Z][a-zA-Z_ ]+[a-zA-Z _]$')]],
    mobile: ['', [Validators.required, Validators.maxLength(18), Validators.pattern(/^[+][1-9]{0}[0-9]+/)]], // /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
    // zipcode: [null, [Validators.required,Validators.minLength(4)]],
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
    // state: [
    //   { type: 'required', message: 'State is required' },
    // ],
    // zipcode: [
    //   { type: 'required', message: 'ZIP code is required' },
    //   { type: 'minlength', message: 'Enter a valid ZIP Code' }
    // ],
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
    var newDate = new Date(this.signupForm2.value.dob)
    var postJson = {
      "email": this.emailId,
      "preferredName": this.Callname,
      "firstName": this.signupForm2.value.FirstName,
      "middleName": "",
      "lastName": this.signupForm2.value.LastName,
      "mobilePhone": this.signupForm2.value.mobile,
      "address": {
        // "id": 0,
        "streetAddress": this.signupForm2.value.streetAddr,
        // "additionalAddressInfo": this.signupForm2.value.AddnlAddr,
        // "stateProvinceRegion": this.signupForm2.value.state,
        "city": this.signupForm2.value.city,
        // "zipPostal": this.signupForm2.value.zipcode,
        "country": this.signupForm2.value.country
      },
      "dob": this.signupForm2.value.dob,
      "gender": this.signupForm2.value.gender,
      "language": this.language,
      "objectId": this.RegistrationId
    }
    console.log(postJson);
    this._appservices.postDataByPromissHttp(`Users/UpdateUser`, postJson).then(res => {
      console.log("responce data", res);
      this.ShowSpinner = false;
      if (res.status == 200) {
        this._appservices.presentToast('Personalize profile update successfully');
        if (this.createProfile == 1) {
          this._nav.navigateRoot(['user-panel/dashboard']);
        } else {
          this._nav.navigateRoot(['.']);
        }
      } else {
        if(res.data.error){
          var msg =JSON.parse(res.data.error);
          this._appservices.presentToast(msg.message);
        }
      
      }
      // this._appservices.presentToast(res);
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
