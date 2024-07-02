import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Captch, Forgotpassword } from '../../../globals/global-api';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService implements HttpInterceptor {

  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API post() method => Create employee
  ForgotPassword(data: any): Observable<any> {

    return this.http.post<any>(Forgotpassword , JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  GetCaptcha(): Observable<any> {
    //debugger;
    return this.http.post<any>(Captch, '', this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )

  }


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
}
