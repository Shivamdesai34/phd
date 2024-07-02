import {PlatformLocation} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, OnInit, Output, ViewChild,} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {Router} from '@angular/router';
import {CanceladmissionService} from './canceladmission.service';
import * as myGlobals from '../../../globals/global-variable';
import Swal from 'sweetalert2';
import {GlobalMessage} from "../../../globals/global.message";
import {Ireq_input} from "../fees/fees.requestmodel";
import {CommonService} from "../../../globals/common.service";
import {Bankmasters, CheckAdmission_URL} from "../../../globals/global-api";

@Component({
    selector: 'app-canceladmission',
    templateUrl: './canceladmission.component.html',
    styleUrls: ['./canceladmission.component.scss'],
})
export class CanceladmissionComponent implements OnInit {
    selectedBatchCode: any;
    selectedBatchName: any;
    StudentData: any;
    banks: any;
    SelectedBatch: any;
    BatchName: any;

    constructor(
        private router: Router,private commonService: CommonService,
        private platformLocation: PlatformLocation,
        private http: HttpClient,
        private formBuilder: UntypedFormBuilder,
        private globalmessage: GlobalMessage,
        private canceladmissionService: CanceladmissionService
    ) {
    }

    @ViewChild('content') content: any;
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();



    openModal() {
        // this.modalService.open(this.content, this.NgbModalOptions);
    }

    closeModal() {
        // this.platformLocation.onPopState(() => this.modalService.dismissAll());
        this.router.navigate(['']);
    }

    AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
    FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
    TokenSession = sessionStorage.getItem('Token');
    StudentType = sessionStorage.getItem('StudentType');

    cancelAdmissionForm!: UntypedFormGroup;
    submitted = false;

    get f() {
        return this.cancelAdmissionForm.controls;
    }

    data: any;
    formData = new FormData();
    chequebook_img!: Array<File>;

    changeStateCancelAdmission = false;

    checkAdmission() {

        let jsonin = {
            Finyear: this.FinyearSession,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
        };
        // console.log(this.data)

        this.commonService
            .Post_json(CheckAdmission_URL,jsonin)
            .subscribe((response) => {
                if (response != null) {
                    if (response.data.feespaid <= 0) {
                        this.openYesNoDialog('Pay Fees to Cancel Admission!');
                        this.router.navigate(['/dashboard']);
                    } else {
                        this.StudentData = response.data;
                        this.selectedBatchCode = this.StudentData.batch_code;
                        this.selectedBatchName = this.StudentData.batch_name;
                    }
                }
            });
    }

    ngOnInit(): void {
        if (!this.TokenSession) {
            this.router.navigate(['/login']);
            return;
        }

        this.cancelAdmissionForm = this.formBuilder.group({
            studentbatch: ['', Validators.required],
            reason: ['', Validators.required],
            bankname: ['', Validators.required],
            accountholdername: ['', Validators.required],
            accountnumber: ['', Validators.required],
            bankbranch: ['', Validators.required],
            ifsc: ['', Validators.required],
            enrollment: ['', Validators.required],
        });

        this.Check_feespaid();
        this.Bankmasters();
    }

    Check_feespaid() {

        let jsonin = {
            Finyear: this.FinyearSession,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
        };


      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        this.canceladmissionService.Paidbatchs(jsonin).subscribe((response) => {
            if (response.data != null) {
                this.BatchName = response.data;
            }
        });

        if (this.canceladmissionService.Exception != ""){
            Swal.fire({
                title: 'Error!',
                text: this.canceladmissionService.Exception,
                icon: 'error',
                confirmButtonText: 'OK',
            });
            this.router.navigate(['/dashboard']);
        }

    }

    onBatchSelected(event: any) {
        this.Cancelledadmission();
    }

