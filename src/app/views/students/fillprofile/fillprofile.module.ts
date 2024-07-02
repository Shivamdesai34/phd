
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FillprofileRoutingModule } from './fillprofile-routing.module';
// import { SelectModule } from 'ng-select';


@NgModule({
  imports: [
    FillprofileRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  // exports: [FillprofileComponent],
  declarations: []
})
export class FillprofileModule { }
