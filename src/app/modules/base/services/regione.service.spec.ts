import { TestBed } from '@angular/core/testing';

import { RegioneService } from './regione.service';

describe('RegioneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegioneService = TestBed.get(RegioneService);
    expect(service).toBeTruthy();
  });
});
