export interface ITicketmaster {
  "Ticketid": number,
  "Detailid": number,
  "Aadhaar": number,
  "Ticketdate": string,
  "Ticketdescription": string,
  "Replayuser": string,
}

export interface ITicketdetails {
  "Ticketid": number,
  "Detailid": number,
  "Aadhaar": number,
  "Ticketdescription": string,
  "Replayuser": string,
  "Ticketdate": string,
  "Ticketaction": string,
  "Studentname": string,
  "Adminname": string,
}

export interface IYear {
  "Finyear": number,
  "FinyearName": string,
  "Fromdate": string,
  "Todate": string,
  "Lockfinyear": null
  Name: string,
}

export interface ILogindetail {
  "Aadhaar": string,
  "UserRole": string,
  "User_Name": string,
  "Studenttype": string,
  "Coursetype": string,
  "Registerbatch": string,
  "Token": string,
}

export interface ISubjectName_json {
  "Batch_code": number,
  "Semester": number,
  "Subject_code": number,
  "Subject_name": string,
}

export class Paymentdetails {
  Keyfieldname!: string
  Keyvalue!: string
}

export class Paymentterms {
  Message1!: string
  Message2!: string
  Message3!: string
  Message4!: string
  Paymentdetails!: Paymentdetails[]
}

export class Country {
  CountryID!: number;
  CountryCode!: string;
  CountryName!: string;
  CurrencyCode!: string;
}

export class Data {
  Country!: Country[]
}

export class CountryMaster {
  IsSuccess!: boolean;
  ErrorCode!: string;
  ErrorDescription!: string;
  Data!: Data;
}

export interface AtktSubject {
  Batchexam_id: number
  Batch_code: number
  Batch_name: string
  Aadhaar: string
  Subject_order: string
  Subject_name: string
  Semester: string
  Papercode: string
  Finyear: number
  College_code: number
  Boardlevel: string
}

export class Formamount {
  "Formid": number
  "Formamount": number
  "Formcount": number
}

export class Iprefix_month {
  Prefix_code!: number
  Prefix_month!: string
  Startdate!: string
  Enddate!: string
  Active!: number
}

export interface IStudentpaymentIU {
  Receipt_id: number
  Receiptno: number
  Transactionguid: string
  Fullname: string
  Billdeskaccountid: string
}

export class CSemester_outside {
  Semester!  : number
  Totalcount! : number
  Semesteramount! : number
}

export interface Istudentdetails {

  "Batch_code": number,
  "Batch_name": string,
  "Batch_short": string,
  "Course_code": number,
  "Course_name": string,
  "Batch_level": number,
  "Batch_level_group": string,
  "Old_batch_code": number,
  "Formamount": number,
  "Merchant": string,
  "Merchant_accountid": string,
  "Next_batch": number,
  "Active": number,
  "Stream": string,
  "Udise_no": string,
  "Boardlevel": string,
  "Webportal": string,
  "Admissionstarted": number,
  "Outside_admission": number,
  "Atkt_admission": number,
  "Outside_message": string,
  "Atkt_message": string,
  "Previous_exambatchs": string,
  "Semesters": string
}


export interface Istudentdetails_semesterwise {
  "Batchexam_id": number,
  "Batch_code": number,
  "Batch_name": string,
  "Aadhaar": number,
  "Subject_order": number,
  "Subject_name": string,
  "Semester": number,
  "Papercode": string,
  "Boardlevel": string,
  "Finyear": number
}

export type Req_IAtktsubects_inhouse ={
  Atkt_formid: number,
  Receipt_id: number,
  Batchexam_id: number,
  Batch_code: number,
  Semester: number,
  Subject_order: number,
  Subject_name: string,
  Papercode: string,
  Finyear: number,
  Subject_finyear: string,
  College_code: number,
  Aadhaar: number,
  Boardlevel: string,
  Marksheet: number,
  Specialisation: string,
  Scale: string,
}

