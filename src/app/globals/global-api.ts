export const EmailIP = 'https://admission.rjcollege.edu.in:7006'; //live new
export const CommonIP = 'https://admission.rjcollege.edu.in:7006';//demo new
export const ServerIP = 'https://admission.rjcollege.edu.in:7006';//live Staff

export const downurl = 'https://www.admission.rjcollege.edu.in';//Document approval pdf

export var Serverlink = 'https://admission.rjcollege.edu.in';

export var Newdev_7006 = Serverlink+':7006';

export var baseURL = 'https://admission.rjcollege.edu.in:7006';

export var baseURL_7003 = 'https://admission.rjcollege.edu.in:7007';

export var baseURL_7007 = 'https://admission.rjcollege.edu.in:7007';


const STUDENTURL = baseURL + '/v1/Students/';

const STUDENTURL_7007 = baseURL_7007 + '/v1/Students/';


const FEESURL = baseURL + '/v1/Fees/';
const MARKSHEETURL = baseURL + '/v1/Marksheet/';
const COMMONURL = baseURL + '/v1/Common/';
const COMMONURL_7003 = baseURL_7003 + '/v1/Common/';

const BILLDESKURL = baseURL + '/v1/Billdesk/';
const EAZYURL = baseURL + '/v2/eazy/';

const STUDENTURL_7006 = Newdev_7006 + '/v1/Students/';

export const Feeslogin = CommonIP + '/v1/Fees/FeesLogin';
export const finyear = CommonIP + '/v1/Common/Finyear';
export const iu_batchemail = EmailIP + '/v1/email/iu_batchemail';
export const iu_fileemail = EmailIP + '/v1/email/iu_fileemail';
export const downloadtemplate = EmailIP + '/v1/email/downloadtemplate';

export const AdmissionStatusreport = ServerIP + '/v1/Fees/AdmissionStatusreport';
export const Admissionstatusnep = ServerIP + '/v1/Fees/admissionstatusnep';
export const BilldeskStatusReport = ServerIP + '/v1/Fees/BilldeskStatusReport';

export const installmentdetails = ServerIP + '/v1/Fees/installmentdetails';// installmentdetails list

export const StudentReceiptDetailsv2 = STUDENTURL_7006 + 'StudentReceiptDetailsv2'; //new

export var ServerURL = location.origin + location.pathname;
export var Pg_batchs_URL = COMMONURL + 'pg_batchs';
export var Getselectedbatchs_url = COMMONURL + 'Getselectedbatchs';
export var BatchSubjects = COMMONURL + 'BatchSubjects';
export var Bankmasters = COMMONURL + 'Bankmasters';
export var Captch = COMMONURL + 'Captch';
export var WebportalURL = COMMONURL + 'webportalwisebatchs';
export var Stream_batchsURL = COMMONURL + 'streambatchs';
export var GetAllFirstYearBatchs = COMMONURL + 'GetAllFirstYearBatchs';
export var Graducationstream = COMMONURL + 'Graducationstream';

export var Validate_aadhaarURL = COMMONURL + 'validateaadhaar';
export var Validate_emailURL = COMMONURL + 'validateemail';
export var Validate_mobileURL = COMMONURL + 'validatemobile';

export var Sendbulkemail = COMMONURL + 'sendbulkemail';
export var Sendbulkemailfile = COMMONURL + 'sendbulkemailfile';

export var BilldeskFirstYearCallback =   STUDENTURL + 'BilldeskFormPaymentCallback';
export var FormFeesPaid = STUDENTURL + 'FormFeesPaid'; //new


