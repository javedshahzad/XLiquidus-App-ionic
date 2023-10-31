import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-token-expires',
  templateUrl: './token-expires.page.html',
  styleUrls: ['./token-expires.page.scss'],
})
export class TokenExpiresPage implements OnInit {
  message:any="Your Token Has Been Expired or Server Error, Please Relogin"
  constructor(
    public _nav: NavController,
    private _appService:AppService
  ) { }

  ngOnInit() {
    this._appService.loaderDismiss();
  }
  login(){
    localStorage.clear();
    this._nav.navigateRoot("/login");
  }
}
