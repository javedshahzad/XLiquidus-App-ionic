import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-list-crypto-sales',
  templateUrl: './list-crypto-sales.page.html',
  styleUrls: ['./list-crypto-sales.page.scss'],
})
export class ListCryptoSalesPage implements OnInit {
  isDataLoad = false;
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
    this._nav.back();;
  }



}
