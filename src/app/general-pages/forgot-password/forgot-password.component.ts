import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Platform, NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  backButtonSubscription: any;
  resetPasswordForm: FormGroup;
  showSpinner: boolean;
  showError: boolean;
  deviceId: any;
  showEmail: string = "eye-off";
  emailType: string = 'password';
  rootPage: string = 'Reset Password';
  Newemail: string;

  constructor(
    public _appServices: AppService,
    public platform: Platform,
    public _nav: NavController,
    private formBuilder: FormBuilder,
    private _encrypDecrypService: EncryptionDecryptionService,
    private uniqueDeviceID: UniqueDeviceID,
    private activatedroute: ActivatedRoute
  ) {
    this.rootPage = this.activatedroute.snapshot.paramMap.get('root');

    this.uniqueDeviceID.get().then((uuid: any) => {
      this.deviceId = uuid;
      console.log(this.deviceId);
    }).catch((error: any) => {
      this.deviceId = this._encrypDecrypService.getUUID();
    });
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      confirmEmail: ['', [Validators.required, this.ValidateAddress, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    }, {
      validator: this.ValidateAddress('email', 'confirmEmail')
    });
    if (this.rootPage == 'Reset Password') {
      let encEmail = encodeURIComponent(this._appServices.loggedInUserDetails['email']);
      const Email = encEmail.replace('%40', '@');
      this.resetPasswordForm.patchValue({
        email: Email,
        confirmEmail: Email,
      })
    }
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  get confirmEmail() {
    return this.resetPasswordForm.get('confirmEmail');
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email Address is required' },
      { type: 'pattern', message: 'Enter a valid Email Address' }
    ],
    confirmEmail: [
      { type: 'required', message: 'Confirm Email Address is required' },
      { type: 'pattern', message: 'Enter a valid Confirm Email Address' }
    ],
    mismatch: 'Whoops! Your email addresses do not match. Try Again.'
  };

  ValidateAddress(email, confirmEmail) {
    return (form: FormGroup): { [key: string]: any } => {
      return form.controls[email].value == form.controls[confirmEmail].value ? null : { mismatch: true };
    }
  }

  reset() {
    this._appServices.presentLoading();
    var resetPasswordUrl = `Users/GetRequestResetPassword?email=${this.email.value}&ipAddress=${this._appServices.ipAddress.ip}&deviceId=${this.deviceId}`
    this._appServices.getDataByHttp(resetPasswordUrl).subscribe(_res => {
      console.log(_res);
      if (_res.status == 200) {
        this._appServices.presentToast('An email has been sent to you to reset your password.');
        this.logout();
      } else {
        this.showError = true;
      }
      this._appServices.loaderDismiss();
    }, err => {
      this._appServices.loaderDismiss();
      this._appServices.presentToast('Error in sending Email.');
    })
  }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      // this._nav.navigateRoot(['user-panel/']);
      this._appServices.goBack();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  gotoLogin() {
    if (this.rootPage == 'Reset Password') {
      this._nav.navigateRoot("/user-panel");
    } else {
      this.logout();
    }
  }

  toggleShow() {
    this.showEmail = this.showEmail == 'eye-off' ? 'eye' : 'eye-off';
    this.emailType = this.emailType == 'password' ? 'text' : 'password';
  }

  logout() {
    var deviceID = this._encrypDecrypService.getUUID();
    localStorage.clear();
    this._encrypDecrypService.setUUID(deviceID);
    this._nav.navigateRoot(['.']);
  }
}
