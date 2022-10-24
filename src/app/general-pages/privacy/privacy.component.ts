import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { retry } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  PolicyData: any[] = [];
  backButtonSubscription: any;

  constructor(
    public _appservices:AppService,
    private platform: Platform,
    public http: HttpClient,
    ) {
    this.getPolicy();
  }

  ngOnInit() {}

  async getPolicy() {
    this._appservices.presentLoading();
    const url = 'https://cdn.usscyber.com/files/privacy-policy/v1.0/privacy-policy.json';
    this._appservices.getDataByNativePromiss(url).then((_res: any) => {
      console.log(_res);
      const myJson = _res;
      console.log(myJson);
      this.PolicyData = myJson.tabs;
      this._appservices.loaderDismiss();
    }, err => {
      this._appservices.loaderDismiss();
      console.log(err);
    });
  }


  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      // this.nav.navigateRoot(['user-panel/transfer-money']);
      this._appservices.goBack();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
