import { Component, OnInit } from '@angular/core';
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
  productuantity = 1;
  isDataLoad = false;
  constructor(public platform: Platform, public router: Router, public _appServices: AppService, public _encServices: EncryptionDecryptionService, public activatedroute: ActivatedRoute, public _nav: NavController) { }

  ngOnInit() { }


  ionViewWillEnter() {
    var proData = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('buproductData'));
    this.productDetailtobuy = JSON.parse(proData);
    console.log(this.productDetailtobuy);
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    });
    // document.getElementById('proname').innerHTML = this.productDetailtobuy.name
    // document.getElementById('qty').innerHTML = this.productuantity+ ' ' +this.productDetailtobuy.name;

    this.total = this.productuantity * this.productDetailtobuy.marketPrice;
    // document.getElementById('amt').innerHTML = "$"+this.total;
  }



  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  changevalue(val) {
    this.productuantity = val;
    console.log(this.productBill)
    // document.getElementById('proname').innerHTML = this.productDetailtobuy.name
    // document.getElementById('qty').innerHTML = val+ ' ' +this.productDetailtobuy.name;

    this.total = val * this.productDetailtobuy.marketPrice;
    // document.getElementById('amt').innerHTML = "$"+this.total;
  }

  addtocart() {
    this.isDataLoad = true;
    var UrlParameters = `teamId=${this.productDetailtobuy.id}&emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&amount=${this.productuantity}&clientIpAddress=${this._appServices.ipAddress.ip}`;
    console.log(UrlParameters);
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
