import { TestBed } from '@angular/core/testing';

import { TitoloStudioService } from './titolo-studio.service';

describe('TitoloStudioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitoloStudioService = TestBed.get(TitoloStudioService);
    expect(service).toBeTruthy();
  });
});
