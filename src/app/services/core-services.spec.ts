import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiRegistry } from 'src/app/config/api-registry';
import { AuthTokenService } from './auth-token.service';
import { ApiClientService } from './api-client.service';
import { AuthTokenInterceptor } from 'src/app/interceptor/auth-token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('Phase 1 core services smoke tests', () => {
  describe('ApiRegistry', () => {
    let service: ApiRegistry;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ApiRegistry]
      });
      service = TestBed.inject(ApiRegistry);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should build a URL for a registered endpoint', () => {
      // register a temporary endpoint and verify buildUrl produces expected output
      service.registerEndpoint('TEST_HELLO', '/test/hello/{id}');
      const url = service.buildUrl('TEST_HELLO', { id: '123' });
      expect(url).toContain('/test/hello/123');
    });
  });

  describe('AuthTokenService', () => {
    let service: AuthTokenService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AuthTokenService, ApiRegistry]
      });
      service = TestBed.inject(AuthTokenService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should allow setting and getting tokens (localStorage integration smoke)', () => {
      // store token via API surface and read back
      service.setTokens('x', 'y');
      expect(service.getAccessToken()).toBe('x');
      expect(service.getRefreshToken()).toBe('y');
      service.clearTokens();
    });
  });

  describe('ApiClientService', () => {
    let service: ApiClientService;
    let registry: ApiRegistry;
    let tokenService: AuthTokenService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ApiClientService, ApiRegistry, AuthTokenService]
      });
      service = TestBed.inject(ApiClientService);
      registry = TestBed.inject(ApiRegistry);
      tokenService = TestBed.inject(AuthTokenService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should resolve a registry key to a URL', () => {
      registry.registerEndpoint('PING', '/ping/{who}');
      const url = (service as any).resolveUrl('PING', { who: 'me' });
      expect(url).toContain('/ping/me');
    });

    it('should include auth header when token present (buildHeaders smoke)', () => {
      tokenService.setTokens('token-abc', 'r');
      const headers = (service as any).buildHeaders();
      expect(headers.get('Authorization')).toBe('Bearer token-abc');
      tokenService.clearTokens();
    });
  });

  describe('AuthTokenInterceptor', () => {
    let interceptor: AuthTokenInterceptor;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          AuthTokenInterceptor,
          { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
        ]
      });
      interceptor = TestBed.inject(AuthTokenInterceptor);
    });

    it('should be created', () => {
      expect(interceptor).toBeTruthy();
    });
  });
});
