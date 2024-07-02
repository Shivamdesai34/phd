import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {FeesComponent} from "./fees/fees.component";
import {FeereceiptComponent} from "./feereceipt/feereceipt.component";
import {CanceladmissionComponent} from "./canceladmission/canceladmission.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UpdateprofileComponent} from "./updateprofile/updateprofile.component";
import {ImageCropperModule} from "ngx-image-cropper";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent, CollapseDirective,
  ContainerComponent, FormCheckInputDirective,
  ModalBodyComponent, ModalComponent, ModalFooterComponent,
  ModalHeaderComponent,
  NavComponent,
  NavLinkDirective,
  RowComponent,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent
} from "@coreui/angular-pro";
import {AdditionalsubjectsComponent} from "./additionalsubjects/additionalsubjects.component";
import {FillprofileComponent} from "./fillprofile/fillprofile.component";
import {IconComponent} from "@coreui/icons-angular";
// import { FormfeesComponent } from './formfees/formfees.component';


@NgModule({
  imports: [CommonModule, StudentsRoutingModule, PdfViewerModule, ReactiveFormsModule, ImageCropperModule, NavComponent, TabContentRefDirective, TabContentComponent, TabPaneComponent, CardBodyComponent, CardComponent, RowComponent, ColComponent, NavLinkDirective, CardHeaderComponent, IconComponent, ButtonDirective, ContainerComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ModalComponent, CollapseDirective, FormCheckInputDirective],
  declarations: [
    FeesComponent,FeereceiptComponent,CanceladmissionComponent,
    UpdateprofileComponent,AdditionalsubjectsComponent,
    FillprofileComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentsModule {}
