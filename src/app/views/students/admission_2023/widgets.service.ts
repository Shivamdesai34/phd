// import {Injectable} from '@angular/core';
// import {HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';
// import {Observable, throwError} from 'rxjs';
// import {catchError} from 'rxjs/operators';
// import {
//   Admissionstatus,
//   BillDeskcheckSum,
//   BillDeskcheckSumQuery,
//   CheckAdmission_URL,
//   checkoutstanding,
//   CheckSubjectGroupQuota,
//   EducationDocuments_URL,
//   Feesattached,
//   FormFeesPaid_URL,
//   GetEducationDetails,
//   IU_Admission,
//   IU_Reservations,
//   IU_StudentEducation,
//   IU_StudentProfile,
//   Nextbatchsubjects,
//   ProfileResources,
//   StudentBatch,
//   Studentmaxbatch,
//   StudentProfileStatus_url,
//   StudentSubjectGroup,
//   UploadDocuments,
//   validateadmissionstarted,
//   validateeliglibity,Phdminbatch,
// } from '../../globals/global-api';
// import Swal from 'sweetalert2';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class WidgetService {
//   constructor(private http: HttpClient) {}
//
//
//   // Http Options
//   httpOptionsToken = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: 'Token ' + sessionStorage.getItem('Token'),
//     }),
//   };
//
//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: 'Token ' + sessionStorage.getItem('Token'),
//     }),
//   };
//   httpOptionsFormdata = {
//     headers: new HttpHeaders({
//       Authorization: 'Token ' + sessionStorage.getItem('Token'),
//     }),
//   };
//
//   FormFeesPaid(formfees): Observable<any> {
//     //debugger;
//     return this.http
//       .post<any>(FormFeesPaid_URL, JSON.stringify(formfees), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   checkoutstanding(data): Observable<any> {
//     return this.http
//       .post<any>(checkoutstanding, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   validateadmissionstarted(data): Observable<any> {
//     return this.http
//       .post<any>(
//         validateadmissionstarted,
//         JSON.stringify(data),
//         this.httpOptions
//       )
//       .pipe(catchError(this.handleError));
//   }
//
//   BillDeskTransactionPay(billdeskmsg): Observable<any> {
//     return this.http
//       .post<any>(
//         BillDeskcheckSum,
//         JSON.stringify(billdeskmsg),
//         this.httpOptions
//       )
//       .pipe(catchError(this.handleError));
//   }
//
//   BillDeskcheckSumQuery(billdeskquerymsg): Observable<any> {
//     return this.http
//       .post<any>(
//         BillDeskcheckSumQuery,
//         JSON.stringify(billdeskquerymsg),
//         this.httpOptions
//       )
//       .pipe(catchError(this.handleError));
//   }
//
//   CheckAdmission(data): Observable<any> {
//     return this.http
//       .post<any>(CheckAdmission_URL, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   AdmissionPayment(data): Observable<any> {
//     // debugger;
//     return this.http
//       .post<any>(IU_Admission, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   ProfileResources(): Observable<any> {
//     return this.http
//       .post<any>(ProfileResources, '', this.httpOptionsToken)
//       .pipe(catchError(this.handleError));
//   }
//
//   StudentBatch(data): Observable<any> {
//     return this.http
//       .post<any>(StudentBatch, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   Studentmaxbatch(data): Observable<any> {
//     return this.http
//       .post<any>(Studentmaxbatch, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   Phdminbatch(data): Observable<any> {
//     return this.http
//         .post<any>(Phdminbatch, JSON.stringify(data), this.httpOptions)
//         .pipe(catchError(this.handleError));
//   }
//
//   Nextbatchsubjects(data): Observable<any> {
//     return this.http
//       .post<any>(Nextbatchsubjects, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   validateeliglibity(data): Observable<any> {
//     return this.http
//       .post<any>(validateeliglibity, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   GetModalBatchSubjects(data): Observable<any> {
//     return this.http
//       .post<any>(StudentSubjectGroup, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   CheckSubjectGroupQuota(data): Observable<any> {
//     // debugger;
//     return this.http
//       .post<any>(CheckSubjectGroupQuota, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   StudentProfileStatus(data): Observable<any> {
//     //debugger;
//     return this.http
//       .post<any>(
//         StudentProfileStatus_url,
//         JSON.stringify(data),
//         this.httpOptions
//       )
//       .pipe(catchError(this.handleError));
//   }
//
//   // HttpClient API post() method => Create employee
//   SavePersonalDetails(FormData): Observable<any> {
//     return this.http
//       .post<any>(IU_StudentProfile, FormData, this.httpOptionsFormdata)
//       .pipe(catchError(this.handleError));
//   }
//
//   SaveEducationDetails(data): Observable<any> {
//     //debugger;
//     return this.http
//       .post<any>(IU_StudentEducation, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   EducationDocuments(data): Observable<any> {
//     //debugger;
//     return this.http
//       .post<any>(EducationDocuments_URL, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   StudentUploadDocuments(documentsformData): Observable<any> {
//     //debugger;
//     return this.http
//       .post<any>(UploadDocuments, documentsformData, this.httpOptionsFormdata)
//       .pipe(catchError(this.handleError));
//   }
//
//   SaveReservationDetails(data): Observable<any> {
//     //debugger;
//     return this.http
//       .post<any>(IU_Reservations, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   GetEducationDetails(data): Observable<any> {
//     //debugger;
//     return this.http
//       .post<any>(GetEducationDetails, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   Feesattached(data): Observable<any> {
//     //debugger;
//     return this.http
//       .post<any>(Feesattached, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   Admissionstatus(data): Observable<any> {
//     //debugger;
//     return this.http
//       .post<any>(Admissionstatus, JSON.stringify(data), this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
//
//   // Error handling
//   handleError(error: HttpErrorResponse): Observable<any> {
//     if (error.error !== null) {
//       Swal.fire({
//         title: 'Message!',
//         text: error.error.exception,
//         icon: 'error',
//         confirmButtonText: 'OK',
//       }); //alert
//     } else {
//       Swal.fire({
//         title: 'Error!',
//         text: error.status + 'Server Error!',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       }); //alert
//     }
//     return throwError(error);
//   }
// }
