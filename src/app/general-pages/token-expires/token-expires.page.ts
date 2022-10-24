import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-token-expires',
  templateUrl: './token-expires.page.html',
  styleUrls: ['./token-expires.page.scss'],
})
export class TokenExpiresPage implements OnInit {
  message:any="Your Token Has Been Expired or Server Error, Please Relogin"
  constructor(
    public _nav: NavController,
  ) { }

  ngOnInit() {
  }
  login(){
    localStorage.clear();
    this._nav.navigateRoot("/login");
  }
}
