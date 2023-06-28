import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-list-crypto-sales-details',
  templateUrl: './list-crypto-sales-details.page.html',
  styleUrls: ['./list-crypto-sales-details.page.scss'],
})
export class ListCryptoSalesDetailsPage implements OnInit {
  isDataLoad = false;
  CryptoCurrency:any=1;
  items=["Bulk Sale",
    "Unit Sale",
    "Dynamic Sale",
   " Margin Sale (Expert Level)"]
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    private activatedroute: ActivatedRoute,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService
  ) { }

  ngOnInit() {
  }

  backtomarktplace() {
    this._nav.back();
  }

}
