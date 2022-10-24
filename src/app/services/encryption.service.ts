import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EncryptionDecryptionService {
  secretKey = "comusscyberxliquidus";
  constructor(
    // private cookieService: CookieService
  ) { }

  hashValueConversion(value: any) {
    var hash = CryptoJS.MD5(value);
    return hash;
  }

  localstorageSetWithEncrypt(key: string, value: any) {
    var encryptedKey = this.encrypt(key);
    var encryptedValue = this.encrypt(value);
    return localStorage.setItem(encryptedKey, encryptedValue)
  }

  localstorageGetWithEncrypt(key: string) {
    var encryptedKey = this.encrypt(key);
    return localStorage.getItem(encryptedKey);
  }

  localstorageRemoveWithEncrypt(key: string) {
    var encryptedKey = this.encrypt(key);
    return localStorage.removeItem(encryptedKey);
  }

  setUUID(key: string) {
    return localStorage.setItem('device', key);
  }

  getUUID() {
    return localStorage.getItem('device');
  }

  // cookieEncrypt(key: string, value: any) {
  //   var encryptedKey = this.encrypt(key);
  //   var encryptedValue = this.encrypt(value);
  //   return this.cookieService.set(encryptedKey, encryptedValue, { expires: 7, path: '/', secure: true, sameSite: 'Strict' });
  // }

  // cookieDecrypt(key: string) {
  //   var encryptedKey = this.encrypt(key);
  //   return this.cookieService.get(encryptedKey);
  // }

  encrypt(value: string) {
    value = value == null ? '' : value;
    var key = CryptoJS.enc.Utf8.parse(this.secretKey);
    var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }

  decrypt(value) {
    value = value == null ? '' : value;
    var key = CryptoJS.enc.Utf8.parse(this.secretKey);
    var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 256 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
