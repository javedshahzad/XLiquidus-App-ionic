import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
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
  productuantity = 1;
  isDataLoad = false;
  GetTokenProfileData: any;
  smallestUnit: number;
  @ViewChild("input1", { static: true }) nameField1: ElementRef;
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

    var price=this.GetTokenProfileData.currentPrice ? this.GetTokenProfileData.currentPrice : this.productDetailtobuy?.marketPrice;
    this.total = this.productuantity * price;
    this.smallestUnit=this.GetTokenProfileData?.smallestUnit ? this.GetTokenProfileData?.smallestUnit :0.00;
    if(this.smallestUnit >= 1){
      this.productuantity=1;
    }else{
      this.productuantity=0.01;
    }
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  numericAndDecimalValidation(event:any){
    if(this.smallestUnit >= 1){
       if(event.keyCode === 110 || event.keyCode === 190 || event.keyCode === 229){
        var decimalvalueIndexDot= event.target.value.indexOf('.');
        var decimalvalueIndexMinus= event.target.value.indexOf('-');
        if(decimalvalueIndexDot){
          this.removeByIndex(event.target.value,decimalvalueIndexDot);
          this.productuantity=event.target.value;
          event.preventDefault();
        }
        if(decimalvalueIndexMinus){
          this.removeByIndex(event.target.value,decimalvalueIndexMinus);
          this.productuantity=event.target.value;
          event.preventDefault();
        }else{
          event.preventDefault();
        }
       }else{
        this.changevalue(event);
       }
    }else{
      if ((event.keyCode >= 97 && event.keyCode <=105) || (event.keyCode >=48 && event.keyCode <=57)  || /\d/.test(String.fromCharCode(event.keyCode))) {
          this.changevalue(event);
          return true;
      } else {
        event.preventDefault();
        return false;
      }
    }
}
removeByIndex(str,index) {
  return str.slice(0,index) + str.slice(index+1);
}
  changevalue(event) {
    var val=event.target.value;
    this.productuantity = val;
    var price=this.GetTokenProfileData?.currentPrice ? this.GetTokenProfileData?.currentPrice : this.productDetailtobuy?.marketPrice;
    this.total = val * price;
    return true;
  }
  addtocart() {
    this.isDataLoad = true;
    var UrlParameters = `teamId=${this.productDetailtobuy.id}&emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&amount=${this.productuantity}&clientIpAddress=${this._appServices.ipAddress.ip}`;
    this._appServices.postDataByPromissHttp(`ShoppingCart/PostAddToCart?${UrlParameters}`, {}).then(res => {
      console.log("responce data", res);
      this._appServices.cartRefresh.next(true);
      this.isDataLoad = false;
      if (res.status == 200) {
        console.log(res);
        this.router.navigate(['/user-panel/shoping-cart']);
        this._appServices.presentToast(res.data.message);
      } else if (res.status == 202) {

        this.router.navigate(['/user-panel/shoping-cart']);
      }
    }, (err) => {
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
