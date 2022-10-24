import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-about-xliquidus',
  templateUrl: './about-xliquidus.component.html',
  styleUrls: ['./about-xliquidus.component.scss'],
})
export class AboutXliquidusComponent implements OnInit {
  backButtonSubscription:any;
  constructor(public _appservices:AppService,public router:Router,public iab:InAppBrowser,public _appServices:AppService,  public platform:Platform, public _nav:NavController) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this._nav.navigateRoot(['user-panel/']);
    }); 
  }

  contactUs() {
      this.thirdPartyLogin().then(async success => {
      }, (error) => {
        this.router.navigate(['/user-panel/']); 
      }); 
  }

  thirdPartyLogin(){
    var ths = this; 
    var url = 'https://usscyber.zendesk.com/hc/en-us/requests/new'
    return new Promise(function (resolve, reject) {  
      var browserRef = ths.iab.create(url, "_blank", ths._appServices.inAppBrowserOption()); 
      var eventType:any = ths._appServices.inAppBrowserExitEvent();
      console.log(eventType);  
      browserRef.on("exit").subscribe((event) => { 
        reject("Contact Us Flow Cancel");
      });
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

}
