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
  productuantity:any = 1.00;
  isDataLoad = false;
  GetTokenProfileData: any;
  smallestUnit: number;
  @ViewChild("input1", { static: true }) nameField1: ElementRef;
  decimalvalueIndexDot: any="";
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
    var price=this.GetTokenProfileData?.currentPrice ? this.GetTokenProfileData?.currentPrice : this.productDetailtobuy?.marketPrice;
    this.total = this.roundedNumber(this.productuantity * price);
    this.productuantity=this.roundedNumber(1.00);
    // this.smallestUnit=this.GetTokenProfileData?.smallestUnit ? this.GetTokenProfileData?.smallestUnit : 0;
    // if(this.smallestUnit >= 1){
    //   this.productuantity=1;
    // }else{
    //   this.productuantity=1.00;
    // }
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  changevalue(event) {
    var val=event.target.value;
    this.productuantity = val;
    var price=this.GetTokenProfileData?.currentPrice ? this.GetTokenProfileData?.currentPrice : this.productDetailtobuy?.marketPrice;
    this.total =this.roundedNumber(val * price);
  }
  roundedNumber(number){
    return number?.toFixed(2);
     
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
