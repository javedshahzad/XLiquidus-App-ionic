import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Platform, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-reset-password-step-two',
  templateUrl: './reset-password-step-two.component.html',
  styleUrls: ['./reset-password-step-two.component.scss'],
})
export class ResetPasswordStepTwoComponent implements OnInit {
  resetPasswordForm: FormGroup;
  rootPage: string = 'Forgot Password';
  showSpinner: boolean=false;
  ConfirmMessage:boolean=false;
  RequestData: any;
  ResetPasswordData: any;
  showPassword: string = "eye-off";
  PasswodType: string = 'password';
  showConfirmPassword: string = "eye-off";
  ConfirmPasswodType: string = 'password';
  constructor(
    public _appServices: AppService,
    public platform: Platform,
    public _nav: NavController,
    private formBuilder: FormBuilder,
    private _encrypDecrypService: EncryptionDecryptionService,
    private uniqueDeviceID: UniqueDeviceID,
    private activatedroute: ActivatedRoute,
    private router:Router
  ) {
    this.activatedroute.queryParams.subscribe((response:any)=>{
      this.rootPage = response.root;
      this.RequestData = response.RequestData;
      console.log(this.RequestData)
    })

   }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      otpCode: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required, this.ValidateAddress,]]
    }, {
      validator: this.ValidateAddress('password', 'passwordConfirmation')
    });
  }
  ValidateAddress(password, passwordConfirmation) {
    return (form: FormGroup): { [key: string]: any } => {
      return form.controls[password].value == form.controls[passwordConfirmation].value ? null : { mismatch: true };
    }
  }

  get otpCode() {
    return this.resetPasswordForm.get('otpCode');
  }
  get password() {
    return this.resetPasswordForm.get('password');
  }
  get passwordConfirmation() {
    return this.resetPasswordForm.get('passwordConfirmation');
  }
  public errorMessages = {
    otpCode: [
      { type: 'required', message: 'OTP Code is required' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
    ],
    passwordConfirmation: [
      { type: 'required', message: 'Confirm password is required' },
    ],
    mismatch: 'Whoops! Confirm Password do not match. Try Again.'
  };
  toggleShow() {
    this.showPassword = this.showPassword == 'eye-off' ? 'eye' : 'eye-off';
    this.PasswodType = this.PasswodType == 'password' ? 'text' : 'password';
  }
  toggleShowConfirmPassword() {
    this.showConfirmPassword = this.showConfirmPassword == 'eye-off' ? 'eye' : 'eye-off';
    this.ConfirmPasswodType = this.ConfirmPasswodType == 'password' ? 'text' : 'password';
  }
  reset(){
    this._appServices.simpleLoader();
    var UrlParameters = `Auth/ResetPasswordOperationAsync`;
    console.log(UrlParameters);
    var payLoad = this.resetPasswordForm.value;
    payLoad["email"]=this.RequestData.email;
    payLoad["requestId"]=this.RequestData.id;
    this._appServices.postDataByHttp(UrlParameters, payLoad).pipe(finalize(() => this._appServices.loaderDismiss())).subscribe(res => {
      console.log("Auth/SendResetPasswordRequestAsync Response", res);
      if(res.status === 200){
        this.ResetPasswordData = res.data.data;
        if(this.ResetPasswordData.status === "Completed"){
          this._appServices.presentToast(`Password has been reset successfully. Please login to continue!`);
         // this.IsLoginAllowedAsync();
          this.gotoLogin();
        }else{
          this._appServices.presentToast(this.ResetPasswordData.message);
        }
      }
    }, err => {
      console.log(err);
      var errorMsg = JSON.parse(err.error);
      this._appServices.presentToast(errorMsg.message)
      this._appServices.loaderDismiss();
    });
  }
  gotoLogin() {
    this._nav.navigateRoot("/login");
}
IsLoginAllowedAsync(){
  var UrlParameters = `Auth/IsLoginAllowedAsync?email=${this.RequestData.email}&applicationType=XL`;
  this._appServices.getDataByHttp(UrlParameters).subscribe(res => {
    console.log("Auth/IsLoginAllowedAsync Response", res);
    if(res.status === 200){
      // this.ConfirmMessage=true;
      // this.RequestData = res.data.data;
    }
  }, err => {
    console.log(err);
    this._appServices.loaderDismiss();
  });
}
}
