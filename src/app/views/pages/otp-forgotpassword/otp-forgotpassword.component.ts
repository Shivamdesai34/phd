import {
  Golbal_CollegeCode,
  Global_LastFinYear,
  Aadhaar,
} from '../../../globals/global-variable';
import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OtpPasswordService } from './otp-forgotpassword.service';
// import { DialogService } from '../dialog/dialog.service';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';

import { filter, Observable } from 'rxjs';
import {CommonService} from "../../../globals/common.service";
import {studentsforgotmobile, Validatemobileotp} from "../../../globals/global-api";
import {GlobalMessage} from "../../../globals/global.message";
import {OtpService} from "../otp/otp.service";
import {encryptUsingAES256} from "../../../globals/encryptdata";

@Component({
  selector: 'app-otp-forgotpassword',
  templateUrl: './otp-forgotpassword.component.html',
  styleUrls: ['./otp-forgotpassword.component.scss'],
})
export class OtpPasswordComponent implements OnInit {
  CollegeCodeConst = Golbal_CollegeCode;
  FinYearConst = Global_LastFinYear;

  otpVerifyForm!: UntypedFormGroup;
  submitted = false;
  data: any;

  Aadhaar: any;
  EmailID: any;
  MobileNumber: any;
  registerresponse: any;
  flag: any;
  otp: any;
  GetData: any;
  getmobile: any;
  getaadhaar: any;
  getmail: any;
  @Input() public OTPGetValue: any;
  // @Input() public OTPGetValue;
  // public OTPSendValue;

  get f() {
    return this.otpVerifyForm.controls;
  }

  constructor(
    private route: ActivatedRoute,private globalmessage: GlobalMessage,
    private router: Router,private commonService: CommonService,
    private formBuilder: UntypedFormBuilder,
    private otpservice: OtpService,
    //  public fetchdata: ForgotpasswordComponent,
  ) {}

  ngOnInit(): void {

    // this.getmobile = this.route.snapshot.queryParamMap.get('mobile');
    // this.getaadhaar = this.route.snapshot.queryParamMap.get('aadhaar');

    this.otpVerifyForm = this.formBuilder.group({
      mobileno: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      otp: ['', Validators.required],
    });

    this.RegisterResponse()
  }

  RegisterResponse() {

    console.log('mobile',this.otpservice.mobileNo)

    // this.otpVerifyForm.patchValue(this.otpservice)

    this.otpVerifyForm.controls['mobileno'].setValue(this.otpservice.mobileNo);

    // this.otpVerifyForm.controls['mobileNo'].setValue(this.otpservice.Mobileno);

  }


  GetOTP() {
    this.submitted = true;
    let jsonin = {
      aadhaar: this.otpservice.Aadhaar,
      // "emailid": this.getmail,
      mobileno: parseInt(this.otpVerifyForm.controls['mobileno'].value),
    };

    let jsoninput = {
      Input: encryptUsingAES256(jsonin)
    };

    if (jsonin.aadhaar > 0) {
      this.commonService.Post_json_withouttoken(studentsforgotmobile,jsoninput).subscribe((response) => {
        // console.log(response);
        if (response.data.OTP != '') {
          this.otp = response.data.OTP;
        }
        // alert("OTP has been sent to registered Mobile Number!")
        this.globalmessage.Show_message('OTP has been sent to registered Mobile Number!');
      });
    } else {
      this.globalmessage.Show_error('Aadhaar Not Found!');
    }
  }

  ValidateOTP() {
    this.submitted = true;
    let jsonin = {
      finyear: this.CollegeCodeConst,
      collegecode: 1,
      aadhaar: this.otpservice.Aadhaar,
      otp: parseInt(this.otpVerifyForm.controls['otp'].value),
      mobilenumber: parseInt(this.otpVerifyForm.controls['mobileno'].value),
    };

    console.log('input',jsonin)
    if (this.otpVerifyForm.invalid) {
      return;
    } else {
      this.commonService.Post_json_withouttoken(Validatemobileotp,jsonin).subscribe((response) => {
        // console.log(response);
        if (response.data == true) {
          this.globalmessage.Show_message(
            'Otp Validated Successfully!...Please reset your password.'
          );
          this.router.navigate(['resetpassword'])
          // this.router.navigate(['resetpassword'], {
          //   queryParams: {
          //     mobile: this.data.mobilenumber,
          //     aadhaar: this.data.aadhaar,
          //   },
          //   skipLocationChange: true,
          // });
        } else {
          this.globalmessage.Show_error('Invalid OTP!');
        }
      });
    }
  }
}