    Cancelledadmission() {
        let jsonin = {
            Finyear: this.FinyearSession,
            college_code: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
            batch_code: this.SelectedBatch.Batch_code,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(formData))
      // };

        this.canceladmissionService
            .Cancelledadmission(jsonin)
            .subscribe((response) => {
                if (response != null) {
                    console.log('adm:', response);
                    if (response.data !== true) {
                        this.openYesNoDialog('Already Cancelled Admission!');
                        this.router.navigate(['/dashboard']);

                    }
                }
            });
    }

    openYesNoDialog(msg: any) {
        this.globalmessage.Show_message(
             'Delete')
    }

    Bankmasters() {
        //subject api
        let jsonin = {
            Aadhaar: this.AadharSession,
            Finyear: this.FinyearSession,
            CollegeCode: myGlobals.Golbal_CollegeCode,
        };

      // let input_json : Ireq_input = {
      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
      // };

        this.commonService.Post_json(Bankmasters,jsonin).subscribe((response) => {
            // console.log(response)
            if (response != null) {
                this.banks = response.data;
            }

        });
    }

    ChequeBook_Filechange(element: any) {
        // console.log(element.target.files)
        this.chequebook_img = element.target.files;
        // console.log(this.chequebook_img)
        // if (this.chequebook_img[0].type == "application/pdf" && this.chequebook_img[0].size < 2400000) {
        //   this.chequebook_img = element.target.files;
        // }
        // else {
        //   this.openYesNoDialog("Only application/pdf files allowed! Max Size 2MB!")
        // }
    }

    onCancelAdmission() {
        this.submitted = false;



        if (!this.chequebook_img) {
            // console.log('Selected file format is not supported');
            this.openYesNoDialog('Select ChequeBook/PassBook Image!');
            // alert("Select Profile/Aadhaar/Sign Images")
            // return false;
        } else {
            if (this.cancelAdmissionForm.invalid) {
                return;
            } else {
                if (
                    this.chequebook_img[0].type == 'image/jpeg' ||
                    this.chequebook_img[0].type == 'image/png'
                ) {
                    if (this.chequebook_img[0].size < 2400000) {
                        this.formData.append('finyear', sessionStorage.getItem('Finyear')!);
                        this.formData.append('collegecode', '1');
                        this.formData.append('aadhaar', sessionStorage.getItem('Aadhaar')!);
                        this.formData.append('batchcode', this.SelectedBatch.Batch_code);
                        this.formData.append(
                            'reason',
                            this.cancelAdmissionForm.controls['reason'].value
                        );
                        this.formData.append(
                            'bankname',
                            this.cancelAdmissionForm.controls['bankname'].value
                        );
                        this.formData.append(
                            'accountholdername',
                            this.cancelAdmissionForm.controls['accountholdername'].value
                        );
                        this.formData.append(
                            'accountno',
                            this.cancelAdmissionForm.controls['accountnumber'].value
                        );
                        this.formData.append(
                            'bankbranch',
                            this.cancelAdmissionForm.controls['bankbranch'].value
                        );
                        this.formData.append(
                            'ifsccode',
                            this.cancelAdmissionForm.controls['ifsc'].value
                        );
                        this.formData.append(
                            'enrollment',
                            this.cancelAdmissionForm.controls['enrollment'].value
                        );
                        this.formData.append('cheque_img', this.chequebook_img[0]);

                      // let input_json : Ireq_input = {
                      //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(formData))
                      // };

                        this.canceladmissionService
                            .CancelAdmission(this.formData)
                            .subscribe((response) => {
                                console.log(response);
                                if (response.data == true) {
                                    this.openYesNoDialog('Admission Cancellation Request Sent!');
                                    this.submitted = true;
                                } else {
                                    this.openYesNoDialog(response.message);
                                    // this.personalDetailsForm.reset();
                                    // alert("Error!")
                                }
                            });
                    } else {
                        this.openYesNoDialog('Max Size 2MB!');
                    }
                } else {
                    this.openYesNoDialog('Only png/jgp files allowed!');
                }
            }
        }
    }
}
