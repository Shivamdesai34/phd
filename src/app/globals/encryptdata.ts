import * as CryptoJS from 'crypto-js';
import {encrypt_key} from "./global-variable";

export function EncryptData(data: any): string {
  if (data == ""){
    return ""
  }
  var ciphertext = CryptoJS.AES.encrypt(data, encrypt_key).toString();
  return ciphertext;
}

export function Decryptdata(ciphertext: any): string {
  if (ciphertext == ""){
    return ""
  }
  var bytes  = CryptoJS.AES.decrypt(ciphertext, encrypt_key);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText
}

export function Encrypt_object(data: any): string {
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encrypt_key).toString();
  return ciphertext;
}

export function encryptUsingAES256(request: any): string {
  //CryptoJS.enc.Utf8.parse(encrypt_key);
  //let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);
  // let encrypted : any = "";

  let _key = CryptoJS.enc.Utf8.parse(encrypt_key);
  let _iv = CryptoJS.enc.Utf8.parse(encrypt_key);

  let encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(request), _iv, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();
}


export function Decrypt_object(cipherdata: any): any {
  var bytes  = CryptoJS.AES.decrypt(cipherdata, encrypt_key);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

export function encrypt(txt: string): string {
  return CryptoJS.AES.encrypt(txt, encrypt_key).toString();
}

export function decrypt(txtToDecrypt: string) {
  return CryptoJS.AES.decrypt(txtToDecrypt, encrypt_key).toString(CryptoJS.enc.Utf8);
}
