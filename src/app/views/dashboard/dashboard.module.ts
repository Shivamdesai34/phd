import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import {
  CalloutModule,
  CardModule,
  GridModule,
  ProgressModule,
  ButtonModule,
  DropdownModule,
  SharedModule,
  WidgetModule
} from '@coreui/angular-pro';

import { IconModule } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    CalloutModule,
    CardModule,
    CommonModule,
    GridModule,
    IconModule,
    ProgressModule,
    ButtonModule,
    DropdownModule,
    SharedModule,
    WidgetModule,

  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
