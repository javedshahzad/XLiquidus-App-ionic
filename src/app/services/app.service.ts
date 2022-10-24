import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { AlertController, LoadingController, MenuController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import jwt_decode from "jwt-decode";
import { Location } from '@angular/common';
import { Network } from '@ionic-native/network/ngx';
import Swal from 'sweetalert2';

interface apiResponse {
  status: number,
  data: any
}

@Injectable({
  providedIn: 'root'
})

export class AppService {
  //public apiUrl = "https://inverse-xl.usscyber.com/v3/";    //development url
 public apiUrl = "https://mobious-xl.usscyber.com/v3/";    //production url
 // public apiUrl = "https://inverse.usscyber.com/v3/";
  public blockChainTransactionBaseUrl = "https://explorer.usscyber.com/transaction/";
  public ipAddress: any = { "ip": '127.0.0.1' };
  public loggedInUserDetails: any = { "email": "jamil.test.usscyber@gmail.com" };
  public interfaceID: any = 'AKUID2252C58E-0F3D-4073-9CC0-294A9BD51829-543A1CA8-42FA-43FC-9B50-12B801312604-BEF9374B-8E29-4837-B11C-C19F7F076477-1F09A2EF-7FEC-4357-9265-2FE978866065';
  public loggedInUserAccountDetails: any = {};
  public access_token;
  public isLoading = false;
  public isPrgressBarShow = false;
  public UploadMaxRetryHit = 3;
  public cartRefresh = new BehaviorSubject(false);
  public connectionPopup = false;

  constructor(
    public http: HttpClient,
    private _nativeHttp: HTTP,
    public platform: Platform,
    public _toastController: ToastController,
    private _menuCtrl: MenuController,
    public _nav: NavController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private _location: Location,
    public _alertController: AlertController,
    public networkInterface: NetworkInterface,
    private network: Network,
  ) {

  }

  checkConnection() {
    this.network.onDisconnect().subscribe(() => {
      Swal.fire({
        icon: "error",
        text: "No Internet connection...",
        allowOutsideClick: false,
        showConfirmButton: false,
        heightAuto:false
      }).then((res:any)=>{
        console.log("Swall is show",res);
      }).catch(err=>{
        console.log(err);
      });
      this.connectionPopup = true;
      // this.presentToast('No Internet connection...');
    });

    this.network.onConnect().subscribe(() => {
      if (this.connectionPopup) {
        Swal.fire({
          icon: "success",
          text: 'Internet connected',
          allowOutsideClick: true,
          showConfirmButton: true,
          timer: 1500,
          heightAuto:false
        }).then( (res:any) =>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        });
        this.connectionPopup = false;
      }
      // this.presentToast('Internet connected');
    });
  }

  goBack() {
    this._location.back();
  }


  deCodeJwtToken(token) {
    var ths = this;
    return new Promise(function (resolve, reject) {
      if (token) {
        ths.access_token = token;
        var decoded = jwt_decode(token);
        var decodedHeader = jwt_decode(token, { header: true });
        console.log(decodedHeader, decoded);
        if (decoded['emails']) {
          if (decoded['emails'].length > 0) {
            var userDetails = {
              email: decoded['emails'][0],
              name: decoded['name'],
              given_name: decoded['given_name'],
              family_name: decoded['family_name'],
              oid: decoded['oid']
            }
            Object.assign(ths.loggedInUserDetails, userDetails);
          }
        } else if (decoded['email']) {
          var userDetails = {
            email: decoded['email'],
            name: decoded['name'],
            given_name: decoded['given_name'],
            family_name: decoded['family_name'],
            oid: decoded['oid']
          }
          Object.assign(ths.loggedInUserDetails, userDetails);
        }
        if (ths.loggedInUserDetails['email'] && ths.loggedInUserDetails['email'] != '') {
          console.log('loggedInUserDetails', ths.loggedInUserDetails)
          resolve(ths.loggedInUserDetails);
        } else {
          reject("error in payload in ");
        }
      } else {
        reject("error in payload in ");
      }
    });
  }

  getAppDateTime(d) {
    var d1 = new Date(d);
    return d1.toISOString();
  }

  async getIpAddress() {
    return this.platform.ready().then(() => {
      return this.networkInterface.getCarrierIPAddress().then(address => {
        console.log(address);
        this.ipAddress = address;
        return address;
      }).catch(error => {
        this.ipAddress = this.networkInterface.getWiFiIPAddress();
        console.log(this.ipAddress);
        return this.networkInterface.getWiFiIPAddress();
      });
    });
  }

  inAppBrowserExitEvent() {
    //  return this.platform.is('android')?'loadstop':'loadstart';
    return 'loadstop';
    //  return 'loadstart';
  }

  inAppBrowserOption() {
    var options: InAppBrowserOptions = {
      location: 'no',//Or 'no' 
      hidden: 'no', //Or  'yes'
      clearcache: 'yes',
      clearsessioncache: 'yes',
      zoom: 'no',//Android only ,shows browser zoom controls 
      fullscreen: 'yes',
      hardwareback: 'yes',
      mediaPlaybackRequiresUserAction: 'no',
      shouldPauseOnSuspend: 'no', //Android only 
      closebuttoncaption: 'Close', //iOS only
      disallowoverscroll: 'no', //iOS only 
      toolbar: 'yes', //iOS only 
      enableViewportScale: 'no', //iOS only 
      allowInlineMediaPlayback: 'no',//iOS only 
      presentationstyle: 'pagesheet',//iOS only  
    };
    return options;
  }

  async presentLoading(message = "") {
    if (!this.isLoading) {
      this.isLoading = true;
      return await this.loadingController.create({
        message: message == "" ? 'Please wait...' : message,
        duration:18000,
      }).then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => null);
          }
        });
      });
    }
  }

  async loaderDismiss() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => null);
    }
  }

  async presentToast(msg) {
    const toast = await this._toastController.create({
      message: msg,
      position: 'bottom',
      color: "primary",
      keyboardClose: true,
      duration: 2000
    });
    toast.present();
  }

  getHttpHeaders() {
    const authToken = this.access_token;
    console.log("Access token=",authToken);
    var headers;
    if (authToken) {
      headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'access-control-allow-methods': 'GET,PUT,POST,DELETE',
        'Clear-Site-Data': "*",
        'Access-Control-Allow-Credentials': 'true',
        'appInterfaceId': this.interfaceID,
        'platform-interface-id': this.interfaceID,
        'Authorization': `Bearer ${authToken}`,
        //'www-authenticate': `Bearer ${authToken}`,
      };
    }
    else {
      headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'access-control-allow-methods': 'GET,PUT,POST,DELETE',
        'Clear-Site-Data': "*",
        'Access-Control-Allow-Credentials': 'true',
        'appInterfaceId': this.interfaceID,
        'platform-interface-id': this.interfaceID,
      };
    }
    return headers;
  }

  getDataByHttp(url) {
    url = this.apiUrl + url;
    console.log(url);
    return this.platform.is('cordova') ? this.getDataByNative(url) : this.getData(url);
  }

  postDataByHttp(url, data) {
    url = this.apiUrl + url;
    console.log(url, JSON.stringify(data));
    return this.platform.is('cordova') ? this.postDataByNative(url, data) : this.postData(url, data);
  }
  putDataByHttp(url, data) {
    url = this.apiUrl + url;
    return this.platform.is('cordova') ? this.putDataByNative(url, data) : this.putData(url, data);
  }

  deleteDataByHttp(url) {
    url = this.apiUrl + url;
    return this.platform.is('cordova') ? this.deleteDataByNative(url) : this.deleteData(url);
  }

  getDataByPromissHttp(url) {
    url = this.apiUrl + url;
    return this.platform.is('cordova') ? this.getDataByNativePromiss(url) : this.getDataByPromiss(url);
  }

  postDataByPromissHttp(url, data) {
    console.log(url);
    return this.platform.is('cordova') ? this.postDataByNativePromiss(url, data) : this.postDataByPromise(url, data);
  }
  putDataByPromissHttp(url, data) {
    // url = this.apiUrl + url;
    return this.platform.is('cordova') ? this.putDataByNativePromiss(url, data) : this.putDataByPromise(url, data);
  }
  deleteDataByPromissHttp(url) {
    url = this.apiUrl + url;
    return this.platform.is('cordova') ? this.deleteDataByNativePromiss(url) : this.deleteDataByPromiss(url);
  }


  getDataByNative(url): Observable<any> {
    return from(this._nativeHttp.get(url, {}, this.getHttpHeaders())).pipe(retry(this.UploadMaxRetryHit), map(results => {
      console.log(results);
      var _res: apiResponse = { status: results.status, data: JSON.parse(results.data) }

      return _res;
    }, err => {
      console.log("errrr", err);
      var _err: apiResponse = { status: err.status, data: err };
      console.log("eroor message2", _err)
      this.customErrorHandler(_err);
      return _err;
    }));
  }

  postDataByNative(url, data): Observable<any> {
    this._nativeHttp.setDataSerializer('json');
    return from(this._nativeHttp.post(url, data, this.getHttpHeaders())).pipe(retry(this.UploadMaxRetryHit), map(results => {
      var _res: apiResponse = { status: results.status, data: JSON.parse(results.data) }
      return _res;
    }, err => {
      var _err: apiResponse = { status: err.status, data: err };
      console.log("eroor message2", _err)
      this.customErrorHandler(_err);
      return _err;
    }));
  }

  putDataByNative(url, data): Observable<any> {
    this._nativeHttp.setDataSerializer('json');
    return from(this._nativeHttp.put(url, data, this.getHttpHeaders())).pipe(retry(this.UploadMaxRetryHit), map(results => {
      var _res: apiResponse = { status: results.status, data: JSON.parse(results.data) }
      return _res;
    }, err => {
      var _err: apiResponse = { status: err.status, data: err };
      console.log("eroor message2", _err)
      this.customErrorHandler(_err);
      return _err;
    }));
  }

  deleteDataByNative(url): Observable<any> {
    return from(this._nativeHttp.delete(url, {}, this.getHttpHeaders())).pipe(retry(this.UploadMaxRetryHit), map(results => {
      var _res: apiResponse = { status: results.status, data: JSON.parse(results.data) }
      return _res;
    }, err => {
      var _err: apiResponse = { status: err.status, data: err };
      console.log("eroor message2", _err)
      this.customErrorHandler(_err);
      return _err;
    }));
  }

  getData(url): Observable<any> {
    console.log(url);
    return this.http.get(url)
      .pipe(retry(this.UploadMaxRetryHit), map(results => {
        console.log(results);
        return results;
      }, err => {
        console.log("errrrrr", err)
        this.customErrorHandler(err.Message);
        return err;
      }));
  }

  postData(url, data): Observable<any> {
    console.log(url, JSON.stringify(data));
    return this.http.post(url, data)
      .pipe(retry(this.UploadMaxRetryHit), map(results => {
        console.log(results);
        return results;
      }, err => {
        this.customErrorHandler(err.Message);
      }));
  }

  putData(url, data): Observable<any> {
    console.log(url, JSON.stringify(data));
    return this.http.put(url, data)
      .pipe(retry(this.UploadMaxRetryHit), map(results => {
        console.log(results);
        return results;
      }, err => {
        this.customErrorHandler(err.Message);
      }));
  }

  deleteData(url): Observable<any> {
    console.log(url);
    return this.http.delete(url)
      .pipe(retry(this.UploadMaxRetryHit), map(results => {
        console.log(results);
        return results;
      }, err => {
        this.customErrorHandler(err.Message);
      }));
  }


  getDataByNativePromiss(url): Promise<any> {
    return from(this._nativeHttp.get(url, {}, this.getHttpHeaders())).pipe(retry(this.UploadMaxRetryHit)).toPromise().then(results => {
      var _res: apiResponse = { status: results.status, data: JSON.parse(results.data) }
      return _res;
    }, err => {
      var _err: apiResponse = { status: err.status, data: err };
      console.log("eroor message2", _err)
      this.customErrorHandler(_err);
      return _err;
    });
  }

  postDataByNativePromiss(url, data): Promise<any> {
    this._nativeHttp.setDataSerializer('json');
    url = this.apiUrl + url;
    console.log(url, JSON.stringify(data));
    return from(this._nativeHttp.post(url, data, this.getHttpHeaders())).pipe(retry(this.UploadMaxRetryHit)).toPromise().then(results => {
      var _res: apiResponse = { status: results.status, data: JSON.parse(results.data) }
      return _res;
    }, err => {
      console.log('url', url, err)
      var _err: apiResponse = { status: err.status, data: err };
      console.log("eroor message2", _err)
      this.customErrorHandler(_err);
      return _err;
    });
  }

  putDataByNativePromiss(url, data): Promise<any> {
    return from(this._nativeHttp.put(url, data, this.getHttpHeaders())).pipe(retry(this.UploadMaxRetryHit)).toPromise().then(results => {
      var _res: apiResponse = { status: results.status, data: JSON.parse(results.data) }
      return _res;
    }, err => {
      var _err: apiResponse = { status: err.status, data: err };
      console.log("eroor message2", _err)
      this.customErrorHandler(_err);
      return _err;
    });
  }

  deleteDataByNativePromiss(url): Promise<any> {
    return from(this._nativeHttp.delete(url, {}, this.getHttpHeaders())).pipe(retry(this.UploadMaxRetryHit)).toPromise().then(results => {
      var _res: apiResponse = { status: results.status, data: JSON.parse(results.data) }
      return _res;
    }, err => {
      var _err: apiResponse = { status: err.status, data: err };
      console.log("eroor message2", _err)
      this.customErrorHandler(_err);
      return _err;
    });
  }

  async getDataByPromiss(url): Promise<any> {
    url = this.apiUrl + url;
    // console.log(url);
    return await this.http.get(url).pipe(retry(this.UploadMaxRetryHit)).toPromise().then(_res => {
      return _res;
    }, err => {
      this.customErrorHandler(err);
    });
  }

  async postDataByPromise(url, data): Promise<any> {
    url = this.apiUrl + url;
    console.log(url, JSON.stringify(data));
    return await this.http.post(url, data).pipe(retry(this.UploadMaxRetryHit)).toPromise().then(_res => {
      return _res;
    }, err => {
      this.customErrorHandler(err);
    });
  }

  async putDataByPromise(url, data): Promise<any> {
    url = this.apiUrl + url;
    console.log(url, JSON.stringify(data));
    return await this.http.put(url, data).pipe(retry(this.UploadMaxRetryHit)).toPromise().then(_res => {
      return _res;
    }, err => {
      this.customErrorHandler(err);
    });
  }

  async deleteDataByPromiss(url): Promise<any> {
    url = this.apiUrl + url;
    // console.log(url);
    return await this.http.delete(url).pipe(retry(this.UploadMaxRetryHit)).toPromise().then(_res => {
      return _res;
    }, err => {
      this.customErrorHandler(err);
    });
  }

  getDatafromExternalUrl(url): Observable<any> {
    return this.http.get(url)
      .pipe(retry(this.UploadMaxRetryHit), map(results => {
        console.log('results', results);
        return results;
      }, err => {
        this.customErrorHandler(err.Message);
      }));
  }

  async ionicCustomAlert(title, Subtitle, msg, buttontxt = 'Ok') {
    const alert = await this._alertController.create({
      cssClass: 'ionic-Custom-alertBox',
      header: title,
      subHeader: Subtitle,
      message: msg,
      buttons: [{
        text: buttontxt,
        cssClass: ['confirmation_ok_button', 'confirmation_popup_button'],
      }]
    });

    await alert.present();
  }

  // show Menu

  showMenu() {
    this._menuCtrl.enable(true);
  }

  hideMenu() {
    this._menuCtrl.enable(false);
  }

  customErrorHandler(err: apiResponse) {
    console.error("eerr message", err);
    if (err.status == 401) {
      this._nav.navigateRoot('/token-expires');
    }
  }
}
