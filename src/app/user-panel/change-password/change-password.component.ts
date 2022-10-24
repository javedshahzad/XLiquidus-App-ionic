import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  constructor(public _nav:NavController) { }

  ngOnInit() {}

  goBack(){
    this._nav.navigateRoot(['/user-panel/my-profile']); 
  }

}
