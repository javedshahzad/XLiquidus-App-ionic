import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { UpdateOrderModalPage } from '../update-order-modal/update-order-modal.page';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
})
export class CurrentOrderPage implements OnInit {
  CurrentOrder = [
    {
      usd:"30254.36",
      crypto:"1.5",
      offerType:"bulk",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"usd"
    },
    {
      usd:"20364",
      crypto:"5.0",
      offerType:"unit",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"usd,btc,eth"
    },
    {
      usd:"22550",
      crypto:"2.00",
      offerType:"margin",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"6 payment option"
    },
    {
      usd:"245.36",
      crypto:"0.548",
      offerType:"dynamic",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"6 payment option"
    },
    {
      usd:"30254.36",
      crypto:"1.5",
      offerType:"bulk",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"usd"
    },
    {
      usd:"20364",
      crypto:"5.0",
      offerType:"unit",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"usd,btc,eth"
    },
    {
      usd:"22550",
      crypto:"2.00",
      offerType:"margin",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"6 payment option"
    },
    {
      usd:"245.36",
      crypto:"0.548",
      offerType:"dynamic",
      sellerLocarion:"assets/images/US.png",
      paymentTerm:"6 payment option"
    }
  ]
  isDataLoad:boolean=false;
  AllAvailableListings:any=[];
  pageNumber:any=1;
  GetCartData: any;
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    public activatedroute: ActivatedRoute,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.GetCartItems();
    this.getAllListings();
 
  }
  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/dashboard']);
  }
  async ShowSingleItem(item) {
    const modal = await this.modalController.create({
        component: UpdateOrderModalPage,
        cssClass: 'update-order-modal',
        mode: "md",
        backdropDismiss:false,
        componentProps: {
            data: item
        },
    });
    modal.onWillDismiss().then((data:any)=>{
      this.GetCartItems();
    })
    return await modal.present();
}
getAllListings(){
  this.pageNumber=1;
  var payloadParamters = {
    pageSize:50,
    page: this.pageNumber,
    //filters:""
  }
    this._appservices.simpleLoader();
  var UrlParameters = `CustomerMarkets/PostMarketSearch?email=${this._appservices.loggedInUserDetails.email}`;
  console.log(UrlParameters);
  this._appservices.postDataByHttp(UrlParameters, payloadParamters).pipe(finalize(() => this._appservices.loaderDismiss())).subscribe(res => {
    console.log("PostMarketSearch Response", res);
    if(res.status === 200){
      this.AllAvailableListings = res.data.data.results;
    }
    this.isDataLoad = false;
  }, err => {
    console.log(err);
    this._appservices.loaderDismiss();
    this.isDataLoad = false;
  });
}
loadData(event) {
  this.pageNumber +=1;
  this.isDataLoad = true;
  var payloadParamters = {
    pageSize:50,
    page: this.pageNumber,
    //filters:""
  }
  var UrlParameters = `CustomerMarkets/PostMarketSearch?email=${this._appservices.loggedInUserDetails.email}`;
  console.log(UrlParameters);
  this._appservices.postDataByHttp(UrlParameters, payloadParamters).subscribe(res => {
    console.log("PostMarketSearch Response", res);
    event.target.complete();
    if(res.data.data.results.length === 0){
      event.target.disabled = true;
    }else{
      this.AllAvailableListings = [...res.data.data.results];
    }
    this.isDataLoad = false;
  }, err => {
    console.log(err);
    event.target.disabled = true;
    this.isDataLoad = false;
  });
}
roundedNumber(number){
  return number?.toFixed(2);
   
}
GetCartItems(){
  this._appservices.getCart(this._appservices.loggedInUserDetails.email).then(_respone =>{
    console.log('Get cart data:',_respone);
    if(_respone.status === 200){
      this.GetCartData = _respone?.data?.data?.cart;
    }
  
  })
}
getTotalPrice(type,amount){
  var SelectedMaketCart = [];
  var totalRaw = 0;
  var total = "" ;
   SelectedMaketCart =  this.GetCartData.summary.currentExchangeRates.filter(data=> data.currencyType === type);
   console.log(SelectedMaketCart)
  if(SelectedMaketCart.length > 0){
    totalRaw = SelectedMaketCart[0].currencyRate * amount;
     total = totalRaw?.toFixed(2);
     console.log(total)
   return total;
  }
}
checkout() {
  this.router.navigate(['/user-panel/confirm-order']);
}
}
