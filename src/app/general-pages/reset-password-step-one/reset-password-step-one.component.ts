import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Platform, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-reset-password-step-one',
  templateUrl: './reset-password-step-one.component.html',
  styleUrls: ['./reset-password-step-one.component.scss'],
})
export class ResetPasswordStepOneComponent implements OnInit {
  resetPasswordForm: FormGroup;
  rootPage: string = 'Forgot Password';
  showSpinner: boolean=false;
  ConfirmMessage:boolean=false;
  RequestData: any;
  constructor(
    public _appServices: AppService,
    public platform: Platform,
    public _nav: NavController,
    private formBuilder: FormBuilder,
    private _encrypDecrypService: EncryptionDecryptionService,
    private uniqueDeviceID: UniqueDeviceID,
    private activatedroute: ActivatedRoute,
    private router:Router
  ) { this.rootPage = this.activatedroute.snapshot.paramMap.get('root'); }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }
  public errorMessages = {
    email: [
      { type: 'required', message: 'Email Address is required' },
      { type: 'pattern', message: 'Enter a valid Email Address' }
    ]
  };
  gotoLogin() {
    if (this.rootPage == 'Reset Password') {
      this._nav.navigateRoot("/user-panel");
    } else {
      this.logout();
    }
  }
  logout() {
    var deviceID = this._encrypDecrypService.getUUID();
    localStorage.clear();
    this._encrypDecrypService.setUUID(deviceID);
    this._nav.navigateRoot(['/login']);
  }
  reset(){
    this._appServices.simpleLoader();
    var UrlParameters = `Auth/SendResetPasswordRequestAsync`;
    console.log(UrlParameters);
    this._appServices.postDataByHttp(UrlParameters, this.resetPasswordForm.value).pipe(finalize(() => this._appServices.loaderDismiss())).subscribe(res => {
      console.log("Auth/SendResetPasswordRequestAsync Response", res);
      if(res.status === 200){
        this.ConfirmMessage=true;
        this.RequestData = res.data.data;
      }
    }, err => {
      console.log(err);
      this._appServices.loaderDismiss();
    });
  
  }
  get email() {
    return this.resetPasswordForm.get('email');
  }
  nextbtn(){
    this._nav.navigateForward("/reset-password-setp-two",{queryParams: { root: this.rootPage,RequestData: this.RequestData }});
  }
}
