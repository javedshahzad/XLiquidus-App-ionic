import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { B2C_config_setting } from 'src/app/B2C_config_setting';
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


  constructor(
    public _appServices: AppService,
    public _encServices: EncryptionDecryptionService,
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    public _B2C_config: B2C_config_setting,
  ) {
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
   this.OnDashboadInit();
   this.HandleCache();
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
    this.getWalletData();
 // var GetHistoricalWallet = this._appServices.getDataByHttp(`Dashboard/GetGetHistoricalWalletBalance?${UrlParameters1}`);
    // var GetSearch = this._appServices.getDataByHttp(`Search/Get?${UrlParameters}`)
    // console.log('GetSearch', GetSearch, GetHistoricalWallet);
    // forkJoin([GetSearch, GetHistoricalWallet]).subscribe(_res => {
    //   console.log('res', _res);
    //   this._appServices.cartRefresh.next(true);
    //   this.isDataLoad = false;
    //   this.getSearchResult = _res[0].status == 200 ? (_res[0].data ? _res[0].data.data.data : []) : [];
    //   this.GraphData = _res[1].status == 200 ? _res[1].data : [];
    //   this.showGraph = true;
    //   console.log("getSearch", this.getSearchResult);
    //   console.log("DashboardGraphData", this.GraphData);
    // }, err => {
    //   console.log('errrrrr', err)
    // });
  }
  GetMarketTokens(){
    this._appServices.simpleLoader();
    if (this.tokenSearchValue == '') {
      var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails.email)}&clientIpAddress=${this._appServices.ipAddress.ip}&searchRequest=${this.defaultSearchTerm}&lang=EN&take=30&skip=0`
    } else {
      var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails.email)}&clientIpAddress=${this._appServices.ipAddress.ip}&searchRequest=${this.tokenSearchValue}&lang=EN&take=30&skip=0`
    }
    this.sub2 = this._appServices.getDataByHttp(`Search/Get?${UrlParameters}`).subscribe(_res => {
      this.getSearchResult = _res.status == 200 ? (_res.data ? _res.data.data.data : []) : [];
      console.log(this.getSearchResult);
      this._appServices.loaderDismiss();
    }, err => {
      this.isDataLoad = false;
      console.log('GetMarketTokens error', err);
      this._appServices.loaderDismiss();
    });
  }
  getWalletData(){
    this.isDataLoad = true;
    var UrlParameters1 = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails.email)}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this.sub1 = this._appServices.getDataByHttp(`Dashboard/GetGetHistoricalWalletBalance?${UrlParameters1}`).subscribe(resp => {
      console.log('GetGetHistoricalWalletBalance', resp);
      this._appServices.cartRefresh.next(true);
      this.GraphData = resp.status == 200 ? resp.data : [];
      this.showGraph = true;
      this.isDataLoad = false;
    }, err => {
      this.GraphData = [];
      this.showGraph = true;
      this.isDataLoad = false;
      console.log('err1', err);
    })
  }
  gotoProductPage(index,token) {
    let data=this.getSearchResult[index];
    var jsonData = JSON.stringify(data);
    this.router.navigate(['/user-panel/product-page', { 'productData': this._encServices.encrypt(jsonData) }]);
  }
  customizeorder(){
    this._nav.navigateForward(["/user-panel/current-order"])
  }
  mapCoinMatrics(userCoinMetricsList) {
    this.userCoinMetricsList = userCoinMetricsList.userWallet.inWallet.tokens.map((token, i) => {
      var teams = userCoinMetricsList?.teams.filter(t => t.team.id == token.teamId);
      return Object.assign(token, teams[0].price.priceFluxPercentage);
    });
    console.log("mapCoinMatrics", this.userCoinMetricsList);
    this.sortValueChange(this.tokenSortByValue);
  }

  changeval(val) {
    console.log('val', val)
    this.tokenSearchValue = val;
    if (this.tokenSearchValue.length === 0) {
      this.isDataLoad = true;
      var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails.email)}&clientIpAddress=${this._appServices.ipAddress.ip}&searchRequest=${this.defaultSearchTerm}&lang=EN&take=30&skip=0`
      this._appServices.getDataByHttp(`Search/Get?${UrlParameters}`).subscribe(res => {
        this.isDataLoad = false;
        if (res.status == 200) {
          this.getSearchResult = res.data.data.data;
        }
      });
    } else if (this.tokenSearchValue.length >= 3) {
      this.searchresult();
    }
  }

  searchresult() {
    this._appServices.presentLoading();
    this.isDataLoad = true;
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails.email)}&clientIpAddress=${this._appServices.ipAddress.ip}&searchRequest=${this.tokenSearchValue}&lang=EN&take=30&skip=0`
    this._appServices.getDataByHttp(`Search/Get?${UrlParameters}`).subscribe(res => {
      this.isDataLoad = false;
      if (res.status == 200) {
        this.getSearchResult = res.data.data.data;
      }
      this._appServices.loaderDismiss();
    }, err => {
      this.isDataLoad = false;
      this.getSearchResult = undefined;
      this._appServices.loaderDismiss();
    });
  }

  sortValueChange(value) {
    if (value == 'p') {
      this.getSearchResult.sort(function (a, b) {
        return b.marketPrice - a.marketPrice;
      });
    } else if (value == 'g') {
      this.getSearchResult.sort((a, b) => a.rate < b.rate ? -1 : a.rate > b.rate ? 1 : 0)
    }
  }

  changeBackgroundList() {
    this.checkbackground = !this.checkbackground;
  }

  DoTransfer() {
    // this.checkbackgroundTransfer = !this.checkbackgroundTransfer;
    this.router.navigate(['/user-panel/liquidate'])
  }
  ngOnDestroy() {

  }

  ionViewDidLeave() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.checkbackground = false;
    // this.checkbackgroundTransfer = false;
    this.backButtonSubscription.unsubscribe();
  }
  HandleCache(){
    var UrlParameters = `AppGlobalSettings/XL`;
    this._appServices.getDataByHttp(UrlParameters).subscribe(async res => {
      console.log("AppGlobalSettings/XL Response", res);
      
    }, err => {
      console.log(err);
     
    });
  }
}
