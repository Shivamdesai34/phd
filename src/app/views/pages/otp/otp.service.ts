import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  mobileNo: number = 0;
  Aadhaar: number = 0;

  constructor() {
  }

  otpResponse: any;
  data: any;

  setValue(value: any) {
    this.otpResponse = value;
    this.valuefromService(this.otpResponse);
  }

  valuefromService(otpValue: any) {
    this.data = otpValue;
  }


}
