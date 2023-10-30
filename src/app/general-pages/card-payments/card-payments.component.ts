import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './../../services/app.service';
import { GlobalService } from 'src/app/services/global.service';
import { AfterContentInit, Component, NgZone, OnInit } from '@angular/core';
import * as Square from '@square/web-sdk';
import { ageValidator } from '../signup-step2/signup-step2.component';

@Component({
  selector: 'app-card-payments',
  templateUrl: './card-payments.component.html',
  styleUrls: ['./card-payments.component.scss']
})
export class CardPaymentsComponent implements OnInit, AfterContentInit {
  applicationId = 'sandbox-sq0idb-5uDFG_CVw2RXUQj7IQ9zMQ';
  locationId = 'PD6X914EJ0C5F';
  cardButton = document.getElementById('card-button');
  card
  isshowtip
  countries: Array<any> = []
  billingInformation: FormGroup
  constructor(private global: GlobalService,
    private ngZone: NgZone,
    private _appservices: AppService,
    private formBuilder: FormBuilder) {
    this.billingInformation = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
      country: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      // AddnlAddr: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255),Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"][a-zA-Z0-9!@#$&()\\-`.+,/\"_ ]+[a-zA-Z0-9!@#$&()\\-`.+,/\" _]$')]],
      // state: [null, [Validators.required]],
      // city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),Validators.pattern('[a-zA-Z][a-zA-Z_ ]+[a-zA-Z _]$')]],
      // zipcode: [null, [Validators.required,Validators.minLength(4)]],
    });
    console.log(this.billingInformation.value)
  }
  ngAfterContentInit(): void {
    this.ngZone.run(async () => {
      await this.main()
      var UrlParameters = `emailAddress=${this._appservices.loggedInUserDetails.email}&clientIpAddress=${this._appservices.ipAddress.ip}`
      this._appservices.getDataByPromissHttp(`Global/GetCountries?${UrlParameters}`).then(res => {
        if (res.status == 200) {
          this.countries = res.data.data;
          console.log(this.countries);
        }
      });
    })
  }

  get fullname() {
    return this.billingInformation.get('fullname');
  }
  get address() {
    return this.billingInformation.get('address');
  }
  get state() {
    return this.billingInformation.get('state');
  }
  get country() {
    return this.billingInformation.get('country');
  }
  get city() {
    return this.billingInformation.get('city');
  }

  get zipcode() {
    return this.billingInformation.get('zipcode');
  }

  ngOnInit(): void {


  }

  async main() {
    this.global.presentLoading('').then(async () => {
      const payments = await Square.payments(this.applicationId, this.locationId);

      this.card = await payments?.card();

      await this.card?.attach('#card-container');

      console.log('card and payment',this.card,payments)
      this.global.hideLoading()
      if (!payments || !this.card) {
        this.global.hideLoading()
        this.global.CreateToast('Something went wrong!')
      }
    })


  }

  async pay() {
    try {

      const result = await this.card?.tokenize();

      if (result?.status === 'OK') {
        console.log(result)
        console.log(`Payment token is: ${JSON.stringify(result)}`);
        localStorage.setItem('nonce', result.token)
        localStorage.setItem('cardNumber', result?.detals?.card?.last4)
        localStorage.setItem('billingInformation', JSON.stringify(this.billingInformation.value))
        this.billingInformation.reset()
        this.card.clear();
        this.global.navigate('/user-panel/confirm-order')
      }

    } catch (e) {
      this.global.CreateToast(e)
      console.error(e);
    }
  }
}