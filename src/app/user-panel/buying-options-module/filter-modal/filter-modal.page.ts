import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {
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
MarginModelTypes = ["Fixed", "Percentage"];
MarginModel: any = "Fixed";
SelectedAsset: any = "BTC";
PricingModel: any = "Bulk";
HighestPrice: any="";
LowestPrice: any="";
  constructor(
    public _nav: NavController,
    public router: Router,
    public platform: Platform,
    public _encServices: EncryptionDecryptionService,
    public _appservices: AppService,
    public modalController: ModalController,
    public navParams: NavParams
  ) { }

  ngOnInit() {
  }
  closeModal(){
    this.modalController.dismiss();
  }
  applyFilters(){
    var payLoadFilters=`ListingPrice<=${this.HighestPrice},ListingPrice>=${this.LowestPrice},MarketSymbol==${this.SelectedAsset.toLowerCase()},PricingModel==${this.PricingModel.toLowerCase()},MarginModelType==${this.MarginModel.toLowerCase()}`
    this.modalController.dismiss(payLoadFilters);
  } 
}
