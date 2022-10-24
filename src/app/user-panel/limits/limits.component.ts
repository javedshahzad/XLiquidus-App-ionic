import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.scss'],
})
export class LimitsComponent implements OnInit {
  LimitData:any;
  isProgressBar = true;
  dataLoad = false;
  backButtonSubscription:any;
  constructor(public _appServices:AppService, public platform: Platform, public _nav:NavController) { }

  ionViewWillEnter() {
    this._appServices.presentLoading();
  this.backButtonSubscription = this.platform.backButton.subscribe(() => {
    this._nav.navigateRoot(['user-panel/']);
  });    
  this._appServices.getDataByHttp(`Global/GetUserLimits`).subscribe(_res => {
        if (_res.status == 200) {
          this.dataLoad = true;
          this.isProgressBar = false;
          this.LimitData = _res.data;
          console.log("LimitData",this.LimitData)
        }
        this._appServices.loaderDismiss();
      });
  }

  ngOnInit() {}

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
}
