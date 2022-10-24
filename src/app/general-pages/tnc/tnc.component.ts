import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.scss'],
})
export class TncComponent implements OnInit {

  constructor(public _appservices:AppService) { }

  ngOnInit() {}

  close() {

  }

}
