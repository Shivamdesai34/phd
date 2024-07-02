import { Domainname } from '../../../globals/global-variable';
import {
  CollegeCode,
  FinYear,
  Golbal_CollegeCode,
} from '../../../globals/global-variable';

import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BilldeskPay } from './../../../../assets/javascript/billdesk';
import * as myGlobals from '../../../globals/global-variable';
import {GlobalMessage} from "../../../globals/global.message";
import {
  BillDeskcheckSum,
  IU_Admission, StudentAppliedCourses,
  CheckSubjectGroupQuota,StudentProfileStatus,
  StudentSubjectGroup,
  Additionalsubjectformfees_URL, PortalOpenv1, GetAllFirstYearBatchs
} from "../../../globals/global-api";
import {CommonService} from "../../../globals/common.service";

@Component({
  selector: 'app-additionalsubjects',
  templateUrl: './additionalsubjects.component.html',
  styleUrls: ['./additionalsubjects.component.scss'],
})
export class AdditionalsubjectsComponent implements OnInit {
  Demoversion: boolean = false;

  billdeskmsg: any;
  AppliedCourses: any;
  SubjectGroupCode: any;
  billdeskquerymsg: any;
  QuotaStatus: any;
  portal!: string;

  additionalSubjectsForm!: FormGroup;
  submitted = false;
  SubjectGroups: any;
  SubjectGroupID: any;
  batchSubjects: any;
  BatchCode: any;
  formAmount: any;
  data: any;
  modalBatch: any;
  ReceiptID: any;
  ReceiptNo: any;
  billdeskRequestMsg: any;

  BatchObject: any;
  selectedObject: any;


  subjectselection = false;

  constructor(
    private http: HttpClient,private commonService: CommonService,
    private router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private globalmessage: GlobalMessage
  ) {

    let xDomain = myGlobals.Domainname.toUpperCase() ;
    if (xDomain.search('LOCALHOST') != -1) {
      this.Demoversion = true;
    }
    if (xDomain.search('DEMO') != -1) {
      this.Demoversion = true;
    }
  }

