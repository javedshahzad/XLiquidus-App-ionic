import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ADD_TO_CART_PAYLOAD, AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-update-order-modal',
  templateUrl: './update-order-modal.page.html',
  styleUrls: ['./update-order-modal.page.scss'],
})
export class UpdateOrderModalPage implements OnInit {
  GetSingleListData:any="";
  data: any;
  Quantity: any;
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService,
    public modalController: ModalController,
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.data = this.navParams.get("data");
    this.GetListingById(this.data.id);
  }
  closeModal(){
    this.modalController.dismiss();
  }
  remove(){
    this._appservices.simpleLoader();
    var UrlParameters = `CloudCart/RemoveFromCart?email=${this._appservices.loggedInUserDetails['email']}&cartType=XL&item=${this.GetSingleListData.id}`;
    console.log(UrlParameters);
    this._appservices.postDataByHttp(UrlParameters,{}).pipe(finalize(() => this._appservices.loaderDismiss())).subscribe(res => {
      console.log("RemoveFromCart Response", res);
    }, err => {
      console.log(err);
      this._appservices.loaderDismiss();
    });
  }
  addUpdate(){  
    this._appservices.simpleLoader();
    this._appservices.createCart(this._appservices.loggedInUserDetails.email).then(_respone =>{
      console.log('Create cart:',_respone);
      this._appservices.loaderDismiss();
      if(_respone?.data?.cartOwnerId){
        this.AddToCart();
      }
    })
    //this.AddToCart();
  }
  AddToCart(){
    this._appservices.simpleLoader();  
    let payload:ADD_TO_CART_PAYLOAD = {
    email:this._appservices.loggedInUserDetails['email'],
    type:'XL',
    items:[{ amount:this.Quantity, item:this.GetSingleListData.id, isSecondaryMarketItem:true }],
  }
  console.log(payload)
  let url = `CloudCart/AddToCart?email=${this._appservices.loggedInUserDetails['email']}&cartType=XL`
  this._appservices.postDataByHttp(url,payload).pipe(finalize(() => this._appservices.loaderDismiss())).subscribe(res => {
    console.log("AddToCart Response", res);
   
  }, err => {
    console.log(err);
    this._appservices.loaderDismiss();
  });
  }
  updateCart(){
    this._appservices.simpleLoader();  
    let payload:ADD_TO_CART_PAYLOAD = {
    email:this._appservices.loggedInUserDetails['email'],
    type:'XL',
    items:[{ amount:this.Quantity, item:this.GetSingleListData.id, isSecondaryMarketItem:true }],
  }
  console.log(payload)
  let url = `CloudCart/UpdateCart?email=${payload.email}&cartType=XL`
  this._appservices.putDataByHttp(url,payload).pipe(finalize(() => this._appservices.loaderDismiss())).subscribe(res => {
    console.log("UpdateCart Response", res);
   
  }, err => {
    console.log(err);
    this._appservices.loaderDismiss();
  });
  }
  roundedNumber(number){
    return number?.toFixed(2);
     
  }
  GetListingById(id:any){
      this._appservices.simpleLoader();
    var UrlParameters = `CustomerMarkets/GetListingById?id=${id}`;
    console.log(UrlParameters);
    this._appservices.getDataByHttp(UrlParameters).pipe(finalize(() => this._appservices.loaderDismiss())).subscribe(res => {
      console.log("PostMarketSearch Response", res);
      if(res.status === 200){
        this.GetSingleListData = res.data.data;
        this.Quantity = this.GetSingleListData?.availableQuantity;
      }
    }, err => {
      console.log(err);
      this._appservices.loaderDismiss();
    });
  }

}
