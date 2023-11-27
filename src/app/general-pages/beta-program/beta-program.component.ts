import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-beta-program',
  templateUrl: './beta-program.component.html',
  styleUrls: ['./beta-program.component.scss'],
})
export class BetaProgramComponent implements OnInit {
  iAgreeToTerms:boolean=true;
  iAgreeToJoinWaitingList:boolean=true;
  iWantToBeNotified:boolean=true;
  GetWaitingListData: any;
  betaProgramBtn:boolean=false;
  constructor(
    public _appServices: AppService,
    public platform: Platform,
    public _nav: NavController,
    private activatedroute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {}
  CheckBox(event) {
    this.iWantToBeNotified = event.target.checked;
}
JoinBetaProgram(){
  this._appServices.simpleLoader();
    var UrlParameters = `waitingList/JoinWaitingList`;
    console.log(UrlParameters);
    let payload = {
      email: this._appServices.loggedInUserDetails.email,
      iAgreeToTerms:this.iAgreeToTerms,
      iAgreeToJoinWaitingList:this.iAgreeToJoinWaitingList,
      iWantToBeNotified:this.iWantToBeNotified
  }
  console.log(payload)
    this._appServices.postDataByHttp(UrlParameters, payload).pipe(finalize(() => this._appServices.loaderDismiss())).subscribe(res => {
      console.log("Auth/SendResetPasswordRequestAsync Response", res);
      if(res.status === 200){
        this._appServices.presentToast("You joined beta program successfully!")
      }
    }, err => {
      console.log(err);
      this._appServices.loaderDismiss();
    });
}
getBetaWaitingList(){
  this._appServices.simpleLoader();
  var UrlParameters = `WaitingList/GetWaitingList/${this._appServices.loggedInUserDetails.email}/XL`;
  this._appServices.getDataByHttp(UrlParameters).subscribe(res => {
    console.log("Auth/IsLoginAllowedAsync Response", res);
    this._appServices.loaderDismiss();
    if(res.status === 200){
       this.GetWaitingListData = res?.data?.data;
       if(this.GetWaitingListData){
        this.betaProgramBtn = true;
       }else{
       }
    }
  }, err => {
    console.log(err);
    this._appServices.loaderDismiss();
  });
}
}
