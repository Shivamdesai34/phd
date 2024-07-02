import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'students',
    },
    children: [
      {
        path: '',
        redirectTo: 'students',
      },
      {
        path: 'fillprofile',
        loadChildren: () =>
          import('./fillprofile/fillprofile.module').then((m) => m.FillprofileModule),
      },
      {
        path: 'fees',
        loadChildren: () =>
          import('./fees/fees.module').then((m) => m.FeesModule),
      },
      {
        path: 'canceladmission',
        loadChildren: () =>
          import('./canceladmission/canceladmission.module').then((m) => m.CanceladmissionModule),
      },
      {
        path: 'feesreceipt',
        loadChildren: () =>
          import('./feereceipt/feereceipt.module').then((m) => m.FeereceiptModule),
      },

      {
        path: 'updateprofile',
        loadChildren: () =>
            import('./updateprofile/updateprofile.module').then((m) => m.UpdateprofileModule),
      },
      {
        path: 'marksheet-viewer',
        loadChildren: () =>
            import(
                './marksheet-viewer/marksheet-viewer.module'
                ).then((m) => m.MarksheetViewerModule),
      },
      {
        path: 'admission-2023-2024',
        loadChildren: () =>
          import('./additionalsubjects/additionalsubjects.module').then((m) => m.AdditionalsubjectsModule),
      },
      // {
      //   path: 'internal-marks',
      //   loadChildren: () =>
      //     import('./internal-exammarks/internal-exammarks.module').then((m) => m.InternalExamMarksModule),
      // },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
