import { TestBed } from '@angular/core/testing';

import { SocietaService } from './societa.service';

describe('SocietaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocietaService = TestBed.get(SocietaService);
    expect(service).toBeTruthy();
  });
});
