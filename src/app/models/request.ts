import {SessionService} from "../globals/sessionstorage";
import {Decryptdata} from "../globals/encryptdata";

export interface Singlebatch {
    batch_code: number;
}

export interface Validatelogin {
    aadhaar: number
    user_pwd: string
}

export interface IBatchs {
    Batch_Code: number
    Batch_Name: string
    Batch_Short: string
    Course_Code: number
    Course_Name: string
    BatchLevel: number
    BatchLevelGroup: string
    FormAmount: number
    Merchant: string
    Merchant_AccountID: string
    Next_Batch: number
    Active: boolean
}

export interface Ipg_batchs{
  "Batch_code": number
  "Batch_name": string
  "Batch_short": string
  "Course_code": number
  "Course_name":string
  "Batch_level": number
  "Batch_level_group": string
  "Old_batch_code": number
  "Formamount": number
  "Merchant": string
  "Merchant_accountid": string
  "Next_batch":number
  "Active": number
  "Stream": string
  "Udise_no":string
  "Boardlevel": string
  "Webportal": string,
  "Admissionstarted": number
  "Outside_admission": number
  "Atkt_admission": number
  "Outside_message": string
  "Atkt_message": string
  "Previous_exambatchs": string
  "Semesters": string
  "Documents": string
  "Educationdetails":string
  "Meritlist": string
  "Admissionyear": number
}

export interface iBatchemail {
    Batch_code: number
    Cc_email: string
    Bcc_email: string
    Replay_email: string
    Email_body: string
    Email_subjects: string
}

export interface IYear {
    "Finyear": number,
    "FinyearName": string,
    "Fromdate": string,
    "Todate": string,
    "Lockfinyear": null
}
export interface ICode{
    CollegeCode: number,
    Name: string,
    Add1: string,
    Add2: string,
    Add3: string,
    Website: string,
    Logopath: null
}

export class Sessiondata {
  aadhaar?: number;
  batchcode?: number;
  finyear?: number = 0;
  studenttype?: string;

  constructor(private sessionservice : SessionService) {
  }

  Getdatafromstroage(){

    this.finyear = 0 ;
    this.batchcode = 0;
    this.aadhaar = 0 ;
    this.studenttype = "";

    let decrypted = ""
    decrypted= Decryptdata(this.sessionservice.GetData('aadhaar')!);
    if ( decrypted!= ""){
      this.aadhaar = parseInt(decrypted);
    }

    decrypted= Decryptdata(this.sessionservice.GetData('finyear')!);
    if ( decrypted != ""){
      this.finyear = parseInt(decrypted);
    }


    decrypted = Decryptdata(this.sessionservice.GetData('batchcode'))
    if ( decrypted!= ""){
      this.batchcode = parseInt(decrypted);
    }

    decrypted = Decryptdata(this.sessionservice.GetData('studenttype'))
    if ( decrypted!= ""){
      this.studenttype = decrypted;
    }
  }
}
