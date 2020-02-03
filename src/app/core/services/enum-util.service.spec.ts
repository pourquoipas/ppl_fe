import { TestBed } from '@angular/core/testing';

import { EnumUtilService } from './enum-util.service';

describe('EnumUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnumUtilService = TestBed.get(EnumUtilService);
    expect(service).toBeTruthy();
  });
});
