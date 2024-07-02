import {Component, EventEmitter, OnInit, Output, Renderer2, ViewChild,} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

import {PlatformLocation} from '@angular/common';

import {BilldeskPay} from './../../../../../assets/javascript/billdesk';
import * as myGlobals from '../../../../globals/global-variable';
import {GlobalMessage} from "../../../../globals/global.message";
import {CommonService} from "../../../../globals/common.service";
import {
  BillDeskcheckSum,
  IU_Admission, Feesattached,
  CheckSubjectGroupQuota, validateadmissionstarted,
  Nextbatchsubjects, Phdminbatch, Admissionstatus, validateeliglibity, FormFeesPaid_URL, checkoutstanding
} from "../../../../globals/global-api";

@Component({
    selector: 'app-widgets-dropdown',
    templateUrl: './widgets-dropdown.component.html',
    styleUrls: ['./widgets-dropdown.component.scss'],
})
export class WidgetsDropdownComponent implements OnInit {

    FinyearSession: number = 0;
    TokenSession: string = '';
    AadharSession: number = 0;
    BatchCodes: number = 0;
    StudentType: string = '';

    modalForm!: UntypedFormGroup;
    //Modal
    modalBatch: any;
    batchSubjects: any;
    batchcode: any;
    SubjectGroups: any;
    BatchObject: any;
    selectedObject: any;
    SubjectGroupID: any;
    formAmount: any;

    TERMCODE = 9999;
    eligibilitydata: any;
    Incremental_batch: any;

  public visible = false;

  modalSubmit: any;
  ReceiptID: any;
  ReceiptNo: any;

    constructor(
        private renderer: Renderer2,
        private platformLocation: PlatformLocation,
        private globalmessage: GlobalMessage,
        private formBuilder: UntypedFormBuilder,
        private router: Router,private commonservice: CommonService,
    ) {
        this.AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
        this.FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
        this.BatchCodes = parseInt(sessionStorage.getItem('BatchCode')!);
        this.TokenSession = sessionStorage.getItem('Token')!;
        this.StudentType = sessionStorage.getItem('StudentType')!;
    }

    @ViewChild('content') content: any;
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

