import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import * as moment from 'moment';
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {
  searchTerm: string = "";
  public SortByValue = "";
  public backButtonSubscription: any;
  public CurrentUserTransactionsDetails = [];
  public transactionPageSettings = { skip: 0, take: 25, itemlength: 25 };
  constructor(
    private router: Router,
    public platform: Platform,
    public _nav: NavController,
    public _appServices: AppService,
    public _encrypDecrypService: EncryptionDecryptionService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    });
    // this.currentUserTransaction();
    this.fetchUserTransaction();
  }

  currentUserTransaction(e = null) {
    this._appServices.presentLoading();
    this.CurrentUserTransactionsDetails = undefined;
    this.transactionPageSettings = { skip: 0, take: 25, itemlength: 25 };
    var CurrentUserTransactionsDetailsUrl = `Wallets/GetCurrentUserTransactions?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`
    this._appServices.getDataByHttp(CurrentUserTransactionsDetailsUrl).subscribe(_res => {
      if (_res.status == 200) {
        this.CurrentUserTransactionsDetails = _res.data;
        console.log("CurrentUserTransactionsDetailsUrl", this.CurrentUserTransactionsDetails);
        // this.sortValueChange(this.SortByValue);
        this.fetchUserTransaction(e);
      }
      this._appServices.loaderDismiss();
    });
  }

  fetchUserTransaction(e = null) {
    this._appServices.presentLoading();
    var UserTransactionsDetailsUrl = `Wallets/GetUserTransactions?emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}&skip=${this.transactionPageSettings.skip}&take=${this.transactionPageSettings.take}`;
    this._appServices.getDataByHttp(UserTransactionsDetailsUrl).subscribe(_res => {
      this._appServices.loaderDismiss();
      if (_res.status == 200) {
        this.transactionPageSettings.skip = this.transactionPageSettings.skip + this.transactionPageSettings.take;
        this.transactionPageSettings.itemlength = this.transactionPageSettings.itemlength + this.transactionPageSettings.take;
        console.log("length", this.transactionPageSettings.itemlength);
        console.log("CurrentUserTransactionsDetailslength", this.CurrentUserTransactionsDetails.length)
        console.log("fetchUserTransaction", _res.data.txs);
        this.CurrentUserTransactionsDetails = [].concat.apply(this.CurrentUserTransactionsDetails, _res.data.txs);
        // this.CurrentUserTransactionsDetails = _res.data.txs;  
        console.log(this.CurrentUserTransactionsDetails);
        this.CurrentUserTransactionsDetails.map(ele => {
          ele["customDate"] = moment(ele.date).format('MMM DD, YYYY, h:mm:ss a')
        })
        this.sortValueChange(this.SortByValue);
        if (e) {
          e.target.complete();
        }
      }
    }, err => {
      // let _res: any = {
      //   "status": 200,
      //   "data": { "txs": [{ "id": 253, "ownerId": "jamil.test.usscyber@gmail.com", "date": "2022-01-26T11:57:00.6561359", "teamId": 365, "amount": 3.0, "unitPrice": 75.0, "receiptTxId": "9837adc2c676ad4b73aca2d5952762e45343f9cd56382b0152a192af4d279a43", "type": "Bought", "itemTotal": 225.0, "currency": "BTC", "holdTransaction": null, "isHold": false }, { "id": 254, "ownerId": "jamil.test.usscyber@gmail.com", "date": "2022-01-27T13:14:57.9280071", "teamId": 364, "amount": 3.0, "unitPrice": 75.0, "receiptTxId": "064167ffe2163b327d4ce43be4fe3c752b959c21547af2ab57b1e3dc9e66f555", "type": "Bought", "itemTotal": 225.0, "currency": "BTC", "holdTransaction": null, "isHold": false }, { "id": 257, "ownerId": "jamil.test.usscyber@gmail.com", "date": "2022-02-11T11:49:54.1869157", "teamId": 136, "amount": 2.0, "unitPrice": 75.0, "receiptTxId": "77ca4c54058a777e87d240e10cbd6039b590ab9f0bface3bec305ad14212c502", "type": "Bought", "itemTotal": 150.0, "currency": "BTC", "holdTransaction": null, "isHold": false }], "totalTx": 3, "totalHoldTx": 0, "from": "0001-01-01T00:00:00", "to": "0001-01-01T00:00:00", "currency": "BTC" }
      // }
      this._appServices.loaderDismiss();
      // this.transactionPageSettings.skip = this.transactionPageSettings.skip + this.transactionPageSettings.take;
      // this.transactionPageSettings.itemlength = this.transactionPageSettings.itemlength + this.transactionPageSettings.take;
      // console.log("length", this.transactionPageSettings.itemlength);
      // console.log("CurrentUserTransactionsDetailslength", this.CurrentUserTransactionsDetails.length)
      // console.log("fetchUserTransaction", _res.data.txs);
      // this.CurrentUserTransactionsDetails = [].concat.apply(this.CurrentUserTransactionsDetails, _res.data.txs);
      // // this.CurrentUserTransactionsDetails = _res.data.txs;  
      // console.log(this.CurrentUserTransactionsDetails);
      // this.CurrentUserTransactionsDetails.map(ele => {
      //   ele["customDate"] = moment(ele.date).format('MMM DD, YYYY, h:mm:ss a')
      // })
      // this.sortValueChange(this.SortByValue);
      // if (e) {
      //   e.target.complete();
      // }
    });
  }

  sortValueChange(type): void {
    if (type == 'dateAsc' || type == 'dateDesc') {
      this.CurrentUserTransactionsDetails.sort((a, b) => {
        if (type == 'dateAsc') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (type == 'dateDesc') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
    }
  }

  goToTransactionDetails(td) {
    var UrlParameters = {
      tid: td.receiptTxId,
      date: td.date,
      type: td.type,
      amount: td.amount,
      status: td.status
    }
    this.router.navigate(['/user-panel/transaction-history-details', { q: this._encrypDecrypService.encrypt(JSON.stringify(UrlParameters)) }]);
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
}
