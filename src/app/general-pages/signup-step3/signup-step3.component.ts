import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppApiService } from 'src/app/services/app-apis.service';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-signup-step3',
  templateUrl: './signup-step3.component.html',
  styleUrls: ['./signup-step3.component.scss'],
})
export class SignupStep3Component implements OnInit {
  public signupForm3:FormGroup;
  checkbackground: boolean = false;
    public errorMessages = {
    accountType: [
      { type: 'required', message: 'Account Type is required' },
    ],
    networks: [
      { type: 'required', message: 'Networks is required' },
  
    ],
    currencies: [
      { type: 'required', message: 'Currencies is required' },
    ],
    label: [
      { type: 'required', message: 'Label is required' },

    ],

  };
  ShowSpinner=false;
  accountTypes = ["basic", "banking_customer", "baseline_multisig", "plus_multisig", "vault_multisig"];
  networksArr = ['ethereum', 'polygon', 'arbitrum', 'bsc', 'bitcoin'];
  currenciesArr = ["ETH", "USDC", "MATIC"]
  constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        public _nav: NavController,
        public activatedroute: ActivatedRoute,
        public _appservices: AppService,
        public _encServices: EncryptionDecryptionService,
        private _appApi: AppApiService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
      this.signupForm3 = this.formBuilder.group({
        accountType: ["", [Validators.required]], //, Validators.pattern('[a-zA-Z]+[a-zA-Z _]$')
        networks: [[], []], //, Validators.pattern('[a-zA-Z]+[a-zA-Z _]$')
        currencies: [[], []],
        label: ["", [Validators.required]],
      });
  }
  get accountType() {
    return this.signupForm3.get('accountType');
  }
    get networks() {
    return this.signupForm3.get('networks');
  }
    get currencies() {
    return this.signupForm3.get('currencies');
  }
    get label() {
    return this.signupForm3.get('label');
  }
  submit(){
    this.submitStep2()
  }
    submitStep2() {
    console.log(this.signupForm3.value)
    if (!this.signupForm3.valid) {
      Object.keys(this.signupForm3.controls).forEach(field => {
        const control = this.signupForm3.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this.ShowSpinner = true;
    var postJson = {
      "accountType": this.signupForm3.value.accountType,
      "networks": this.signupForm3.value.networks,
      "currencies": this.signupForm3.value.currencies,
      "label": this.signupForm3.value.label,

    }
    console.log(postJson);
    this._appApi.post_v2026_accounts_blueprint( postJson).subscribe(async (res) => {
      console.log("responce data", res);
      this.ShowSpinner = false;
      if (res.status == 200 || res.status == 201 || res.status == 202) {
        this._appservices.presentToast(res.data.message);
        this._nav.navigateRoot(['user-panel/dashboard']);
      } else {
        this._nav.navigateRoot(['user-panel/dashboard']);
        if(res.data.message){
          var msg =JSON.parse(res.data.message);
          this._appservices.presentToast(msg);
        }
      this.ShowSpinner = false;
      }
    },error=>{
      this._nav.navigateRoot(['user-panel/dashboard']);
      this.ShowSpinner = false;
      console.log(error)
    });

  }
}
