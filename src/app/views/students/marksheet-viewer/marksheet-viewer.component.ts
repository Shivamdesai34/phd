import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder,} from '@angular/forms';
import {Router} from '@angular/router';
import {GridOptions} from 'ag-grid-community';
import {PdfCellCustomComponent} from '../../pdfcell-custom/pdfcell-custom.component';
import {MarksheetViewerService} from './marksheet-viewer.service';
import Swal from 'sweetalert2';
import * as myGlobals from '../../../globals/global-variable';
import {GlobalMessage} from "../../../globals/global.message";
import {CommonService} from "../../../globals/common.service";
import {checkoutstanding, printmarksheet, validateadmissionstarted,
    studentsmarksheetlist, validateeliglibity} from "../../../globals/global-api";
import {IstudentMarksheet} from "../../../models/response";
import {
  Ireq_outstanding,
  Ireq_Pdf_marksheet,
  Ireq_show_marksheet,
  Ireq_validity_eligibility
} from "./marksheet-viewer.requestmodel";

@Component({
    selector: 'app-marksheet-viewer',
    templateUrl: './marksheet-viewer.component.html',
    styleUrls: ['./marksheet-viewer.component.scss'],
    providers: [MarksheetViewerService],
})
export class MarksheetViewerComponent implements OnInit {
    private gridApi: any;
    private gridColumnApi: any;
    gridOptions: any;

    showpdfbox = false;
    showGridbox = true;
    //zoom
    // pageVariable: number = 1;
    zoom: number = 1.0;
    originalSize: boolean = true;
    Studentpassfail: string = '';

    Batch_code: any;
    Semester: any;
    Batchexam_id: any;

    Lastyearbatchcode: any;
    // studentmarksheet!: IstudentMarksheet[];
    studentmarksheet!: any;

    incrementZoom(amount: number) {
        this.zoom += amount;
    }

    AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
    FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
    BatchCode = parseInt(sessionStorage.getItem('BatchCode')!);
    TokenSession = sessionStorage.getItem('Token');

