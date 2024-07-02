import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FeereceiptService } from './feereceipt.service';
import { Golbal_CollegeCode } from '../../../globals/global-variable';
import {GlobalMessage} from "../../../globals/global.message";
import {Ireq_Batch, Ireq_show_installment, Ireq_studentapprovedcourse} from "./feereceipt.requestmodel";

@Component({
  selector: 'app-feereceipt',
  templateUrl: './feereceipt.component.html',
  styleUrls: ['./feereceipt.component.scss'],
})
export class FeereceiptComponent implements OnInit {
  data: any;
  selectedBatchCode: any = '';
  Lineitem: any;
  Amount: any;
  InstallmentID: any;
  PrefixName: any;
  ReceiptNo: any;
  ReceiptDate: any;
  Installments: any;
  index: any;
  Header: any;
  submitted = false;
  Batch: any;
  FullName: any;
  Mobile: any;
  BatchName: any;
  Email: any;
  BilldeskTranID: any;
  ApprovedCourses: any;
  firstSelectedBatch: any;
  firstBatchCode: any;
  firstSubjectGroupID: any;
  inputjson: any;
  finyeardata: any;
  SelectedFinyear: any;
  BatchNames: any;
  SelectedBatchs: any;

  constructor(
    private router: Router,
    private feereceiptService: FeereceiptService,
    private formBuilder: UntypedFormBuilder,
    private globalmessage: GlobalMessage
  ) {}
  Finyear: any;
  FeeReceipt = false;
  FeeModal = true;

  AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
  StudentType = sessionStorage.getItem('StudentType');
  TokenSession = sessionStorage.getItem('Token');

  FeereceiptForm!: UntypedFormGroup;

  get f() {
    return this.FeereceiptForm.controls;
  }

  FeeStructure: any;

  print() {
    // tslint:disable-next-line:no-unused-expression
    window && window.print();
  }

  ngOnInit(): void {

      this.GetFinyearAPI();
      // this.StudentProfileStatus();

    this.FeereceiptForm = this.formBuilder.group({
      finyear: ['', Validators.required],
      batch: ['', Validators.required],
      installment: ['', Validators.required],
    });
  }

  StudentApprovedCourses() {
    let jsonin: Ireq_studentapprovedcourse = {
      Finyear: this.SelectedFinyear.Finyear,
      Collegecode: Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
    };

    // let input_json : Ireq_input = {
    //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
    // };

    this.feereceiptService
      .StudentApprovedCourses(jsonin)
      .subscribe((response) => {
        this.ApprovedCourses = response.data;
        console.log(response);
        // console.log(this.modalBatch.Batch_Code)
      });
  }

  GetFinyearAPI() {
    let jsonin: Ireq_Batch = {
      Finyear: -99,
      Collegecode: Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
    };

    // let input_json : Ireq_input = {
    //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
    // };

    this.feereceiptService.Paidfinyear(jsonin).subscribe((response) => {
      this.Finyear = response.data;
      console.log(response);
      // console.log(this.modalBatch.Batch_Code)
    });
  }

  GetBatchAPI() {
    let jsonin: Ireq_Batch = {
      Finyear: this.SelectedFinyear.Finyear,
      Collegecode: Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
    };

    // let input_json : Ireq_input = {
    //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
    // };

    this.feereceiptService.Paidbatchs(jsonin).subscribe((response) => {
      this.BatchNames = response.data;
      console.log('batchnames ', response);
    });
  }

  onFinyearSelected() {
    this.GetBatchAPI();
  }

  onBatchSelected(event: any) {
    console.log('yes batch', this.SelectedBatchs.Batch_code);
    if (this.SelectedBatchs.Batch_code > 0) {
      this.ShowInstallmentDetails();
    }
  }

  ShowInstallmentDetails() {
    if (this.SelectedFinyear.Finyear <= 0) {
      this.openYesNoDialog('Select financial year');
      return;
    }
    this.submitted = true;
    let jsonin: Ireq_show_installment  = {
      CollegeCode: Golbal_CollegeCode,
      Finyear: this.SelectedFinyear.Finyear,
      BatchCode: this.SelectedBatchs.Batch_code,
      Aadhaar: this.AadharSession,
    };

    // let input_json : Ireq_input = {
    //   Input : this.rsa.encryptWithPublicKey(JSON.stringify(jsonin))
    // };

    this.feereceiptService
      .StudentReceiptDetails(jsonin)
      .subscribe((response) => {
        console.log('i', response);
        this.Installments = response.data.Installments;

        if (this.Installments != null) {
          for (this.index of this.Installments) {
            this.Header = this.index.Header;
          }
        }
        // else {
        //   this.openYesNoDialog("")
        //   // alert(response.message)
        // }
      });
    this.StudentApprovedCourses();
  }

  showFeesAmount() {
    this.Amount = this.FeeStructure.Header.Amount;
    this.InstallmentID = this.FeeStructure.Header.Installment;
    this.PrefixName = this.FeeStructure.Header.Prefix_name;
    this.ReceiptNo = this.FeeStructure.Header.Receiptno;
    this.FullName = this.FeeStructure.Header.FullName;
    this.BatchName = this.FeeStructure.Header.BatchName;
    this.Mobile = this.FeeStructure.Header.Mobile;
    this.Email = this.FeeStructure.Header.Email;
    this.BilldeskTranID = this.FeeStructure.Header.BilldeskTranID;
    this.ReceiptDate = this.FeeStructure.Header.Receiptdate;
    this.Lineitem = this.FeeStructure.Lineitem;

    // console.log(this.FeeStructure.Lineitem)
  }

  openYesNoDialog(msg: any) {
    this.globalmessage.Show_message(
      'Delete'
    );
  }

  showReceipt() {
    this.FeeModal = false;
    this.FeeReceipt = true;
  }

  ChangeInstallment() {
    this.FeeModal = true;
    this.FeeReceipt = false;
    this.FeeStructure = '';
    this.Amount = '';
    this.resetPage();
  }
  resetPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
