import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { ADD_TO_CART_PAYLOAD, AppService, CART_ITEM } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.scss'],
})
export class BuyNowComponent implements OnInit {
  public backButtonSubscription: any;
  total: any;
  productBill: any = '';
  productDetailtobuy: any;
  productuantity:any = this.roundedNumber(1.00);
  isDataLoad = false;
  GetTokenProfileData: any='';
  cartItems:Array<CART_ITEM> = []
  constructor(public platform: Platform, public router: Router, public _appServices: AppService, public _encServices: EncryptionDecryptionService, public activatedroute: ActivatedRoute, public _nav: NavController) { }

  ngOnInit() { 
  }
  ionViewWillEnter() {
    var proData = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('buproductData'));
    var GetTokenProfileData=this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('GetTokenProfileData'));
    this.productDetailtobuy = JSON.parse(proData);
    this.GetTokenProfileData= JSON.parse(GetTokenProfileData);
    console.log(this.productDetailtobuy);
    console.log(this.GetTokenProfileData);
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    });
    //var price=this.GetTokenProfileData?.currentPrice ? this.GetTokenProfileData?.currentPrice : this.productDetailtobuy?.marketPrice;
    var price = this.productDetailtobuy?.marketPrice;
    this.total = this.roundedNumber(this.productuantity * price);
    this.productuantity=this.roundedNumber(1.00);
  }
  ionViewDidLeave() {
    this.productuantity=this.roundedNumber(1.00);
    this.backButtonSubscription.unsubscribe();
  }
  changevalue(event) {
    var val=event.target.value;
    this.productuantity = val;
    var price = this.productDetailtobuy?.marketPrice;
    this.total =this.roundedNumber(val * price);
  }
  roundedNumber(number){
    return number?.toFixed(2);
     
  }
  addtocart() {
    this._appServices.presentLoading();
    this.isDataLoad = true;
    let payload:ADD_TO_CART_PAYLOAD = {
       email:this._appServices.loggedInUserDetails.email,
       type:'XL',
       items:[{ amount:this.productuantity,item:this.productDetailtobuy?.tokenIndexId,isSecondaryMarketItem:false}]
    }
    this._appServices.addToCart(payload).then(res => {
      console.log("responce data", res);
      this._appServices.cartRefresh.next(true);
      this.isDataLoad = false;
      if (res.status == 200) {
        console.log(res);
        this.productuantity = 1
        this._appServices.loaderDismiss();
        this.router.navigate(['/user-panel/shoping-cart']);
        this._appServices.presentToast('Token has been Added to the cart!');
      } else if (res.status == 202) {
        this._appServices.loaderDismiss();
        this.router.navigate(['/user-panel/shoping-cart']);
      }else if(res.status === 404){
        this._appServices.createCart(this._appServices.loggedInUserDetails.email).then(_respone =>{
          console.log('Create cart:',_respone);
          this._appServices.loaderDismiss();
          if(_respone?.data?.cartOwnerId){
            this.addtocart();
          }
        })
      }
    }, (err) => {
      this._appServices.loaderDismiss();
      if (err.status == 402) {
        this.router.navigate(['/user-panel/shoping-cart']);
      }
      console.log(err);
    });
  }
  clear() {
    this.productuantity = 0;
  }
}
