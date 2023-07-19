import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { forkJoin } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { AppEnum } from 'src/app/appEnum/appenum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  checkbackground: boolean = false;
  languages: any=[];
  ShowSpinner = false;
  deviceId: any;
  data: any;
  geolocationparam: any= '28.482098,77.0851379';
  countriesList: any=[];
  constructor(private router: Router, private geolocation: Geolocation, private uniqueDeviceID: UniqueDeviceID,
    public _appservices: AppService, private formBuilder: FormBuilder, public _platform: Platform,
    public _encServices: EncryptionDecryptionService, public _appEnum: AppEnum) {

      this.getUserLocation();
  }

  ngOnInit() { 
    this.getUserLocation();
  }

  ionViewWillEnter() {
    // this._appservices.getDataByHttp('Users/GetUser?emailAddress=cree.finnikin%40usscyber.com&clientIpAddress=127.0.0.1').subscribe(res=>{
    //   console.log(res);
    // }) 
    this.getCountries();
    this.getUserLocation();
    this.getLanguages();
   
    this.uniqueDeviceID.get().then((uuid: any) => {
      this.deviceId = uuid;
    }).catch((error: any) => {
      this.deviceId = this._encServices.getUUID();
    });


  }
  getLanguages(){
     this._appservices.presentLoading();
    var UrlParameters = `emailAddress=${this._appservices.loggedInUserDetails.email}&clientIpAddress=${this._appservices.ipAddress.ip}`
    this._appservices.getDataByHttp(`Global/GetLanguages?${UrlParameters}`).subscribe(res => {
      if (res.status === 200 || res.statusCode === 200) {
        this.languages = res.data.data;
        console.log(this.languages);
      }
      this._appservices.loaderDismiss();
    });
    this._appservices.loaderDismiss();
  }
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
  get CallName() {
    return this.signupForm.get('CallName');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get language() {
    return this.signupForm.get('language');
  }
  get agree() {
    return this.signupForm.get('agree');
  }
  get country() {
    return this.signupForm.get('country');
  }
  signupForm = this.formBuilder.group({
    CallName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z_ ]+[a-zA-Z _]$')]],
    email: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    language: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    agree: [null, Validators.required],
    country: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });

  public errorMessages = {
    CallName: [
      { type: 'required', message: 'Name is required' },
      { type: 'pattern', message: 'Enter a valid Name' }
    ],
    email: [
      { type: 'pattern', message: 'Enter a valid Email' }
    ],
    language: [
      { type: 'required', message: 'Language is required' },
    ],
    country: [
      { type: 'required', message: 'Country is required' },
    ],
  };
async getUserLocation(){
      this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
      this.geolocationparam = resp.coords.latitude + ',' + resp.coords.longitude;
    }).catch((error) => {
      console.log(error)
      this.geolocationparam = '28.482098,77.0851379';
    });
}
  async goToSignUpConfirm() {
    if (!this.signupForm.valid) {
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this.ShowSpinner = true;
    var postJson = {
      "emailAddress": this.signupForm.value.email,
      "preferredName": this.signupForm.value.CallName,
      "preferredLanguage": this.signupForm.value.language,
      "country": this.signupForm.value.country
    }
    this._appservices.postDataByPromissHttp(`Users/LiteMobileRegistration`, postJson).then(res => {
      console.log("responce data", res);
      if (res.status == 200) {
        console.log(res.data);
        localStorage.setItem('registrationId', this._encServices.encrypt(res.data.registrationId));
        this.data = res.data;
        this.acceptTermsConditions(res);
      } else {
        this.ShowSpinner = false;
        this._appservices.presentToast('The specified Email (User ID) is not available. Please choose a different one.');
      }
    }).catch(err => console.log('err', err));
  }

  acceptTermsConditions(res) {
    var postJson = {
      "id": 0,
      "userId": res.data.emailAddress,
      "acceptanceDate": this._appservices.getAppDateTime(new Date()),
      "geoLocation": this.geolocationparam,
      "deviceId": this.deviceId,
      "deviceOs": 'android',
      "userIpAddress": this._appservices.ipAddress.ip,
      "hasAccepted": true
    }
    console.log('acceptTermsConditions', JSON.stringify(postJson));
    this._appservices.postDataByPromissHttp(`Users/AcceptedTerms`, postJson).then(TermsResponse => {
      console.log("responce data", res);
      this.ShowSpinner = false;
      if (res.status == 200) {
        console.log(res.data);
        this.router.navigate(['/signupconfirm', { email: this._encServices.encrypt(this.data.emailAddress), RegistraionId: this._encServices.encrypt(this.data.registrationId), language: this._encServices.encrypt(this.data.preferredLanguage), prefName: this._encServices.encrypt(this.data.preferredName) }]);
      } else {
        this.router.navigate(['/signupconfirm', { email: this._encServices.encrypt(this.data.emailAddress), RegistraionId: this._encServices.encrypt(this.data.registrationId), language: this._encServices.encrypt(res.data.preferredLanguage), prefName: this._encServices.encrypt(this.data.preferredName) }]);

        // alert("something went wrong")
      }
    });

  }


  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.checkbackground = false;
  }
}
