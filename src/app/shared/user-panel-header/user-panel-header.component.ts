import { Component, Input, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-user-panel-header',
  templateUrl: './user-panel-header.component.html',
  styleUrls: ['./user-panel-header.component.scss'],
})
export class UserPanelHeaderComponent implements OnInit {
  @Input('title') Pagetitle;
  @Input('isCartOpen') isCartOpen;
  @Input('isWalletOpen') isWalletOpen;

  public historyWalletBalance;
  CartItemCount: any;
  showBadgeInfoIcon = false;
  showicons = false;
  public subscriptionCart;
  constructor(public _appServices: AppService, public _nav: NavController,public platform:Platform) { }

  ngOnInit() {
    this.subscriptionCart = this._appServices.cartRefresh.subscribe(res => {
      console.log("res data", res);
      if (res) {
        this.loadWalletandCCart();
      }
    }, err => {
      console.log("error part", err)
    });
    this.loadWalletandCCart();
  }

  ionViewWillEnter() {

  }

  loadWalletandCCart() {
    // var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails.email)}&clientIpAddress=${this._appServices.ipAddress.ip}` 
    // this._appServices.getDataByHttp(`Dashboard/GetGetHistoricalWalletBalance?${UrlParameters}`).subscribe(_res=>{
    //   this.historyWalletBalance = _res.status ==200 ?  _res.data[0] : {}; 
    //   console.log('this.historyWalletBalance', this.historyWalletBalance);
    // });
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails.email)}&clientIpAddress=${this._appServices.ipAddress.ip}&searchRequest=Top30&lang=EN&take=30&skip=0`
    // var GetHistoricalWallet= this._appServices.getDataByHttp(`Dashboard/GetGetHistoricalWalletBalance?${UrlParameters}`);

    // var GetUserCoinMetrics = this._appServices.getDataByHttp(`Wallets/GetUserCoinMetrics?${UrlParameters}`);
    // var GetCartItemCount = this._appServices.getDataByHttp(`ShoppingCart/GetCartItemCount?${UrlParameters}`)
    // this.showBadgeInfoIcon = true;

    // forkJoin([GetUserCoinMetrics, GetCartItemCount]).subscribe(_res => {
    //   this.historyWalletBalance = _res[0].status == 200 ? _res[0].data.totalCost : [];
    //   this.CartItemCount = _res[1].status == 200 ? _res[1].data : [];
    //   this._appServices.cartRefresh.next(false);
    //   console.log(_res);
    //   console.log(this.CartItemCount);
    //   console.log("Wallet balance on header", this.historyWalletBalance)
    //   this.showBadgeInfoIcon = false;
    //   this.showicons = true;
    //   if (this.CartItemCount.length == 0) {
    //     this.CartItemCount = 0;
    //   }
    // }, (err) => {
    //   this.CartItemCount = 0;
    // });
      this._appServices.getDataByHttp(`Wallets/GetUserCoinMetrics?${UrlParameters}`).subscribe(resp => {
        // this._appServices.cartRefresh.next(false);
        this.historyWalletBalance = resp.status == 200 ? resp.data.totalCost : 0;
        this.showBadgeInfoIcon = false;
        this.showicons = true;
      }, err => {
        this.historyWalletBalance = 0;
        this.showBadgeInfoIcon = false;
        this.showicons = true;
        console.log('err 1', err)
      });
      this.getCartCountItems();

  }
getCartCountItems(){
  var UrlParameters = `email=${this._appServices.loggedInUserDetails.email}&cartType=XL`
  this._appServices.getDataByHttp(`CloudCart/GetCartItemCount?${UrlParameters}`).subscribe(_res => {
    console.log("GetCartItemCount",_res)
    this.CartItemCount = _res.status == 200 ? _res.data : [];
    if (this.CartItemCount.length == 0) {
      this.CartItemCount = 0;
    }
  }, err => {
    console.log('err 2', err);
  });
}
  gotoWallet() {
    this._nav.navigateRoot(['/user-panel/wallet-page']);
  }

  gotoShopingCart() {
    this._nav.navigateRoot(['/user-panel/shoping-cart']);
  }

  ngOnDestroy() {
   // this.subscriptionCart.unsubscribe()
  }
  roundedNumber(number){
    var isfloat =  this.isFloat(number);
    if(isfloat){
      return number?.toFixed(3);
    }else{
      return number;
    }
  }
  isFloat(n) {
    if (!n) {
      return false
    }
    return !isNaN(n % 1) && n % 1 !== 0;
  }
}