export var StudentReceiptDetails = STUDENTURL + 'StudentReceiptDetails'; //new
export var Paidbatchs = STUDENTURL + 'Paidbatchs'; //new
export var PortalOpen = STUDENTURL + 'PortalOpen'; //new
export var PortalOpenv1 = STUDENTURL + 'PortalOpenv1'; //new
export var CheckAdmission = STUDENTURL + 'CheckAdmission'; //new
export var formfeesreceived = STUDENTURL + 'formfeesreceived'; //new
export var StudentProfileStatus = STUDENTURL + 'StudentProfileStatus'; //new
export var StudentRegistration_URL = STUDENTURL + 'atktoutsideregistration'; //new
export var GetOTP = STUDENTURL + 'GetOTP';
export var GetOTP_v1_url = STUDENTURL + 'GetOTPv1';
export var studentsforgotmobile = STUDENTURL + 'studentsforgotmobile'; //new forgotpasword resendotp
export var ValidateOTP = STUDENTURL + 'ValidateOTP';
export var Validatemobileotp = STUDENTURL + 'Validatemobileotp'; //forgotpassword validate otp
export var StudentLogin = STUDENTURL + 'Login'; //new
export var studentactivefinyear = STUDENTURL + 'studentactivefinyear'; //new
export var Forgotpassword = STUDENTURL + 'studentsforgotmobile'; //new
export var ResetPassword = STUDENTURL + 'resetpassword';
export var IU_ChangePassword = STUDENTURL + 'IU_ChangePassword';

export var CheckAdmission_URL = STUDENTURL + 'CheckAdmission';
export var IU_Admission = STUDENTURL + 'IU_Admission';
export var IU_nepAdmission = STUDENTURL + 'IU_nepadm';

export var Nepsubjects_url = STUDENTURL + 'nepsubjects';
export var StudentProfileStatus_url = STUDENTURL + 'StudentProfileStatus';
export var ProfileResources = STUDENTURL + 'ProfileResources';
export var IU_StudentProfile = STUDENTURL + 'IU_StudentProfile';
export var IU_Reservations = STUDENTURL + 'IU_Reservations';
export var IU_StudentEducation = STUDENTURL + 'IU_StudentEducation';
export var GetEducationDetails = STUDENTURL + 'GetEducationDetails';
export var EducationDocuments = STUDENTURL + 'EducationDocuments';
export var UploadDocuments = STUDENTURL + 'UploadDocuments';
export var ProfileSubmited = STUDENTURL + 'ProfileSubmited';

export var StudentBatch = STUDENTURL + 'StudentBatch';
export var studentbatchs = STUDENTURL + 'studentbatchs'; //internal marks
export var studentbatchexams = STUDENTURL + 'studentbatchexams'; //internal marks
export var Internalexammarks = STUDENTURL + 'internalexammarks'; //internal marks

export var Studentmaxbatch = STUDENTURL + 'Studentmaxbatch'; //new
export var StudentSubjectGroup = STUDENTURL + 'Selectbatchsubject';
//export var StudentSubjectGroup = STUDENTURL + 'IncrementalBatchSubjects';

export var Nextbatchsubjects = STUDENTURL + 'Nextbatchsubjects'; //new
export var Selectbatchsubject_URL = STUDENTURL + 'Selectbatchsubject'; //new

export var IsProfileSubmited_URL = STUDENTURL + 'IsProfileSubmited';
export var StudentMyProfile = STUDENTURL + 'myprofilemultiplebatchs';
export var StudentMyProfile_URL = STUDENTURL + 'myprofilemultiplebatchs';
export var StudentAppliedCourses = STUDENTURL + 'StudentAppliedCourses';
export var Nextbatch = STUDENTURL + 'Nextbatch';

//Fees
export var StudentFeesInstallment = STUDENTURL + 'StudentFeesInstallment';

export var paymentterms = FEESURL + 'paymentterms';

export var BillDeskcheckSum = STUDENTURL + 'BillDeskcheckSum';
export var IU_receipt = STUDENTURL + 'IU_Receipt';
export var BillDeskcheckSumQuery = STUDENTURL + 'BillDeskcheckSumQuery';
export var CheckSubjectGroupQuota = STUDENTURL + 'CheckSubjectGroupQuota';
export var nepquotacheck = STUDENTURL + 'nepquotacheck';
export var StudentReceiptDetails_URL = STUDENTURL + 'StudentReceiptDetails';
export var AdmissionCancel_Request = STUDENTURL + 'AdmissionCancel_Request';
export var CancelRequestValidation = STUDENTURL + 'CancelRequestValidation';

