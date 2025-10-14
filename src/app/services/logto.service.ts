import { Injectable } from '@angular/core';
import LogtoClient, { Prompt } from '@logto/capacitor';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class LogtoService {

  constructor(
    private _appService:AppService
  ) { }

    InitLogtoIoIOS(){
       const logtoClient = new LogtoClient({
        endpoint: 'https://5r5a7r.logto.app/',
        appId: 'nu451xjzb2pz6manbtt01',
        scopes:['email profile phone roles'],
        prompt:Prompt.Consent,
        resources:[this._appService.apiResourceUrl]
      });
      return logtoClient;
    }
}
