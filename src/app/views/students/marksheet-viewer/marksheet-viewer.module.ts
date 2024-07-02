
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarksheetViewerComponent } from './marksheet-viewer.component';
import { MarksheetViewerRoutingModule } from './marksheet-viewer-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import {PdfCellCustomComponent} from "../../pdfcell-custom/pdfcell-custom.component";
import {ButtonDirective, CardComponent, ColComponent, RowComponent} from "@coreui/angular-pro";


@NgModule({
  imports: [
    MarksheetViewerRoutingModule,
    CommonModule,
    AgGridModule,
    HttpClientModule,
    PdfViewerModule,
    FormsModule,
    ButtonDirective,
    RowComponent,
    ColComponent,
    CardComponent
  ],
  declarations: [MarksheetViewerComponent,PdfCellCustomComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MarksheetViewerModule { }
