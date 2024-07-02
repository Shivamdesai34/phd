import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {
  AdmissionCancel_Request,
  Bankmasters,
  Cancelledadmission,
  CheckAdmission_URL,
  Paidbatchs_URL,
  StudentProfileStatus_url,
} from '../../../globals/global-api';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class CanceladmissionService {

    errorMessage: string = '';
    Exception: string = '';

    constructor(private http: HttpClient) {
    }

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Token ' + sessionStorage.getItem('Token'),
        }),
    };

    httpOptionsFormdata = {
        headers: new HttpHeaders({
            Authorization: 'Token ' + sessionStorage.getItem('Token'),
        }),
    };

    // HttpClient API post() method => Create employee

    //https://jasonwatmore.com/post/2022/11/08/angular-http-request-error-handling-with-the-httpclient
    Paidbatchs(jsonin: any): Observable<any> {
        //debugger;
        return this.http.post<any>(Paidbatchs_URL, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
                this.errorMessage = error.message;
                this.Exception = error.error.exception;
                return of();
            }));
    }

    Paidbatchs_old(jsonin: any): Observable<any> {
        //debugger;
        return this.http
            .post<any>(Paidbatchs_URL, JSON.stringify(jsonin), this.httpOptions)
            .pipe(retry(1), catchError(this.handleError));
    }

    Cancelledadmission(data: any): Observable<any> {
        //debugger;
        return this.http
            .post<any>(Cancelledadmission, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.handleError));
    }

    CancelAdmission(FormData: any): Observable<any> {

        return this.http
            .post<any>(AdmissionCancel_Request, FormData, this.httpOptionsFormdata)
            .pipe(retry(1), catchError(this.handleError));
    }


    // Error handling
    handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error !== null) {
            this.errorMessage = error.message;
            Swal.fire({
                title: 'Message!',
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

    //https://jasonwatmore.com/post/2022/11/08/angular-http-request-error-handling-with-the-httpclient

}
