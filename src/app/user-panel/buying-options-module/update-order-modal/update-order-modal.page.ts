import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { EncryptionDecryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-update-order-modal',
  templateUrl: './update-order-modal.page.html',
  styleUrls: ['./update-order-modal.page.scss'],
})
export class UpdateOrderModalPage implements OnInit {
  data:any;
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
    this.data = this.navParams.get("data");
  }
  closeModal(){
    this.modalController.dismiss();
  }
  remove(){
    this.closeModal()
  }
  addUpdate(){
    this.closeModal()
  }
}
