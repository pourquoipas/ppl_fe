import { TestBed } from '@angular/core/testing';

import { FiltersFormService } from './filters-form.service';

describe('FiltersFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltersFormService = TestBed.get(FiltersFormService);
    expect(service).toBeTruthy();
  });
});
