import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AppApiService } from 'src/app/services/app-apis.service';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-create-cart',
  templateUrl: './create-cart.component.html',
  styleUrls: ['./create-cart.component.scss'],
})
export class CreateCartComponent implements OnInit {
  currenciesArr = []
  public create_cart:FormGroup;
  ShowSpinner=false;
  checkbackground: boolean = false;
   public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
    ],
    networks: [
      { type: 'required', message: 'Networks is required' },
  
    ],
    description: [
      { type: 'required', message: 'Description is required' },
    ],
  };
  constructor(
         private formBuilder: FormBuilder,
            public router: Router,
            public _nav: NavController,
            public activatedroute: ActivatedRoute,
            public _appservices: AppService,
            public _encServices: EncryptionDecryptionService,
            private _appApi: AppApiService,
            private modalCtrl:ModalController
  ) { }

  ngOnInit() {
    this.initForm();
    this.get_currencies();
  }
    initForm(){
        this.create_cart = this.formBuilder.group({
          name: ["", [Validators.required]],
          description: [[], [Validators.required]],
          currency: ["", [Validators.required]],
        });
    }
    get name() {
      return this.create_cart.get('name');
    }
      get description() {
      return this.create_cart.get('description');
    }
      get currency() {
      return this.create_cart.get('currency');
    }
  get_currencies(){
    this._appservices.simpleLoaderWithoutDuration();
    this._appApi.get_v2026_portfolio_currencies().subscribe((response)=>{
      console.log(response,"currencies")
      this.currenciesArr =  response?.data?.currencies || [];
      this._appservices.loaderDismiss();
    },error=>{
        this._appservices.loaderDismiss();
    })
  }

  submit(){
    this.submitStep2()
  }
    submitStep2() {
    console.log(this.create_cart.value)
    if (!this.create_cart.valid) {
      Object.keys(this.create_cart.controls).forEach(field => {
        const control = this.create_cart.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    this.checkbackground = true;
    this.ShowSpinner = true;
    var postJson = {
      "name": this.create_cart.value.name,
      "description": this.create_cart.value.description,
      "currency": this.create_cart.value.currency,
      "items": [],
    }
    console.log(postJson);
    this._appApi.post_v2026_create_cart(postJson).subscribe(async (res) => {
      console.log("cart data", res);
      if (res.status == 200 || res.status == 201 || res.status == 202) {
        
        var dataResponse = {
          isCartCreated:true,
          cart_id:res.data.id,
          cart_data: res.data
        }
        this.modalCtrl.dismiss(dataResponse);
      } else {
             var dataResponse = {
          isCartCreated:false,
          cart_id:null,
          cart_data: null
        }
        this.modalCtrl.dismiss(dataResponse);
      }
      this._appservices.presentToast(res.data.message);
      this.ShowSpinner = false;
    },error=>{
      this.ShowSpinner = false;
      console.log(error)
        var dataResponse = {
        isCartCreated:false,
        cart_id:null,
        cart_data: null
        }
        this.modalCtrl.dismiss(dataResponse);
    });

  }

}
