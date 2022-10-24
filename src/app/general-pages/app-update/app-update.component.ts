import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-app-update',
  templateUrl: './app-update.component.html',
  styleUrls: ['./app-update.component.scss'],
})
export class AppUpdateComponent implements OnInit {
  force: any;

  constructor(
    private _nav: NavController,
    private activatedroute: ActivatedRoute
  ) { 
    this.force = this.activatedroute.snapshot.paramMap.get('force');
  }

  ngOnInit() { }

  skip() {
    this._nav.navigateRoot(['.']);
  }

}
