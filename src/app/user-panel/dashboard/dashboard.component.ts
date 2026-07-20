import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { B2C_config_setting } from 'src/app/B2C_config_setting';
import { AppApiService } from 'src/app/services/app-apis.service';
import { AppService } from 'src/app/services/app.service';

import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  tokenSearchValue = "";
  tokenSortByValue = 'p';
  showFilter: boolean = false;
  checkbackground: boolean = false;
  checkbackgroundTransfer: boolean = false;
  defaultSearchTerm="toppicks";
  public backButtonSubscription;
  public historyWalletBalance;
  public userCoinMetricsList;
  public getSearchResult: any[] = [];
  public GraphData: any[] = [];
  public result: any;
  currentDateTime: any;
  showGraph = false;
  dashboardpage: any = 'dashboardpage';
  isDataLoad = false;
  sub1: Subscription;
  sub2: Subscription;
  private subs = new Subscription();
  userId = this._appServices.getXLUserId();
  balanceData: any[] = [];
  page = 1;
  pageSize = 20;

  constructor(
    public _appServices: AppService,
    public _encServices: EncryptionDecryptionService,
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    public _B2C_config: B2C_config_setting,
    private _appApi: AppApiService,
  ) {
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
   this.OnDashboadInit();
  }

  OnDashboadInit(){
    this.currentDateTime = new Date();
    this.backButtonSubscription = this.platform.backButton.subscribe(() => { });
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    this.GetMarketTokens();
  }
  GetMarketTokens(){
   this.isDataLoad = true;
    const dashboard$ = forkJoin({
      balance: this._appApi.get_v2026_portfolio_balance("USD"),
      market_featured: this._appApi.get_v2026_market_featured(this.pageSize),
      get_v2026_portfolio_tokens: this._appApi.get_v2026_portfolio_tokens(),
      get_v2026_market_primary_listings:this._appApi.get_v2026_market_primary_listings(),
      get_v2026_market_secondary_listings:this._appApi.get_v2026_market_secondary_listings()
    });

    this.subs.add(
      dashboard$.subscribe({
        next: res => {
          console.log("GetMarketTokens == ",res)
          this.balanceData = res.balance?.data || [];
          this.getSearchResult = res?.market_featured?.data?.listings || [];
          this.isDataLoad = false;
        },
        error: err => {
          console.error('Dashboard load failed', err);
          this.isDataLoad = false;
        }
      })
    );
  }
  gotoProductPage(index,token) {
    let data=this.getSearchResult[index];
    var jsonData = JSON.stringify(data);
    this.router.navigate(['/user-panel/product-page', { 'productData': this._encServices.encrypt(jsonData) }]);
  }

  changeval(val) {
    console.log('val', val)
    this.tokenSearchValue = val;
    if (this.tokenSearchValue.length === 0) {
      this.isDataLoad = true;
      this.GetMarketTokens();
    } else if (this.tokenSearchValue.length >= 3) {
      this.searchresult();
    }
  }

  searchresult() {
    this.isDataLoad = true;
      this.subs.add(
      this._appApi
        .get_2026_market_search(this.tokenSearchValue, this.page, this.pageSize)
        .subscribe({
          next: res => {
            console.log("get_2026_market_search == ",res)
            this.getSearchResult = res?.data?.primaryResults?.listings || [];
            this.isDataLoad = false;
          },
          error: err => {console.error('get_2026_market_search load failed', err);this.isDataLoad = false;}
        })
    );
  }

  sortValueChange(value) {
    if (value == 'p') {
      this.getSearchResult.sort(function (a, b) {
        return b.price - a.price;
      });
    } else if (value == 'g') {
      this.getSearchResult.sort((a, b) => a.totalQuantity < b.totalQuantity ? -1 : a.totalQuantity > b.totalQuantity ? 1 : 0)
    }
  }

  changeBackgroundList() {
    this.checkbackground = !this.checkbackground;
  }

  DoTransfer() {
    this.router.navigate(['/user-panel/liquidate'])
  }
  ngOnDestroy() {

  }

  ionViewDidLeave() {
    // this.sub1.unsubscribe();
    // this.sub2.unsubscribe();
    this.checkbackground = false;
    this.backButtonSubscription.unsubscribe();
  }
    loadNextPage() {
    this.page++;
    if (this.tokenSearchValue.length === 0) {
      this.GetMarketTokens();
    } else if (this.tokenSearchValue.length >= 3) {
      this.searchresult();
    }
  }
}
