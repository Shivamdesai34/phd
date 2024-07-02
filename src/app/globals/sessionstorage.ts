import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SessionService {

  pwdcode = 'delphigolangjavanode';

  constructor() {}


  /*
  private encryptUsingAES256(valuestring : string ) {
    let _key = CryptoJS.enc.Utf8.parse(this.pwdcode);
    let _iv = CryptoJS.enc.Utf8.parse(this.pwdcode);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(valuestring),
      _key,
      {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    let mastervalue = encrypted.toString();

    sessionStorage.setItem(this.Masterkey, mastervalue);
  }

  private decryptUsingAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.pwdcode);
    let _iv = CryptoJS.enc.Utf8.parse(this.pwdcode);

    this.Mastervalue = CryptoJS.AES.decrypt(this.Mastervalue, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  }
  */

  public SaveData(key: string, value: string) {
    if (key.length <= 0) {
      return
    }
    if (value.length <= 0) {
      return
    }
    sessionStorage.setItem(key, value);
  }

  public GetData(key: string) {
    if (key.length <= 0) {
      return ""
    }
    let sValue = ""
    sValue = sessionStorage.getItem(key)!;
    if (sValue == null) {
      sValue = ""
    }
    return sValue
  }

  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }
}
