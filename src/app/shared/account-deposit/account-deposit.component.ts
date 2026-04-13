import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { AppApiService } from 'src/app/services/app-apis.service';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import * as Square from '@square/web-sdk';
import { GlobalService } from 'src/app/services/global.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-account-deposit',
  templateUrl: './account-deposit.component.html',
  styleUrls: ['./account-deposit.component.scss'],
})
export class AccountDepositComponent implements OnInit {
 currenciesArr = [];
  depositTypes = ['fiat','crypto']
  public deposit_blueprint_form:FormGroup;
  ShowSpinner=false;
  checkbackground: boolean = false;
   public errorMessages = {
    type: [
      { type: 'required', message: 'Type is required' },
    ],
    network: [
      { type: 'required', message: 'Network is required' },
  
    ],
    amount: [
      { type: 'required', message: 'Amount is required' },
    ],
    paymentMethod: [
      { type: 'required', message: 'Payment Method is required' },
    ],
    asset:[
      { type: 'required', message: 'Asset is required' },
    ],
    currency:[
      { type: 'required', message: 'Currency is required' },
    ],
  };
  card: Square.Card;
  applicationId = 'sandbox-sq0idb-5uDFG_CVw2RXUQj7IQ9zMQ';
  locationId = 'PD6X914EJ0C5F';
  IsPay: boolean = false;
  GetCryptoCurrencies: any;
  payment_methods = ['card']; //, 'apple_pay', 'google_pay', 'pix'
  networksArr = ['ethereum', 'polygon', 'arbitrum', 'bsc', 'bitcoin'];
  card_result: Square.TokenResult;
  constructor(
      private formBuilder: FormBuilder,
      public router: Router,
      public _nav: NavController,
      public activatedroute: ActivatedRoute,
      public _appservices: AppService,
      public _encServices: EncryptionDecryptionService,
      private _appApi: AppApiService,
      private modalCtrl:ModalController,
      private global: GlobalService,
      private ngZone: NgZone,
      private platform :Platform
  ) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => { 
           var dataResponse = {
        isSuccess:false,
        data:null,
        }
      this.modalCtrl.dismiss(dataResponse)
    });
    this.initForm();
  }
    initForm(){
        this.deposit_blueprint_form = this.formBuilder.group({
          type: ["fiat", [Validators.required]],
          amount: ["", [Validators.required]],
          currency: ["", []],
          paymentMethod:['card',[]],
          provider:['',[]],
          asset:['',[]],
          network:['',[]]
        });
    }
    get type() {
      return this.deposit_blueprint_form.get('type');
    }
      get amount() {
      return this.deposit_blueprint_form.get('amount');
    }
      get currency() {
      return this.deposit_blueprint_form.get('currency');
    }
    get paymentMethod() {
      return this.deposit_blueprint_form.get('paymentMethod');
    }
      get asset() {
      return this.deposit_blueprint_form.get('asset');
    }
      get network() {
      return this.deposit_blueprint_form.get('network');
    }
  get_currencies(){
    this._appservices.simpleLoaderWithoutDuration();
    var portfollioCurrency = this._appApi.get_v2026_portfolio_currencies();
    var GetCryptoCurrencies =this._appApi.get_Global_GetCryptoCurrencies();
    forkJoin([portfollioCurrency,GetCryptoCurrencies]).subscribe((_response:any)=>{
      console.log(_response,"currencies")
      this.currenciesArr = _response[0].status == 200 ? _response[0].data.currencies : [];
      this.GetCryptoCurrencies = _response[1].status == 200 ? _response[1].data : [];
      this._appservices.loaderDismiss();
    },error=>{
        this._appservices.loaderDismiss();
    })
  }

  submit(){
    if(this.deposit_blueprint_form.value.type == 'fiat'){
      this.Process_Card();
    }else{
      this.submitData();
    }
    //this.submitStep2()
  }
    submitData() {
    console.log(this.deposit_blueprint_form.value)
    if (!this.deposit_blueprint_form.valid) {
      Object.keys(this.deposit_blueprint_form.controls).forEach(field => {
        const control = this.deposit_blueprint_form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this.checkbackground = true;
    this.ShowSpinner = true;
    var postJson =this.deposit_blueprint_form.value;
    console.log(postJson);
    this._appApi.post_v2026_deposits_blueprint(postJson).subscribe(async (res) => {
      console.log("post_v2026_deposits_blueprint data == ", res);
      if (res.status == 200 || res.status == 201 || res.status == 202) {
        
        var dataResponse = {
          isSuccess:true,
          data:res.data,
        }
        this.modalCtrl.dismiss(dataResponse);
      } else {
      var dataResponse = {
          isSuccess:false,
          data:null,
        }
        this.modalCtrl.dismiss(dataResponse);
      }
      this._appservices.presentToast(res.data.message);
      this.ShowSpinner = false;
    },error=>{
      this.ShowSpinner = false;
      console.log(error)
        var dataResponse = {
        isSuccess:false,
        data:null,
        }
        this._appservices.presentToast(error.error);
        //this.modalCtrl.dismiss(dataResponse);
    });

  }
      ionViewWillEnter() {
      this.get_currencies();
      this.card?.clear();
      this.isShowSquareCardDiv();
    }
  isShowSquareCardDiv() {
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
    async Process_Card() {
    this.ShowSpinner = true;
    this._appservices.presentLoading();
        try {
            const result = await this.card?.tokenize();
            if (result?.status === 'OK') {
              this.card_result = result;
                console.log(result);
                console.log(`Square result:`,result);
                console.log(`Payment token is: ${result.token}`);
                console.log(`Payment token is: ${JSON.stringify(result)}`);
                this.submitData();
            }else{
              this.ShowSpinner = false;
            }
        } catch (e) {
          this.ShowSpinner = false;
            this.global.CreateToast(e);
            console.error(e);
        }
}
OnChangeType(eve){
  if(eve.target.value === 'fiat'){
    this.isShowSquareCardDiv();
  }else{
       this.card?.clear();
  }
}

}
