import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './services/app.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { B2C_config_setting } from './B2C_config_setting';
import { httpClientInterceptor } from './interceptor/httpClient.interceptor';
import { EncryptionDecryptionService } from './services/encryption.service';
import { AppEnum } from './appEnum/appenum';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { Network } from '@ionic-native/network/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FingerprintjsProAngularModule } from '@fingerprintjs/fingerprintjs-pro-angular';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    NgSelectModule,
    FingerprintjsProAngularModule.forRoot({loadOptions: {apiKey: environment.FingerprintApiKey}})
  ],
  providers: [
    HTTP,
    AppEnum,
    SplashScreen,
    StatusBar,
    EncryptionDecryptionService,
    AppService,
    B2C_config_setting,
    NetworkInterface,
    UniqueDeviceID,
    Geolocation,
    AppVersion,
    NgChartsModule,
    Network,
    Clipboard,
    { provide: HTTP_INTERCEPTORS, useClass: httpClientInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
