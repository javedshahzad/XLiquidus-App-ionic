import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { AppApiService } from 'src/app/services/app-apis.service';
import { ADD_TO_CART_PAYLOAD, AppService, CART_ITEM } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { AccountDepositComponent } from 'src/app/shared/account-deposit/account-deposit.component';
import { CreateCartComponent } from 'src/app/shared/create-cart/create-cart.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  productDetail: any='';
  productDataFromDashboardPage: any;
  GraphData: any;
  showGraph = false;
  productpage: any = 'productpage';
  toDate: any;
  fromDate: any;
  isDataLoad = false;
  backButtonSubscription: any;
  currentDateTime: any;
  isProductData = false;
  showTooltip1: boolean;
  showTooltip2: boolean;
  showTooltip3: boolean;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    loop: true,
  };
  GetTokenProfileData: any="";
  TokenBenefits: any=[];
  KeyProjectFeatures: any=[];
  MileStones: any=[];
  showDetailsIndex: number;
  getSearchedData: any="";
  cartItems:Array<CART_ITEM> = []
  GetCartData: any;
  enableDisableBuy: boolean=false;
  created_cart_data: any;
  deposit_account_data: any;
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    private activatedroute: ActivatedRoute,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService,
    private _appApi: AppApiService,
    private modalCtrl:ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initProductPage();
  }

