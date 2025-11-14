import { TestBed } from '@angular/core/testing';

import { LogtoService } from './logto.service';

describe('LogtoService', () => {
  let service: LogtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
