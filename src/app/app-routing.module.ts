import {NgModule} from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { DefaultLayoutComponent } from './containers';
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {SuccessresponseComponent} from "./views/successresponse/successresponse.component";
import {OtpComponent} from "./views/pages/otp/otp.component";
import {RegisterComponent} from "./views/pages/register/register.component";
import {WidgetsDropdownComponent} from "./views/students/admission_2023/widgets-dropdown/widgets-dropdown.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    redirectTo: '/dashboard',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      // title: `Home`
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },

      {
        path: 'admission-2024-2025',
        component: WidgetsDropdownComponent,
        data: {
          title: 'dashboard Page'
        },
      },


      // {
      //   path: 'dash-board',
      //   loadChildren: () =>
      //     import('./views/dashboard/dashboard.module').then(
      //       (m) => m.DashboardModule
      //     ),
      // },
      // {
      //   path: 'Apps',
      //   loadChildren: () =>
      //     import('./views/apps/apps.module').then((m) => m.AppsModule),
      // },
      {
        path: 'Students',
        loadChildren: () =>
          import('./views/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      //
      // {
      //   path: 'edit-profile',
      //   loadChildren: () =>
      //     import('./views/edit-profile/edit-profile.module').then(
      //       (m) => m.EditProfileModule
      //     ),
      // },
      // {
      //   path: 'abcid',
      //   loadChildren: () =>
      //     import('./views/abcid-form/abcid-form.module').then(
      //       (m) => m.AbcidFormModule
      //     ),
      // },

      {
        path: 'fees',
        loadChildren: () =>
          import('./views/students/fees/fees.module').then((m) => m.FeesModule),
      },
      {
        path: 'fillprofile',
        loadChildren: () =>
          import('./views/students/fillprofile/fillprofile.module').then((m) => m.FillprofileModule),
      },
      {
        path: 'canceladmission',
        loadChildren: () =>
          import(
            './views/students/canceladmission/canceladmission.module'
            ).then((m) => m.CanceladmissionModule),
      },
      {
        path: 'feesreceipt',
        loadChildren: () =>
          import('./views/students/feereceipt/feereceipt.module').then(
            (m) => m.FeereceiptModule
          ),
      },
      {
        path: 'marksheet-viewer',
        loadChildren: () =>
            import(
                './views/students/marksheet-viewer/marksheet-viewer.module'
                ).then((m) => m.MarksheetViewerModule),
      },
      {
        path: 'additionalsubject',
        loadChildren: () =>
          import(
            './views/students/additionalsubjects/additionalsubjects.module'
            ).then((m) => m.AdditionalsubjectsModule),
      },

      {
        path: 'updateprofile',
        loadChildren: () =>
            import('./views/students/updateprofile/updateprofile.module').then((m) => m.UpdateprofileModule),
      },
      // {
      //   path: 'admission-2023-2024',
      //   loadChildren: () =>
      //     import(
      //       './views/students/additionalsubjects/additionalsubjects.module'
      //       ).then((m) => m.AdditionalsubjectsModule),
      // },
      // {
      //   path: 'internal-marks',
      //   loadChildren: () =>
      //     import(
      //       './views/students/internal-exammarks/internal-exammarks.module'
      //       ).then((m) => m.InternalExamMarksModule),
      // },
      // {
      //   path: 'queryticket',
      //   loadChildren: () =>
      //     import('./views/students/query-ticket/query-ticket.module').then(
      //       (m) => m.QueryTicketModule
      //     ),
      // },

    ]
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: 'otp',
    component: OtpComponent,
    data: {
      title: 'OTP',
    },
  },

  {
    path: 'successresponse',
    component: SuccessresponseComponent,
    data: {
      title: 'Success Page',
    },
  },

  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'dashboard Page'
    },
  },

  {
    path: 'admission-2023-2024',
    component: WidgetsDropdownComponent,
    data: {
      title: 'dashboard Page'
    },
  },



  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
