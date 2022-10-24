import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {

  constructor(
    private platform: Platform
  ) { }

  ngOnInit() { }

  close() {
    navigator['app'].exitApp();
  }

}
