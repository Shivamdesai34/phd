import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { studentsforgotmobile, Validatemobileotp } from '../../../globals/global-api';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class OtpPasswordService implements HttpInterceptor {


  Mobileno : number = 0 ;
  Aadhaar : number = 0 ;

  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => this.handleError(error))
    );
  }

  otpResponse: any;
  data: any;

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  studentsforgotmobile(data: any): Observable<any> {
    //debugger;
    return this.http.post<any>(studentsforgotmobile, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  Validatemobileotp(data: any): Observable<any> {
    //debugger;
    return this.http.post<any>(Validatemobileotp, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )

  }

  // Error handling
  // Error handling
  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      Swal.fire({ title: 'Message!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
    }
    else {
      Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert

    }
    return throwError(error);
  }

  setValue(value: any) {
    this.otpResponse = value;
    this.valuefromService(this.otpResponse);
  }

  valuefromService(otpValue: any) {
    this.data = otpValue;
  }

}