export var Cancelledadmission = STUDENTURL + 'Cancelledadmission';

//Callback
export var BilldeskFormPaymentCallback =
    STUDENTURL + 'BilldeskFormPaymentCallback';

//FormFeesPaid
export var FormFeesPaid_URL = STUDENTURL + 'FormFeesPaid';

export var Additionalsubjectformfees_URL = STUDENTURL + 'Additionalsubjectformfees';

export var formfeesreceived_url = STUDENTURL + 'formfeesreceived';

export var formfeesreceivedv1_url = STUDENTURL + 'formfeesreceivedv1';
//InstallmentValidation
export var InstallmentValidation = STUDENTURL + 'InstallmentValidation';


//checkoutstanding
export var checkoutstanding = STUDENTURL + 'checkoutstanding';
export var validateeliglibity = STUDENTURL + 'validateeliglibity';
export var Admissionstatus = STUDENTURL + 'Admissionstatus';
export var Feesattached = STUDENTURL + 'Feesattached';
export var validateadmissionstarted = STUDENTURL + 'validateadmissionstarted';

export var Paidfinyear = STUDENTURL + 'Paidfinyear';
export var Paidbatchs_URL = STUDENTURL + 'Paidbatchs';
export var StudentApprovedCourses = STUDENTURL + 'StudentApprovedCourses';

export var Aadhaar_unsuccesstranscation =
    STUDENTURL + 'Aadhaar_unsucesstranscation';

//academic bank of credits
export var abcid = STUDENTURL + 'abcid';

export var studentabcdid = STUDENTURL + 'studentabcdid';

export var getabcid = STUDENTURL + 'getabcid';

export var studentabcdid_get
    = STUDENTURL + 'studentabcdid_get';

export var verify_oldstudent
  = STUDENTURL + 'verify_oldstudent';

export var createticket = STUDENTURL + 'createticket';

export var ticketdetails = STUDENTURL + 'ticketdetails';

export var ticketmaster = STUDENTURL + 'ticketmaster';

export var ticketaction = FEESURL + 'ticketaction';

export var ticketreplay = FEESURL + 'ticketreplay';

///displayportalmessage --Fees
export const EditProfile = FEESURL + 'EditProfile';
export const ProfileList = FEESURL + 'ProfileList';
export const Downloadaadhaar = FEESURL + 'Downloadaadhaar';
export const billdeskquery = FEESURL + 'billdeskquery';

export const getReciept = STUDENTURL + 'Atkt_studentreceipt';

export var ValidatePortalmessage_URL = FEESURL + 'displayportalmessage';
export var ticketcategory = FEESURL + 'ticketcategory';

// studentsmarksheetlist --marksheet
export var studentsmarksheetlist = MARKSHEETURL + 'studentsmarksheetlist';
export var printmarksheet = MARKSHEETURL + 'printmarksheet';

export var EnrollmentDetail = STUDENTURL + 'enrollmentdetail';
export var UpdateEnrollmentDetail = STUDENTURL + 'updateenrollmentdetail';

const MARKSHEETURL_7006 = Newdev_7006 + '/v1/Marksheet/';
const COMMONURL_7006 = Newdev_7006 + '/v1/Common/';
// const STUDENTURL_7006 = Newdev_7006 + '/v1/Students/';
export const atkt_students = MARKSHEETURL_7006 + 'atkt_students';
export const atktstudentspapers = MARKSHEETURL_7006 + 'atktstudentspapers';

export const atktstudentspaper_semesterwise = MARKSHEETURL_7006 + 'atktstudentspaper_semesterwise';


export const Atkt_studentbatch = STUDENTURL + 'Atkt_studentbatch';

