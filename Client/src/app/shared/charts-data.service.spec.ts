import { TestBed } from '@angular/core/testing';

import { ChartsDataService } from './charts-data.service';

describe('ChartsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartsDataService = TestBed.get(ChartsDataService);
    expect(service).toBeTruthy();
  });
});
