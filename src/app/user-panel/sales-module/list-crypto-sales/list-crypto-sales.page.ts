import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-list-crypto-sales',
  templateUrl: './list-crypto-sales.page.html',
  styleUrls: ['./list-crypto-sales.page.scss'],
})
export class ListCryptoSalesPage implements OnInit {
  isDataLoad = false;
  ListingData: any='';
  payloadParamters: any;
  check = true;
  ListingDataConfirm: any;
  showDetails=true;
  ShowPaymentAddress=false;
  MoreText: boolean=false;
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    private activatedroute: ActivatedRoute,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService,
    private global: GlobalService,
  ) { }

  ngOnInit() {
    var ListingData = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('ListingData'));
    var PayloadParams = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('payloadParamters'));
    this.ListingData = JSON.parse(ListingData);
    this.payloadParamters = JSON.parse(PayloadParams);
    console.log(this.ListingData)
    console.log(this.payloadParamters)
  }

  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/list-crypto-sales-details']);
  }

  ConfirmContinue(){
    this.isDataLoad = true;
    this._appservices.simpleLoader();
			var UrlParameters = `CustomerMarkets/PostCreateListing?email=${this._appservices.loggedInUserDetails.email}&confirmRequest=true`;
			console.log(UrlParameters);
			this._appservices.postDataByHttp(UrlParameters, this.payloadParamters).pipe(finalize(() => this._appservices.loaderDismiss())).subscribe(res => {
				console.log("Confirm PostCreateListing Response", res);
				if(res.status === 200){
					this.ListingDataConfirm = res.data.data;
          this.showDetails=false;
          this.ShowPaymentAddress=true;
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
  }
  checkMark(event){
    if (event.target.checked) {
      this.check= false;
    }else{
      this.check= true;
    }
  }
  showMoreText(){
		this.MoreText = true;
	   }
	   showLessText(){
		this.MoreText = false;
	   }
}