// Define API for Staff-Admin
export const DownloadReceipts = ServerIP + '/v1/Fees/DownloadReceipts';
export const pdfdownload = ServerIP + '/pdfdownload/';
export const DownloadExcel = ServerIP + '/exceldownload/';
export const Finyear = ServerIP + '/v1/Common/Finyear';
export const Login = ServerIP + '/v1/Fees/FeesLogin';
export const College = ServerIP + '/v1/Common/College';
export const Captcha = ServerIP + '/v1/Common/Captch';
export const BatchFeesTerms = ServerIP + '/v1/Fees/BatchFeesTerms';//term batch wise
export const Batchs = ServerIP + '/v1/Common/GetAllBatchs';
export const FeesHead = ServerIP + '/v1/Fees/FeesHead';
export const iu_nepsubjectv2 = ServerIP + '/v1/Fees/iu_nepsubjectv2';
export const FeesTerm = ServerIP + '/v1/Fees/FeesTerm';
export const IU_Installments = ServerIP + '/v1/Fees/IU_Installments';
export const GetInstallments = ServerIP + '/v1/Fees/GetInstallments';
export const DeleteAll = ServerIP + '/v1/Fees/Delete';
export const BillDesk = ServerIP + '/v1/Fees/BillDesk';
export const AdmissionApproval = ServerIP + '/v1/Fees/AdmissionApproval';
export const AdmissionApprovallist = ServerIP + '/v1/Fees/AdmissionApprovallist';
export const Marksheetapprovallist = ServerIP + '/v1/Fees/Marksheetapprovallist';

export const ViewDocument = ServerIP + '/v1/Fees/viewdocument';
export const GetStudentFeesStructure = ServerIP + '/v1/Fees/GetStudentFeesStructure';
export const IU_AttachFeesStructure = ServerIP + '/v1/Fees/IU_AttachFeesStructure';
export const EducationDetails = ServerIP + '/v1/Fees/EducationDetails';
export const AdmissionMarksheets = ServerIP + '/v1/Fees/AdmissionMarksheets';
export const CastDocument = ServerIP + '/v1/Fees/CastDocument';
export const CurrentSubjectGroupCode = ServerIP + '/v1/Fees/CurrentSubjectGroupCode';//old
export const showsubjectgroup = ServerIP + '/v1/Fees/showsubjectgroup';//old

export const findstudentsubject = ServerIP + '/v1/Fees/findstudentsubject';//new
export const IU_UpdateSubjectGroupCode = ServerIP + '/v1/Fees/IU_UpdateSubjectGroupCode';
export const BilldeskQuery = ServerIP + '/v1/Fees/BillDeskQuery';//
export const NewRegistrationList = ServerIP + '/v1/Fees/NewRegistrationList';//
export const IU_AttachFeesToall = ServerIP + '/v1/Fees/IU_AttachFeesToall';
export const IU_UnTagFees = ServerIP + '/v1/Fees/IU_UnTagFees';
export const FeesForgotPassword = ServerIP + '/v1/Fees/FeesForgotPassword';
export const AdmissionQuotaList = ServerIP + '/v1/Fees/AdmissionQuotaList';
export const AdmissionQuotaList_minor = ServerIP + '/v1/Fees/AdmissionQuotaList_minor';
export const IU_QuotaStatusUpdate = ServerIP + '/v1/Fees/IU_QuotaStatusUpdate';
export const IU_minorstatus = ServerIP + '/v1/Fees/IU_minorstatus';
export const ReceiptReport = ServerIP + '/v1/Fees/ReceiptReport';
export const OutsideStudents = ServerIP + '/v1/Fees/OutsideStudents';
export const UpdateLastyearOutstanding = ServerIP + '/v1/Fees/UpdateLastyearOutstanding';
export const UpdateLastYearStudents = ServerIP + '/v1/Fees/UpdateLastYearStudents';
export const DocumentApproval = ServerIP + '/v1/Fees/DocumentApproval';
export const UpdateDocumentApproval = ServerIP + '/v1/Fees/UpdateDocumentApproval';
export const GetAllBatchs = ServerIP + '/v1/Common/GetAllBatchs';
export const UsersList = ServerIP + '/v1/Fees/UsersList';
export const InsertUpdateUsers = ServerIP + '/v1/Fees/InsertUpdateUsers';
export const GetUnAttachedStudents = ServerIP + '/v1/Fees/GetUnAttachedStudents';
export const Accountinfo = ServerIP + '/v1/Fees/Accountinfo';
//bill desk
export const BilldeskUpload = ServerIP + '/v1/Fees/BilldeskUpload';
export const billdeskdataupload = ServerIP + '/v1/Fees/billdeskdataupload';//old
export const billdeskdatadownload = ServerIP + '/v1/Fees/billdeskdatadownload';
export const billdeskrefundupload = ServerIP + '/v1/Fees/billdeskrefundupload';
export const billdeskrefunddownload = ServerIP + '/v1/Fees/billdeskrefunddownload';

