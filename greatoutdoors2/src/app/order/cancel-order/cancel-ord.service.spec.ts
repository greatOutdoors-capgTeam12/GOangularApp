import { TestBed } from '@angular/core/testing';

import { CancelOrdService } from './cancel-ord.service';

describe('CancelOrdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CancelOrdService = TestBed.get(CancelOrdService);
    expect(service).toBeTruthy();
  });
});
