import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { UpdateOrderModalPage } from '../update-order-modal/update-order-modal.page';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
})
export class CurrentOrderPage implements OnInit {
  CurrentOrder = [
    {
      usd:"30254.36",
      crypto:"1.5",
      offerType:"bulk",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"usd"
    },
    {
      usd:"20364",
      crypto:"5.0",
      offerType:"unit",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"usd,btc,eth"
    },
    {
      usd:"22550",
      crypto:"2.00",
      offerType:"margin",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"6 payment option"
    },
    {
      usd:"245.36",
      crypto:"0.548",
      offerType:"dynamic",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"6 payment option"
    }
  ]
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    public activatedroute: ActivatedRoute,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }
  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/dashboard']);
  }
  async ShowSingleItem(item) {
    const modal = await this.modalController.create({
        component: UpdateOrderModalPage,
        cssClass: 'update-order-modal',
        mode: "md",
        backdropDismiss:false,
        componentProps: {
            data: item
        },
    });
    return await modal.present();
}
}
