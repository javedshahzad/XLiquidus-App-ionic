import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.scss'],
})
export class MyWalletComponent implements OnInit {
  userCoinMetricsList: any;
  backButtonSubscription: any;
  totalcoin: any;
  isWallet: any;
  totalMrktPrice: any;
  totalQuantity: any;
  isDataLoad = false;
  constructor(public _appServices: AppService, public router: Router, public platform: Platform, public _nav: NavController) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this._appServices.presentLoading();
    this.isDataLoad = true;
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    });
    console.log(this._appServices.ipAddress);
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails.email)}&clientIpAddress=${this._appServices.ipAddress.ip}`
   // var GetUserCoinMetrics = this._appServices.getDataByHttp(`Wallets/GetUserCoinMetrics?${UrlParameters}`);
   let headers_user ={"X-User-Email":this._appServices.loggedInUserDetails.email};
    Object.assign(this._appServices.headers,headers_user);
    console.log(this._appServices.getHttpHeaders());

    var getUserbalance = this._appServices.getDataByHttp(`api/wallets/balances`);
    forkJoin([getUserbalance])
    .subscribe(_res => {
      console.log("balance response == ",_res[0])
      this.isWallet = true;
      this.isDataLoad = false;
      var userCoinMetricsList = _res[0].status == 200 ? _res[0].data : [];
      console.log("coins data", userCoinMetricsList);
      this.userCoinMetricsList = userCoinMetricsList.assets;
      this.totalcoin = this.getTotal.total_assests;
      this.totalMrktPrice = this.getTotal.account_balance;
      //this.mapCoinMatrics(userCoinMetricsList);
      this._appServices.loaderDismiss();
    }, err => {
      console.log("error balance = ",err)
      this.isWallet = true;
      this.isDataLoad = false;
      this.totalcoin = 0;
      this.totalMrktPrice = 0;
      this._appServices.loaderDismiss();
    });
  }

  mapCoinMatrics(userCoinMetricsList) {
    this.userCoinMetricsList = userCoinMetricsList.userWallet.inWallet.tokens.map((token, i) => {
      var teams = userCoinMetricsList?.teams.filter(t => t.team.id == token.teamId);
      console.log(teams);
      return Object.assign(token, teams[0]);
    });
  }

  gotoTransaction() {
    this.router.navigate(['/user-panel/transaction-history'])
  }
  Deposit(){
    this.router.navigate(['/user-panel/wallet-deposit'])
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

      get getTotal() {
        let account_balance = 0;
        let total_assests = 0;
        this.userCoinMetricsList.forEach((ele) => {
              total_assests += parseFloat(ele.balance.total.crypto);
              //alert(temp);
              account_balance += parseFloat(ele.balance.total.usd);
        });
        return {
            account_balance,
            total_assests,
        };
    }
}
