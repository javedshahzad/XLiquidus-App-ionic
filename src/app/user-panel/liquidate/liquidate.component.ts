import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-liquidate',
  templateUrl: './liquidate.component.html',
  styleUrls: ['./liquidate.component.scss'],
})
export class LiquidateComponent implements OnInit {
  public backButtonSubscription: any;
  type: any;
  amount: number;

  constructor(
    public platform: Platform,
    public _nav: NavController,
    public router: Router,
    private _appServices: AppService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/lets-liquidate']);
    });
  }

  next() {
    // let amountInNumber = this.amount.replace(/[^0-9\.]+/g, "");
    if (this.type && this.amount > 0) {
      this.router.navigate(['/user-panel/transfer-money', {
        'type': this.type,
        'amount': this.amount
      }]);
    } else {
      this._appServices.presentToast("Please select an action & amount properly");
    }
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
