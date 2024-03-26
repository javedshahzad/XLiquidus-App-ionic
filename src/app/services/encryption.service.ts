import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import * as CryptoJS from 'crypto-js';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class EncryptionDecryptionService {
  secretKey = "comusscyberxliquidus";
  public deviceId: string;
  public geolocationparam: string;
  public PackageName: string;
  public DeviceName: string;
  constructor(
    public _appVersion:AppVersion,
    private geolocation: Geolocation,
  ) {
    this.AppBundeID();
    this.GetDeviceID();
    this.DeviceDetails();
   }

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
  async DeviceDetails(){
    const info = await Device.getInfo();
    const DeviceID = await Device.getId();
    console.log(DeviceID)
    console.log(info);
    this.DeviceName = `${info.manufacturer},${info.name},${info.model}`;
    console.log(this.DeviceName)
  }
  AppBundeID(){
    this._appVersion.getPackageName().then((response)=>{
     this.PackageName = response;
     console.log(response)
    })
  }
   async GetDeviceID(){
   await Device.getId().then((uuid) => {
      console.log(uuid)
      this.deviceId = uuid.identifier;
    }).catch((error: any) => {
      console.log("Unique device id",error)
      this.deviceId = this.getUUID();
    });
  }
  async getUserCurrentLocartion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geolocationparam = resp.coords.latitude + ',' + resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location');
    });
  }
}