export interface IAtktsubjectdetails {

  "Receipt_id": number,
  "Finyear": number,
  "College_code": number,
  "Aadhaar": number,
  "Prefix_code": number,
  "Receiptno": number,
  "Transactionguid": string,
  "Accountno": string,
  "Billdeskid": number,
  "Billdesktranid": string,
  "Billdeskdate": string,
  "Payment_mode": string,
  "Receiptamount": number,
  "Bank": string,
  "Chequeno": string,
  "Chequedate": string,
  "Narration": string,
  "Transcationmode": string,
  "Errcode": string,
  "Errorname": string,
  "Batchexamid": string,
  "Billdeskstatus": string,
  "Billdeskerror": string,
  "Createddate": string,
  "Createdby": number,
  "Formtype": string,
  "Firstname": string,
  "Lastname": string,
  "Fathername": string,
  "Mothername": string,
  "Gender": string,
  "Rollno": string,
  "Prnno": string,
  "Prefix_month": string,
  "Batch_code": number,
  "Semester": number,
  "Mobileno": string,
  "Subjects": number
}

export class AtktSubject_additional {
  "Batchexam_id": number
  "Batch_code": number
  "Batch_name": string
  "Aadhaar": string
  "Subject_order": string
  "Subject_name": string
  "Semester": string
  "Papercode": string
}

export class IgetAllBatchs {
    "Batch_code": number
    "Batch_name": string
    "Batch_short": string
    "Course_code": number
    "Course_name": string
    "Batch_level": number
    "Batch_level_group": string
    "Old_batch_code": number
    "Formamount": number
    "Merchant":string
    "Merchant_accountid": string
    "Next_batch": number
    "Active": number
    "Stream": string
    "Udise_no": string
    "Boardlevel": string
    "Webportal": string
    "Admissionstarted": number
    "Outside_admission": number
    "Atkt_admission": number
    "Outside_message":string
    "Atkt_message": string
    "Previous_exambatchs": string
    "Semesters": string
}

export interface IstudentMarksheet {
  "Finyear": number
    "Batch_code": number
    "Semester": number
    "Batchexam_id": number
    "Userexamname": string
    "Batch_name": string
    "Template": string
    "Aadhaar": number
}

export interface Iresp_Login {
  Aadhaar: number
  Collegecode: number
  User_pwd: string
  Creationdate: string
  Createdby: string
  Ipaddr: string
  Editedby: string
  Userrole: string
  User_name: string
  Forgottoken: string
  Imei: string
  Approved: boolean
  Student_registration_new: StudentRegistrationNew
  Minbatch: Minbatch
  Maxbatch: Maxbatch
  Token: string
}

export interface StudentRegistrationNew {
  College_code: number
  Finyear: number
  Aadhaar: number
  EmailID: string
  MobileNumber: number
  Student_Password: string
  Student_Guid: string
  Forgottoken: string
  OTP: number
  OTP_starttime: string
  OTP_endtime: string
  ExistingStudent: number
  ExistingSubjectGroupCode: string
  Existingbatchcode: number
  Created_Date: string
  Inhouse: string
  Hindilinguistic: string
  OTP_Validated: number
  Studenttype: string
  Coursetype: string
  Batch_code: number
  Batch_name: string
  Admissionboard: string
  Rationcard: number
  Batch_level: number
}

export interface Minbatch {
  Finyear: number
  Batch_name: string
  Aadhaar: number
  Batch_code: number
  Admissionboard: string
  Rationcard: number
  Batch_level: number
  Subject_group_code: string
  Subject_group_id: string
  Minor: number
}

export interface Maxbatch {
  Finyear: number
  Batch_name: string
  Aadhaar: number
  Batch_code: number
  Admissionboard: string
  Rationcard: number
  Batch_level: number
  Subject_group_code: string
  Subject_group_id: number
  Minor: number
}

