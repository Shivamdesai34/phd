import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GlobalMessage} from '../../../globals/global.message';
import {catchError} from 'rxjs/operators';
import {
    studentuploadimage, updateemail, sendemail, studentpictureupload,
    sendotpemail, verifyemailotp, sendotpsms, verifymobileotp,
    sendotpemailv2,sendotpsmsv2,verifymobileotpv2,verifyemailotpv2
} from '../../../globals/global-api';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class UpdateprofileService {
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

    constructor(private http: HttpClient,
                private globalmessage: GlobalMessage) {
    }

    studentuploadimage(FormData: any): Observable<any> {
        return this.http
            .post<any>(studentuploadimage, FormData, this.httpOptionsFormdata)
            .pipe(catchError(this.handleError));
    }

    updateemail(jsonin: any): Observable<any> {
        return this.http
            .post<any>(updateemail, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    sendemail(jsonin: any): Observable<any> {
        return this.http
            .post<any>(sendemail, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    sendotpemail(jsonin: any): Observable<any> {
        return this.http
            .post<any>(sendotpemail, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    verifyemailotp(jsonin: any): Observable<any> {
        return this.http
            .post<any>(verifyemailotp, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    sendotpmobile(jsonin: any): Observable<any> {
        return this.http
            .post<any>(sendotpsms, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    verifymobileotp(jsonin: any): Observable<any> {
        return this.http
            .post<any>(verifymobileotp, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    studentpictureupload(FormData: any): Observable<any> {
        return this.http
            .post<any>(studentpictureupload, FormData, this.httpOptionsFormdata)
            .pipe(catchError(this.handleError));
    }

    sendotpemailv2(jsonin: any): Observable<any> {
        return this.http
            .post<any>(sendotpemailv2, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    sendotpmobilev2(jsonin: any): Observable<any> {
        return this.http
            .post<any>(sendotpsmsv2, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    verifymobileotpv2(jsonin: any): Observable<any> {
        return this.http
            .post<any>(verifymobileotpv2, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    verifyemailotpv2(jsonin: any): Observable<any> {
        return this.http
            .post<any>(verifyemailotpv2, JSON.stringify(jsonin), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse): Observable<any> {
        console.log('exception error :', error);
        if (error.error !== null) {
            console.log('exception error xxxx:', error.error);
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
        return throwError(() => {
            return error;
        });
    }

}
