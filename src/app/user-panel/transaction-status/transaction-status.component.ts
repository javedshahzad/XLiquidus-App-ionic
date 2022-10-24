import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.scss'],
})
export class TransactionStatusComponent implements OnInit {

  isComplete: boolean;
  constructor() { 
    setTimeout(() => {
      this.isComplete = true;
    }, 10000);
  }

  ngOnInit() {}

}
