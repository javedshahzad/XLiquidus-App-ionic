import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { AppApiService } from 'src/app/services/app-apis.service';
import { ADD_TO_CART_PAYLOAD, AppService, CART_ITEM } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';
import { AccountDepositComponent } from 'src/app/shared/account-deposit/account-deposit.component';
import { CreateCartComponent } from 'src/app/shared/create-cart/create-cart.component';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.scss'],
})
export class BuyNowComponent implements OnInit {
  public backButtonSubscription: any;
  total: any;
  productBill: any = '';
  productDetailtobuy: any;
  productuantity:any = this.roundedNumber(1.00);
  isDataLoad = false;
  cartItems:Array<CART_ITEM> = []
  productDetail: any;
  created_cart_data: any;
  deposit_account_data: any;
  constructor(public platform: Platform,  private alertController: AlertController , private modalCtrl:ModalController, private _appApi:AppApiService, public router: Router, public _appServices: AppService, public _encServices: EncryptionDecryptionService, public activatedroute: ActivatedRoute, public _nav: NavController) { }

  ngOnInit() { 
  }
  ionViewWillEnter() {
    var proData = this._encServices.decrypt(this.activatedroute.snapshot.paramMap.get('buproductData'));
  
    this.productDetailtobuy = JSON.parse(proData);
    console.log(this.productDetailtobuy);
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    });
    var price = this.productDetailtobuy?.marketPrice;
    this.total = this.roundedNumber(this.productuantity * price);
    this.productuantity=this.roundedNumber(1.00);
    this.GetProduct();
  }
  GetProduct(){
  this.isDataLoad = true;
  this._appServices.simpleLoader();
   let ListingByID;
   if(this.productDetailtobuy.marketType == "Secondary"){
    ListingByID = this._appApi.get_api_markets_primary_listings_listingId(this.productDetailtobuy.id);
   }else{
    ListingByID = this._appApi.get_api_markets_secondary_listings_listingId(this.productDetailtobuy.id);
   }
  ListingByID.subscribe(res => {
    console.log("GetProduct : ", res);
    this._appServices.loaderDismiss();
    this._appServices.cartRefresh.next(true);
    this.isDataLoad = false;
    if (res.status == 200) {
      this.productDetail = res.data;
      console.log(this.productDetail)
    }
  }, err => {
    this._appServices.loaderDismiss();
    this.isDataLoad = false;
    console.log(err);
  });

}
  ionViewDidLeave() {
    this.productuantity=this.roundedNumber(1.00);
    this.backButtonSubscription.unsubscribe();
  }
  changevalue(event) {
    var val=event.target.value;
    this.productuantity = val;
    var price = this.productDetailtobuy?.price;
    this.total =this.roundedNumber(val * price);
  }
  roundedNumber(number){
    return number?.toFixed(2);
     
  }
  // addtocart() {
  //   this._appServices.presentLoading();
  //   this.isDataLoad = true;
  //   let payload:ADD_TO_CART_PAYLOAD = {
  //      email:this._appServices.loggedInUserDetails.email,
  //      type:'XL',
  //      items:[{ amount:this.productuantity,item:this.productDetailtobuy?.tokenIndexId,isSecondaryMarketItem:false}]
  //   }
  //   this._appServices.addToCart(payload).then(res => {
  //     console.log("responce data", res);
  //     this._appServices.cartRefresh.next(true);
  //     this.isDataLoad = false;
  //     if (res.status == 200) {
  //       console.log(res);
  //       this.productuantity = 1
  //       this._appServices.loaderDismiss();
  //       this.router.navigate(['/user-panel/shoping-cart']);
  //       this._appServices.presentToast('Token has been Added to the cart!');
  //     } else if (res.status == 202) {
  //       this._appServices.loaderDismiss();
  //       this.router.navigate(['/user-panel/shoping-cart']);
  //     }else if(res.status === 404){
  //       this._appServices.createCart(this._appServices.loggedInUserDetails.email).then(_respone =>{
  //         console.log('Create cart:',_respone);
  //         this._appServices.loaderDismiss();
  //         if(_respone?.data?.cartOwnerId){
  //           this.addtocart();
  //         }
  //       })
  //     }
  //   }, (err) => {
  //     this._appServices.loaderDismiss();
  //     if (err.status == 402) {
  //       this.router.navigate(['/user-panel/shoping-cart']);
  //     }
  //     console.log(err);
  //   });
  // }
   addtocart() {
    this._appServices.simpleLoaderWithoutDuration();
    this.isDataLoad = true;
    let payload:any = {
          "listingId": this.productDetailtobuy.id,
          "marketType": this.productDetailtobuy.marketType == "Secondary" ? 2 : 1,
          "quantity": this.productuantity,
          "pricePerUnit": this.productDetail.price,
          "currency": this.created_cart_data?.cart_data?.cart?.currency
        }
        if(this.productDetailtobuy.marketType == "Secondary"){
          payload.sellerId = this.productDetailtobuy.seller.id;
          payload.useEscrow = true;
          payload.notes = "Adding into cart"
        }
        console.log(payload,"cart payload")
      this._appApi.post_v2026_add_cart_items(payload,this.created_cart_data?.cart_data?.cart.id).subscribe(res => {
      console.log("post_v2026_add_cart_items data", res);
      this._appServices.loaderDismiss();
      this._appServices.cartRefresh.next(true);
      this.isDataLoad = false;
    
      if (res.status == 200 || res.status == 201) {
        console.log(res);

        this.router.navigate(['/user-panel/shoping-cart']);
        this._appServices.presentToast('Added to the cart!');
      } else {

      }
    }, (err) => {
      console.log(err)
      this.isDataLoad = false;
      this._appServices.presentErrorToast(err);
      this._appServices.loaderDismiss();
    });
  }
  clear() {
    this.productuantity = 0;
  }
    async open_Create_Cart_Modal() {
      const modal = await this.modalCtrl.create({
        component: CreateCartComponent,
        cssClass:"create-cart-modal"
      });
      modal.present();
  
      const { data, role } = await modal.onWillDismiss();
  
      console.log(data,role)
      if(data.isCartCreated === true){
        this.created_cart_data = data;
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
}