    renderExternalScript(src: string): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        script.defer = true;
        this.renderer.appendChild(document.body, script);
        return script;
    }

    get f() {
        return this.modalForm.controls;
    }


    ngOnInit(): void {

            this.CheckOutstanding();

        this.modalForm = this.formBuilder.group({
            // grnNo: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
            batch: ['', Validators.required],
            batchSubjects: ['', Validators.required],
        });
        this.renderExternalScript(
            'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
        ).onload = () => {
        };
    }



    outstanding: any;

    CheckOutstanding() {
        let outstanding = {
            finyear: myGlobals.Global_LastFinYear,
            college_code: myGlobals.Golbal_CollegeCode,
            aadhaar: this.AadharSession,
            batch_code: -99,
        };
        this.commonservice.Post_json(checkoutstanding,outstanding).subscribe((response) => {
            this.res = response;
            if (this.res.data.Outstanding == true) {
                Swal.fire({
                    title: 'Message!',
                    text: 'Please pay your pending Fees to Proceed!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                }); //alert
                this.router.navigate(['/dashboard']);
            }
            if (this.res.data.Outstanding == false) {
                if (this.StudentType == myGlobals.Global_NONE) {
                    this.ValidateEligibility();
                }else{
                    this.Incremental_batch = this.BatchCodes;
                }
            }
            // console.log("Data :", this.res);
        });
    }

    PayFormFees() {
        // this.router.navigate(['/students/fillprofile']);
        this.FormFeesPaid();
        // this.openModal();
    }

    DocumentApproval() {
        this.MarksheetApprovalStatus();
        // this.FeesAttached();
    }

    PayFees() {
        this.router.navigate(['students/fees']);
    }

    EditProfile() {
        this.router.navigate(['edit-profile']);
    }

    res: any;
    formFees: any;

    FormFeesPaid() {
        if (this.StudentType == myGlobals.Global_OUTSIDE || this.StudentType == myGlobals.Global_ATKT) {
            this.Incremental_batch = this.BatchCodes ;
        }

        let jsonin = {
            Finyear: this.FinyearSession,
            Collegecode: myGlobals.Golbal_CollegeCode,
            BatchCode: this.Incremental_batch,
            Aadhaar: this.AadharSession,
        };
        // console.log("prakash", this.formFees);
        this.commonservice.Post_json(FormFeesPaid_URL,jsonin).subscribe((response) => {
            this.res = response;
            if (this.res.data == true) {
                Swal.fire({
                    title: 'Message!',
                    text: 'You have already Paid form fees!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }); //alert
            }
            if (this.res.data == false) {
                this.BatchandSubjectSelection();
            }
            // console.log("fees:", this.res);
        });
    }

    admissionstarted: any;

    validateadmissionstarted(userbatchcode : number) {
        let jsonin = {
            finyear: this.FinyearSession,
            college_code: myGlobals.Golbal_CollegeCode,
            batch_code: userbatchcode ,//this.BatchCodes,
        };
        this.commonservice
            .Post_json(validateadmissionstarted,jsonin)
            .subscribe(
                (response) => {
                    this.res = response;
                    if (this.res.data == true) {
                        // this.CheckOutstanding();
                    } else {
                        Swal.fire({
                            title: 'Message!',
                            text: 'Admission is not open!',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        }); //alert
                        this.router.navigate(['/dashboard']);
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
                        this.router.navigate(['/dashboard']);
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


    ValidateEligibility() {
        let jsonin = {
            Finyear: this.FinyearSession,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
        };
        this.commonservice.Post_json(validateeliglibity,jsonin).subscribe(
            (response) => {
                this.res = response;
                this.Incremental_batch = 0;
                if (this.res.data.Eligible == 'PASS') {
                    this.Incremental_batch = this.res.data.Incremental_batch;
                    this.validateadmissionstarted(this.Incremental_batch);
                }
                if (this.res.data.Eligible == 'NOTELIGIBLE') {
                    Swal.fire({
                        title: 'Message!',
                        text: 'You are not eligible for this course!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                    this.router.navigate(['dashboard']);
                }
                if (this.res.data.Eligible == 'FAIL') {
                    Swal.fire({
                        title: 'Message!',
                        text: 'You are not eligible for this course!',
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

    admissionstatus: any;
    StatusMessage: any;

    MarksheetApprovalStatus() {
        let jsonin = {
            Finyear: this.FinyearSession,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
            Batchcode: this.Incremental_batch,
        };
        this.commonservice
            .Post_json(Admissionstatus,jsonin)
            .subscribe((response) => {
                this.res = response;
                this.StatusMessage = this.res.data;
                // if (this.StatusMessage == "APPROVED") {
                //   const completedDoc = "Your Document Approval is Completed  Your Fee Configuration is Completed"+"<br/>";
                //   const completeFees = " You can proceed to Fee payment	\n"
                //   Swal.fire({
                //     title: 'Status!',
                //     text: completedDoc + completeFees,
                //     icon: 'success',
                //     confirmButtonText: 'OK'
                //   })//alert
                // }
                // else {

                // }
            });
        this.FeesAttached();
    }

    feesattached: any;
    FeesAttachedMsg: any;

    FeesAttached() {
        let jsonin = {
            Finyear: this.FinyearSession,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
            Batchcode: this.Incremental_batch,
        };
        this.commonservice.Post_json(Feesattached,jsonin).subscribe((response) => {
            this.res = response;
            this.FeesAttachedMsg = this.res.data;

            //  if (this.res.data == true && this.StatusMessage=="APPROVED")  {
            //   Swal.fire({ title: 'Status!',
            //    html: "Your Document Approval is Completed  Your Fee Configuration is Completed<br />html included",
            //    text: "Your Document Approval is Completed  Your Fee Configuration is Completed. You can proceed to Fee payment	",
            //    icon: 'success',
            //   confirmButtonText: 'OK' })//alert
            // }
            // else {

            // }
        });
    }

    //Modal Form

    BatchandSubjectSelection() {
        this.modalSelectBatch();
    }

    closeModal() {
        // this.router.navigate(['']);
    }

    data: any;

    modalSelectBatch() {
        let jsonin = {
            Finyear: myGlobals.Global_LastFinYear,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
        };
        this.commonservice.Post_json(Phdminbatch,jsonin).subscribe((response) => {
            if (response != null){
                console.log('modal batch ',response);
                this.modalBatch = response.data;
            }
        });
    }

    BatchCode: any;

    modalSelectBatchSubjects(event: any) {
        //console.log(event)
        this.BatchCode = event.Batch_Code;
        this.formAmount = event.FormAmount;
        let jsonin = {
            Finyear: myGlobals.Global_LastFinYear,
            Collegecode: myGlobals.Golbal_CollegeCode,
            BatchCode: this.BatchCode,
            Aadhaar: this.AadharSession,
        };
        // console.log(this.data)
        this.commonservice.Post_json(Nextbatchsubjects,jsonin).subscribe((response) => {
            this.batchSubjects = response.data;
            // console.log(this.batchSubjects)
        });
    }

    SubjectGroupCode: any;

    onGroupSelected(event: any) {
        this.SubjectGroups = event.Subject_group_name;
        //console.log(event);
        this.SubjectGroupID = event.Subject_group_id;
        this.SubjectGroupCode = event.Subject_group_code;
        // console.log(this.SubjectGroupID)
        this.CheckSubjectGroupQuota();
    }

    QuotaStatus: any;

    CheckSubjectGroupQuota() {
       let jsonin = {
            collegecode: myGlobals.Golbal_CollegeCode,
            finyear: this.FinyearSession,
            batchcode: this.BatchCode,
            subjectgroupid: this.SubjectGroupID,
            subject_group_code: this.SubjectGroupCode,
            quota_status: 'XXXX',
        };
        // console.log(this.data)
        // debugger;
        this.commonservice
            .Post_json(CheckSubjectGroupQuota,jsonin)
            .subscribe((response) => {
                // console.log(response)
                this.QuotaStatus = response.data[0].Quota_status;
                // console.log(this.QuotaStatus)
                if (this.QuotaStatus != 'OPEN') {
                    this.globalmessage.Show_message('Quota Closed! Select Different Group Code.');
                  this.modalForm.controls['batchSubjects'].setValue('');
                    this.SubjectGroups = '';
                }
            });
    }

    //payment


    IU_Admission() {
        this.modalSubmit = true;
        let jsonin = {
            finyear: this.FinyearSession,
            college_code: myGlobals.Golbal_CollegeCode,
            aadhaar: this.AadharSession,
            batch_code: parseInt(this.BatchCode),
            subject_group_id: parseInt(this.SubjectGroupID),
            subject_group_code: this.SubjectGroupCode,
            term_code: this.TERMCODE,
        };

        this.commonservice.Post_json(IU_Admission,jsonin).subscribe((response) => {
            // debugger;
            // console.log(response)
            this.ReceiptID = response.data.ReceiptID;
            this.ReceiptNo = response.data.ReceiptNo;
            if (this.ReceiptID > 0) {
                this.RegistrationPayment();
            }
            // console.log(this.invoice)
        });
    }

    billdeskmsg: any;
    billdeskRequestMsg: any;

    RegistrationPayment() {
        this.billdeskmsg = {
            collegecode: myGlobals.Golbal_CollegeCode,
            finyear: this.FinyearSession,
            batchcode: this.BatchCode,
            aadhaar: this.AadharSession,
            termcode: this.TERMCODE,
            MerchantID: '',
            CustomerID: this.ReceiptNo,
            Filler1: 'NA',
            TxnAmount: String(this.formAmount),
            // "TxnAmount": "1",
            BankID: 'NA',
            Filler2: 'NA',
            Filler3: 'NA',
            CurrencyType: 'INR',
            ItemCode: 'NA',
            TypeField1: 'R',
            SecurityID: '',
            Filler4: 'NA',
            Filler5: 'NA',
            TypeField2: 'F',
            AdditionalInfo1: String(this.FinyearSession),
            AdditionalInfo2: '',
            AdditionalInfo3: String(this.BatchCode),
            AdditionalInfo4: String(this.AadharSession),
            AdditionalInfo5: String(this.TERMCODE),
            AdditionalInfo6: '1',
            AdditionalInfo7: String(this.ReceiptID),
            TypeField3: 'NA',
        };

        // console.log(this.billdeskmsg);
        // debugger;
        this.commonservice
            .Post_json(BillDeskcheckSum,this.billdeskmsg)
            .subscribe((response) => {
                // console.log(response)
                // debugger;
                this.billdeskRequestMsg = response.data;
                // console.log(this.billdeskRequestMsg)
                if (this.billdeskRequestMsg != null) {
                    BilldeskPay(this.billdeskRequestMsg,"","");
                }
            });
    }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
}
