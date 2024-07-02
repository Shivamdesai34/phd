import {Component, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Golbal_CollegeCode} from '../../../globals/global-variable';
import {FeesService} from './fees.service';

import Swal from 'sweetalert2';
import {BilldeskPay} from './../../../../assets/javascript/billdesk';

import * as myGlobals from '../../../globals/global-variable';
import {GlobalMessage} from "../../../globals/global.message";
import {RSAHelper} from "../../../globals/rsahelper.service";
import {
  Ireq_approvedcourse, Ireq_checkadmission, Ireq_checkoutstanding, Ireq_formfees,
  Ireq_input,
  Ireq_studentfeesinstallment,
  Ireq_StudentProfileStatus_url
} from "./fees.requestmodel";
import {CommonService} from "../../../globals/common.service";
import {
  IU_receipt, studentactivefinyear,InstallmentValidation,
  CheckSubjectGroupQuota, checkoutstanding,
  StudentFeesInstallment,
  BatchSubjects, StudentApprovedCourses,
  StudentProfileStatus_url, CheckAdmission_URL, FormFeesPaid_URL, BillDeskcheckSum
} from "../../../globals/global-api";

@Component({
    templateUrl: './fees.component.html',
    styleUrls: ['./fees.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FeesComponent implements OnInit {
    ReceiptID: any;
    ReceiptNO: any;
    TermCode: any;
    InstallmentID: any;
    Quota_status: any;
    QuotaStatus: any;
    existingsubjectgroupcode: any;
    existingstudent: any;
    loginresponse: any;
    feesPaid: any;
    FullName: any;
    Mobile: any;
    BatchName: any;
    Email: any;
    ApprovedCourses: any;
    InstallmentName: any;
    outstanding: any;
    Demoversion : boolean = false ;

    billdeskquerymsg!: {
        finyear: number;
        collegecode: number;
        aadhaar: number;
        batchcode: number;
        CustomerID: string;
    };
    selectedBatchName: any;
    SubjectGroupCode: any;

  ActiveFinyear: any;

    constructor(
        private router: Router,private rsa: RSAHelper,
        private feesService: FeesService,private commonService: CommonService,
        private formBuilder: UntypedFormBuilder,
        private renderer: Renderer2,
        private route: ActivatedRoute,
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

    renderExternalScript(src: string): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        script.defer = true;
        this.renderer.appendChild(document.body, script);
        return script;
    }

    submitted = false;

    AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
    FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
    BatchCode = parseInt(sessionStorage.getItem('BatchCode')!);
    TokenSession = sessionStorage.getItem('Token');
    StudentType = sessionStorage.getItem('StudentType');

    data: any;

    FeeStructure: any;
    selectedBatchCode: any = '';
    selectedSubjectGroupId: any = '';
    selectedSubjectGroupCode: any = '';

    FeesPaymentForm!: UntypedFormGroup;
    PaymentForm!: UntypedFormGroup;
    ShowDeclaration = false;
    selectedObject: any;

    Batch: any;
    batchSubjects: any;
    SubjectGroups: any;
    SubjectGroupID: any;
    res: any;

    index: any;
    Installments: any;
    Header: any;
    Lineitem: any;
    Amount: any;

    FeeReceipt = false;
    FeeModal = true;
    changeState = true;

    billdeskmsg: any;
    billdeskRequestMsg: any;

    firstSubjectGroupID: any;
    firstBatchCode: any;
    firstSelectedBatch: any;
    firstSubjectGroupName: any;
    firstSubjectGroupCode: any;

    get f() {
        return this.FeesPaymentForm.controls;
    }

    ngOnInit() {
        // this.route.queryParams.subscribe(params => {
        //   // this.queryParam = params['val'];
        //   console.log(params)
        // });


            this.StudentType = sessionStorage.getItem('StudentType');

            console.log('ssss',this.StudentType)
            if (this.StudentType == 'ATKT') {
                this.studentactivefinyear();
                this.checkAdmission();
                this.StudentProfileStatus();
            } else if (this.StudentType == 'OUTSIDE') {
                this.studentactivefinyear();
                this.checkAdmission();
                this.StudentProfileStatus();
            } else if (this.StudentType == 'NONE') {
                this.CheckOutstanding();
            }
            console.log('student:');
            // this.CheckOutstanding();

        // https://services.billdesk.com/checkout-widget/src/app.bundle.js
        this.renderExternalScript(
            'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
        ).onload = () => {
        };

        this.FeesPaymentForm = this.formBuilder.group({
            batch: ['', Validators.required],
            batchSubjects: ['', Validators.required],
            installment: ['', Validators.required],
            // checkbox: ['', Validators.required],
        });
        this.PaymentForm = this.formBuilder.group({
            termsandconditions: ['', Validators.required],
        });
    }



    studentactivefinyear() {
        this.commonService.Post_json(studentactivefinyear,"").subscribe((response) => {
            this.res = response.data;
            // console.log("check finyear:",this.res)
            this.ActiveFinyear = this.res.data;
            this.FinyearSession = this.ActiveFinyear;
        });
    }

    InstallmentValidation() {
        if (this.StudentType == 'ATKT') {
            this.studentactivefinyear();
            this.data = {
                collegecode: Golbal_CollegeCode,
                finyear: this.FinyearSession,
                batchcode: parseInt(this.firstBatchCode),
                aadhaar: this.AadharSession,
                termcode: this.TermCode,
                installment: this.InstallmentID,
            };
        }
        if (this.StudentType == 'OUTSIDE') {
            this.studentactivefinyear();
            this.data = {
                collegecode: Golbal_CollegeCode,
                finyear: this.FinyearSession,
                batchcode: parseInt(this.firstBatchCode),
                aadhaar: this.AadharSession,
                termcode: this.TermCode,
                installment: this.InstallmentID,
            };
        }
        if (this.StudentType == 'NONE') {
            this.data = {
                collegecode: Golbal_CollegeCode,
                finyear: this.FinyearSession,
                batchcode: parseInt(this.firstBatchCode),
                aadhaar: this.AadharSession,
                termcode: this.TermCode,
                installment: this.InstallmentID,
            };
        }
        this.commonService.Post_json(InstallmentValidation,this.data).subscribe((response) => {
            // debugger;
            if (response.data == false) {
                this.globalmessage.Show_message(response.message);
                this.resetAll();
            } else {
                this.FinyearSession = this.data.finyear;
                this.CheckSubjectGroupQuota();
            }
            // this.showFeesAmount(this.FeeStructure);
        });
    }

    CheckOutstanding() {
        let jsonin:Ireq_checkoutstanding = {
            finyear: -99,
            college_code: Golbal_CollegeCode,
            aadhaar: this.AadharSession,
            batch_code: -99,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(formData))
      // };

        this.commonService
            .Post_json(checkoutstanding,jsonin)
            .subscribe((response) => {
                this.res = response;

                console.log('xxx3333', this.res);
                if (this.res.data.Outstanding == true) {
                    console.log('xxx111');
                    this.FinyearSession = this.FinyearSession;
                    this.checkAdmission();
                    this.StudentProfileStatus();
                }
                if (this.res.data.Outstanding == false) {
                    console.log('xxx');
                    this.FinyearSession = this.res.data.Finyear;
                    this.FormFeesPaid();
                }
            });
    }

    //new 13-07-2022
    StudentApprovedCourses() {
        let jsonin:Ireq_approvedcourse = {
            Finyear: this.FinyearSession,
            Collegecode: Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        this.commonService.Post_json(StudentApprovedCourses,jsonin).subscribe((response) => {
            this.ApprovedCourses = response.data;
        });
    }

    formFees: any;

    FormFeesPaid() {
        if (this.FinyearSession <= 0) {
            this.FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
        }

        let jsonin:Ireq_formfees = {
            Finyear: this.FinyearSession,
            Collegecode: Golbal_CollegeCode,
            BatchCode: this.BatchCode,
            Aadhaar: this.AadharSession,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        this.commonService.Post_json(FormFeesPaid_URL,jsonin).subscribe((response) => {
            this.res = response;
            if (this.res.data == true) {
                this.checkAdmission();
                this.StudentProfileStatus();
            }
            if (this.res.data == false) {
                // this.router.navigate['/dashboard'];

                Swal.fire({
                    title: 'Message!',
                    text: 'Please pay your form fees!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }); //alert
            }
        });
    }

    print() {
        // tslint:disable-next-line:no-unused-expression
        window && window.print();
    }

    openYesNoDialog(msg: any) {
        this.globalmessage.Show_message('Delete')

    }

    checkAdmission() {

        if (this.FinyearSession <= 0) {
            this.globalmessage.Show_error('Financial year not found!');
            this.FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
        }
        if (this.AadharSession <= 0) {
            this.globalmessage.Show_error('aadhaar  not found!');
        }

        let jsonin:Ireq_checkadmission = {
            Collegecode: Golbal_CollegeCode,
            Finyear: this.FinyearSession,
            Aadhaar: this.AadharSession,
        };


      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        this.commonService.Post_json(CheckAdmission_URL,jsonin).subscribe((response) => {
            this.selectedBatchCode = response.data.batch_code;
            this.selectedSubjectGroupId = response.data.subject_group_id;
            this.selectedSubjectGroupCode = response.data.subject_group_code;
            this.selectedBatchName = response.data.batch_name;
            this.feesPaid = response.data.feespaid;


            this.FinyearSession = jsonin.Finyear;

            this.StudentApprovedCourses();
        });
    }

    StudentProfileStatus() {
        let jsonin : Ireq_StudentProfileStatus_url= {
            Finyear: this.FinyearSession,
            Collegecode: Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
            studenttype: this.StudentType,
            webportname: 'STUDENTS',
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        this.commonService.Post_json(StudentProfileStatus_url,jsonin).subscribe((response) => {
            // console.log(response.data.Profile)
            if (response.data.Profile.Aadhaar == 0) {
                // this.openYesNoDialog("Pending Personal Details")
                // alert("Complete Personal Details")
                // this.router.navigate(['students/fillprofile']);
                if (this.StudentType == 'ATKT') {
                    this.router.navigate(['/Fillprofile']);
                }
                if (this.StudentType == 'OUTSIDE') {
                    this.router.navigate(['/Fillprofile']);
                }
                if (this.StudentType == 'NONE') {
                    this.router.navigate(['/students/fillprofile']);
                }
            } else if (response.data.Education == false) {
                // this.openYesNoDialog("Pending Education Details")
                // alert("Complete Education Details")
                // this.router.navigate(['students/fillprofile']);
                if (this.StudentType == 'ATKT') {
                    this.router.navigate(['/Fillprofile']);
                }
                if (this.StudentType == 'OUTSIDE') {
                    this.router.navigate(['/Fillprofile']);
                }
                if (this.StudentType == 'NONE') {
                    // this.router.navigate(["/students/fillprofile"])
                }
            } else if (response.data.Reservation.Aadhaar == 0) {
                // this.openYesNoDialog("Pending Reservation Details")
                // alert("Complete Reservation Details")
                // this.router.navigate(['students/fillprofile']);
                if (this.StudentType == 'ATKT') {
                    this.router.navigate(['/Fillprofile']);
                }
                if (this.StudentType == 'OUTSIDE') {
                    this.router.navigate(['/Fillprofile']);
                }
                if (this.StudentType == 'NONE') {
                    this.router.navigate(['/students/fillprofile']);
                }
            }
        });
    }

    onBatchSelected(event: any) {
      this.FeesPaymentForm.controls['batchSubjects'].setValue('');
      this.FeesPaymentForm.controls['installment'].setValue('');
        this.Amount = '';
        // console.log(event)
        this.firstSelectedBatch = event;
        this.firstBatchCode = event.Batch_code;
        console.log(this.firstBatchCode);
        this.firstSubjectGroupID = event.Subject_group_id;
        this.firstSubjectGroupCode = event.Subject_group_code;
        // this.firstSubjectGroupName = event.Subject_group_name;
        this.ShowInstallmentDetails();
    }

    onSubjectSelect(event: any) {
        this.firstSubjectGroupCode = event.Subject_group_code;
        this.firstSubjectGroupName = event.Subject_group_name;
    }

    SelectBatchSubjects() {
        if (this.selectedBatchCode != null || this.selectedBatchCode != undefined) {
            let jsonin = {
                BatchCode: this.selectedBatchCode,
            };
            // console.log(this.data)
            this.commonService.Post_json(BatchSubjects,jsonin).subscribe((response) => {
                this.batchSubjects = response.data;
                for (var key in this.batchSubjects) {
                    if (this.batchSubjects.hasOwnProperty(key)) {
                        if (
                            this.batchSubjects[key].Subject_group_code ==
                            this.selectedSubjectGroupCode
                        ) {
                            this.selectedObject = this.batchSubjects[key].Subject_group_code;
                            this.SubjectGroups = this.batchSubjects[key].Subject_group_name;
                            //  console.log("etrdrgdgfch",this.selectedObject);
                            //  console.log(this.SubjectGroups)
                        }
                    }
                }
                // this.selectedObject = this.batchSubjects[0].Subject_group_code
                // this.SubjectGroups = this.batchSubjects[0].Subject_group_name
                // console.log(this.selectedObject)
                // console.log(this.SubjectGroups)
                // console.log(this.batchSubjects)
                this.ShowInstallmentDetails();
            });
        } else {
            this.globalmessage.Show_message('Select Batch');
            // alert("Select Batch")
        }
    }

    onGroupSelected(event: any) {
        // this.SubjectGroups = event.Subject_group_name
        // console.log(event);
        // this.SubjectGroupID = event.Subject_group_id;
        // this.Quota_status = event.Quota_status;
        // console.log(this.Quota_status)
        // console.log(event)

        for (var key in this.batchSubjects) {
            if (this.batchSubjects.hasOwnProperty(key)) {
                if (this.batchSubjects[key].Subject_group_code == event) {
                    this.SubjectGroups = this.batchSubjects[key].Subject_group_name;
                    this.SubjectGroupID = this.batchSubjects[key].Subject_group_id;
                    this.SubjectGroupCode = this.batchSubjects[key].Subject_group_code;
                    this.Quota_status = this.batchSubjects[key].Quota_status;
                    //  console.log("etrdrgdgfch",this.Quota_status);
                    //  console.log(this.SubjectGroupID)
                }
            }
        }
    }

    ShowInstallmentDetails() {
        this.submitted = true;
        let jsonin:  Ireq_studentfeesinstallment  = {
            CollegeCode: Golbal_CollegeCode,
            Finyear: this.FinyearSession,
            BatchCode: parseInt(this.firstBatchCode),
            Aadhaar: this.AadharSession,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        // console.log(this.data);
        this.commonService
            .Post_json(StudentFeesInstallment,jsonin)
            .subscribe((response) => {
                // debugger;
                // console.log(response)
                if (response.data.InstallmentAlreadyPaid == true) {
                    this.globalmessage.Show_message('All Installments are Paid!');
                    // alert("All Installments are Paid!")
                } else {
                    this.Installments = response.data.Installments;
                    // console.log(this.Installments)
                    if (this.Installments != null) {
                        for (this.index of this.Installments) {
                            this.Header = this.index.Header;
                        }
                    } else {
                        this.globalmessage.Show_message('No Installments Found!');
                        // alert("No Installments Found")
                    }
                }
            });
    }

    CheckSubjectGroupQuota() {
        let jsonin = {
            collegecode: Golbal_CollegeCode,
            finyear: this.FinyearSession,
            batchcode: parseInt(this.firstBatchCode),
            subjectgroupid: parseInt(this.firstSubjectGroupID),
            subject_group_code: this.firstSubjectGroupCode,
            quota_status: 'XXXX',
        };
        console.log(this.data);

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        // debugger;
        this.commonService.Post_json(CheckSubjectGroupQuota,jsonin).subscribe((response) => {
            // console.log(response)
            this.QuotaStatus = response.data[0].Quota_status;
            // console.log(this.QuotaStatus)
            if (this.feesPaid <= 0) {
                if (this.QuotaStatus != 'OPEN') {
                    this.globalmessage.Show_message('Quota Closed! Select Different Group Code.');
                    this.changeState = false;
                } else {
                    this.showReceipt(jsonin.finyear);
                }
            } else {
                this.showReceipt(jsonin.finyear);
                // this.openYesNoDialog("Subject Group cannot be changed!")
            }
        });
    }

    showFeesAmount(FeeStructure: any) {
        console.log('gcfgh:', FeeStructure);

        this.Amount = FeeStructure.Header.Amount;
        this.TermCode = FeeStructure.Header.Term_code;
        this.FullName = FeeStructure.Header.FullName;
        this.BatchName = FeeStructure.Header.BatchName;
        this.Mobile = FeeStructure.Header.Mobile;
        this.Email = FeeStructure.Header.Emailid;
        this.InstallmentID = FeeStructure.Header.Installmentid;
        this.InstallmentName = FeeStructure.Header.Installment;
        this.Lineitem = FeeStructure.Lineitem;
        // console.log(this.FeeStructure.Lineitem)

        if (this.InstallmentID == 1) {
            this.ShowDeclaration = true;
            this.FeesPaymentForm = this.formBuilder.group({
                checkbox: ['', Validators.required],
            });
        } else {
            this.ShowDeclaration = false;
            this.FeesPaymentForm = this.formBuilder.group({
                checkbox: [''],
            });
        }
    }

  finyear_submit: any;
    showReceipt(finyear: number) {
        // this.CheckSubjectGroupQuota()
        // debugger;
        // if(this.QuotaStatus == "OPEN"){
        //   this.openYesNoDialog("Quota Closed! Select Different Group Code.")
        //   this.changeState = false;
        // }
        // else{
        //   this.submitted = true;
        //   this.FeeReceipt = true;
        //   this.FeeModal = false;
        //   this.IU_Receipt();
        // }

      this.finyear_submit = finyear
        this.submitted = true;
        this.FeeReceipt = true;
        this.FeeModal = false;
        this.IU_Receipt(this.finyear_submit);
    }

    ChangeInstallment() {
        this.FeeModal = true;
        this.FeeReceipt = false;
        this.FeeStructure = '';
        this.Amount = '';
        this.resetAll();

        // // this.selectedObject = '';
        // this.FeeStructure = '';
        // // this.SubjectGroups = '';
        // this.Amount = '';
    }

    resetAll() {
        let currentUrl = this.router.url;
        console.log('mjju:', currentUrl);
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
            // if (this.StudentType == "ATKT") {
            //   this.router.navigate(["/Fees"]);
            // }
            // else if (this.StudentType == "OUTSIDE") {
            //   this.router.navigate(["/Fees"]);
            // }
            // else if (this.StudentType == "NONE") {
            //   this.router.navigate(["/students/fees"]);
            // }
        });
    }

    IU_Receipt(fin: number) {



        let jsonin = {
            finyear: fin,
            college_code: 1,
            aadhaar: this.AadharSession,
            batch_code: parseInt(this.firstBatchCode),
            term_code: this.TermCode,
            installment: this.InstallmentID,
            existing_subject_group_id: parseInt(this.firstSubjectGroupID),
            paid_subject_group_id: parseInt(this.firstSubjectGroupID),
            existing_subject_group_code: this.selectedSubjectGroupCode,
            paid_subject_group_code: this.firstSubjectGroupCode,
        };
        // console.log(this.data)
        // debugger;
        this.commonService.Post_json(IU_receipt,jsonin).subscribe((response) => {
            console.log(response);
            this.ReceiptID = response.data.ReceiptID;
            this.ReceiptNO = response.data.ReceiptNo;
        });

      this.FinyearSession = fin
    }

    // BillDeskcheckSumQuery() {
    //   this.billdeskquerymsg = {
    //     "finyear": this.FinyearSession,
    //     "collegecode": 1,
    //     "aadhaar": this.AadharSession,
    //     "batchcode": parseInt(this.selectedBatchCode),
    //     "CustomerID": String(this.ReceiptNO)
    //   }
    //   this.feesService.BillDeskcheckSumQuery(this.billdeskquerymsg).subscribe(response => {
    //     console.log(response)
    //   })
    // }

    FeesPayment() {

        let nTranscationamount = '';

        if (this.Demoversion) {
            nTranscationamount = '1';
        } else {
            nTranscationamount = String(this.Amount);
        }

        if (this.PaymentForm.invalid) {
            this.globalmessage.Show_message(
                'Please Accept Terms & Conditions to Proceed to Payment!'
            );
        } else {
            let jsonin = {
                collegecode: Golbal_CollegeCode,
                finyear: this.FinyearSession,
                batchcode: parseInt(this.firstBatchCode),
                aadhaar: this.AadharSession,
                termcode: this.TermCode,
                MerchantID: '',
                CustomerID: String(this.ReceiptNO),
                Filler1: 'NA',
                TxnAmount: String(this.Amount),
                //TxnAmount: String(this.Amount),
                //  "TxnAmount":"1",
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
                // "AdditionalInfo2": String(this.CollegeCodeSession),
                AdditionalInfo2: '',
                AdditionalInfo3: String(this.selectedBatchCode),
                AdditionalInfo4: String(this.AadharSession),
                AdditionalInfo5: String(this.TermCode),
                AdditionalInfo6: String(this.InstallmentID),
                AdditionalInfo7: String(this.ReceiptID),
                TypeField3: 'NA',
            };
            // console.log(this.billdeskmsg);
            // console.log(this.ReceiptID);
            // debugger;

            if (this.ReceiptID > 0) {
                this.commonService
                    .Post_json(BillDeskcheckSum,jsonin)
                    .subscribe((response) => {
                        // console.log(response)
                        // debugger;
                        this.billdeskRequestMsg = response.data;

                        if (this.billdeskRequestMsg != null) {
                            BilldeskPay(this.billdeskRequestMsg,"","");

                            // let headers = new HttpHeaders()
                            // console.log(headers);

                            // let hostdata = headers.get("Host")
                            // console.log(hostdata)
                        }
                    });
            }
        }
    }
}
