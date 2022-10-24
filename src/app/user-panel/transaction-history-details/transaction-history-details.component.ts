import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-transaction-history-details',
  templateUrl: './transaction-history-details.component.html',
  styleUrls: ['./transaction-history-details.component.scss'],
})
export class TransactionHistoryDetailsComponent implements OnInit {
  public transactionDetailsUrl;
  public transactionDetails;
  public hideloader = true;
  public backButtonSubscription: any;
  constructor(private router: Router, public platform: Platform, public _nav: NavController, public _sanitizer: DomSanitizer, public _activateRoute: ActivatedRoute,
    public _appServices: AppService, public _encrypDecrypService: EncryptionDecryptionService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/transaction-history']);
    });
    var UrlParameters = this.transactionDetails = JSON.parse(this._encrypDecrypService.decrypt(this._activateRoute.snapshot.paramMap.get('q')));
    console.log(UrlParameters);
    // console.log(this._appServices.blockChainTransactionBaseUrl+transactionId);
    this.transactionDetailsUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this._appServices.blockChainTransactionBaseUrl + UrlParameters.tid);
    var ths = this;
    setTimeout(function () {
      ths.hideloader = false;
      console.log(ths.hideloader);
    }, 2000)
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  goToTransactionHistory() {
    this._nav.navigateRoot(['/user-panel/transaction-history'])
  }

}
