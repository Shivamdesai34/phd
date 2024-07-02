import * as myGlobals from '../../../globals/global-variable';
import {Component, EventEmitter, OnInit, Output, Renderer2, ViewChild,} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {PlatformLocation} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {BilldeskPay} from './../../../../assets/javascript/billdesk';
import {Serverlink, ServerURL} from '../../../globals/global-api';
import {CommanService} from '../../../services/comman.service';

import {Fees_Receiptmaster} from '../../../output/outputmodel';
import {GlobalMessage} from "../../../globals/global.message";
import {encryptUsingAES256} from "../../../globals/encryptdata";

@Component({
  selector: 'app-fillprofile',
  templateUrl: './fillprofile.component.html',
  styleUrls: ['./fillprofile.component.scss'],
})
export class FillprofileComponent implements OnInit {
  TokenSession: string;
  AadharSession: number;
  FinyearSession: number;
  StudentType: string;

  Pagename!: string;
  FormFessBatchcode: number = 0;

  invoice: any;
  ReceiptID: any;
  ReceiptNo: any;

  PersonalBadge = false;
  ReservationBadge = false;
  EducationBadge = false;
  SubjectGroupCode: any;

  changeStateReservation = false;
  changeStatePersonal = false;
  QuotaStatus: any;
  BatchObject: any;
  DocumentTypeValue: any;
  optionValue: any = 'none';
  documentType = '';
  EducationTab = true;

  personalDetailsForm!: UntypedFormGroup;
  documentUploadForm!: UntypedFormGroup;
  EducationDetailsForm!: UntypedFormGroup;
  reservationDetailsForm!: UntypedFormGroup;
  DocumentTypeForm!: UntypedFormGroup;
  modalForm!: UntypedFormGroup;

  submitted = false;
  SSCSubmit = false;
  reservationSubmit = false;
  modalSubmit = false;
  documentSubmit = false;

  ProfileData: any;
  ReservationData: any;
  res: any;
  data: any;

  //GetSelect Values
  category: any;
  country: any;
  district: any;
  mother_tongue: any;
  reservation: any;
  occupation: any;
  specially_abled: any;
  activity: any;
  annual_income: any;
  participation_level: any;
  gender: any;
  bloodgroup: any;
  college!: number;
  marks: any;
  boards: any;
  location_area: any;
  martial_status: any;
  nominee_relation: any;
  relation: any;
  religion: any;
  state: any;
  batch_name: any;
  finyear: any;
  collegecode: any;

  //Images Upload and Fill Profile
  adhaar_img!: Array<File>;
  signature_img!: Array<File>;
  profile_img!: Array<File>;

  formData = new FormData();
  secured_rank: any;
  date: any;
  percentage: any;
  selectresponse: any;
  imageError: any;
  cardImageBase64: any;
  cardImageBase66: any;
  cardImageBase68: any;

  isImageSaved: boolean = false;
  isImageSaved2: boolean = false;
  isImageSaved3: boolean = false;

  public imagePath: any;
  photo: any;
  sign: any;
  public message!: string;

  //Get Education Details
  selectBoard: any;
  EState: any;
  schoolCollegeName: any;
  dateOfPassing: any;
  rollno: any;
  marksheetNo: any;
  gradeMarks = 'Marks';
  marksObtained: any;
  board: any;

  Education: any;
  UploadDocuments: any;

  //Modal
  modalBatch: any;
  batchSubjects: any;
  batchcode: any;
  SubjectGroups: any;
  selectedObject: any;
  SubjectGroupID: any;
  formAmount: any;

  //Autofill Address
  perFlatNo: any = '';
  corFlatNo: any = '';
  corArea: any = '';
  perArea: any = '';
  corVillageName: any = '';
  perVillageName: any = '';
  corLandmark: any = '';
  perLandmark: any = '';
  corLocation: any = '';

  perLocation: any = '';
  corCountry: any = '';
  perCountry: any = '';
  corState: any = '';
  perState: any = '';
  corDistrict: any = '';
  perDistrict: any = '';
  corTaluka: any = '';
  perTaluka: any = '';
  corCity: any = '';
  perCity: any = '';
  corPincode: any = '';
  perPincode: any = '';
  BatchCode: any;
  outOff: any;

  billdeskRequestMsg: any;
  DocumentTab = true;
  changeStateEducation = false;

  showprofileImg: any;
  showaadharImg: any;
  showsignImg: any;
  getBatchCode: any;
  ProfileAadhaar: any;
  ProfileEducation: any;
  ProfileReservation: any;

  res_Educationdetails: any
  Demoversion: boolean = false;

  public visible = false;