  // private changeRef: ChangeDetectorRef
  // ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

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
    return this.additionalSubjectsForm.controls;
  }


  AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
  FinyearSession = myGlobals.Global_CurrentFinYear;
  TokenSession = sessionStorage.getItem('Token');
  StudentType = sessionStorage.getItem('StudentType');

  ngOnInit() {

      this.modalSelectBatch();
      this.StudentProfileStatus();
      this.StudentAppliedCourses();

    this.additionalSubjectsForm = this.formBuilder.group({
      batch: ['', Validators.required],
      batchSubjects: ['', Validators.required],
    });

    this.renderExternalScript(
      'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
    ).onload = () => {};
  }

  openYesNoDialog(msg: any) {
    this.globalmessage.Show_message('Delete')

  }

  StudentProfileStatus() {
    let jsonin = {
      Finyear: this.FinyearSession,
      Collegecode: myGlobals.Global_CurrentFinYear,
      Aadhaar: this.AadharSession,
      studenttype: this.StudentType,
      webportname: myGlobals.Global_Webportname,
    };
    this.commonService
      .Post_json(StudentProfileStatus,jsonin)
      .subscribe((response) => {
        // console.log(response.data.Profile)

        if (response.data.Profile.ProfileSubmited == 1) {
          return ;
        }
        if (response.data.Profile.Aadhaar == 0) {
          // this.openYesNoDialog("Pending Personal Details")
          // alert("Complete Personal Details")
          this.router.navigate(['students/fillprofile']);
        } else if (response.data.Education == false) {
          // this.openYesNoDialog("Pending Education Details")
          // alert("Complete Education Details")
          this.router.navigate(['students/fillprofile']);
        } else if (response.data.Reservation.Aadhaar == 0) {
          // this.openYesNoDialog("Pending Reservation Details")
          // alert("Complete Reservation Details")
          this.router.navigate(['students/fillprofile']);
        }
        if (response.data.ProfileCount < 2) {
          // this.openYesNoDialog("Applying to Additional Course will Lock you Profile and cannot be changed!")
          Swal.fire({
            title: 'Message!',
            text:
              'Applying to Additional Course will Lock your Profile and cannot be changed!',
            icon: 'info',
            confirmButtonText: 'OK',
          }); //alert
        }
      });
  }

  StudentAppliedCourses() {
    let jsonin = {
      Finyear: myGlobals.Global_CurrentFinYear,
      Collegecode: 1,
      Aadhaar: this.AadharSession,
    };
    this.commonService
      .Post_json(StudentAppliedCourses,jsonin)
      .subscribe((response) => {
        this.AppliedCourses = response.data;
        // console.log(this.AppliedCourses)
        // console.log(this.modalBatch.Batch_Code)
      });
  }

  modalSelectBatch() {
    let jsonin = {
      Finyear: FinYear,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
    };
    this.commonService
      .Post_json(GetAllFirstYearBatchs,jsonin)
      .subscribe((response) => {
        this.modalBatch = response.data;
        // console.log(this.modalBatch.Batch_Code)
      });
  }

  PortalOpen(event: any) {
    // this.portal = "";
    this.BatchCode = event.Batch_Code;
    this.formAmount = event.FormAmount;

    let jsonin = {
      finyear: this.FinyearSession,
      collegecode: myGlobals.Golbal_CollegeCode,
      batchcode: this.BatchCode,
    };

    console.log("batch code",jsonin);
    this.commonService
      .Post_json(PortalOpenv1,jsonin)
      .subscribe((response) => {
        // debugger;
        this.portal = response.data;
        if (response.data.Admissionstarted == true)  {
          this.modalSelectBatchSubjects();
        } else {
          this.portal = '';
          this.SubjectGroups = '';
          this.openYesNoDialog('Admission Closed for this Particular Batch!');
          this.additionalSubjectsForm.controls['batch'].setValue('');
          this.additionalSubjectsForm.controls['batchSubjects'].setValue('');
        }
        // console.log(this.portal)
      });
  }

  modalSelectBatchSubjects() {
    //console.log(event)

    // this.BatchCode = event.Batch_Code
    // this.formAmount = event.FormAmount
    // debugger;
    // this.PortalOpen();

    let jsonin = {
      Finyear: this.FinyearSession,
      Collegecode: myGlobals.Golbal_CollegeCode,
      BatchCode: this.BatchCode,
      Aadhaar: this.AadharSession,
    };
    console.log(jsonin)

    this.commonService
      .Post_json(Additionalsubjectformfees_URL,jsonin)
      .subscribe((response) => {

        //console.log('XXX',response.data.Receipt_ID);
        if (response.data.Receipt_ID <= 0) {
          this.commonService
            .Post_json(StudentSubjectGroup,jsonin)
            .subscribe((response) => {
              this.batchSubjects = response.data;
              this.portal = '';
              this.additionalSubjectsForm.controls['batchSubjects'].setValue('');
              // console.log(this.batchSubjects)
            });
        } else {
          // this.BatchObject = "";

          //console.log('XXX',response.data);
          this.portal = '';
          this.SubjectGroups = '';
          this.additionalSubjectsForm.controls['batch'].setValue('');
          this.additionalSubjectsForm.controls['batchSubjects'].setValue('');

          Swal.fire({
            title: 'Error!',
            text:
              'Fees Already Paid for this Batch!',
            icon: 'error',
            confirmButtonText: 'OK',
          });

        }
      });
  }

  // modalSelectBatchSubjects(event) {
  //   //console.log(event)

  //   this.BatchCode = event.Batch_Code
  //   this.formAmount = event.FormAmount
  //   this.data = {
  //     "Finyear": this.FinyearSession,
  //     "Collegecode": this.CollegeCodeSession,
  //     "BatchCode": this.BatchCode,
  //     "Aadhaar": this.AadharSession
  //   }
  //   // console.log(this.data)
  //   this.additionalsubjectsService.FormFeesPaidCheck(this.data).subscribe(response => {
  //     if(response.data == false){
  //       this.additionalsubjectsService.GetModalBatchSubjects(this.data).subscribe(response => {
  //         this.batchSubjects = response.data

  //         this.additionalSubjectsForm.controls.batchSubjects.setValue("");
  //         // console.log(this.batchSubjects)
  //       })
  //     }
  //     else{
  //       // this.BatchObject = "";
  //       this.SubjectGroups = "";
  //       this.openYesNoDialog("Fees Already Paid for this Batch!");
  //       this.additionalSubjectsForm.controls.batch.setValue("");
  //       this.additionalSubjectsForm.controls.batchSubjects.setValue("");
  //     }
  //   })

  // }

  onGroupSelected(event: any) {
    this.SubjectGroups = event.Subject_group_name;
    //console.log(event);
    this.SubjectGroupID = event.Subject_group_id;
    this.SubjectGroupCode = event.Subject_group_code;
    this.CheckSubjectGroupQuota();
  }

  CheckSubjectGroupQuota() {
     let jsonin= {
      collegecode: 1,
      finyear: this.FinyearSession,
      batchcode: this.BatchCode,
      subjectgroupid: this.SubjectGroupID,
      subject_group_code: this.SubjectGroupCode,
      quota_status: 'XXXX',
    };
    // console.log(this.data)
    // debugger;
    this.commonService
      .Post_json(CheckSubjectGroupQuota,jsonin)
      .subscribe((response) => {
        // console.log(response)
        this.QuotaStatus = response.data[0].Quota_status;
        // console.log(this.QuotaStatus)
        if (this.QuotaStatus != 'OPEN') {
          this.openYesNoDialog('Quota Closed! Select Different Group Code.');
          this.additionalSubjectsForm.controls['batchSubjects'].setValue('');
          this.SubjectGroups = '';
        }
      });
  }

  addSubjectsPayment() {
    this.submitted = true;

    let jsonin = {
      finyear: this.FinyearSession,
      college_code: myGlobals.Golbal_CollegeCode,
      aadhaar: this.AadharSession,
      batch_code: parseInt(this.BatchCode),
      subject_group_id: parseInt(this.SubjectGroupID),
      subject_group_code: this.SubjectGroupCode,
      term_code: 9999,
    };

    this.commonService
      .Post_json(IU_Admission,jsonin)
      .subscribe((response) => {
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

  // BillDeskcheckSumQuery() {

  //   this.billdeskquerymsg = {
  //     "finyear": this.FinyearSession,
  //     "collegecode": this.CollegeCodeSession,
  //     "aadhaar": this.AadharSession,
  //     "batchcode": parseInt(this.BatchCode),
  //     "CustomerID": String(this.ReceiptNo)
  //   }
  //   this.additionalsubjectsService.BillDeskcheckSumQuery(this.billdeskquerymsg).subscribe(response => {
  //     console.log(response)
  //   })
  // }

  RegistrationPayment() {
    let nTranscationamount = '';

    if (this.Demoversion) {
      nTranscationamount = '1';
      this.formAmount = '1';
    } else {
      nTranscationamount = String(this.formAmount);
    }
    let jsonin = {
      collegecode: myGlobals.Golbal_CollegeCode,
      finyear: this.FinyearSession,
      batchcode: this.BatchCode,
      aadhaar: this.AadharSession,
      termcode: 9999,
      MerchantID: '',
      CustomerID: String(this.ReceiptNo),
      Filler1: 'NA',
      TxnAmount: nTranscationamount,
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
      AdditionalInfo5: '9999',
      AdditionalInfo6: '1',
      AdditionalInfo7: String(this.ReceiptID),
      TypeField3: 'NA',
      Feestype: 'FORMFEES',
    };

    this.commonService
      .Post_json(BillDeskcheckSum,jsonin)
      .subscribe((response) => {
        this.billdeskRequestMsg = response.data;
        // console.log(this.billdeskRequestMsg)
        if (this.billdeskRequestMsg != null) {
          BilldeskPay(this.billdeskRequestMsg,"","");
        }
        // this.StudentAppliedCourses();
      });
  }
}
