import { NgModule } from '@angular/core';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
} from './containers';

import {
  AvatarComponent,
  BadgeModule,
  BreadcrumbModule, ButtonGroupComponent,
  ButtonModule,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  DropdownComponent, DropdownHeaderDirective, DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  FooterModule,
  FormControlDirective,
  FormDirective, FormFeedbackComponent, FormLabelDirective,
  FormSelectDirective,
  GridModule,
  HeaderModule,
  InputGroupComponent,
  InputGroupTextDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent,
  NavModule,
  SidebarModule, SpinnerComponent, TemplateIdDirective,
  TextColorDirective, WidgetStatAComponent
} from '@coreui/angular-pro';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import {LoginComponent} from "./views/pages/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpConfigInterceptor} from "./globals/httpconfig.interceptor";
import {AuthService} from "./globals/authservice";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {FeesComponent} from "./views/students/fees/fees.component";
import {RegisterComponent} from "./views/pages/register/register.component";
import {OtpComponent} from "./views/pages/otp/otp.component";
import {SuccessresponseComponent} from "./views/successresponse/successresponse.component";
import {WidgetsDropdownComponent} from "./views/students/admission_2023/widgets-dropdown/widgets-dropdown.component";

const APP_CONTAINERS = [
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS,
                 LoginComponent,RegisterComponent,OtpComponent,WidgetsDropdownComponent,
    SuccessresponseComponent      ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BreadcrumbModule,
    FooterModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    SidebarModule,
    BadgeModule,
    NgScrollbarModule,
    HttpClientModule,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    InputGroupComponent,
    FormControlDirective,
    InputGroupTextDirective,
    FormDirective,
    FormSelectDirective,
    TextColorDirective,
    DropdownComponent,
    AvatarComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    FormFeedbackComponent,
    FormLabelDirective,
    SpinnerComponent,
    ButtonGroupComponent,
    WidgetStatAComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalComponent,
    TemplateIdDirective,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    IconSetService, AuthService,
    Title, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
