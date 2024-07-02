import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpasswordService } from './forgotpassword.service';
import {GlobalMessage} from "../../../globals/global.message";
import {Captchimage, Forgotpassword} from "../../../globals/global-api";
import {CommonService} from "../../../globals/common.service";
import {OtpService} from "../otp/otp.service";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {

  ForgotPasswordForm!: FormGroup;
  submitted = false;
  data: any;
  otpAadhaar: any;
  otpMobile: any;
  otpEmail: any;

  OTPGetValue: any;

  server_captcha_image: any;
  server_captcha_image_id: any;
  res_forgotpassword: any;

  get f() { return this.ForgotPasswordForm.controls; }

  constructor(private router: Router, private formBuilder: FormBuilder,
              private commonService: CommonService,private otpService: OtpService,
              private forgotpasswordService: ForgotpasswordService,
              private globalmessage: GlobalMessage) {

  }

  ngOnInit(): void {
    this.GetCaptchaimage();
    this.ForgotPasswordForm = this.formBuilder.group({
      Aadhaar: ['', [Validators.required, Validators.minLength(12),
        Validators.maxLength(12)]],
      mobile: ['', Validators.required],
        confirmCaptcha: ['', Validators.required],
      // confirmCaptcha: ['', Validators.required],
      // Captcha: ['', Validators.required],
    },
      // {
      //   validator: this.MustMatch('Captcha', 'confirmCaptcha')
      // }
    );

  }

  Captcha: any;
  res: any;

  GetCaptchaImage() {
    this.commonService.Post_json_withouttoken(Captchimage, "").subscribe((response) => {
      if (response == null) {
        return;
      }
      this.server_captcha_image = response.image;
      this.server_captcha_image_id = response.id;

    });
  }

  GetCaptchaimage() {
    this.commonService.Post_json_withouttoken(Captchimage, "").subscribe((response: any) => {

      if (response == null) {
        return;
      }
      this.server_captcha_image = response.image;
      this.server_captcha_image_id = response.id;
      // this.res = response;
      // this.Captcha = this.res.data;
      // this.ForgotPasswordForm.controls['Captcha'].setValue(this.server_captcha_image);
    })
  }

  MustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  onResendPassword() {
    this.submitted = true;

    let jsonin = {
      "aadhaar": parseInt(this.ForgotPasswordForm.controls['Aadhaar'].value),
      "mobileno": parseInt(this.ForgotPasswordForm.controls['mobile'].value)
      // "servername":ServerURL
    }
    this.OTPGetValue = jsonin.mobileno
    console.log(jsonin);
    if (this.ForgotPasswordForm.invalid) {
      return;
    }
    else {
      this.commonService.Post_json_withouttoken(Forgotpassword,jsonin).subscribe(response => {
        // console.log(response);

        this.res_forgotpassword = response.data

        if (this.res_forgotpassword == true) {

          // this.passvalues();
          this.otpService.mobileNo = parseInt(this.ForgotPasswordForm.controls['mobile'].value)
          this.otpService.Aadhaar = parseInt(this.ForgotPasswordForm.controls['Aadhaar'].value)

            console.log('setmobile',this.otpService.mobileNo)

          this.globalmessage.Show_message("OTP has been sent to Mobile no to reset your password!")
          this.router.navigate(['validateotp'])
          // this.router.navigate(['validateotp'],
          //   { queryParams: { mobile: this.data.mobileno,
          //     'aadhaar': this.data.aadhaar }, skipLocationChange: true });
        }

      },error => {
          this.GetCaptchaimage();
          this.globalmessage.Show_error(this.res_forgotpassword.error.exception)
      })
    }
  }

  onReset() {

    this.submitted = false;
    this.ForgotPasswordForm.reset();

  }

  passvalues() {

    this.otpAadhaar = this.ForgotPasswordForm.controls['Aadhaar'].value
    this.otpMobile = this.ForgotPasswordForm.controls['mobile'].value
    this.otpEmail = this.ForgotPasswordForm.controls['email'].value

  }

}
