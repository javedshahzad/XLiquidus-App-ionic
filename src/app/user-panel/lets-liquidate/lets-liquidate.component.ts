import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-lets-liquidate',
  templateUrl: './lets-liquidate.component.html',
  styleUrls: ['./lets-liquidate.component.scss'],
})
export class LetsLiquidateComponent implements OnInit {

  public backButtonSubscription: any;
  walletInfo: any;

  constructor(
    public platform: Platform, 
    public _nav: NavController, 
    private router: Router,
    public _appServices: AppService,
    
    ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.GetUserCoinMetrics();
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  gotoliquidate() {
    this.router.navigate(["/user-panel/liquidate"]);
  }

  gotoDashboard() {
    this.router.navigate(["/user-panel"]);
  }

  async GetUserCoinMetrics() {
    this._appServices.presentLoading();
    var UserDetailsUrl2 = `Wallets/GetUserCoinMetrics?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.getDataByHttp(UserDetailsUrl2).subscribe(_res => {
      if (_res.status == 200) {
        this.walletInfo = _res.data;
        console.log(this.walletInfo);
        if (this.walletInfo.totalCost > 0) {
        }
      }
      this._appServices.loaderDismiss();
    });
  }
}
