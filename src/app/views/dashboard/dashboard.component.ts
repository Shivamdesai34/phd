import {Component, OnInit} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DeviceDetectorService, DeviceInfo} from 'ngx-device-detector';
import {GlobalService} from '../../globals/global.service';
import {CommanService} from '../../services/comman.service';
import {Fees_Receiptmaster, Profilesubmited} from '../../output/outputmodel';
import * as myGlobals from '../../globals/global-variable';
import {GlobalMessage} from "../../globals/global.message";
import {Sessiondata} from "../../models/request";
import {SessionService} from "../../globals/sessionstorage";
import {
  checkoutstanding,
  formfeesreceivedv1_url,Phdminbatch,
  IsProfileSubmited,
  StudentMyProfile_URL
} from "../../globals/global-api";
import {CommonService} from "../../globals/common.service";
import {encryptUsingAES256} from "../../globals/encryptdata";

export let browserRefresh = false;


@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    subscription!: Subscription;
    FinyearSession: number = 0;
    TokenSession: string = '';
    AadharSession: number = 0;
    BatchCodes: number = 0;
    StudentType: string = '';
    Formfeesbatchcode: number = 0;

    data: any;
    MyProfile: any;
    MyFullname: any;
    MyAadhaar: any;
    MyEmail: any;
    MyMobile: any;
    MyBatch: any;
    MyDOB: any;
    MyCountry: any;
    MyGender: any;
    MyMother_tongue: any;
    MyMarital_status: any;
    MyCreatedate: any;
    finyear: any;
    collegecode: any;
    result: any;
    ResourceBool: boolean = false;
    LastBatchCode: any;
    Nextbatchcode: any;
    res: any;
    Batch_code: any;

    BatchData: any = [];
    Editeddate: any;

    deviceInfo!: DeviceInfo;
    nReload: number = 0;

    studentminbatch!: Fees_Receiptmaster;
    profilesubmited!: Profilesubmited;

  oSession!: Sessiondata;

    constructor(
        private http: HttpClient,
        private platformLocation: PlatformLocation,
        private router: Router,private sessionservice: SessionService,
        private globalmessage: GlobalMessage,
        private deviceDetectorService: DeviceDetectorService,
        private globalService: GlobalService,
        private commanService: CommonService
    ) {
        /*
        this.subscription = router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {

            browserRefresh = !router.navigated;
            if (browserRefresh) {
              window.location.reload();
            }
          }
        });
        */
        //window.location.reload();
        this.AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
        this.FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
        this.BatchCodes = parseInt(sessionStorage.getItem('BatchCode')!);
        this.StudentType = sessionStorage.getItem('StudentType')!;

    }

    ngOnInit() {

      this.oSession = new Sessiondata(this.sessionservice);
      this.oSession.Getdatafromstroage();




        this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
        let DeviceRefershvalue = sessionStorage.getItem(this.deviceInfo.deviceType);
        if (DeviceRefershvalue == '-1') {
            sessionStorage.setItem(this.deviceInfo.deviceType, '1');
            window.location.reload();
        }
        this.MyStudentProfile();
        this.Phdminbatch();
        this.formfeesreceived();
      if(this.Formfeesbatchcode == 0){
        this.router.navigate(['/students/formfees']);
      }
        this.CheckOutstanding();
    }

    openYesNoDialog(msg: any) {
        this.globalmessage.Show_message('Delete')
    }

    CheckOutstanding(): any {
        let jsonin = {
            finyear: myGlobals.Global_LastFinYear,
            college_code: myGlobals.Golbal_CollegeCode,
            aadhaar: this.AadharSession,
            batch_code: -99,
            studenttype: this.StudentType,
            currentfinyear: myGlobals.Global_CurrentFinYear,
        };



        this.commanService
            .Post_json(checkoutstanding,jsonin)
            .subscribe((response) => {
                this.res = response;

                if (this.res.data.Outstanding == true) {
                    this.finyear = this.res.data.Finyear;
                    this.Batch_code = this.res.data.Lastyearbatchcode;

                    sessionStorage.setItem('BatchCode', this.Batch_code);
                    sessionStorage.setItem('Finyear', this.finyear);
                    Swal.fire({
                        title: 'Message!',
                        text: 'Please pay your last year pending fees!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    this.router.navigate(['/students/fees']);
                }
                if (this.res.data.Outstanding == false) {
                    this.finyear = this.res.data.Finyear;
                    this.Batch_code = this.res.data.Batch_code;
                    sessionStorage.setItem('BatchCode', this.Batch_code);
                    sessionStorage.setItem('Finyear', this.finyear);
                }
            });
    }

    // ProfileResources() {
    //     // debugger;
    //     this.commanService.Po().subscribe((response) => {
    //         if (response.data != null) {
    //             this.ResourceBool = true;
    //         } else {
    //             Swal.fire({
    //                 title: 'Error!',
    //                 text: 'Network Error , Please Refresh!',
    //                 icon: 'error',
    //                 confirmButtonText: 'OK',
    //             });
    //
    //         }
    //     });
    // }

    // StudentProfileStatus() {
    //     let jsonin = {
    //         Finyear: myGlobals.Global_CurrentFinYear,
    //         Collegecode: myGlobals.Golbal_CollegeCode,
    //         Aadhaar: this.AadharSession,
    //         studenttype: this.StudentType,
    //         webportname: myGlobals.Global_Webportname,
    //     };
    //         this.commanService
    //             .StudentProfileStatus(jsonin)
    //             .subscribe((response) => {
    //                 this.Batch_code = response.data.Profile.Batch_code;
    //                 if (response.data.Profile.Aadhaar == 0) {
    //                     Swal.fire({
    //                         title: 'Error!',
    //                         text: 'Pending Personal Details',
    //                         icon: 'error',
    //                         confirmButtonText: 'OK',
    //                     });
    //                     this.router.navigate(['/students/fillprofile']);
    //                 } else if (response.data.Education == false) {
    //                     Swal.fire({
    //                         title: 'Error!',
    //                         text: 'Pending Education Details',
    //                         icon: 'error',
    //                         confirmButtonText: 'OK',
    //                     });
    //                     this.router.navigate(['/students/fillprofile']);
    //                 } else if (response.data.Reservation.Aadhaar == 0) {
    //                     Swal.fire({
    //                         title: 'Error!',
    //                         text: 'Pending Reservation Details',
    //                         icon: 'error',
    //                         confirmButtonText: 'OK',
    //                     });
    //                     this.router.navigate(['/students/fillprofile']);
    //                 }
    //             });
    // }

    formfeesreceived() {

        let jsonin = {
            Finyear: myGlobals.Global_CurrentFinYear,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
        };



        this.commanService.Post_json(formfeesreceivedv1_url,jsonin).subscribe((response) => {
            if (response != null) {
                this.Formfeesbatchcode = response.data.Batch_code;

                console.log('ffff',this.Formfeesbatchcode)

                if (this.Formfeesbatchcode <= 0) {
                  console.log('lkolkllk')
                    this.router.navigate(['fillprofile'], {queryParams: {page: 'FORM'}});
                } else {
                    //this.isProfileSubmited();
                }
            }

        });
    }

    isProfileSubmited() {


        if (this.studentminbatch == null) {
            return;
        }
        let jsonin = {
            Finyear: myGlobals.Global_LastFinYear,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
            // BatchCode: this.studentminbatch.Batch_code,//this.Formfeesbatchcode,
             BatchCode: this.Formfeesbatchcode
        };



        this.commanService
            .Post_json(IsProfileSubmited,jsonin)
            .subscribe((response) => {
                if (response != null) {
                    this.profilesubmited = response.data;
                    if (this.profilesubmited.Profilesubmited == true) {
                        sessionStorage.setItem('BatchCode', this.studentminbatch.Batch_code.toString());
                    } else {
                        this.router.navigate(['fillprofile'], {
                            queryParams: {
                                page: 'PROFILE',
                                batch: this.Formfeesbatchcode
                            }
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Message!',
                        text: response,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }); //alert
                }
            });
    }

    Phdminbatch() {
        let jsonin = {
            Finyear: myGlobals.Global_LastFinYear,
            Collegecode: myGlobals.Golbal_CollegeCode,
            Aadhaar: this.AadharSession,
        };


        this.commanService.Post_json(Phdminbatch,jsonin).subscribe((response) => {
            if (response != null) {
                this.studentminbatch = response.data;

                this.isProfileSubmited();
            }
        });
    }

    MyStudentProfile() {

        let jsonin = {
            Collegecode: myGlobals.Golbal_CollegeCode,
            Finyear: this.FinyearSession,
            Aadhaar: this.AadharSession,
        };


        this.commanService.Post_json(StudentMyProfile_URL,jsonin).subscribe((response) => {
            if (response != null) {
                if (response.data.Admissionbatchs != null) {
                    this.BatchData = response.data.Admissionbatchs;
                }

                this.MyProfile = response.data;
                this.MyFullname = this.MyProfile.FullName;
                this.MyAadhaar = this.MyProfile.Aadhaar;
                this.MyMobile = this.MyProfile.ParentsMobile;
                this.MyBatch = this.MyProfile.Batch_Name;
                this.LastBatchCode = this.MyProfile.Batch_code;
                this.Nextbatchcode = this.MyProfile.Nextbatchcode;
                this.MyDOB = this.MyProfile.DOB;
                this.MyCountry = this.MyProfile.Country;
                this.MyGender = this.MyProfile.Gender;
                this.MyMother_tongue = this.MyProfile.MotherTongue;
                this.MyMarital_status = this.MyProfile.Marital_Status;
                this.MyCreatedate = this.MyProfile.Createddate;
                this.Editeddate = this.MyProfile.Editeddate;
            }
        });


    }
}
