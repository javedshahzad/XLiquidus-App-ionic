import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-signup-confirmmessage',
  templateUrl: './signup-confirmmessage.component.html',
  styleUrls: ['./signup-confirmmessage.component.scss'],
})
export class SignupConfirmmessageComponent implements OnInit {
  checkbackground: boolean = false;
  maskemailId: any;
  registrationId: any;
  emailId: any;
  language: any;
  prefName: any;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    public _encServices: EncryptionDecryptionService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.prefName = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('prefName'));
    this.language = this.activatedroute.snapshot.paramMap.get('language');
    this.registrationId = this.activatedroute.snapshot.paramMap.get('RegistraionId');
    this.emailId = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('email'));
    this.maskemailId = this.emailId.replace(/^(.)(.*)(.@.*)$/,
      (_, a, b, c) => a + b.replace(/./g, '*') + c
    );
    console.log(this.maskemailId);
  }

  goToSignUp2() {
    this.router.navigate(['/signupstep2', { email: this._encServices.encrypt(this.emailId), Preflanguage: this.language, registerationId: this.registrationId, prefferedLanguage: this._encServices.encrypt(this.prefName) }])
  }

  ngOnDestroy() {
    this.checkbackground = false;
  }
}
