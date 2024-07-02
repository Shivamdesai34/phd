import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {IconSetService} from '@coreui/icons-angular';
import {
  brandSet,cilArrowRight,
  cilBank,cilFolder,cilGroup,cilHome,
  cilInput,cilLayers,
  cilListNumbered,
  cilLockLocked,cilMoney,
  cilNotes,cilPaperPlane,cilPen,
  cilUser,cilUserPlus,cilWallpaper,cilXCircle
} from '@coreui/icons';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {GlobalMessage} from "../../../globals/global.message";
import {SessionService} from "../../../globals/sessionstorage";
import * as myGlobals from '../../../globals/global-variable'
import {CommonService} from "../../../globals/common.service";
import {Captchimage} from "../../../globals/global-api";
import {Iresp_Login} from "../../../models/response";
import {EncryptData} from "../../../globals/encryptdata";


/** passwords must match - custom validator */
export class PasswordValidators {
    static confirmPassword(control: AbstractControl): ValidationErrors | null {
        const password = control.get("password");
        const confirm = control.get("confirmPassword");
        if (password?.valid && password?.value === confirm?.value) {
            confirm?.setErrors(null);
            return null;
        }
        confirm?.setErrors({passwordMismatch: true});
        return {passwordMismatch: true};
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    submitted = false;
    loginForm!: FormGroup;
    loginControls!: string[];

    public server_captcha: string = '';

    User: any;
    WebsiteId: any;

  server_captcha_image: any;
  server_captcha_image_id: any;

  login_resp!: Iresp_Login;

    constructor(
        private router: Router,private commonService: CommonService,
        public iconSet: IconSetService,
        private formBuilder: FormBuilder,
        private loginservice: LoginService,
        private globalmessage: GlobalMessage,
        private sessionservice: SessionService,
    ) {
        iconSet.icons = {
            cilListNumbered, cilPaperPlane, cilUserPlus,cilNotes,
          cilBank,cilFolder,cilPen,cilHome,cilMoney,cilXCircle,
          cilGroup,cilWallpaper,cilArrowRight,cilLayers,
          cilLockLocked, cilUser, cilInput, ...brandSet
        };

        this.createForm();
        this.GetCaptchaImage();
        // this.GetCaptcha();
    }

  get f() {
    return this.loginForm.controls;
  }

    createForm() {
        this.loginForm = this.formBuilder.group(
            {
                aadhaar: ["", [Validators.required,]],
                // Validators.minLength(this.loginservice.formRules.aadhaarMin),
                // Validators.maxLength(this.loginservice.formRules.aadhaarMax)

                user_pwd: ["", [Validators.required]],
                captcha: ["", [Validators.required]],
            },
        );
        this.loginControls = Object.keys(this.loginForm.controls);
    }

    captcha_fld() {
        this.loginForm.controls['captcha'];
    }

  GetCaptchaImage() {
    this.commonService.Post_json_withouttoken(Captchimage, "").subscribe((response) => {
      if (response == null) {
        return;
      }
      this.server_captcha_image = response.image;
      this.server_captcha_image_id = response.id;

    });
  }

    GetCaptcha() {
        this.loginservice.GetCaptcha().subscribe((response) => {
            if (response == null) {
                return;
            }
            this.server_captcha = response.data;
        });
    }



    loginme() {
        // debugger;
        // if (this.loginForm.status == "INVALID") {
        //     this.globalmessage.Show_error('Invalid form Please enter all input ');
        //     return;
        // }

        if (this.server_captcha !== this.loginForm.controls['captcha'].value) {
            this.globalmessage.Show_error('Captcha value miss match ');
            return;
        }


        this.submitted = true;
        this.loginservice.ValidateLogin(this.loginForm.value).subscribe((response) => {

            if (response.data.Token == '') {
                this.globalmessage.Show_error('XXXX' + response.data.Errormessage);
                return;
            }

          const hasKey = 'data' in response;
          if (hasKey) {
            this.login_resp = response.data
          } else {
            this.login_resp = response
          }



            // let login = ILogin;
            // login : response.data,

            this.sessionservice.SaveData('Aadhaar', response.data.Aadhaar);
            this.sessionservice.SaveData('UserRole', response.data.UserRole);
            this.sessionservice.SaveData('UserName', response.data.User_Name);
            // this.sessionservice.SaveData('Token', response.data.Token);
          this.sessionservice.SaveData('token', this.login_resp.Token);
            this.sessionservice.SaveData('StudentType', response.data.Studenttype);

            this.sessionservice.SaveData('Coursetype', response.data.Coursetype);
            sessionStorage.setItem('Finyear', String(myGlobals.Global_CurrentFinYear));

            this.router.navigate(['/dashboard']);
        });

    }
  onLogin(){

  }

    DisplayATKTmessage() {

        this.User = myGlobals.Global_ATKT;
        this.WebsiteId = 1;
        sessionStorage.setItem('UserType', this.User);
        sessionStorage.setItem('WebsiteId', this.WebsiteId);
        this.router.navigate(['/register']);

    }

    DisplayOUTSIDEmessage() {
        // this.User = myGlobals.Global_OUTSIDE;
      this.WebsiteId = 2;
      this.sessionservice.SaveData('studenttype', myGlobals.Global_OUTSIDE);
      this.sessionservice.SaveData('websiteid', this.WebsiteId);
        this.router.navigate(['/register']);
    }




}


