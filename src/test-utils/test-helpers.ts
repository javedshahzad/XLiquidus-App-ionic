import { Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { of } from 'rxjs';

/**
 * Lightweight test doubles for common native / Ionic services used across specs.
 *
 * Usage in a spec:
 *   import { testProviders } from 'src/test-utils/test-helpers';
 *
 *   beforeEach(async () => {
 *     await TestBed.configureTestingModule({
 *       imports: [ HttpClientTestingModule, ReactiveFormsModule ],
 *       providers: [
 *         ...testProviders,
 *         // any additional overrides
 *       ]
 *     }).compileComponents();
 *   });
 *
 * These are intentionally minimal and safe for the Karma/Jasmine environment.
 * Expand mocks for specific behaviour when asserting interactions.
 */

const appVersionMock = {
  getVersionNumber: () => Promise.resolve('1.0.0'),
  getVersionCode: () => Promise.resolve('100'),
  getAppName: () => Promise.resolve('XLiquidus')
};

const geolocationMock = {
  getCurrentPosition: () =>
    Promise.resolve({
      coords: { latitude: 0, longitude: 0, altitude: null, accuracy: 0, altitudeAccuracy: null, heading: null, speed: null },
      timestamp: Date.now()
    })
};

const inAppBrowserMock = {
  create: (_url?: string, _target?: string, _options?: any) => ({
    on: (_event: string) => ({ subscribe: () => {} }),
    show: () => {},
    close: () => {}
  })
};

const modalControllerMock = {
  create: (_opts?: any) =>
    Promise.resolve({
      present: () => Promise.resolve(),
      dismiss: () => Promise.resolve()
    })
};

const activatedRouteMock = {
  snapshot: { paramMap: { get: (_key: string) => null } },
  params: of({}),
  queryParams: of({}),
  // add other Observables or properties as needed by tests
};

export const testProviders: Provider[] = [
  { provide: AppVersion, useValue: appVersionMock },
  { provide: Geolocation, useValue: geolocationMock },
  { provide: InAppBrowser, useValue: inAppBrowserMock },
  { provide: ModalController, useValue: modalControllerMock },
  { provide: ActivatedRoute, useValue: activatedRouteMock },
  // Provide a real FormBuilder instance for forms in tests
  { provide: FormBuilder, useValue: new FormBuilder() }
];

export function addCommonTestProviders(): Provider[] {
  return [...testProviders];
}
