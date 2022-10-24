import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss'],
})
export class TransferMoneyComponent implements OnInit {

  type: any;
  typeMsg: string;
  amount: number;
  // amountInNumber: any;
  selectedWallet: any;
  wallets: any[] = [];
  curDT: any = new Date();
  bankAccounts: any[] = [];
  exchangeWallet: any[] = [];
  continueExchange: boolean = true;
  public backButtonSubscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private nav: NavController,
    public platform: Platform,
    public _appServices: AppService
  ) {
    this.type = this.activatedRoute.snapshot.params.type;
    this.amount = this.activatedRoute.snapshot.params.amount;
    // this.amountInNumber = this.amount.replace(/[^0-9\.]+/g, "");

    this.wallets = [
      {
        imgsrc: 'assets/images/bitcoin.png',
        name: 'Ethereum',
        token: "#45345363",
        shortName: "ETH"
      },
      {
        imgsrc: 'assets/images/bitcoin.png',
        name: 'Bitcoin',
        token: "#11111111",
        shortName: "BTC"
      }
    ];
    this.bankAccounts = [
      {
        imgsrc: 'assets/images/bank.png',
        name: 'Chase Bank',
        accNo: "**2233",
      }
    ];
    this.exchangeWallet = [
      {
        imgsrc: 'assets/images/wfse.png',
        name: 'WFCE Exchange',
      }
    ];
    switch (this.type) {
      case 'Bank':
        this.typeMsg = 'Deposit to Bank Account'
        break;
      case 'CryptoWallet':
        this.typeMsg = 'Transfer to Crypto Wallet'
        break;
      case 'Exchange':
        this.typeMsg = 'TRANSFER TO EXCHANGE'
        break;

      default:
        break;
    }
  }


  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.nav.navigateRoot(['user-panel/liquidate']);
    });
  }

  ngOnInit() { }

  gotoAddWallet() {
    this.nav.navigateRoot(["/user-panel/add-crypto-wallet"]);
  }

  walletChangeFunc() {
    console.log(this.selectedWallet);
    if (this.selectedWallet == 'new') {
      this.gotoAddWallet();
    }
  }

  gotoAddBankAccount() {
    this.nav.navigateRoot(["/user-panel/add-bank-detail"]);
  }

  cnt() {

  }

  ionViewDidEnter() {
    this.selectedWallet = null;
  }

  continueExchangeFunc() {
    this.continueExchange = false;
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

}
