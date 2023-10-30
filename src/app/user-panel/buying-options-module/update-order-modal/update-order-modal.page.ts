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
  GetCartData: any;
  SelectedMaketCart: any = "";
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
  removeCart(){
    this._appservices.simpleLoader();
    var UrlParameters = `CloudCart/RemoveFromCart?email=${this._appservices.loggedInUserDetails['email']}&cartType=XL&item=${this.SelectedMaketCart.id}`;
    console.log(UrlParameters);
    this._appservices.removeFromCart(this._appservices.loggedInUserDetails['email'],this.SelectedMaketCart.id).then(_res => {
      this._appservices.loaderDismiss();
      console.log("RemoveFromCart Response", _res);
      if(_res.status === 200){
        this._appservices.presentToast("Item has been removed successfully!");
        this.closeModal();
      }
    }, err => {
      console.log(err);
      this._appservices.loaderDismiss();
    });
  }
  AddOrUpdateCart(){
    if(this.GetSingleListData.id && this.Quantity){
      let checkItemInCart = this.GetCartData?.items.filter(data=> data.listingId === this.GetSingleListData.id);
      if(checkItemInCart?.length > 0){
       this.updateCart();
      }else{
       this.AddToCart();
      }
    }
 
    
  }
  GetCartItems(){
    this._appservices.simpleLoader(); 
    this._appservices.getCart(this._appservices.loggedInUserDetails.email).then(_respone =>{
      console.log('Get cart data:',_respone);
      this._appservices.loaderDismiss(); 
      if(_respone.status === 200){
        this.GetCartData = _respone?.data?.data?.cart;
        let SelectedMaketCart =  this.GetCartData?.items.filter(data=> data.listingId === this.GetSingleListData.id);
        if(SelectedMaketCart?.length > 0){
          this.SelectedMaketCart = SelectedMaketCart[0];
          this.Quantity = this.SelectedMaketCart?.amount;
        }
      }
    }, err => {
      console.log(err);
      this._appservices.loaderDismiss();
    });
  }
  AddToCart(){
    this._appservices.simpleLoader();  
    let payload:ADD_TO_CART_PAYLOAD = {
    email:this._appservices.loggedInUserDetails['email'],
    type:'XL',
    items:[{ amount:this.Quantity, item:this.GetSingleListData.id, isSecondaryMarketItem:true }]
  }
  console.log(payload)
  this._appservices.addToCart(payload).then(res => {
    this._appservices.loaderDismiss();
    console.log("AddToCart Response", res);
   if(res.status === 200){
    this._appservices.presentToast("Item has been added to cart successfully!");
    this.closeModal();
   } else if(res.status === 404){
    this._appservices.simpleLoader();
    this._appservices.createCart(this._appservices.loggedInUserDetails.email).then(_respone =>{
      console.log('Create cart:',_respone);
      this._appservices.loaderDismiss();
      if(_respone?.data?.data?.cart?.cartOwnerId){
        this.AddToCart();
      }
    })
  }
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
  this._appservices.updateCart(payload).then(_res => {
    console.log("UpdateCart Response", _res);
    if(_res.status === 200){
      this._appservices.presentToast("Item has been updated successfully!");
      this.closeModal();
    }
    this._appservices.loaderDismiss();
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
      console.log("GetListingById Response", res);
      if(res.status === 200){
        this.GetSingleListData = res.data.data;
        this.Quantity = this.GetSingleListData?.availableQuantity;
        this.GetCartItems();
      }
    }, err => {
      console.log(err);
      this._appservices.loaderDismiss();
    });
  }

}
