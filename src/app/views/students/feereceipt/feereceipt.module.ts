import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Timepicker

// Datepicker

// Ng2-select

// CoreUI
import { AlertModule, ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';

// Routing
import { FeereceiptRoutingModule } from './feereceipt-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FeereceiptRoutingModule,
    // SelectModule,
    CardModule,
    GridModule,
    ButtonModule,
    FormModule,
    IconModule,
    AlertModule,
  ],
  declarations: [
  ]
})
export class FeereceiptModule { }
