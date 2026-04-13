import { Component, Input, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AppApiService } from 'src/app/services/app-apis.service';
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
  portfolio_balance: any;
  constructor(public _appServices: AppService, private _appApi: AppApiService, public _nav: NavController,public platform:Platform) { }

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
      this._appApi.get_v2026_portfolio_balance("USD").subscribe(resp => {
        // this._appServices.cartRefresh.next(false);
        this.portfolio_balance = resp.data;
        this.historyWalletBalance = resp.status == 200 ? resp.data.totalValueUSD : 0;
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
