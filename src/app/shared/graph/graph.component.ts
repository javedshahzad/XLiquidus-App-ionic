import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  arr: any = [];
  lebels: any = []
  // @Input('totalWalletBalnce') totalWalletBalnce;
  @Input('pageName') pageName: any
  @Input() totalWalletBalnce: any;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: { display: true },
    }
  };

  // public barChartLabels: string[] = [ '21/12'];
  public barChartLabels: any = [];

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [] }
    ]
  };

  constructor() {
  }

  async ngOnInit() {
    this.arr = [];
    this.lebels = [];

    for (let stat of this.totalWalletBalnce) {
      console.log(this.pageName);
      if (this.pageName == 'productpage') {
        this.arr.push(stat.marketPrice);
      } else if (this.pageName == 'dashboardpage') {
        this.arr.push(stat.totalWalletBalance);
      }

    }
    for (let stat of this.totalWalletBalnce) {
      if (this.pageName == 'productpage') {
        this.lebels.push(stat.entryDate.split('T')[0]);
      } else if (this.pageName == 'dashboardpage') {
        this.lebels.push(stat.reviewDate.split('T')[0]);
      }

    }
    console.log('WalletBalnce is:', this.totalWalletBalnce);
    this.barChartData = {
      labels: this.lebels,
      datasets: [
        { data: this.arr, label: 'Amount' }
      ]

    }
    console.log("Lebels data", this.lebels)
    console.log("chart data", this.barChartData)
  }





}