initProductPage(){

  this.currentDateTime =Date.now();
  this.backButtonSubscription = this.platform.backButton.subscribe(() => {
    this._nav.navigateRoot(['user-panel/']);
  });
  var proData = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('productData'));
  this.productDataFromDashboardPage = JSON.parse(proData);
  console.log(this.productDataFromDashboardPage);
  this.GetProduct();
  this.fromDate = new Date();
  this.toDate = new Date();
  let day = document.getElementById('day');
  if (day) {
    day.style.background = '#60CCF0';
    day.style.color = 'white';
    day.style.borderRadius = '5px'
  }
  //this.getGraphData(this.fromDate, this.toDate);
}
GetProduct(){
  this.isDataLoad = true;
  this._appservices.simpleLoader();
   let ListingByID;
   if(this.productDataFromDashboardPage.marketType == "Secondary"){
    ListingByID = this._appApi.get_api_markets_primary_listings_listingId(this.productDataFromDashboardPage.id);
   }else{
    ListingByID = this._appApi.get_api_markets_secondary_listings_listingId(this.productDataFromDashboardPage.id);
   }
  ListingByID.subscribe(res => {
    console.log("GetProduct : ", res);
    this._appservices.loaderDismiss();
    this._appservices.cartRefresh.next(true);
    this.isDataLoad = false;
    if (res.status == 200) {
      this.isProductData = true;
      this.productDetail = res.data;
      console.log(this.productDetail)
    }
  }, err => {
    this._appservices.loaderDismiss();
    this.isDataLoad = false;
    console.log(err);
    // if (err.status == 400) {
      this.isProductData = false;
  });

}
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  getTokenProfile(tokenIndexId){
    this.isDataLoad = true;
    this._appservices.simpleLoader();
    var UrlParameters = `markets/GetTokenProfile?id=${tokenIndexId}`;
    console.log(UrlParameters);
    this._appservices.getDataByHttp(UrlParameters).subscribe(res => {
      this.isDataLoad = false;
      console.log("markets/GetTokenProfile responseeeeeeeeee",res);
      this._appservices.loaderDismiss();
      if(res.status == 200){
        this.GetTokenProfileData= res.data;
        this.MileStones=this.GetTokenProfileData.mileStones;
        let arrdata = this.GetTokenProfileData.keyFeatures;
        let x = arrdata.filter((a) => a.type === "Token");
        this.TokenBenefits = x;
        let y = arrdata.filter((a) => a.type === "Product");
        this.KeyProjectFeatures = y;
      }
    
    }, err => {
      this._appservices.loaderDismiss();
      console.log(err);
      this.isDataLoad = false;
    });
  }
    GetCartItems(){
    this._appservices.getCart(this._appservices.loggedInUserDetails.email).then(_respone =>{
      console.log('Get cart data:',_respone);
      this._appservices.loaderDismiss(); 
      if(_respone?.status === 200){
        this.GetCartData = _respone?.data?.data?.cart;
        let SelectedMaketCart =  this.GetCartData?.items.filter(data=> data.marketSymbol === this.productDataFromDashboardPage.shortName);
        if(SelectedMaketCart?.length === 0 && this.productDataFromDashboardPage?.type === 'Currency'){
          this.enableDisableBuy = true; 
        }
      }
    }, err => {
      console.log(err);
    });
  }
  getPercentageMilstone(unlockedMeasurement){
   var num=(this.GetTokenProfileData?.maxSupply - this.GetTokenProfileData?.available) / unlockedMeasurement;
   var subNumber=num ? num : 0;
   var total = Math.round(subNumber);
   var decimal= total / 100;
   console.log(decimal,"decimal values")
   return decimal;

  }
  showPercentage(unlockedMeasurement){
    var num=(this.GetTokenProfileData?.maxSupply - this.GetTokenProfileData?.available) / unlockedMeasurement;
    var subNum=num ? num : 0;
    var total = Math.round(subNum);
    return total
  }
  showDetails(index :number){
    this.showDetailsIndex = +index
    console.log(this.showDetailsIndex);
  }
  getGraphData(fromDate, toDate) {
    this.isDataLoad = true;
    // if(this.productDataFromDashboardPage.isSaleAvailable){
    if (this.productDataFromDashboardPage.type == 'Team') {
      var productGraph = `Markets/GetProductStats?name=${this.productDataFromDashboardPage.shortName}&skip=0&take=10&from=${fromDate.toISOString()}&to=${toDate.toISOString()}`
    } else {
      var productGraph = `Markets/GetProductStats?symbol=${this.productDataFromDashboardPage.shortName}&name=${this.productDataFromDashboardPage.shortName}&skip=0&take=10&from=${fromDate.toISOString()}&to=${toDate.toISOString()}`
    }
    this.showGraph = false;
    // var productGraph = `Markets/GetProductStats?symbol=BTC&name=BTC&skip=0&take=10&from=${fromDate.toISOString()}&to=${toDate.toISOString()}`
    this._appservices.getDataByHttp(productGraph).subscribe(_res => {
      this.isDataLoad = false;
      console.log("Graph data",_res);
      if (_res.status == 200) {
        this.GraphData = _res.data.data;
        this.showGraph = true;
      } else if (_res.status == 402) {

      }
    }, (err) => {
      this.isDataLoad = false;
      console.log(err)
    });
    // }else{
    
    //   this._appservices.presentToast('isSaleAvailble false and shortName comming blank');
    // }
  }


  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/dashboard']);
  }

  buynow() {
    this._nav.navigateRoot(['/user-panel/buy-now', { 'buproductData': this._encServices.encrypt(JSON.stringify(this.productDataFromDashboardPage)),'GetTokenProfileData':this._encServices.encrypt(JSON.stringify(this.GetTokenProfileData))}]);
  }
  customizeorder(){
    this._nav.navigateRoot(["/user-panel/current-order",{ 'SelectedProductData': this._encServices.encrypt(JSON.stringify(this.productDataFromDashboardPage))}])
  }
  getoneDay() {
    document.getElementById('day').style.background = '#60CCF0';
    document.getElementById('day').style.color = 'white';
    document.getElementById('day').style.borderRadius = '5px';
    document.getElementById('week').style.background = '#FFFFFF';
    document.getElementById('week').style.color = '#60CCF0';
    document.getElementById('month').style.background = '#FFFFFF';
    document.getElementById('month').style.color = '#60CCF0';
    document.getElementById('year').style.background = '#FFFFFF';
    document.getElementById('year').style.color = '#60CCF0';

    this.fromDate = new Date();
    this.toDate = new Date();
    this.getGraphData(this.fromDate, this.toDate);
  }
  getoneWeek() {
    document.getElementById('week').style.background = '#60CCF0';
    document.getElementById('week').style.color = 'white';
    document.getElementById('week').style.borderRadius = '5px';
    document.getElementById('day').style.background = '#FFFFFF';
    document.getElementById('day').style.color = '#60CCF0';
    document.getElementById('month').style.background = '#FFFFFF';
    document.getElementById('month').style.color = '#60CCF0';
    document.getElementById('year').style.background = '#FFFFFF';
    document.getElementById('year').style.color = '#60CCF0';

    this.fromDate = new Date();
    this.toDate = new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 7);
    this.getGraphData(this.fromDate, this.toDate);
  }
  getoneMonth() {
    document.getElementById('month').style.background = '#60CCF0';
    document.getElementById('month').style.color = 'white';
    document.getElementById('month').style.borderRadius = '5px';
    document.getElementById('week').style.background = '#FFFFFF';
    document.getElementById('week').style.color = '#60CCF0';
    document.getElementById('day').style.background = '#FFFFFF';
    document.getElementById('day').style.color = '#60CCF0';
    document.getElementById('year').style.background = '#FFFFFF';
    document.getElementById('year').style.color = '#60CCF0';
    this.fromDate = new Date();
    this.toDate = new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30)
    this.getGraphData(this.fromDate, this.toDate);
  }
  getoneYear() {
    document.getElementById('year').style.background = '#60CCF0';
    document.getElementById('year').style.color = 'white';
    document.getElementById('year').style.borderRadius = '5px';
    document.getElementById('month').style.background = '#FFFFFF';
    document.getElementById('month').style.color = '#60CCF0';
    document.getElementById('day').style.background = '#FFFFFF';
    document.getElementById('day').style.color = '#60CCF0';
    document.getElementById('week').style.background = '#FFFFFF';
    document.getElementById('week').style.color = '#60CCF0'
    this.fromDate = new Date();
    this.toDate = new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365)
    this.getGraphData(this.fromDate, this.toDate);
  }



  addtocart() {
    this._appservices.simpleLoaderWithoutDuration();
    this.isDataLoad = true;
    let payload:any = {
          "listingId": this.productDataFromDashboardPage.id,
          "marketType": this.productDataFromDashboardPage.marketType == "Secondary" ? 2 : 1,
          "quantity": 1,
          "pricePerUnit": this.productDetail.price,
          "currency": this.created_cart_data?.currency
        }
        if(this.productDataFromDashboardPage.marketType == "Secondary"){
          payload.sellerId = this.productDataFromDashboardPage.seller.id;
          payload.useEscrow = true;
          payload.notes = "Adding into cart"
        }
        console.log(payload,"cart payload")
      this._appApi.post_v2026_add_cart_items(payload,this.created_cart_data?.id).subscribe(res => {
      console.log("post_v2026_add_cart_items data", res);
      this._appservices.loaderDismiss();
      this._appservices.cartRefresh.next(true);
      this.isDataLoad = false;
    
      if (res.status == 200 || res.status == 201) {
        console.log(res);

        this.router.navigate(['/user-panel/shoping-cart']);
        this._appservices.presentToast('Added to the cart!');
      } else {

      }
    }, (err) => {
      console.log(err)
      this.isDataLoad = false;
      this._appservices.presentErrorToast(err);
      this._appservices.loaderDismiss();
    });
  }

  toggleTooltip1() {
    setTimeout(() => {
      this.showTooltip1 = !this.showTooltip1;
    }, 100);
  }
  async open_Create_Cart_Modal() {
    this._appApi.getFirstCartId().subscribe(cartData => {
  console.log('Cart ID:', cartData);
  if(!!cartData && cartData != null){
      this.created_cart_data = cartData;
      this.addtocart();
  }else{
  this.open_cart_modal();
  }
  }, error=>{
    this.open_cart_modal();
  }
);
  }
  async open_cart_modal(){
      const modal = await this.modalCtrl.create({
      component: CreateCartComponent,
      cssClass:"create-cart-modal"
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log(data,role)
    if(data.isCartCreated === true){
      this.created_cart_data = data?.cart_data?.cart;
      this.addtocart();
    }
  }
  async open_deposit_account_Modal() {
    const modal = await this.modalCtrl.create({
      component: AccountDepositComponent,
      cssClass:"deposit-account-modal"
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log(data,role)
    if(data.isSuccess === true){
      this.deposit_account_data = data;
      this.open_Create_Cart_Modal();
    }
  }
   async presentAlertForCart() {
    const alert = await this.alertController.create({
      header: 'Confirmation!',
      mode:"ios",
      message:"You may need to deposit money into your account for add item into cart. Do you want to deposit?",
      buttons: [
        {
          text: 'Proceed to Cart',
          role: 'cancel',
          handler: () => {
            this.open_Create_Cart_Modal();
          },
        },
        {
          text: 'Deposit',
          role: 'confirm',
          handler :() => {
            this.open_deposit_account_Modal();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log(`Dismissed with role: ${role}`);
  }
  toggleTooltip2() {
    setTimeout(() => {
      this.showTooltip2 = !this.showTooltip2;
    }, 200);
  }

  toggleTooltip3() {
    setTimeout(() => {
      this.showTooltip3 = !this.showTooltip3;
    }, 300);
  }

  closeTooltips() {
    console.log('close clicked')
    this.showTooltip1 = false;
    this.showTooltip2 = false;
    this.showTooltip3 = false;
  }
}
