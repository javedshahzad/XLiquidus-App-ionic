import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelHeaderComponent } from './user-panel-header/user-panel-header.component';
import { GraphComponent } from './graph/graph.component';
import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    UserPanelHeaderComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgChartsModule
  ],
  exports: [
    UserPanelHeaderComponent,
    GraphComponent
  ]
})
export class SharedModule { }
