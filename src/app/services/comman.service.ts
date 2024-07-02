import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
    BatchSubjects,
    BillDeskcheckSum,
    BillDeskcheckSumQuery,
    CheckAdmission_URL,
    checkoutstanding,
    CheckSubjectGroupQuota,
    EducationDocuments_URL,single_educationdetails,
    FormFeesPaid_URL,
    formfeesreceivedv1_url,
    GetEducationDetails,
    GetOTP,
    GetOTP_v1_url,
    Getselectedbatchs_url,
    InstallmentValidation,
    IsProfileSubmited,
    IU_Admission,
    IU_receipt,
    IU_Reservations,
    IU_StudentEducation,
    IU_StudentProfile,
    Nextbatch,
    Pg_batchs_URL,
    Phdminbatch,
    PortalOpenv1,
    ProfileResources,
    ProfileSubmited,
    studentactivefinyear,
    StudentApprovedCourses,
    StudentBatch,
    StudentFeesInstallment,
    StudentMyProfile_URL,
    StudentProfileStatus_url,
    StudentRegistration_URL,
    StudentSubjectGroup,
    UploadDocuments,
    ValidatePortalmessage_URL,
} from '../globals/global-api';


@Injectable({
    providedIn: 'root'
})
//https://angular.io/guide/http
export class CommanService {

    constructor(private http: HttpClient) {
    }

    ValidateRegistration(data: any): Observable<any> {
        return this.http.post<any>(StudentRegistration_URL, JSON.stringify(data));
    }

    Validate_Portalmessage(data: any): Observable<any> {
        return this.http.post<any>(ValidatePortalmessage_URL, JSON.stringify(data));
    }

    Get_singlebatch(data: any): Observable<any> {
        return this.http.post<any>(Getselectedbatchs_url, JSON.stringify(data));
    }

    StreamBatchService(data: any): Observable<any> {
        return this.http.post<any>(Pg_batchs_URL, JSON.stringify(data));
    }

    GetOTP(data: any): Observable<any> {
        return this.http.post<any>(GetOTP, JSON.stringify(data));
    }

    GetOTP_v1(data: any): Observable<any> {
        return this.http
            .post<any>(GetOTP_v1_url, JSON.stringify(data));
    }

    checkoutstanding(data: any): Observable<any> {
        return this.http
            .post<any>(checkoutstanding, JSON.stringify(data));
    }

    Nextbatch(data: any): Observable<any> {
        return this.http
            .post<any>(Nextbatch, JSON.stringify(data));
    }

    // HttpClient API post() method => Create employee
    GetStudentProfile(jsonin: any): Observable<any> {
        return this.http
            .post<any>(StudentMyProfile_URL, JSON.stringify(jsonin));
    }

    studentactivefinyear(): Observable<any> {
        return this.http
            .post<any>(studentactivefinyear, '');
    }

    Get_ProfileSubmited(data: any): Observable<any> {
        return this.http
            .post<any>(IsProfileSubmited, JSON.stringify(data));
    }

    BillDeskTransactionPay(billdeskmsg: any): Observable<any> {
        return this.http
            .post<any>(BillDeskcheckSum, JSON.stringify(billdeskmsg));
    }

    IsProfileSubmited(jsonin: any): Observable<any> {
        return this.http.post<any>(IsProfileSubmited, JSON.stringify(jsonin));
    }

    BillDeskcheckSumQuery(billdeskquerymsg: any): Observable<any> {
        return this.http
            .post<any>(
                BillDeskcheckSumQuery,
                JSON.stringify(billdeskquerymsg),
            );
    }

    Phdminbatch(data: any): Observable<any> {
        return this.http
            .post<any>(Phdminbatch, JSON.stringify(data));
    }

    CheckAdmission(data: any): Observable<any> {
        return this.http
            .post<any>(CheckAdmission_URL, JSON.stringify(data));
    }

    formfeesreceived(data: any): Observable<any> {
        return this.http
            .post<any>(formfeesreceivedv1_url, JSON.stringify(data));
    }

    ProfileSubmited(data: any): Observable<any> {
        return this.http.post<any>(ProfileSubmited, JSON.stringify(data));
    }


    AdmissionPayment(data: any): Observable<any> {
        // debugger;
        return this.http
            .post<any>(IU_Admission, JSON.stringify(data));
    }

    ProfileResources(): Observable<any> {
        return this.http
            .post<any>(ProfileResources, '');
    }

    StudentBatch(data: any): Observable<any> {
        return this.http
            .post<any>(StudentBatch, JSON.stringify(data));
    }

    GetModalBatchSubjects(data: any): Observable<any> {
        return this.http
            .post<any>(StudentSubjectGroup, JSON.stringify(data));
    }

    CheckSubjectGroupQuota(data: any): Observable<any> {
        return this.http
            .post<any>(CheckSubjectGroupQuota, JSON.stringify(data));
    }

    StudentProfileStatus(data: any): Observable<any> {
        return this.http
            .post<any>(
                StudentProfileStatus_url,
                JSON.stringify(data)
            );
    }

    displayportalmessage(data: any): Observable<any> {
        return this.http
            .post<any>(
                ValidatePortalmessage_URL,
                JSON.stringify(data)
            );
    }

    // HttpClient API post() method => Create employee
    SavePersonalDetails(FormData: any): Observable<any> {
        return this.http
            .post<any>(IU_StudentProfile, FormData);
    }

    SaveEducationDetails(data: any): Observable<any> {
        //debugger;
        return this.http
            .post<any>(IU_StudentEducation, JSON.stringify(data));
    }

    EducationDocuments(data: any): Observable<any> {
        //debugger;
        return this.http
            .post<any>(EducationDocuments_URL, JSON.stringify(data));
    }

    StudentUploadDocuments(documentsformData: any): Observable<any> {
        return this.http
            .post<any>(UploadDocuments, documentsformData);
    }

    SaveReservationDetails(data: any): Observable<any> {
        return this.http
            .post<any>(IU_Reservations, JSON.stringify(data));
    }

    GetEducationDetails(data: any): Observable<any> {
        return this.http
            .post<any>(GetEducationDetails, JSON.stringify(data));
    }

  single_educationdetails(data: any): Observable<any> {
    return this.http
      .post<any>(single_educationdetails, JSON.stringify(data));
  }


    PortalOpenv1(data: any): Observable<any> {
        return this.http
            .post<any>(PortalOpenv1, JSON.stringify(data));
    }

    // HttpClient API post() method => Create employee

    InstallmentValidation(data: any): Observable<any> {
        return this.http
            .post<any>(InstallmentValidation, JSON.stringify(data));
    }

    FormFeesPaid(data: any): Observable<any> {
        return this.http
            .post<any>(FormFeesPaid_URL, JSON.stringify(data));
    }

    StudentApprovedCourses(data: any): Observable<any> {
        //debugger;
        return this.http
            .post<any>(StudentApprovedCourses, JSON.stringify(data));
    }

    GetBatch(data: any): Observable<any> {
        return this.http
            .post<any>(StudentBatch, JSON.stringify(data));
    }

    StudentSubjectGroup(data: any): Observable<any> {
        return this.http
            .post<any>(BatchSubjects, JSON.stringify(data));
    }

    StudentFeesInstallments(data: any): Observable<any> {
        return this.http
            .post<any>(StudentFeesInstallment, JSON.stringify(data));
    }


    ReceiptDetails(data: any) {
        return this.http
            .post<any>(IU_receipt, JSON.stringify(data));
    }


}
