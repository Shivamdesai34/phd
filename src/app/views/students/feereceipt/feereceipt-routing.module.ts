import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeereceiptComponent } from './feereceipt.component';

const routes: Routes = [
  {
    path: '',
    component: FeereceiptComponent,
    data: {
      title: 'Fees Receipt'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeereceiptRoutingModule {}
