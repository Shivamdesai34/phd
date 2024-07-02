import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  Paidbatchs_URL,
  Paidfinyear,
  StudentBatch,
  BatchSubjects,
  BillDeskcheckSum,
  CheckAdmission_URL,
  IU_receipt,
  StudentFeesInstallment,
  StudentProfileStatus_url,
  StudentReceiptDetails_URL,
  StudentApprovedCourses,
} from '../../../globals/global-api';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FeereceiptService implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + sessionStorage.getItem('Token'),
    }),
  };

  // HttpClient API post() method => Create employee
  CheckAdmission(data: any): Observable<any> {
    return this.http
      .post<any>(CheckAdmission_URL, JSON.stringify(data), this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  StudentApprovedCourses(data: any): Observable<any> {
    //debugger;
    return this.http
      .post<any>(StudentApprovedCourses, JSON.stringify(data), this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }
  Paidfinyear(data: any): Observable<any> {
    //debugger;
    return this.http
      .post<any>(Paidfinyear, JSON.stringify(data), this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }
  Paidbatchs(data: any): Observable<any> {
    //debugger;
    return this.http
      .post<any>(Paidbatchs_URL, JSON.stringify(data), this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  StudentProfileStatus(data: any): Observable<any> {
    //debugger;
    return this.http
      .post<any>(
        StudentProfileStatus_url,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  GetBatch(data: any): Observable<any> {
    return this.http
      .post<any>(StudentBatch, JSON.stringify(data), this.httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  StudentReceiptDetails(data: any): Observable<any> {
    return this.http
      .post<any>(
        StudentReceiptDetails_URL,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      Swal.fire({
        title: 'Error!',
        text: error.error.exception,
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    } else {
      Swal.fire({
        title: 'Error!',
        text: error.status + 'Server Error!',
        icon: 'error',
        confirmButtonText: 'OK',
      }); //alert
    }
    return throwError(error);
  }
}
