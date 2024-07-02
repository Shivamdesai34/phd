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
import Swal from 'sweetalert2';
import {
  StudentApprovedCourses,
  studentactivefinyear,
  StudentBatch,
  BatchSubjects,
  BillDeskcheckSum,
  CheckAdmission_URL,
  CheckSubjectGroupQuota,
  IU_receipt,
  StudentFeesInstallment,
  StudentProfileStatus_url,
  InstallmentValidation,
  StudentSubjectGroup,
  BillDeskcheckSumQuery,
  checkoutstanding,
  FormFeesPaid_URL,
} from '../../../globals/global-api';

@Injectable({
  providedIn: 'root',
})
export class FeesService  {
  constructor(private http: HttpClient) {}

  // HttpClient API post() method => Create employee

  // Error handling

}
