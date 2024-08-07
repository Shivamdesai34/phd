import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtpComponent } from './otp.component';



const routes: Routes = [
  {
    path: '',
    component: OtpComponent,
    data: {
      title: 'OTP'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpRoutingModule {}
