import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-add-crypto-wallet',
  templateUrl: './add-crypto-wallet.component.html',
  styleUrls: ['./add-crypto-wallet.component.scss'],
})
export class AddCryptoWalletComponent implements OnInit {
  WalletDetailForm: FormGroup;
  backButtonSubscription: any;
  showSpinner: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private nav: NavController,
    public _appServices: AppService,
    private platform: Platform
  ) {

    this.WalletDetailForm = this.formBuilder.group({
      walletName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z_ ]+[a-zA-Z _]$')]],
      walletAddress: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"][a-zA-Z0-9!@#$&()\\-`.+,/\"_ ]+[a-zA-Z0-9!@#$&()\\-`.+,/\" _]$')]], // /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
      confirmWallet: ['', [Validators.required, this.ValidateAddress, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"][a-zA-Z0-9!@#$&()\\-`.+,/\"_ ]+[a-zA-Z0-9!@#$&()\\-`.+,/\" _]$')]], // /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
    }, {
      validator: this.ValidateAddress('walletAddress', 'confirmWallet')
    });
  }

  ngOnInit() { }


  get walletName() {
    return this.WalletDetailForm.get('walletName');
  }

  get walletAddress() {
    return this.WalletDetailForm.get('walletAddress');
  }

  get confirmWallet() {
    return this.WalletDetailForm.get('confirmWallet');
  }


  public errorMessages = {
    walletName: [
      { type: 'required', message: 'Wallet Name is required' },
      { type: 'pattern', message: 'Enter a valid wallet Name ' }
    ],
    walletAddress: [
      { type: 'required', message: 'Wallet Address is required' },
      { type: 'pattern', message: 'Enter a valid Wallet Address' }
    ],
    confirmWallet: [
      { type: 'required', message: 'Confirm Wallet Number is required' },
      { type: 'pattern', message: 'Enter a valid Confirm Wallet Number' }
    ],
    mismatch: 'Wallet Address does not match'
  };

  ValidateAddress(walletAddress, confirmWallet) {
    return (form: FormGroup): { [key: string]: any } => {
      return form.controls[walletAddress].value == form.controls[confirmWallet].value ? null : { mismatch: true };
    }
  }

  saveWallet() {
    if (this.WalletDetailForm.invalid && !this.showSpinner) {
      this._appServices.presentToast("Please enter valid info");
    } else {
      this.showSpinner = true;
      // this.location.back();
      var UrlParameters = `emailAddress=${encodeURIComponent(this._appServices.loggedInUserDetails['email'])}&clientIpAddress=${this._appServices.ipAddress.ip}`;
      console.log(UrlParameters);
      let myObj: Object = {
        //   "id": 0,
        "ownerId": encodeURIComponent(this._appServices.loggedInUserDetails['email']),
        "currency": this.walletName.value,
        "addedDate": new Date(),
        "cryptoPayoutAddress": this.walletAddress.value
      }
      console.log(myObj);

      this._appServices.postDataByPromissHttp(`Wallets/PostAddExternalWallet?${UrlParameters}`, myObj).then(res => {
        this.showSpinner = false;
        console.log("responce data PostAddExternalWallet", res);
        if (res.status == 200) {
          this.location.back();
        } else {
          this._appServices.presentToast("Error in api")
        }
      });
    }
  }

  gotoPrivacy() {
    this.nav.navigateRoot(["/privacy"]);
  }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      // this.nav.navigateRoot(['user-panel/transfer-money']);
      this._appServices.goBack();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
