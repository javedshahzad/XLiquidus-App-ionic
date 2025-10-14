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
      headers = new HttpHeaders(this._appservices.getHttpHeaders());
    }
    else {
      headers = new HttpHeaders(this._appservices.getHttpHeaders());
    }
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