//LC
export const downloadstudentlcdata = ServerIP + '/v1/Fees/downloadstudentlcdata';
export const downloadLC = ServerIP + '/v1/Fees/downloadlc';
export const uploadLC = ServerIP + '/v1/Fees/uploadlc';
export const deleteLC = ServerIP + '/v1/Fees/deletelc';

export const IU_Cashreceipt = ServerIP + '/v1/Fees/IU_CashReceipt';
export const iu_scholarship = ServerIP + '/v1/Fees/iu_scholarship';
export const get_scholarship = ServerIP + '/v1/Fees/get_scholarship';


export const get_installmentheader = ServerIP + '/v1/Fees/get_installmentheader';
export const get_installmentdetails = ServerIP + '/v1/Fees/get_installmentdetails';

export const RollCalllist = ServerIP + '/v1/Fees/RollCalllist';
export const IU_UpdateRollcall = ServerIP + '/v1/Fees/IU_UpdateRollcall';
export const UploadRollcall = ServerIP + '/v1/Fees/UploadRollcall';
export const DownloadRollcall = ServerIP + '/v1/Fees/DownloadRollcall';
export const Portallist = ServerIP + '/v1/Fees/Portallist';
export const IU_Webportal = ServerIP + '/v1/Fees/IU_Webportal';
export const ExcelPaid_UnPaidList = ServerIP + '/v1/Fees/ExcelPaid_UnPaidList';
export const ExcelRollCall = ServerIP + '/v1/Fees/ExcelRollCall';
export const ExcelFeesStructure = ServerIP + '/v1/Fees/ExcelFeesStructure';
export const ExcelAccountCollection = ServerIP + '/v1/Fees/ExcelAccountCollection';
export const ExcelIDCard = ServerIP + '/v1/Fees/ExcelIDCard';
export const ExcelStudentList = ServerIP + '/v1/Fees/ExcelStudentList';
export const DownloadReceiptspdf = ServerIP + '/v1/Fees/DownloadReceiptspdf';
export const DownloadReceiptsblob = ServerIP + '/v1/Fees/DownloadReceiptsblob';

