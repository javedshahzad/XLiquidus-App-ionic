import {
	Component,
	OnInit
} from '@angular/core';
import {
	ActivatedRoute,
	Router
} from '@angular/router';
import {
	NavController,
	Platform
} from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import {
	AppService
} from 'src/app/services/app.service';
import {
	EncryptionDecryptionService
} from 'src/app/services/encryption.service';
import {
	GlobalService
} from 'src/app/services/global.service';

@Component({
	selector: 'app-list-crypto-sales-details',
	templateUrl: './list-crypto-sales-details.page.html',
	styleUrls: ['./list-crypto-sales-details.page.scss'],
})
export class ListCryptoSalesDetailsPage implements OnInit {
	isDataLoad = false;
	CryptoCurrency: any = 1;
	ListPricingModel = [{
			name: "Bulk Sale",
			pricingModel: "Bulk"
		},
		{
			name: "Unit Sale",
			pricingModel: "Unit"
		},
		{
			name: "Dynamic Sale",
			pricingModel: "Dynamic"
		},
		{
			name: "Margin Sale (Expert Level)",
			pricingModel: "Margin"
		},
	];
	ListSellingsItems = [{
			name: "BTC"
		},
		{
			name: "ETH"
		},
		{
			name: "LTC"
		},
		{
			name: "USDC"
		},
		{
			name: "EUROC"
		},
		{
			name: "USDT"
		},
	];
	SelectedAsset: any = "BTC";
	PricingModel: any = "Bulk";
	Quantity: any;
	ExpirationDate: any;
	AskingPrice: any;
	UnitPrice: any;
	PaymentSourceTypes = [
		{
			name: "None",
			value: "None"
		},
		{
			name: "Internal Wallet",
			value: "InternalWallet"
		},
		{
			name: "External Wallet",
			value: "ExternalWallet"
		}
	];
	PaymentSource: any = "None";
	paymentCurrency: any ="";
	AcceptedPaymentMethodsType = [
		// {
		// 	paymentCurrency: "USD"
		// },
		{
			paymentCurrency: "BTC"
		},
		{
			paymentCurrency: "ETH"
		},
		{
			paymentCurrency: "LTC"
		},
		{
			paymentCurrency: "USDC"
		},
		{
			paymentCurrency: "EUROC"
		},
		{
			paymentCurrency: "USDT"
		},
		// {
		// 	paymentCurrency: "EUR"
		// },
		// {
		// 	paymentCurrency: "BRL"
		// }
	];
	MarginModelTypes = ["Fixed", "Percentage"];
	MarginModel: any = "Fixed";
	MarginPercentage: any;
	acceptedPaymentMethodsArray: any = [];
	HighestPrice: any;
	LowestPrice: any;
	payloadParamters: any;
	ListingData: any;
	MoreText: boolean=false;
	constructor(
		public _nav: NavController,
		public router: Router,
		public platform: Platform,
		private activatedroute: ActivatedRoute,
		public _encServices: EncryptionDecryptionService,
		public _appservices: AppService,
		private global: GlobalService,
	) {}

	ngOnInit() {
		this.GetPaymentSourceTypes();
	}

	backtomarktplace() {
		this._nav.navigateRoot(['/user-panel/dashboard']);
	}
	GetPaymentSourceTypes() {
		this.isDataLoad = true;
		var UrlParameters = `Global/GetPaymentSourceTypes?emailAddress=${this._appservices.loggedInUserDetails.email}&clientIpAddress=${this._appservices.ipAddress.ip}`;
		this._appservices.getDataByHttp(UrlParameters).subscribe(res => {
			console.log("GetPaymentSourceTypes Response", res);
			this._appservices.loaderDismiss();
			this.isDataLoad = false;
		}, err => {
			console.log(err);
			this._appservices.loaderDismiss();
			this.isDataLoad = false;
		});
	}
	Continue() {

		if (this.Quantity && this.SelectedAsset && this.PricingModel && this.PaymentSource != "None" && this.acceptedPaymentMethodsArray.length > 0) {
			this.isDataLoad = true;
			console.log(this.acceptedPaymentMethodsArray);
			var today = new Date();
			var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var CurrentDateAndTime = date + ' ' + time;

			console.log(CurrentDateAndTime)
			this.payloadParamters = {
				ownerEmailAddress: this._appservices.loggedInUserDetails.email,
				asset: this.SelectedAsset,
				quantity: this.Quantity,
				lowestPrice: this.LowestPrice,
				maxPrice:  this.HighestPrice,
				pricingModel: this.PricingModel,
				acceptedPaymentMethods: this.acceptedPaymentMethodsArray,
				paymentSource: this.PaymentSource,
				requestedListingDate: CurrentDateAndTime,
				expirationDate: this.ExpirationDate,
				messageType: "User",
			}
			if (this.PricingModel === "Bulk") {
				this.payloadParamters.price = this.AskingPrice;
			} else if (this.PricingModel === "Unit") {
				this.payloadParamters.unit = this.UnitPrice;
			} else if (this.PricingModel === "Margin") {
				this.payloadParamters.marginModelType = this.MarginModel;
				this.payloadParamters.margin = this.MarginPercentage;
			}
			console.log(this.payloadParamters)
      		this._appservices.simpleLoader();
			var UrlParameters = `CustomerMarkets/PostCreateListing?email=${this._appservices.loggedInUserDetails.email}&confirmRequest=false`;
			console.log(UrlParameters);
			this._appservices.postDataByHttp(UrlParameters, this.payloadParamters).pipe(finalize(() => this._appservices.loaderDismiss())).subscribe(res => {
				console.log("PostCreateListing Response", res);
				if(res.status === 200){
					this.ListingData = res.data.data;
					this.router.navigate(['/user-panel/list-crypto-sales', { 'ListingData': this._encServices.encrypt(JSON.stringify(this.ListingData)), "payloadParamters": this._encServices.encrypt(JSON.stringify(this.payloadParamters)) }]);
				}
				this.isDataLoad = false;
			}, err => {
				console.log(err);
				if(err.status === 400){
					var errorMsg = JSON.parse(err.error);
					this.global.CreateToast(errorMsg.message);
				}
				this._appservices.loaderDismiss();
				this.isDataLoad = false;
			});
			///user-panel/list-crypto-sales
		} else {
			this.global.CreateToast("Please fill all details to continue!")
		}
	}
	AddpaymentCurrency() {
		if(this.paymentCurrency){
			let getExsisting = this.acceptedPaymentMethodsArray.filter((d:any)=> d.paymentCurrency === this.paymentCurrency.paymentCurrency)
			if(getExsisting.length > 0){
				this.global.CreateToast("Already added this Currency!")
			}else{
				this.acceptedPaymentMethodsArray.push(this.paymentCurrency)
			}
		}
	}
	deletePaymentCurrency(data){
		let index = this.removeFromArray(data);
		this.acceptedPaymentMethodsArray.splice(index, 1);
	}
	removeFromArray(currency) {
		return this.acceptedPaymentMethodsArray.map((item) => item.paymentCurrency).indexOf(currency);
	   }
	   showMoreText(){
		this.MoreText = true;
	   }
	   showLessText(){
		this.MoreText = false;
	   }
}