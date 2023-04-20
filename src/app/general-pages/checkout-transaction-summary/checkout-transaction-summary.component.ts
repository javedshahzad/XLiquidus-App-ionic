import { ActivatedRoute } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-checkout-transaction-summary',
  templateUrl: './checkout-transaction-summary.component.html',
  styleUrls: ['./checkout-transaction-summary.component.scss'],
})
export class CheckoutTransactionSummaryComponent implements OnInit {
  currency: string
  data
  cryptoCheckoutPaymentDetails: any
  paymentAddresses: any
  constructor(
    private activatedRoute: ActivatedRoute,
    private global: GlobalService
  ) {
    this.currency = this.activatedRoute.snapshot.paramMap.get('id');
    this.data = JSON.parse(this.global.router.getCurrentNavigation()?.extras?.state?.data)
    console.log(this.data,"From summary checkout");
    console.log('currency', this.currency, 'passed Data:', this.data)
    if (this.currency != 'USD') {
      this.cryptoCheckoutPaymentDetails = this.data?.cryptoCheckoutPaymentDetails
      this.paymentAddresses = (this.data?.cryptoCheckoutPaymentDetails?.paymentAddresses as Array<any>).filter((x) => x.type === this.currency)
      console.log('cryptoCheckoutPaymentDetails', this.cryptoCheckoutPaymentDetails, ' paymentAddresses:', this.paymentAddresses)

    }
  }

  ngOnInit() { }

}
