import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  getSettingDetail:any;
  constructor(public _appservices:AppService,public _nav:NavController, public router:Router) { }

  ngOnInit() {}
  userDetail:any;
  languages:any;
  item:any;
  name:any;
  ShowSpinner = false;
  updateUserDetail:any;
  ionViewWillEnter() {
     this._appservices.presentLoading();
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appservices.loggedInUserDetails.email)}&clientIpAddress=${this._appservices.ipAddress.ip}`
    this._appservices.getDataByHttp(`Global/GetLanguages?${UrlParameters}`).subscribe(res => {
      if (res.status == 200) {
        this.languages = res.data.data;
        console.log(this.languages);
      }
      this._appservices.loaderDismiss();
    });
    var UrlParameters = `emailAddress=${encodeURIComponent(this._appservices.loggedInUserDetails.email)}&clientIpAddress=${this._appservices.ipAddress.ip}`
    this._appservices.getDataByHttp(`Users/GetUser?${UrlParameters}`).subscribe(res => {
      this._appservices.loaderDismiss();
      if (res.status == 200) {
        console.log(res.data)
        console.log(this._appservices.loggedInUserAccountDetails)
          this._appservices.loggedInUserAccountDetails = this.userDetail = res.data;
          this.userDetail  = res.data;
          this.item = res.data.language;
      }
      this._appservices.loaderDismiss();
    });
  }

  backtomarktplace(){
    this._nav.navigateRoot(['/user-panel/dashboard']);
  }

  updateProfile(){
    this.updateUserDetail = {
      'language':this.item,
      'objectId':this._appservices.loggedInUserDetails.oid,
      'email':this.userDetail?.email ? this.userDetail?.email : this._appservices.loggedInUserDetails.email,
    }
    console.log(this.userDetail);
    var postJson = this.updateUserDetail;
    this.ShowSpinner = true;
    // var UrlParameters = `emailAddress=${encodeURIComponent(this._appservices.loggedInUserDetails.email)}&clientIpAddress=${this._appservices.ipAddress.ip}` 
    this._appservices.postDataByPromissHttp(`Users/UpdateUser`,postJson).then(res=>{
      console.log("responce data",res);
      this.ShowSpinner = false;
      if(res.status == 200){
        this._appservices.presentToast("Profile Update Successfully!");
        this._nav.navigateRoot(['/user-panel']); 
      }
      // this._appservices.presentToast(res);
    })
  }

}
