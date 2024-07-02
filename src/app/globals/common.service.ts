import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import {Observable, throwError} from "rxjs";
import {Atkt_studentbatch, Batchs, studentimage} from "./global-api";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {HTTP_form, HTTP_json} from "./global-variable";
@Injectable({
  providedIn: 'root'
})
export class CommonService {


  Batchs: any;

  constructor(private http: HttpClient,)
   { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + sessionStorage.getItem("Token"),
    })
  }
  getBatches(): Observable<any> {
    return this.http.post<any>(Batchs, '', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  Atkt_studentbatch(): Observable<any> {
    return this.http.post<any>(Atkt_studentbatch, '', this.httpOptions)
        .pipe(
            catchError(this.handleError)
        )
  }

  StudentImageHeader(jsonin: any): Observable<any> {
    return this.http.post<any>(studentimage, JSON.stringify(jsonin));
  }

  Post_json_withouttoken(apiname: string, jsonin: any): Observable<any> {
    return this.http
      .post<any>(apiname, jsonin, { headers: { 'Anonymous': 'no' } })
      .pipe(catchError(this.handleError));
  }

  Post_formdata_withouttoken(apiname: string, jsonin: any): Observable<any> {
    return this.http
      .post<any>(apiname, jsonin, { headers: { 'Anonymous': 'no' } })
      .pipe(catchError(this.handleError));
  }

  Post_json(apiname : string ,jsonin: any ) : Observable<any> {
    return this.http
        .post<any>(apiname, jsonin,{ headers: { 'Anonymous': 'mytoken' } })
        .pipe(catchError(this.handleError));
  }

  Post_formdata(apiname : string ,FormData: any ) : Observable<any> {
    return this.http
        .post<any>(apiname, FormData,{ headers: { 'Anonymous': 'mytoken' } })
        .pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error !== null) {
      Swal.fire({ title: 'Error!', text: error.error.exception, icon: 'error', confirmButtonText: 'OK' })//alert
    }
    else {
      Swal.fire({ title: 'Error!', text: error.status + "Server Error!", icon: 'error', confirmButtonText: 'OK' })//alert

    }
    return throwError(error);
  }
}