  studentminbatch!: Fees_Receiptmaster;
  formfeespaid!: Fees_Receiptmaster;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activeroute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private platformLocation: PlatformLocation,
    private renderer: Renderer2,
    private globalmessage: GlobalMessage,
    private commanService: CommanService
  ) {
    this.AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);
    this.FinyearSession = parseInt(sessionStorage.getItem('Finyear')!);
    this.StudentType = sessionStorage.getItem('StudentType')!;
    this.TokenSession = sessionStorage.getItem('Token')!;

    let xDomain = myGlobals.Domainname.toUpperCase();
    if (xDomain.search('LOCALHOST') != -1) {
      this.Demoversion = true;
    }
    if (xDomain.search('DEMO') != -1) {
      this.Demoversion = true;
    }

  }


  @ViewChild('content') content: any;
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  ngOnInit(): void {
    // this.checkAdmission();

    this.activeroute.queryParams
      .subscribe(params => {
        this.Pagename = params['page'];
        this.FormFessBatchcode = parseInt(params['batch']);

        console.log('lkjjj', this.Pagename)
      });

    // @ts-ignore
    if (this.Pagename != 'FORM' && this.Pagename != 'PROFILE') {
      this.router.navigate(['login']);
    }
    //this.Pagename = this.activeroute.snapshot.paramMap.get('page');
    console.log('pagename : ', this.Pagename);


    // https://services.billdesk.com/checkout-widget/src/app.bundle.js
    // https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js
    this.renderExternalScript(
      'https://pgi.billdesk.com/payments-checkout-widget/src/app.bundle.js'
    ).onload = () => {
    };
    this.Createform();
    this.load_jsonfile();
    this.Phdminbatch_approved();
    this.formfeesreceived();
  }

  Createform() {
    this.personalDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      fatherFirstName: ['', Validators.required],
      motherFirstName: ['', Validators.required],
      relationType: ['', Validators.required],
      nameLC: ['', Validators.required],
      nameChange: [''],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      birthPlace: [''],
      religion: [''],
      motherTongue: [''],
      martialStatus: [''],

      guradianMobilenumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      guradianEmailId: [''],
      occupation: ['', Validators.required],
      annualIncome: [''],
      ebc: [''],

      // corFlatNo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*'), Validators.maxLength(60)]],
      corFlatNo: ['', Validators.required],
      corArea: ['', [Validators.required, Validators.maxLength(60)]],
      corVillageName: ['', Validators.maxLength(60)],
      corLandmark: ['', Validators.maxLength(60)],
      corLocation: ['', Validators.required],
      corCountry: ['', Validators.required],
      corState: ['', Validators.required],
      corDistrict: ['', Validators.required],
      corTaluka: ['', [Validators.required, Validators.maxLength(60)]],
      corCity: ['', [Validators.required, Validators.maxLength(60)]],
      corPincode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      isPermanentAddress: [''],

      // perFlatNo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*'), Validators.maxLength(60)]],
      perFlatNo: ['', Validators.required],
      perArea: ['', [Validators.required, Validators.maxLength(60)]],
      perVillageName: ['', Validators.maxLength(60)],
      perLandmark: ['', Validators.maxLength(60)],
      perLocation: ['', Validators.required],
      perCountry: ['', Validators.required],
      perState: ['', Validators.required],
      perDistrict: ['', Validators.required],
      perTaluka: ['', [Validators.required, Validators.maxLength(60)]],
      perCity: ['', [Validators.required, Validators.maxLength(60)]],
      perPincode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],

      country: [''],
      domicile: ['', Validators.required],

      nomineeName: [''],
      nomineeDob: [''],
      nomineeRelation: [''],

      // Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{10,10}$/)
      panNo: [''],
      voterId: [''],
      educationGap: ['', Validators.required],
      bloodGrp: [''],
      maxQualification: [''],
      organDonation: [''],
    });

    this.DocumentTypeForm = this.formBuilder.group({
      documentType: ['', Validators.required],
    });
    // this.DocumentTypeForm.controls.documentType.setValue('none');

    this.EducationDetailsForm = this.formBuilder.group({
      selectBoard: ['', Validators.required],
      state: ['', Validators.required],
      board: ['', Validators.required],
      schoolCollegeName: [''],
      dateOfPassing: ['', Validators.required],
      rollno: ['', Validators.required],
      marksheetNo: ['', Validators.required],
      gradeMarks: [''],
      marksObtained: ['', Validators.required],
      outOff: ['', Validators.required],
      percentage: [''],
    });

    this.reservationDetailsForm = this.formBuilder.group({
      reservation: [''],
      category: ['', Validators.required],
      subCategory: [''],
      specialAbled: [''],
      percentage: [''],
      udid: [''],
      activity: [''],
      activityName: [''],
      participationLevel: [''],
      securedRank: [''],
    });

    this.modalForm = this.formBuilder.group({
      // grnNo: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      batch: ['', Validators.required],
      batchSubjects: ['', Validators.required],
    });

  }

  get f() {
    return this.modalForm.controls;
  }

  get f1() {
    return this.personalDetailsForm.controls;
  }

  // get f3() { return this.photoSignForm.controls; }
  get f4() {
    return this.documentUploadForm.controls;
  }

  get f5() {
    return this.EducationDetailsForm.controls;
  }

  get f6() {
    return this.reservationDetailsForm.controls;
  }

  formfeesreceived() {
    let jsonin = {
      Finyear: myGlobals.Global_CurrentFinYear,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
    };


    // console.log(this.data)
    this.commanService
      .formfeesreceived(jsonin)
      .subscribe((response) => {
        if (response != null) {
          this.formfeespaid = response.data;

          this.GetEducationDocuments();

          console.log('fees paid', response);
          if (this.formfeespaid.Receipt_ID <= 0) {
            this.Admission_formpayment();
          } else {

            this.StudentProfileStatus();
          }
        }
      });
  }

  Phdminbatch_approved() {
    this.data = {
      Finyear: myGlobals.Global_LastFinYear,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
    };
    this.commanService.Phdminbatch(this.data).subscribe((response) => {
      if (response != null) {
        this.studentminbatch = response.data;

        this.GetEducationDocuments();
        //this.isProfileSubmited() ;
      } else {
        this.Form_startpoint();
      }
    });
  }

  checkAdmission() {
    // debugger;
    this.data = {
      Finyear: this.FinyearSession,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
    };
    // console.log(this.data)
    this.commanService.CheckAdmission(this.data).subscribe((response) => {
      // console.log(response.data.Batch_code)
      // debugger;
      // console.log(response)
      this.getBatchCode = response.data.batch_code;
      if (response.data.formfeespaid <= 0) {
        this.Admission_formpayment();
      } else {
        this.StudentProfileStatus();
        this.GetEducationDocuments();
      }
    });
  }



  Admission_formpayment() {
    this.visible = !this.visible;
    this.modalSelectBatch();
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  closeModal() {
    this.router.navigate(['']);
  }

  StudentProfileStatus() {
    let minbatch: number = 0;

    if (this.formfeespaid != null) {
      if (this.formfeespaid.Finyear > 0) {
        minbatch = this.formfeespaid.Finyear;
      }
    }

    if (minbatch <= 0) {
      minbatch = myGlobals.Global_CurrentFinYear;
    }
    let jsonin = {
      Finyear: minbatch,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
      studenttype: this.StudentType,
      webportname: myGlobals.Global_Webportname,
    };
    // console.log(this.data)
    this.commanService
      .StudentProfileStatus(jsonin)
      .subscribe((response) => {
        if (response != null) {

          this.ProfileAadhaar = response.data.Profile.Aadhaar;
          this.ProfileEducation = response.data.Education;
          this.ProfileReservation = response.data.Reservation.Aadhaar;
          if (response.data.Profile.Aadhaar != 0) {
            this.ProfileData = response.data.Profile;

            this.personalDetailsForm.controls['firstName'].setValue(
              this.ProfileData.FirstName
            );
            this.personalDetailsForm.controls['lastName'].setValue(
              this.ProfileData.LastName
            );
            this.personalDetailsForm.controls['fatherFirstName'].setValue(
              this.ProfileData.FatherName
            );
            this.personalDetailsForm.controls['motherFirstName'].setValue(
              this.ProfileData.MotherName
            );
            this.personalDetailsForm.controls['relationType'].setValue(
              this.ProfileData.RelationType
            );
            this.personalDetailsForm.controls['nameLC'].setValue(
              this.ProfileData.Applicant_Name_On_Marksheet
            );
            this.personalDetailsForm.controls['nameChange'].setValue(
              this.ProfileData.Name_Change_after_passing
            );
            this.personalDetailsForm.controls['gender'].setValue(
              this.ProfileData.Gender
            );
            this.personalDetailsForm.controls['dob'].setValue(this.ProfileData.DOB);
            this.personalDetailsForm.controls['birthPlace'].setValue(
              this.ProfileData.PlaceOfBirth
            );
            this.personalDetailsForm.controls['religion'].setValue(
              this.ProfileData.Religion
            );
            this.personalDetailsForm.controls['motherTongue'].setValue(
              this.ProfileData.MotherTongue
            );
            this.personalDetailsForm.controls['martialStatus'].setValue(
              this.ProfileData.Marital_Status
            );

            this.personalDetailsForm.controls['guradianMobilenumber'].setValue(
              this.ProfileData.ParentsMobile
            );
            this.personalDetailsForm.controls['guradianEmailId'].setValue(
              this.ProfileData.ParentsEmailID
            );
            this.personalDetailsForm.controls['occupation'].setValue(
              this.ProfileData.Occupation_Guardian
            );
            this.personalDetailsForm.controls['annualIncome'].setValue(
              this.ProfileData.Annual_Income
            );
            this.personalDetailsForm.controls['ebc'].setValue(this.ProfileData.EBC);

            this.personalDetailsForm.controls['corFlatNo'].setValue(
              this.ProfileData.Correpondence_FlatNo
            );
            this.personalDetailsForm.controls['corArea'].setValue(
              this.ProfileData.Correpondence_ColonyName
            );
            this.personalDetailsForm.controls['corVillageName'].setValue(
              this.ProfileData.Correpondence_VillageName
            );
            this.personalDetailsForm.controls['corLandmark'].setValue(
              this.ProfileData.Correpondence_Landmark
            );
            this.personalDetailsForm.controls['corLocation'].setValue(
              this.ProfileData.Correpondence_Location_Area
            );
            this.personalDetailsForm.controls['corCountry'].setValue(
              this.ProfileData.Correpondence_Country
            );
            this.personalDetailsForm.controls['corState'].setValue(
              this.ProfileData.Correpondence_State
            );
            this.personalDetailsForm.controls['corDistrict'].setValue(
              this.ProfileData.Correpondence_District
            );
            this.personalDetailsForm.controls['corTaluka'].setValue(
              this.ProfileData.Correpondence_Taluka
            );
            this.personalDetailsForm.controls['corCity'].setValue(
              this.ProfileData.Correpondence_City
            );
            this.personalDetailsForm.controls['corPincode'].setValue(
              this.ProfileData.Correpondence_Pincode
            );
            // Prakash 21 may 2023
            // Prakash 21 may 2023
            this.personalDetailsForm.controls['isPermanentAddress'].setValue(this.ProfileData.Same_As_Permenant);
            if (this.ProfileData.Same_As_Permenant == 'YES') {
              this.personalDetailsForm.controls['perFlatNo'].setValue(this.ProfileData.Permanent_FlatNo);
              this.personalDetailsForm.controls['perArea'].setValue(this.ProfileData.Permanent_ColonyName);
              this.personalDetailsForm.controls['perVillageName'].setValue(this.ProfileData.Permanent_VillageName);
              this.personalDetailsForm.controls['perLandmark'].setValue(this.ProfileData.Permanent_Landmark);
              this.personalDetailsForm.controls['perLocation'].setValue(this.ProfileData.Permanent_Location_Area);
              this.personalDetailsForm.controls['perCountry'].setValue(this.ProfileData.Permanent_Country);
              this.personalDetailsForm.controls['perState'].setValue(this.ProfileData.Permanent_State);
              this.personalDetailsForm.controls['perDistrict'].setValue(this.ProfileData.Permanent_District);
              this.personalDetailsForm.controls['perTaluka'].setValue(this.ProfileData.Permanent_Taluka);
              this.personalDetailsForm.controls['perCity'].setValue(this.ProfileData.Permanent_City);
              this.personalDetailsForm.controls['perPincode'].setValue(this.ProfileData.Permanent_Pincode);
            }
            ///
            ///
            this.personalDetailsForm.controls['country'].setValue(
              this.ProfileData.Country
            );
            this.personalDetailsForm.controls['domicile'].setValue(
              this.ProfileData.State
            );

            this.personalDetailsForm.controls['nomineeName'].setValue(
              this.ProfileData.NomineeName
            );
            this.personalDetailsForm.controls['nomineeDob'].setValue(
              this.ProfileData.NomineeDOB
            );
            this.personalDetailsForm.controls['nomineeRelation'].setValue(
              this.ProfileData.NomineeRelation
            );

            this.personalDetailsForm.controls['panNo'].setValue(
              this.ProfileData.PAN
            );
            this.personalDetailsForm.controls['voterId'].setValue(
              this.ProfileData.VoterID
            );
            this.personalDetailsForm.controls['educationGap'].setValue(
              this.ProfileData.EducationGap
            );
            this.personalDetailsForm.controls['bloodGrp'].setValue(
              this.ProfileData.BloodGroup
            );
            this.personalDetailsForm.controls['maxQualification'].setValue(
              this.ProfileData.MaxQualification_Family
            );
            this.personalDetailsForm.controls['organDonation'].setValue(
              this.ProfileData.Organ_Donation
            );

            this.showprofileImg =
              Serverlink + '/' + this.ProfileData.PhotoFileName;
            this.showaadharImg =
              Serverlink + '/' + this.ProfileData.AadhaarFilename;
            this.showsignImg =
              Serverlink + '/' + this.ProfileData.SignatureFileName;

            this.personalDetailsForm.disable();
            this.PersonalBadge = true;
            this.changeStatePersonal = true;
          } else {
            //this.openYesNoDialog('Pending Personal Details');
            Swal.fire({
              title: 'Message!',
              text: 'Pending Personal Details',
              icon: 'info',
              confirmButtonText: 'OK',
            });

            this.PersonalBadge = false;
          }
          if (response.data.Education == true) {
            this.Update_EducationDetails('');
            this.EducationBadge = true;
          } else {
            //this.openYesNoDialog('Pending Education Details');
            Swal.fire({
              title: 'Message!',
              text: 'Pending Education Details',
              icon: 'info',
              confirmButtonText: 'OK',
            });
            this.EducationBadge = false;
          }
          if (response.data.Reservation.Aadhaar != 0) {
            // alert("Complete Reservation Details")
            this.ReservationData = response.data.Reservation;

            this.reservationDetailsForm.controls['reservation'].setValue(
              this.ReservationData.Parallel_Reservation
            );
            this.reservationDetailsForm.controls['category'].setValue(
              this.ReservationData.Category
            );
            this.reservationDetailsForm.controls['subCategory'].setValue(
              this.ReservationData.SubCategory
            );
            this.reservationDetailsForm.controls['specialAbled'].setValue(
              this.ReservationData.Specially_Abled
            );
            this.reservationDetailsForm.controls['percentage'].setValue(
              this.ReservationData.Percentage
            );
            this.reservationDetailsForm.controls['udid'].setValue(
              this.ReservationData.UDID_No
            );
            this.reservationDetailsForm.controls['activity'].setValue(
              this.ReservationData.Activity
            );
            this.reservationDetailsForm.controls['activityName'].setValue(
              this.ReservationData.ActivityName
            );
            this.reservationDetailsForm.controls['participationLevel'].setValue(
              this.ReservationData.ParticipationLevels
            );
            this.reservationDetailsForm.controls['securedRank'].setValue(
              this.ReservationData.SecuredRank
            );

            this.reservationDetailsForm.disable();
            this.ReservationBadge = true;
            this.changeStateReservation = true;
          } else {
            //this.openYesNoDialog('Pending Reservation Details!');
            Swal.fire({
              title: 'Message!',
              text: 'Pending Reservation Details!',
              icon: 'info',
              confirmButtonText: 'OK',
            });
            this.ReservationBadge = false;
          }
          if (response.data.ProfileCount > 1) {
            this.DocumentTab = true;
            this.EducationDetailsForm.disable();
            this.changeStateEducation = true;
          } else {

          }
        }
      });
  }

  OnFinal() {
    this.StudentProfileStatus();
    this.data = {
      Finyear: myGlobals.Global_CurrentFinYear,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
      BatchCode: this.FormFessBatchcode,
    };

    if (
      this.ProfileAadhaar != 0 &&
      this.ProfileEducation != false &&
      this.ProfileReservation != 0
    ) {
      this.commanService
        .ProfileSubmited(this.data)
        .subscribe((response) => {
          if (response.data == true) {
            this.globalmessage.Show_message('Complete Profile Saved Successfully!');
            this.personalDetailsForm.disable();
            this.EducationDetailsForm.disable();
            this.reservationDetailsForm.disable();
            this.DocumentTypeForm.disable();
            this.changeStateReservation = true;
            this.changeStateEducation = true;
            this.changeStatePersonal = true;

            this.router.navigate(['/dashboard']);
          }
        });
    } else {
      // this.changeStateFinalSubmit = true;
      this.globalmessage.Show_message(
        'Profile Not Submitted! Please Complete Your Personal/Reservation/Education Details!'
      );
    }
    // console.log(this.data)
    // debugger;
  }

  GetEducationDocuments() {

    if (this.Education != null) {
      console.log('Education : ', this.Education);
      return;
    }

    if (this.formfeespaid == null) {
      return;
    }
    let jsonin = {
      Finyear: myGlobals.Global_CurrentFinYear,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Batchcode: this.FormFessBatchcode,
      Aadhaar: this.AadharSession,
    };
    console.log('kkkk', jsonin)
    this.commanService
      .EducationDocuments(jsonin)
      .subscribe((response) => {
        if (response != null) {
          this.Education = response.data.Education;
          if (this.Education == null) {
            this.EducationTab == false;
          }
          this.UploadDocuments = response.data.UploadDocuments;
        }
      });
  }

  modalSelectBatch() {

    let jsonin = {
      Finyear: myGlobals.Global_CurrentFinYear,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
      Webportal: 'PHD'

    };
    this.commanService.StudentBatch(jsonin).subscribe((response) => {
      this.modalBatch = response.data;
    });
  }

  modalSelectBatchSubjects() {


    let jsonin = {
      collegecode: myGlobals.Golbal_CollegeCode,
      finyear: myGlobals.Global_CurrentFinYear,
      Batchcode: this.BatchCode,
      aadhaar: this.AadharSession,
    };
    console.log('subject ', jsonin);

    this.commanService
      .GetModalBatchSubjects(jsonin)
      .subscribe((response) => {
        if (response != null) {
          this.batchSubjects = response.data;
        }
      });
  }

  DsplayPortalMessage() {
    let jsonin = {
      finyear: this.FinyearSession,
      collegecode: myGlobals.Golbal_CollegeCode,
      // "website_id": this.WebsiteId,
      sitename: ServerURL,
      batch_code: this.BatchCode,
      studenttype: this.StudentType,
      // atkt 1 outside 2
    };
    this.commanService
      .displayportalmessage(jsonin)
      .subscribe((response: {}) => {
        this.res = response;
        console.log(this.res);
        if (this.res.data.Startwebsite == 0) {
          this.router.navigate(['/']);
          Swal.fire({
            title: 'Message!',
            text: this.res.data.Remarks,
            icon: 'success',
            confirmButtonText: 'OK',
          }); //alert
        }
        if (this.res.data.Startwebsite == 1) {
          this.modalPayment();
          // this.router.navigate(['/register']);
        }
      });
  }

  onGroupSelected(event: any) {
    this.SubjectGroups = event.Subject_group_name;
    this.SubjectGroupID = event.Subject_group_id;
    this.SubjectGroupCode = event.Subject_group_code;
    this.CheckSubjectGroupQuota();
  }

  CheckSubjectGroupQuota() {
    let jsonin = {
      collegecode: myGlobals.Golbal_CollegeCode,
      finyear: this.FinyearSession,
      batchcode: this.BatchCode,
      subjectgroupid: this.SubjectGroupID,
      subject_group_code: this.SubjectGroupCode,
      quota_status: 'XXXX',
    };
    // console.log(this.data)
    // debugger;
    this.commanService
      .CheckSubjectGroupQuota(jsonin)
      .subscribe((response) => {
        // console.log(response)
        if (response.data != null) {
          this.QuotaStatus = response.data[0].Quota_status;
          // console.log(this.QuotaStatus)
          if (this.QuotaStatus != 'OPEN') {
            Swal.fire({
              title: 'Message!',
              text: 'Quota Closed! Select Different Group Code.',
              icon: 'info',
              confirmButtonText: 'OK',
            }); //alert

            //this.openYesNoDialog('Quota Closed! Select Different Group Code.');
            //this.openYesNoDialog('Quota Closed! Select Different Group Code.');
            this.modalForm.controls['batchSubjects'].setValue('');
            this.SubjectGroups = '';
          }
        }
      });
  }

  modalPayment() {
    this.modalSubmit = true;
    let jsonin = {
      finyear: this.FinyearSession,
      college_code: myGlobals.Golbal_CollegeCode,
      aadhaar: this.AadharSession,
      batch_code: parseInt(this.BatchCode),
      subject_group_id: parseInt(this.SubjectGroupID),
      subject_group_code: this.SubjectGroupCode,
      term_code: myGlobals.Global_FORMFEESTERMNAME,
    };
    this.commanService
      .AdmissionPayment(jsonin)
      .subscribe((response) => {
        if (response != null) {
          this.ReceiptID = response.data.ReceiptID;
          this.ReceiptNo = response.data.ReceiptNo;
          if (this.ReceiptID > 0) {
            this.RegistrationPayment();
          }
        }
      });
  }

  RegistrationPayment() {

    let nTranscationamount: string = '';
    console.log('version ', this.Demoversion);
    if (this.Demoversion) {
      nTranscationamount = '1';
      this.formAmount = '1';
    } else {
      nTranscationamount = String(this.formAmount);
    }

    let billdeskmsg = {
      collegecode: myGlobals.Golbal_CollegeCode,
      finyear: this.FinyearSession,
      batchcode: this.BatchCode,
      aadhaar: this.AadharSession,
      termcode: myGlobals.Global_FORMFEESTERMNAME,
      MerchantID: '',
      CustomerID: String(this.ReceiptNo),
      Filler1: 'NA',
      TxnAmount: nTranscationamount,
      //TxnAmount: String(this.formAmount),
      // "TxnAmount": "1",
      BankID: 'NA',
      Filler2: 'NA',
      Filler3: 'NA',
      CurrencyType: 'INR',
      ItemCode: 'NA',
      TypeField1: 'R',
      SecurityID: '',
      Filler4: 'NA',
      Filler5: 'NA',
      TypeField2: 'F',
      AdditionalInfo1: String(this.FinyearSession),
      AdditionalInfo2: '',
      AdditionalInfo3: String(this.BatchCode),
      AdditionalInfo4: String(this.AadharSession),
      AdditionalInfo5: '9999',
      AdditionalInfo6: '1',
      AdditionalInfo7: String(this.ReceiptID),
      TypeField3: 'NA',
      Feestype: 'FORMFEES',
    };

    this.commanService
      .BillDeskTransactionPay(billdeskmsg)
      .subscribe((response) => {
        // console.log(response)
        // debugger;
        this.billdeskRequestMsg = response.data;
        // console.log(this.billdeskRequestMsg)
        if (this.billdeskRequestMsg != null) {
          BilldeskPay(this.billdeskRequestMsg, "", "");
        }
      });
  }

  Update_EducationDetails(documnettype: string) {

    let jsonin = {
      Finyear: this.FinyearSession,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
      Document_Type: documnettype,
    };
    this.commanService
      .GetEducationDetails(jsonin)
      .subscribe((response) => {

        if (response.data != null) {
          this.res_Educationdetails = response;
          this.res_Educationdetails = response.data;

          //Shivam

          this.DocumentTypeForm.controls['documentType'].setValue(
            response.data[0].Document_Type
          );

          this.EducationDetailsForm.controls['selectBoard'].setValue(
            response.data[0].Board
          );
          this.EducationDetailsForm.controls['state'].setValue(
            response.data[0].State
          );
          this.EducationDetailsForm.controls['board'].setValue(
            response.data[0].Education_board
          );
          this.EducationDetailsForm.controls['schoolCollegeName'].setValue(
            response.data[0].College_name
          );
          this.EducationDetailsForm.controls['dateOfPassing'].setValue(
            response.data[0].Datepass
          );
          this.EducationDetailsForm.controls['rollno'].setValue(
            response.data[0].RollNo
          );

          this.EducationDetailsForm.controls['marksheetNo'].setValue(
            response.data[0].MarksheetNo
          );
          this.EducationDetailsForm.controls['gradeMarks'].setValue(
            response.data[0].GradesOrMarks
          );

          this.EducationDetailsForm.controls['marksObtained'].setValue(
            response.data[0].MarksObtained
          );
          this.EducationDetailsForm.controls['outOff'].setValue(
            response.data[0].OutOff
          );
          this.EducationDetailsForm.controls['percentage'].setValue(
            response.data[0].Percentage
          );

          // if(this.res_Educationdetails.Document_Type){
          //
          // }


          this.EducationDetailsForm.disable();
          this.changeStateEducation = true;
        }
      });
  }

  updateAddress(event: any) {
    console.log('check update address:', event);
    if (event == 'Yes') {
      this.perFlatNo = this.corFlatNo;
      this.perArea = this.corArea;
      this.perVillageName = this.corVillageName;
      this.perLandmark = this.corLandmark;
      this.perLocation = this.corLocation;
      this.perCountry = this.corCountry;
      this.perState = this.corState;
      this.perDistrict = this.corDistrict;
      this.perTaluka = this.corTaluka;
      this.perCity = this.corCity;
      this.perPincode = this.corPincode;
    } else {
      this.perFlatNo = '';
      this.perArea = '';
      this.perVillageName = '';
      this.perLandmark = '';
      this.perLocation = '';
      this.perCountry = '';
      this.perState = '';
      this.perDistrict = '';
      this.perTaluka = '';
      this.perCity = '';
      this.perPincode = '';
    }
  }

  load_jsonfile() {
    this.commanService.ProfileResources().subscribe((response) => {
      if (response != null) {

        this.selectresponse = response;
        this.category = this.selectresponse.data.category;
        this.country = this.selectresponse.data.country;
        this.district = this.selectresponse.data.district;
        this.mother_tongue = this.selectresponse.data.mother_tongue;
        this.occupation = this.selectresponse.data.occupation_guardian;
        this.reservation = this.selectresponse.data.parallel_horizontal_reservation;
        this.specially_abled = this.selectresponse.data.specially_abled;
        this.activity = this.selectresponse.data.activity;
        this.annual_income = this.selectresponse.data.annual_income;
        this.participation_level = this.selectresponse.data.participation_level;
        this.gender = this.selectresponse.data.sex;
        this.bloodgroup = this.selectresponse.data.BloodGroup;
        this.college = this.selectresponse.data.College_University;
        this.marks = this.selectresponse.data.Grade_Marks;
        this.board = this.selectresponse.data.College_University;
        this.location_area = this.selectresponse.data.Location_Area;
        this.martial_status = this.selectresponse.data.Marital_Status;
        this.nominee_relation = this.selectresponse.data.Nominee_Relation;
        this.relation = this.selectresponse.data.Relation_Type;
        this.religion = this.selectresponse.data.Religion;
        this.state = this.selectresponse.data.State;
        this.secured_rank = this.selectresponse.data.secured_rank;
        this.finyear = this.selectresponse.data.Finyear;
        this.collegecode = this.selectresponse.data.College_code;

      }
    });

  }

  Form_startpoint() {
    this.commanService.ProfileResources().subscribe((response) => {
      if (response != null) {

        this.selectresponse = response;
        this.category = this.selectresponse.data.category;
        this.country = this.selectresponse.data.country;
        this.district = this.selectresponse.data.district;
        this.mother_tongue = this.selectresponse.data.mother_tongue;
        this.occupation = this.selectresponse.data.occupation_guardian;
        this.reservation = this.selectresponse.data.parallel_horizontal_reservation;
        this.specially_abled = this.selectresponse.data.specially_abled;
        this.activity = this.selectresponse.data.activity;
        this.annual_income = this.selectresponse.data.annual_income;
        this.participation_level = this.selectresponse.data.participation_level;
        this.gender = this.selectresponse.data.sex;
        this.bloodgroup = this.selectresponse.data.BloodGroup;
        this.college = this.selectresponse.data.College_University;
        this.marks = this.selectresponse.data.Grade_Marks;
        this.board = this.selectresponse.data.List_of_Boards;
        this.location_area = this.selectresponse.data.Location_Area;
        this.martial_status = this.selectresponse.data.Marital_Status;
        this.nominee_relation = this.selectresponse.data.Nominee_Relation;
        this.relation = this.selectresponse.data.Relation_Type;
        this.religion = this.selectresponse.data.Religion;
        this.state = this.selectresponse.data.State;
        this.secured_rank = this.selectresponse.data.secured_rank;
        this.finyear = this.selectresponse.data.Finyear;
        this.collegecode = this.selectresponse.data.College_code;

        if (this.FinyearSession != null) {
          if (this.Pagename == 'FORM') {
            this.Admission_formpayment();
          } else {
            this.GetEducationDocuments();
            this.StudentProfileStatus();
          }
          //this.commanService();
          //this.modalSelectBatch();
          //this.updateEducationDetails();
        } else {
          window.location.reload();
        }
      }
    });
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg') {
      return true;
    } else {
      return false;
    }
  }

  savePersonalDetails() {

    console.log('nvmvm', this.personalDetailsForm.controls['perPincode'].value)
    this.submitted = true;

    if (!this.profile_img || !this.adhaar_img || !this.signature_img) {
      // console.log('Selected file format is not supported');
      //this.openYesNoDialog('Select Profile/Aadhaar/Sign Images');

      Swal.fire({
        title: 'Message!',
        text: 'Select Profile/Aadhaar/Sign Images',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // alert("Select Profile/Aadhaar/Sign Images")
      // return false;
    } else {
      if (this.personalDetailsForm.invalid) {
        return;
      } else {
        this.formData.append('signature_img', this.signature_img[0]);
        this.formData.append('profile_img', this.profile_img[0]);
        this.formData.append('aadhaar_img', this.adhaar_img[0]);

        this.formData.append('Finyear', sessionStorage.getItem('Finyear')!);
        this.formData.append('College_code', '1');
        this.formData.append('Aadhaar', sessionStorage.getItem('Aadhaar')!);
        // this.formData.append("Aadhaar", this.getBatchCode);
        this.formData.append(
          'FirstName',
          this.personalDetailsForm.controls['firstName'].value
        );
        this.formData.append(
          'LastName',
          this.personalDetailsForm.controls['lastName'].value
        );
        this.formData.append(
          'FatherName',
          this.personalDetailsForm.controls['fatherFirstName'].value
        );
        this.formData.append(
          'MotherName',
          this.personalDetailsForm.controls['motherFirstName'].value
        );
        this.formData.append(
          'RelationType',
          this.personalDetailsForm.controls['relationType'].value
        );
        this.formData.append(
          'Gender',
          this.personalDetailsForm.controls['gender'].value
        );
        this.formData.append(
          'DOB',
          this.personalDetailsForm.controls['dob'].value
        );
        this.formData.append(
          'PlaceOfBirth',
          this.personalDetailsForm.controls['birthPlace'].value
        );
        this.formData.append(
          'Religion',
          this.personalDetailsForm.controls['religion'].value
        );
        this.formData.append(
          'MotherTongue',
          this.personalDetailsForm.controls['motherTongue'].value
        );
        this.formData.append(
          'Marital_Status',
          this.personalDetailsForm.controls['martialStatus'].value
        );
        this.formData.append(
          'Applicant_Name_On_Marksheet',
          this.personalDetailsForm.controls['nameLC'].value
        );
        this.formData.append(
          'Name_Change_after_passing',
          this.personalDetailsForm.controls['nameChange'].value
        );
        this.formData.append(
          'ParentsEmailID',
          this.personalDetailsForm.controls['guradianEmailId'].value
        );
        this.formData.append(
          'ParentsMobile',
          this.personalDetailsForm.controls['guradianMobilenumber'].value
        );

        this.formData.append(
          'Occupation_Guardian',
          this.personalDetailsForm.controls['occupation'].value
        );
        this.formData.append(
          'Annual_Income',
          this.personalDetailsForm.controls['annualIncome'].value
        );
        this.formData.append(
          'EBC',
          this.personalDetailsForm.controls['ebc'].value
        );

        this.formData.append(
          'Correpondence_FlatNo',
          this.personalDetailsForm.controls['corFlatNo'].value
        );
        this.formData.append(
          'Correpondence_ColonyName',
          this.personalDetailsForm.controls['corArea'].value
        );
        this.formData.append(
          'Correpondence_VillageName',
          this.personalDetailsForm.controls['corVillageName'].value
        );
        this.formData.append(
          'Correpondence_Landmark',
          this.personalDetailsForm.controls['corLandmark'].value
        );
        this.formData.append(
          'Correpondence_Location_Area',
          this.personalDetailsForm.controls['corLocation'].value
        );
        this.formData.append(
          'Correpondence_Country',
          this.personalDetailsForm.controls['corCountry'].value
        );
        this.formData.append(
          'Correpondence_State',
          this.personalDetailsForm.controls['corState'].value
        );
        this.formData.append(
          'Correpondence_District',
          this.personalDetailsForm.controls['corDistrict'].value
        );
        this.formData.append(
          'Correpondence_Taluka',
          this.personalDetailsForm.controls['corTaluka'].value
        );
        this.formData.append(
          'Correpondence_City',
          this.personalDetailsForm.controls['corCity'].value
        );
        this.formData.append(
          'Correpondence_Pincode',
          this.personalDetailsForm.controls['corPincode'].value
        );
        this.formData.append(
          'Same_As_Permenant',
          this.personalDetailsForm.controls['isPermanentAddress'].value
        );
        this.formData.append(
          'Permanent_FlatNo',
          this.personalDetailsForm.controls['perFlatNo'].value
        );
        this.formData.append(
          'Permanent_ColonyName',
          this.personalDetailsForm.controls['perArea'].value
        );
        this.formData.append(
          'Permanent_VillageName',
          this.personalDetailsForm.controls['perVillageName'].value
        );
        this.formData.append(
          'Permanent_Landmark',
          this.personalDetailsForm.controls['perLandmark'].value
        );
        this.formData.append(
          'Permanent_Location_Area',
          this.personalDetailsForm.controls['perLocation'].value
        );
        this.formData.append(
          'Permanent_Country',
          this.personalDetailsForm.controls['perCountry'].value
        );
        this.formData.append(
          'Permanent_State',
          this.personalDetailsForm.controls['perState'].value
        );
        this.formData.append(
          'Permanent_District',
          this.personalDetailsForm.controls['perDistrict'].value
        );
        this.formData.append(
          'Permanent_Taluka',
          this.personalDetailsForm.controls['perTaluka'].value
        );
        this.formData.append(
          'Permanent_City',
          this.personalDetailsForm.controls['perCity'].value
        );
        this.formData.append(
          'Permanent_Pincode',
          this.personalDetailsForm.controls['perPincode'].value
        );
        this.formData.append(
          'Country',
          this.personalDetailsForm.controls['country'].value
        );
        this.formData.append(
          'State',
          this.personalDetailsForm.controls['domicile'].value
        );
        this.formData.append(
          'NomineeName',
          this.personalDetailsForm.controls['nomineeName'].value
        );
        this.formData.append(
          'NomineeDOB',
          this.personalDetailsForm.controls['nomineeDob'].value
        );
        this.formData.append(
          'NomineeRelation',
          this.personalDetailsForm.controls['nomineeRelation'].value
        );
        this.formData.append(
          'PAN',
          this.personalDetailsForm.controls['panNo'].value
        );
        this.formData.append(
          'VoterID',
          this.personalDetailsForm.controls['voterId'].value
        );
        this.formData.append(
          'EducationGap',
          this.personalDetailsForm.controls['educationGap'].value
        );
        this.formData.append(
          'MaxQualification_Family',
          this.personalDetailsForm.controls['maxQualification'].value
        );
        this.formData.append(
          'BloodGroup',
          this.personalDetailsForm.controls['bloodGrp'].value
        );
        this.formData.append(
          'Organ_Donation',
          this.personalDetailsForm.controls['organDonation'].value
        );

        console.log('formr', this.formData)

        this.commanService
          .SavePersonalDetails(this.formData)
          .subscribe((response) => {
            if (response != null) {
              //console.log(response);
              if (response.data == true) {
                //this.openYesNoDialog('Personal Details Saved!');
                Swal.fire({
                  title: 'Message!',
                  text: 'Personal Details Saved!',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                this.personalDetailsForm.disable();
                this.PersonalBadge = true;
                this.StudentProfileStatus();
                // alert("Personal Details Saved!")
                // this.personalDetailsForm.reset();
              } else {
                Swal.fire({
                  title: 'Message!',
                  text: response.message,
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                //this.openYesNoDialog(response.message);
                this.personalDetailsForm.reset();
                // alert("Error!")
              }
            }
          });
      }
    }

    // console.log(this.formData);

    // this.onReset();
  }

  PercentageCalculater() {
    let obtainedmarks;
    let outoff;
    let percentage;
    let value;
    obtainedmarks = parseInt(
      this.EducationDetailsForm.controls['marksObtained'].value
    );
    outoff = parseInt(this.EducationDetailsForm.controls['outOff'].value);

    if (obtainedmarks < 100) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Obtain marks should be > than 100',
        confirmButtonText: 'Ok'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //console.log('yyyyy');
        } else if (result.isDenied) {
          //Swal.fire('Changes are not saved', '', 'info')
        }
      });
    }
    if (obtainedmarks > outoff) {
      Swal.fire({
        title: 'Error!',
        text: 'Obtain marks should be < than out off marks',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      this.EducationDetailsForm.controls['obtainedmarks'].setValue('0');
      this.EducationDetailsForm.controls['outOff'].setValue('0');
      this.EducationDetailsForm.controls['percentage'].setValue('0');
      return;
    }
    percentage = (obtainedmarks / outoff) * 100;
    this.EducationDetailsForm.controls['percentage'].setValue(
      percentage.toFixed(2)
    );
  }

  getDocumentType(element: any) {
    this.DocumentTypeValue = element;

    this.single_educationdetails(this.DocumentTypeValue)

  }

  f_check_string(p_value: any) {
    if (
      p_value == undefined ||
      p_value === '' ||
      p_value === null ||
      p_value !== p_value
    ) {
      return '';
    } else {
      return p_value;
    }
  }

  f_check_number(p_value: any) {
    if (
      p_value == undefined ||
      p_value === '' ||
      p_value === null ||
      p_value !== p_value
    ) {
      return 0;
    } else {
      return Number(p_value);
    }
  }

  saveEducationDetails() {
    this.SSCSubmit = false;

    // debugger;

    if (
      this.f_check_string(this.EducationDetailsForm.controls['outOff'].value) ==
      ''
    ) {
      this.EducationDetailsForm.controls['outOff'].setValue(0);
    }

    if (
      this.f_check_string(
        this.EducationDetailsForm.controls['marksObtained'].value
      ) == ''
    ) {
      this.EducationDetailsForm.controls['marksObtained'].setValue(0);
    }

    if (
      this.f_check_string(
        this.EducationDetailsForm.controls['percentage'].value
      ) == ''
    ) {
      this.EducationDetailsForm.controls['percentage'].setValue(0);
    }

    let jsonin = {
      Finyear: this.FinyearSession,
      College_code: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
      // "BatchCode" : this.getBatchCode,
      Document_Type: this.DocumentTypeForm.controls['documentType'].value,
      Board: this.EducationDetailsForm.controls['selectBoard'].value,
      State: this.EducationDetailsForm.controls['state'].value,
      Education_Board: this.EducationDetailsForm.controls['board'].value,
      BatchStream: 'NONE',
      College_name: this.EducationDetailsForm.controls['schoolCollegeName']
        .value,
      DatePass:
        this.EducationDetailsForm.controls['dateOfPassing'].value + '-01',
      RollNo: this.EducationDetailsForm.controls['rollno'].value,
      MarksheetNo: this.EducationDetailsForm.controls['marksheetNo'].value,
      GradesOrMarks: this.EducationDetailsForm.controls['gradeMarks'].value,
      MarksObtained: parseInt(
        this.EducationDetailsForm.controls['marksObtained'].value
      ),
      OutOff: parseInt(this.EducationDetailsForm.controls['outOff'].value),
      Percentage: parseInt(
        this.EducationDetailsForm.controls['percentage'].value
      ),
      Inhouse: 'NO',
      Hindilinguistic: 'NO',

    };
    // console.log(this.data)
    if (this.EducationDetailsForm.invalid) {
      this.globalmessage.Show_error('Error in education form');
      return;
    }
    if (jsonin.Document_Type == '') {
      this.globalmessage.Show_message('Please Select Document Type');
      return;
      // alert("Please Select Document Type")
    }
    this.commanService
      .SaveEducationDetails(jsonin)
      .subscribe((response) => {
        if (response != null) {
          //console.log(response);
          if (response.data == true) {
            this.Update_EducationDetails('');
            this.globalmessage.Show_message('Education Details Saved!');
            this.EducationBadge = true;
            this.EducationDetailsForm.reset();

            this.SSCSubmit = true;
            // alert("Education Details Saved!")
            // this.SSCDetailsForm.reset();
          } else {
            this.globalmessage.Show_error('Data Not Saved! Please Try Again!');
            // this.EducationDetailsForm.reset();
            // alert("Error!")
          }
        }
      });
    this.SSCSubmit = false;
    // this.EducationDetailsForm.reset();
  }

  isProfileSubmited() {
    //debugger ;
    let minbatch: number = 0;
    if (this.studentminbatch.Finyear > 0) {
      minbatch = this.studentminbatch.Finyear;
    }

    if (minbatch <= 0) {
      minbatch = myGlobals.Global_CurrentFinYear;
    }
    let jsonin = {
      Finyear: minbatch,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
      BatchCode: -99,
    };
    this.commanService
      .IsProfileSubmited(jsonin)
      .subscribe((response) => {
        if (response != null) {
          if (response.data.Profilesubmited == true) {
            this.router.navigate(['/dashboard']);
          }
        }
      });
  }

  saveReservationDetails() {
    this.reservationSubmit = true;

    this.data = {
      Finyear: this.FinyearSession,
      College_code: 1,
      Aadhaar: this.AadharSession,
      // "BatchCode" : this.getBatchCode,
      Parallel_Reservation: this.reservationDetailsForm.controls['reservation']
        .value,
      Category: this.reservationDetailsForm.controls['category'].value,
      SubCategory: this.reservationDetailsForm.controls['subCategory'].value,
      Specially_Abled: this.reservationDetailsForm.controls['specialAbled']
        .value,
      Percentage: parseInt(
        this.reservationDetailsForm.controls['percentage'].value
      ),
      UDID_No: this.reservationDetailsForm.controls['udid'].value,
      Occupation_Guardian: '',
      Annual_Income: '',
      EBC: '',
      Activity: this.reservationDetailsForm.controls['activity'].value,
      ActivityName: this.reservationDetailsForm.controls['activityName'].value,
      ParticipationLevels: this.reservationDetailsForm.controls[
        'participationLevel'
        ].value,
      SecuredRank: this.reservationDetailsForm.controls['securedRank'].value,
    };
    //console.log(this.data)
    if (this.reservationDetailsForm.invalid) {
      return;
    } else {
      this.commanService
        .SaveReservationDetails(this.data)
        .subscribe((response) => {
          //console.log(response);
          if (response != null) {
            if (response.data == true) {
              this.globalmessage.Show_message('Reservation Details Saved!');
              this.reservationDetailsForm.disable();
              this.ReservationBadge = true;
              // alert("Reservation Details Saved!")
            } else {
              this.globalmessage.Show_error(response.message);
              this.reservationDetailsForm.reset();
              // alert("Error!")
            }
          }
        });
    }
  }

  getEducationDetails(Entity: any, id: any) {
    // console.log("iddddd : ",id);
    //console.log("Entity : ", Entity);
    this.EducationDetailsForm.enable()

    this.documentType = Entity.Document_Type;
    this.selectBoard = Entity.Board;
    this.EState = Entity.State;
    this.boards = Entity.Education_board;
    this.schoolCollegeName = Entity.College_name;
    this.dateOfPassing = Entity.Datepass;
    this.rollno = Entity.RollNo;
    this.marksheetNo = Entity.MarksheetNo;
    this.gradeMarks = Entity.GradesOrMarks;
    this.marksObtained = Entity.MarksObtained;
    this.outOff = Entity.OutOff;
    this.percentage = Entity.Percentage;
    this.EducationDetailsForm.controls['percentage'].setValue('')
    this.EducationDetailsForm.controls['marksObtained'].setValue('')
    this.EducationDetailsForm.controls['outOff'].setValue('')
  }

  DocumentUpload(Entity: any, Document_Code: any) {
    // console.log("Entity : ", Entity);
    // console.log("DocumentCode : ", Document_Code);

    let documentsformData = new FormData();
    let EnrollmentUpload: any;
    EnrollmentUpload = Entity.target.files;

    documentsformData.append('Finyear', sessionStorage.getItem('Finyear')!);
    documentsformData.append('College_code', '1');
    documentsformData.append('Aadhaar', sessionStorage.getItem('Aadhaar')!);
    documentsformData.append('Document_Code', Document_Code);
    documentsformData.append('Document_Img', EnrollmentUpload[0]);
    // console.log(EnrollmentUpload)

    if (
      EnrollmentUpload[0].type == 'application/pdf' &&
      EnrollmentUpload[0].size < 4400000
    ) {
      this.commanService
        .StudentUploadDocuments(documentsformData)
        .subscribe((response) => {
          //console.log(response);
          if (response != null) {
            if (response.data == true) {
              Swal.fire({
                title: 'Message!',
                text: 'Document Uploaded Successfully!',
                icon: 'info',
                confirmButtonText: 'OK',
              });
              //this.openYesNoDialog('Document Uploaded Successfully!');
              this.GetEducationDocuments();
            } else {
              //this.openYesNoDialog('File Not Uploaded!');
              Swal.fire({
                title: 'Message!',
                text: 'File Not Uploaded!',
                icon: 'info',
                confirmButtonText: 'OK',
              });
            }
          }

        });
    } else {
      Swal.fire({
        title: 'Message!',
        text: 'Check File Type and Size!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      //this.openYesNoDialog('Check File Type and Size!');
      // alert("Check File Type and Size!")
    }
  }

  onReset() {
    this.submitted = false;
    this.SSCSubmit = false;
    this.reservationSubmit = false;
    this.documentSubmit = false;
    this.DocumentTypeForm.reset();
    this.personalDetailsForm.reset();
    this.EducationDetailsForm.reset();
    this.reservationDetailsForm.reset();
    // this.documentUploadForm.reset();
  }

  // photo and sign upload starts

  // allowed_types = ['image/png', 'image/jpeg'];

  Aadhar_fileChange(element: any) {
    this.adhaar_img = element.target.files;
    if (
      this.adhaar_img[0].type == 'image/jpeg' ||
      this.adhaar_img[0].type == 'image/png'
    ) {
      if (this.adhaar_img[0].size < 2400000) {
        this.fileChangeEvent(element, 3);
      } else {
        //this.openYesNoDialog('File size should be less than 2MB');
        Swal.fire({
          title: 'Message!',
          text: 'File size should be less than 2MB',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } else {
      //this.openYesNoDialog('Only JPG/JPEG/PNG files allowed!');
      Swal.fire({
        title: 'Message!',
        text: 'Only JPG/JPEG/PNG files allowed!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  }

  Sign_fileChange(element: any) {
    this.signature_img = element.target.files;
    if (
      this.signature_img[0].type == 'image/jpeg' ||
      this.signature_img[0].type == 'image/png'
    ) {
      if (this.signature_img[0].size < 2400000) {
        this.fileChangeEvent(element, 2);
      } else {
        //this.openYesNoDialog('File size should be less than 2MB!');
        Swal.fire({
          title: 'Message!',
          text: 'File size should be less than 2MB',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } else {
      //this.openYesNoDialog('Only JPG/JPEG/PNG files allowed!');
      Swal.fire({
        title: 'Message!',
        text: 'Only JPG/JPEG/PNG files allowed!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  }

  Profile_fileChange(element: any) {
    this.profile_img = element.target.files;
    if (
      this.profile_img[0].type == 'image/jpeg' ||
      this.profile_img[0].type == 'image/png'
    ) {
      if (this.profile_img[0].size < 2400000) {
        this.fileChangeEvent(element, 1);
      } else {
        //this.openYesNoDialog('File size should be less than 2MB!');
        Swal.fire({
          title: 'Message!',
          text: 'File size should be less than 2MB',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } else {
      //this.openYesNoDialog('Only JPG/JPEG/PNG files allowed');
      Swal.fire({
        title: 'Message!',
        text: 'Only JPG/JPEG/PNG files allowed!',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
    // console.log(this.profile_img)
  }

  fileChangeEvent(fileInput: any, id: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      // const max_size = 20971520;
      // const allowed_types = ['image/png', 'image/jpeg'];
      // const max_height = 15200;
      // const max_width = 25600;

      // if (fileInput.target.files[0].size > max_size) {
      //   this.imageError =
      //     'Maximum size allowed is ' + max_size / 1000 + 'Mb';

      //   return false;
      // }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //   this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //   return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {

          if (id == 1) {
            this.cardImageBase64 = e.target.result;
            this.isImageSaved = true;
          } else if (id == 2) {
            this.cardImageBase66 = e.target.result;
            this.isImageSaved2 = true;
          } else if (id == 3) {
            this.cardImageBase68 = e.target.result;
            this.isImageSaved3 = true;
          }

          // this.previewImagePath = imgBase64Path;
          // }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage(id: any) {
    if (id == 1) {
      this.cardImageBase64 = null;
      this.isImageSaved = false;
    } else if (id == 2) {
      this.cardImageBase66 = null;
      this.isImageSaved2 = false;
    } else if (id == 3) {
      this.cardImageBase68 = null;
      this.isImageSaved3 = false;
    }
  }

  PortalOpen(event: any) {

    this.BatchCode = event.Batch_Code;
    this.formAmount = event.FormAmount;

    if (this.Demoversion) {
      this.formAmount = '1';
    }

    let jsonin = {
      finyear: this.FinyearSession,
      collegecode: myGlobals.Golbal_CollegeCode,
      batchcode: this.BatchCode,
    };
    this.commanService.PortalOpenv1(jsonin).subscribe((response) => {
      console.log('admission : ', response);
      if (response != null) {
        if (response.data.Admissionstarted == true) {
          this.modalSelectBatchSubjects();
        } else {
          this.modalForm.controls['batch'].setValue('');
          Swal.fire({
            title: 'Message!',
            text: 'Admission Closed for this Particular Batch!',
            icon: 'info',
            confirmButtonText: 'OK',
          }); //alert
          this.modalForm.controls['batchSubjects'].setValue('');
          this.SubjectGroups = '';
        }
      }

      // console.log(this.portal)
    });
  }

  single_educationdetails(documnettype: string) {


    let jsonin = {
      Finyear: this.FinyearSession,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Aadhaar: this.AadharSession,
      Document_Type: documnettype,
    };
    this.commanService
      .single_educationdetails(jsonin)
      .subscribe((response) => {

        if (response.data != null) {
          this.res_Educationdetails = response;
          this.res_Educationdetails = response.data;

          //Shivam

          this.DocumentTypeForm.controls['documentType'].setValue(
            response.data[0].Document_Type
          );

          this.EducationDetailsForm.controls['selectBoard'].setValue(
            response.data[0].Board
          );
          this.EducationDetailsForm.controls['state'].setValue(
            response.data[0].State
          );
          this.EducationDetailsForm.controls['board'].setValue(
            response.data[0].Education_board
          );
          this.EducationDetailsForm.controls['schoolCollegeName'].setValue(
            response.data[0].College_name
          );
          this.EducationDetailsForm.controls['dateOfPassing'].setValue(
            response.data[0].Datepass
          );
          this.EducationDetailsForm.controls['rollno'].setValue(
            response.data[0].RollNo
          );

          this.EducationDetailsForm.controls['marksheetNo'].setValue(
            response.data[0].MarksheetNo
          );
          this.EducationDetailsForm.controls['gradeMarks'].setValue(
            response.data[0].GradesOrMarks
          );

          this.EducationDetailsForm.controls['marksObtained'].setValue(
            response.data[0].MarksObtained
          );
          this.EducationDetailsForm.controls['outOff'].setValue(
            response.data[0].OutOff
          );
          this.EducationDetailsForm.controls['percentage'].setValue(
            response.data[0].Percentage
          );

          // if(this.res_Educationdetails.Document_Type){
          //
          // }


          this.EducationDetailsForm.disable();
          this.changeStateEducation = true;
        } else {
          this.EducationDetailsForm.enable();
          this.EducationDetailsForm.reset();
        }
      });

  }

  Logout(){
    this.router.navigate(['/login'])
  }


}