export const ExcelOutstanding = ServerIP + '/v1/Fees/ExcelOutstanding';
export const ExcelStatistics = ServerIP + '/v1/Fees/ExcelStatistics';
export const GetInstallmentHeader = ServerIP + '/v1/Fees/GetInstallmentHeader';//installment dropdown
export const Activedeactiveinstallments = ServerIP + '/v1/Fees/Activedeactiveinstallments';// active deactive dropdown
export const ExcelDetailRegister = ServerIP + '/v1/Fees/ExcelDetailRegister';
export const Exceldetailregister_tally = ServerIP + '/v1/Fees/Exceldetailregister_tally';
export const ExcelAccountStudent = ServerIP + '/v1/Fees/ExcelAccountStudent';
export const ExcelAccountoutstanding = ServerIP + '/v1/Fees/ExcelAccountoutstanding';
export const Updatefreeship = ServerIP + '/v1/Fees/Updatefreeship';
export const excelfreeship = ServerIP + '/v1/Fees/excelfreeship';
export const showallwebsitenames = ServerIP + '/v1/Fees/showallwebsitenames';
export const updatewebsiteremarks = ServerIP + '/v1/Fees/updatewebsiteremarks';
export const uploadinstallmenttemplate = ServerIP + '/v1/Fees/uploadinstallmenttemplate';
export const downloadinstallmenttemplate = ServerIP + '/v1/Fees/downloadinstallmenttemplate';
export const showbatchadmissiondate = ServerIP + '/v1/Fees/showbatchadmissiondate';
export const updatebatchadmissiondate = ServerIP + '/v1/Fees/updatebatchadmissiondate';
export const Unpaidstudentslist = ServerIP + '/v1/Fees/Unpaidstudentslist';
export const Printprofile = ServerIP + '/v1/Fees/Printprofile';
export const Unattachfees = ServerIP + '/v1/Fees/Unattachfees';
export const transferstudentbatchs = ServerIP + '/v1/Fees/transferstudentbatchs';
export const downloadrollcallconfiguration = ServerIP + '/v1/Fees/downloadrollcallconfiguration';
export const uploadrollcallconfiguration = ServerIP + '/v1/Fees/uploadrollcallconfiguration';
export const generalregister = ServerIP + '/v1/Fees/generalregister';
export const Excelbatchcollout = ServerIP + '/v1/Fees/Excelbatchcollout';
export const iu_gapstudent = ServerIP + '/v1/Fees/iu_gapstudent';
export const Tally = ServerIP + '/v1/Tally/multiplefinyear_onlinereceipt';
// Define API for Students





// export var CheckAdmission = ServerIP + '/v1/Students/CheckAdmission';

// Define API for Marksheet

export var eazyloginv2 = EAZYURL + 'eazyloginv2';


export const uploadstudenteligiblelist = ServerIP + '/v1/Marksheet/uploadstudenteligiblelist';
export const deletestudenteligiblelist = ServerIP + '/v1/Marksheet/deleteeligible';
export const showalleligiblelist = ServerIP + '/v1/Marksheet/showalleligible';
export const downloadstudenteligiblelist = ServerIP + '/v1/Marksheet/downloadstudenteligiblelist';
export const updateeligible = ServerIP + '/v1/Marksheet/updateeligible';

//Batch Subjects None
export const BatchSubjectsnone = ServerIP + '/v1/Common/Batchsubjectsnone';

//Cancel admission
export const AdmissionCancel = ServerIP + '/v1/Fees/AdmissionCancel';
export const viewchequeimage = ServerIP + '/v1/Fees/viewchequeimage';
export const downloadcanceldocument = ServerIP + '/v1/Fees/downloadcanceldocument';
export const CacelAdmissionList = ServerIP + '/v1/Fees/CacelAdmissionList';



//adhaar receipt
export const Aadhaarreceiptlist = ServerIP + '/v1/Fees/Aadhaarreceiptlist';
export const Printreceipt = ServerIP + '/v1/Fees/Printreceipt';

//merit list
export const merilistbatchdocument = ServerIP + '/v1/Fees/merilistbatchdocument';
export const meritlist = ServerIP + '/v1/Fees/meritlist';

//Create Rollno
export const Createrollno = ServerIP + '/v1/Fees/Createrollno';

//cancel to approve
export const canceltoapproval = ServerIP + '/v1/Fees/canceltoapproval';

//report batchoutstanding
export const batchoutstanding = ServerIP + '/v1/Fees/batchoutstanding';

//report formfees
export const formfees = ServerIP + '/v1/Fees/formfees';

//query ticket ui
export const ticketlist = ServerIP + '/v1/Fees/ticketlist';
// export const ticketaction = ServerIP + '/v1/Fees/ticketaction';

