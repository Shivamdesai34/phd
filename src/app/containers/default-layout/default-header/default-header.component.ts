import {Component, Input, OnInit} from '@angular/core';

import { HeaderComponent } from '@coreui/angular-pro';
import {Router} from "@angular/router";
import * as myGlobals from "../../../globals/global-variable";
import {CommonService} from "../../../globals/common.service";
import {DomSanitizer} from "@angular/platform-browser";
import {encryptUsingAES256} from "../../../globals/encryptdata";
import {studentimage} from "../../../globals/global-api";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html'
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  MyImage: any;
  constructor(private router: Router,
  private commonService: CommonService,
  private sanitizer: DomSanitizer) {

    super();
  }

  ngOnInit() {

    this.getImage();
  }

  Finyear = parseInt(sessionStorage.getItem('Finyear')!);

  AadharSession = parseInt(sessionStorage.getItem('Aadhaar')!);

  @Input() sidebarId: string = 'sidebar1';
  logoutlogin(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  getImage() {
    let jsonin = {
      Aadhaar: this.AadharSession,
      Collegecode: myGlobals.Golbal_CollegeCode,
      Finyear: this.Finyear,
    };



    this.commonService.Post_json(studentimage,jsonin).subscribe((response) => {
      if (response == null) {
        return;
      }

      if (response) {
        // console.log("ddddd",response)
        this.MyImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response}`);

      }
    });
  }
}
