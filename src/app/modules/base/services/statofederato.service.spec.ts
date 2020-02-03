import { TestBed } from '@angular/core/testing';

import { StatofederatoService } from './statofederato.service';

describe('StatofederatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatofederatoService = TestBed.get(StatofederatoService);
    expect(service).toBeTruthy();
  });
});
