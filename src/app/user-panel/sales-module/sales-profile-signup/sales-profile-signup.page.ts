import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-sales-profile-signup',
  templateUrl: './sales-profile-signup.page.html',
  styleUrls: ['./sales-profile-signup.page.scss'],
})
export class SalesProfileSignupPage implements OnInit {
  isDataLoad = false;
  CryptoCurrency:any=1;
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
    this._nav.navigateRoot(['/user-panel/dashboard']);
  }
}