    constructor(
        private router: Router,private commonService: CommonService,
        private marksheetviewerservice: MarksheetViewerService,
        private formBuilder: UntypedFormBuilder,
        private globalmessage: GlobalMessage
    ) {
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this,
            },
        };
    }

    ngOnInit(): void {
        if (!this.TokenSession) {
            this.openYesNoDialog('Please Login!');
            // alert("Please Login!")
            this.router.navigate(['login']);
        } else {
            this.CheckOutstanding();
        }
    }

    //Grid
    columnData = [
        {
            field: '',
            maxWidth: 50,
            checkboxSelection: true,
        },
        {
            headerName: 'Batch_name',
            minWidth: 600,
            field: 'Batch_name',
            resizable: true,
        },
        {
            headerName: 'Exam Name',
            minWidth: 500,
            field: 'Userexamname',
            resizable: true,
        },
        // { headerName: "Semester", field: "Semester", resizable: true },
        {
            headerName: 'Documents',
            field: 'Document_Filename ',
            cellRenderer: PdfCellCustomComponent,
        },
    ];

    //rowData: any = [];
    rowData: any;

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    onRowSelectedEvent(event: any) {
        //on checkbox selection
        // console.log("row select", event.data)
    }

    public rowSelection: 'single' | 'multiple' = 'single';



    onSelectionChanged(event: any) {
        const selectedRows = this.gridApi.getSelectedRows();
        console.log('Selection change data:', selectedRows);
        // this.Batch_code = selectedRows.length === 1 ? selectedRows[0].Batch_code : '';
        // this.Semester = selectedRows.length === 1 ? selectedRows[0].Semester : '';
        // this.Batchexam_id = selectedRows.length === 1 ? selectedRows[0].Batchexam_id : '';
        // // console.log("Selected data:", this.Semester);
    }

    OpenPdfDoc(selectedrow: any) {
        //cell component button click
        console.log('cell', selectedrow);
        this.Batch_code = selectedrow.Batch_code;
        this.Semester = selectedrow.Semester;
        this.Batchexam_id = selectedrow.Batchexam_id;

        this.showpdfbox = true;
        this.showGridbox = false;
        this.ShowPDF();
    }


    validateadmissionstarted(data: any) {
        let jsonin = {
            finyear: this.FinyearSession,
            college_code: myGlobals.Golbal_CollegeCode,
            batch_code: this.BatchCode,
        };
        this.commonService.Post_json(validateadmissionstarted,jsonin)
            .subscribe(
                (response) => {
                    this.res = response;
                    if (this.res.data == true) {
                        this.ShowMarksheet();
                    } else {
                        Swal.fire({
                            title: 'Message!',
                            text: 'Marksheet not Released!',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        }); //alert
                        this.router.navigate(['dashboard']);
                    }
                },
                (error) => {
                    if (error.error !== null) {
                        console.error('error caught in component', error);
                        Swal.fire({
                            title: 'Error!',
                            text: error.error.exception,
                            icon: 'error',
                            confirmButtonText: 'OK',
                        }); //alert
                        this.router.navigate(['dashboard']);
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: error.status + 'Server Error!',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        }); //alert
                    }
                    // this.resetAll();
                }
            );
    }

    ShowMarksheet() {
        let jsonin: Ireq_show_marksheet = {
            finyear: this.FinyearSession,
            collegecode: myGlobals.Golbal_CollegeCode,
            aadhaar: this.AadharSession,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        this.commonService.Post_json(studentsmarksheetlist,jsonin)
            .subscribe((response) => {
                if(response == null){
                    this.globalmessage.Show_error('No data found')
                }
                this.studentmarksheet = response['data']
                // this.res = response;
                // console.log('Data :', this.res);
                // if (this.res != null) {
                //     console.log('Data :', this.res);
                //     //this.rowData = this.res.data;
                //
                    this.gridOptions.api.setRowData(this.studentmarksheet);
                // }
            });
    }

    ValidateEligibility() {
        let jsonin: Ireq_validity_eligibility = {
            Finyear: myGlobals.Global_CurrentFinYear,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        this.commonService.Post_json(validateeliglibity,jsonin)
            .subscribe(
                (response) => {
                    this.res = response;
                    if (this.res.data.Eligible == 'PASS') {
                        this.BatchCode = this.res.data.Incremental_batch;
                        //this.validateadmissionstarted(this.res.data);
                    }
                    if (this.res.data.Eligible == 'NOTELIGIBLE') {
                        this.BatchCode = this.res.data.Incremental_batch;
                        /*
                        Swal.fire({
                          title: 'Message!',
                          text: "Sorry!..You can't view marksheet!",
                          icon: 'error',
                          confirmButtonText: 'OK',
                        }); //alert
                        this.router.navigate(['dashboard']);
                        */
                    }
                    if (this.res.data.Eligible == 'FAIL') {
                        this.BatchCode = this.Lastyearbatchcode;
                        //this.validateadmissionstarted(this.res.data);
                    }
                },
                (error) => {
                    if (error.error !== null) {
                        console.error('error caught in component', error);
                        Swal.fire({
                            title: 'Error!',
                            text: error.error.exception,
                            icon: 'error',
                            confirmButtonText: 'OK',
                        }); //alert
                        this.router.navigate(['dashboard']);
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: error.status + 'Server Error!',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        }); //alert
                    }
                    // this.resetAll();
                }
            );
    }

    ClosePdf() {
        this.ShowMarksheet();
        this.showpdfbox = false;
        this.showGridbox = true;
        this.ShowPDF();
    }

    openYesNoDialog(msg: any) {
        this.globalmessage.Show_message('Delete');
    }

    //pdf Viewer
    _base64ToArrayBuffer(base64:any) {
        var binary_string = base64.replace(/\\n/g, '');
        binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    pdfSrc = this._base64ToArrayBuffer('');
    res: any;
    downloadProcess: any;

    ShowPDF() {
        let jsonin: Ireq_Pdf_marksheet  = {
            finyear: this.FinyearSession,
            college_code: myGlobals.Golbal_CollegeCode,
            aadhaar: this.AadharSession,
            useraadhaar: this.AadharSession,
            template: this.studentmarksheet[0].Template,
            batch_code: this.Batch_code,
            semester: this.Semester,
            batchexam_id: this.Batchexam_id,
            Singlepdf: false,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        // console.log("Data :", this.stastistics);
        if (this.Batch_code == null) {
            this.openYesNoDialog('Please Select row to view Marksheet!');
        } else {
            this.commonService.Post_json(printmarksheet,jsonin).subscribe(
                (response) => {
                    this.res = response;
                    const contentType = '';
                    this.pdfSrc = this._base64ToArrayBuffer(this.res.blobdata);
                },
                (error) => {
                    if (error.error !== null) {
                        // Swal.fire({ title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
                    } else {
                        // Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert
                    }
                    // this.resetAll();
                }
            );
        }
    }



    CheckOutstanding() {
        let jsonin: Ireq_outstanding  = {
            finyear: myGlobals.Global_CurrentFinYear,
            college_code: myGlobals.Golbal_CollegeCode,
            aadhaar: this.AadharSession,
            batch_code: -99,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        this.commonService.Post_json(checkoutstanding,jsonin)
            .subscribe((response) => {
                this.res = response;
                this.Lastyearbatchcode = this.res.data.Lastyearbatchcode;
                if (this.res.data.Outstanding == true) {
                    Swal.fire({
                        title: 'Message!',
                        text: 'Please pay your pending Fees to view Marksheet!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                    this.router.navigate(['/dashboard']);
                } else {
                    this.ShowMarksheet();
                    this.ValidateEligibility();
                }
                // console.log("Data :", this.res);
            });
    }
}
