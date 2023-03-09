import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  productDetail: any;
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
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    private activatedroute: ActivatedRoute,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this._appservices.presentLoading();
    this.currentDateTime =Date.now();
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    });
    this.isDataLoad = true;
    var proData = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('productData'));
    this.productDataFromDashboardPage = JSON.parse(proData);
    console.log(this.productDataFromDashboardPage);
    if(this.productDataFromDashboardPage.type==="VendorToken" || this.productDataFromDashboardPage.type==="Team"){
      this.getTokenProfile(this.productDataFromDashboardPage.tokenIndexId);
    }

    // if(this.productDataFromDashboardPage.isSaleAvailable){
    if (this.productDataFromDashboardPage.type == 'Team') {
      var UrlParameters = `symbol=UCTokens&name=${this.productDataFromDashboardPage.shortName}`
    } else {
      var UrlParameters = `symbol=${this.productDataFromDashboardPage.shortName}`
    }
    // var UrlParameters = `symbol=BTC&name=BTC`
    console.log(UrlParameters);
    this._appservices.getDataByHttp(`Markets/GetProduct?${UrlParameters}`).subscribe(res => {
      console.log("::::", res);
      this._appservices.cartRefresh.next(true);
      this.isDataLoad = false;
      if (res.status == 200) {
        this.isProductData = true;
        this.productDetail = res.data;
        console.log(this.productDetail)
      }
      this._appservices.loaderDismiss();
    }, err => {
      this.isDataLoad = false;
      console.log(err);
      // if (err.status == 400) {
      //   this.isProductData = false;
      //   var result = JSON.parse(err.toString());
      //   console.log(result);
      //   this._appservices.presentToast(result.symbol);
      // }
      this._appservices.loaderDismiss();
    });

    this.fromDate = new Date();
    this.toDate = new Date();
    let day = document.getElementById('day');
    if (day) {
      day.style.background = '#60CCF0';
      day.style.color = 'white';
      day.style.borderRadius = '5px'
    }
    this.getGraphData(this.fromDate, this.toDate);
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  getTokenProfile(tokenIndexId){
   // https://mobious-xl.usscyber.com/v3/markets/GetTokenProfile?id=5bac2cb0-c5bc-4dcd-94eb-023ab5e28dbd
    var UrlParameters = `markets/GetTokenProfile?id=${tokenIndexId}`;
    console.log(UrlParameters);
    this._appservices.getDataByHttp(UrlParameters).subscribe(res => {
      console.log("markets/GetTokenProfile responseeeeeeeeee",res);
      if(res.status == 200){
        this.GetTokenProfileData= res.data;
        this.MileStones=this.GetTokenProfileData.mileStones;
        let arrdata = this.GetTokenProfileData.keyFeatures;
        let x = arrdata.filter((a) => a.type === "Token");
        this.TokenBenefits = x;
        let y = arrdata.filter((a) => a.type === "Product");
        this.KeyProjectFeatures = y;
      }
      this._appservices.loaderDismiss();
    }, err => {
      this._appservices.loaderDismiss();
      console.log(err);
      this.isDataLoad = false;
    });
  }
  
  getPercentageMilstone(unlockedMeasurement){
   var num=(this.GetTokenProfileData.maxSupply - this.GetTokenProfileData.available) / unlockedMeasurement;
   var total = Math.round(num);
   var decimal= total / 100;
   return decimal;

  }
  showPercentage(unlockedMeasurement){
    var num=(this.GetTokenProfileData.maxSupply - this.GetTokenProfileData.available) / unlockedMeasurement;
    var total = Math.round(num);
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
      this._appservices.loaderDismiss();
    }, (err) => {
      console.log(err)
      this._appservices.loaderDismiss();
    });
    // }else{
    //   this._appservices.loaderDismiss();
    //   this._appservices.presentToast('isSaleAvailble false and shortName comming blank');
    // }
  }


  backtomarktplace() {
    this._nav.navigateRoot(['/user-panel/dashboard']);
  }

  buynow() {
    this._nav.navigateRoot(['/user-panel/buy-now', { 'buproductData': this._encServices.encrypt(JSON.stringify(this.productDataFromDashboardPage)),'GetTokenProfileData':this._encServices.encrypt(JSON.stringify(this.GetTokenProfileData))}]);
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
    this._appservices.presentLoading();
    this.isDataLoad = true;
    var UrlParameters = `teamId=${this.productDataFromDashboardPage.id}&emailAddress=${encodeURIComponent(this._appservices.loggedInUserDetails['email'])}&amount=1&clientIpAddress=${this._appservices.ipAddress.ip}`;
    console.log(UrlParameters);
    this._appservices.postDataByPromissHttp(`ShoppingCart/PostAddToCart?${UrlParameters}`, {}).then(res => {
      console.log("responce data", res);
      this._appservices.cartRefresh.next(true);
      this.isDataLoad = false;
      this._appservices.loaderDismiss();
      if (res.status == 200) {
        console.log(res);
        this.router.navigate(['/user-panel/shoping-cart']);
        this._appservices.presentToast(res.data.message);
      } else if (res.status == 202) {
        this.router.navigate(['/user-panel/shoping-cart']);
      }
    }, (err) => {
      if (err.status == 402) {
        this.router.navigate(['/user-panel/shoping-cart']);
      } else if (err.status == 402) {
        this.router.navigate(['/user-panel/shoping-cart']);
      }
    });
  }

  toggleTooltip1() {
    // setTimeout(() => {
    //   this.showTooltip1 = !this.showTooltip1;
    // }, 100);
  }

  toggleTooltip2() {
    // setTimeout(() => {
    //   this.showTooltip2 = !this.showTooltip2;
    // }, 200);
  }

  toggleTooltip3() {
    // setTimeout(() => {
    //   this.showTooltip3 = !this.showTooltip3;
    // }, 300);
  }

  closeTooltips() {
    console.log('close clicked')
    this.showTooltip1 = false;
    this.showTooltip2 = false;
    this.showTooltip3 = false;
  }
}