//update details
export const updatemobileemail = ServerIP + '/v1/Fees/updatemobileemail';

export const view_semestersubject = MARKSHEETURL_7006 + 'view_semestersubject';
export const view_semesterpasssubject = MARKSHEETURL_7006 + 'view_semesterpasssubject';
export const IU_ATKTForm = MARKSHEETURL_7006 + 'IU_ATKTForm';
export const atkt_formamount = MARKSHEETURL_7006 + 'atkt_formamount';
export const studentuploadimage = COMMONURL_7006 + 'studentuploadimage';
export const updateemail = COMMONURL_7006 + 'updateemail';
export const sendemail = COMMONURL_7006 + 'sendemail';
export const studentpictureupload = COMMONURL_7006 + 'studentpictureupload';
export const sendotpemail = COMMONURL_7006+ 'sendotpemail';
export const verifyemailotp = COMMONURL_7006+'verifyemailotp';
export const sendotpsms = COMMONURL_7006 + 'sendotpsms';
export const verifymobileotp = COMMONURL_7006 + 'verifymobileotp';
export const sendotpemailv2 = COMMONURL_7006 + 'sendotpemailv2';
export const sendotpsmsv2 = COMMONURL_7006 + 'sendotpsmsv2';
export const verifymobileotpv2 = COMMONURL_7006 + 'verifymobileotpv2';
export const verifyemailotpv2 = COMMONURL_7006 + 'verifyemailotpv2';
export var EducationDocuments_URL = STUDENTURL + 'EducationDocuments';

export var studentimage = STUDENTURL + 'studentimage';

export const batchsemesterexamsubjects =
  ServerIP + '/v1/Marksheet/batchsemesterexamsubjects';

export const batchuserexam = ServerIP + '/v1/Marksheet/batchuserexam';
export const excludecurrentfinyear =
  ServerIP + '/v1/Marksheet/excludecurrentfinyear';

export const download_batchsemestersubject = ServerIP + '/v1/Marksheet/download_batchsemestersubject';


export const exams = ServerIP + '/v1/Marksheet/exams';

export const uploadquestionpaper =
  ServerIP + '/v1/marksheet/uploadquestionpaper';
export const downloadquestionpaper =
  ServerIP + '/v1/students/downloadquestionpaper';

export const semester = ServerIP + '/v1/Marksheet/semester'; //all

export const batchsemestersubject =
  ServerIP + '/v1/Marksheet/batchsemestersubject';

export const get_offlineatktstudent =
  ServerIP + '/v1/Marksheet/get_offlineatktstudent';

export const batchwise_semester = ServerIP + '/v1/Marksheet/batchwise_semester';

export const batchsemestersubject_outside =
    ServerIP + '/v1/Marksheet/batchsemestersubject_outside';

export var Billdeskchecksum_atkt = BILLDESKURL + 'Billdeskchecksum_atkt';
export const get_offlineprefix = ServerIP + '/v1/Marksheet/get_offlineprefix';

export const get_atktprefix = MARKSHEETURL + 'get_atktprefix';

export var atkt_formcallback = BILLDESKURL + 'atkt_formcallback';

export const Atkt_studentreceipt = STUDENTURL + 'Atkt_studentreceipt';

export const allbatchs = ServerIP + '/v1/Common/allbatchs';

export var Phdminbatch = STUDENTURL + 'Phdminbatch'; //new

export var IsProfileSubmited = STUDENTURL + 'IsProfileSubmited';

export var Captchimage = COMMONURL + 'Captchimage';


export const registertionbatchs = COMMONURL_7003 + 'registertionbatchs';

export var Registerbatch = STUDENTURL + 'Registerbatch';

export const batch = COMMONURL + 'batch';


export var IncrementalBatchSubjects_v2 = STUDENTURL + 'IncrementalBatchSubjects_v2';

export var single_educationdetails= STUDENTURL_7007 + 'single_educationdetails';


