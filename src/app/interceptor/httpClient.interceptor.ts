import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable()
export class httpClientInterceptor implements HttpInterceptor {
  constructor(
    private _appservices: AppService,) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this._appservices.access_token;
    var headers;
    if (authToken) {
      const authHeader = `Bearer ${authToken}`;
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'access-control-allow-methods': 'GET,PUT,POST,DELETE',
        'Clear-Site-Data': "*",
        'Access-Control-Allow-Credentials': 'true',
        'platform-interface-id': this._appservices.interfaceID,
        'appInterfaceId': this._appservices.interfaceID,
        'Authorization': authHeader
      });
    }
    else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'access-control-allow-methods': 'GET,PUT,POST,DELETE',
        'Clear-Site-Data': "*",
        'Access-Control-Allow-Credentials': 'true',
        'platform-interface-id': this._appservices.interfaceID,
        'appInterfaceId': this._appservices.interfaceID,
      });
    }
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
