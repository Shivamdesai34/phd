import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksheetViewerComponent } from './marksheet-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: MarksheetViewerComponent,
    data: {
      title: 'Marksheet Viewer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarksheetViewerRoutingModule {}
