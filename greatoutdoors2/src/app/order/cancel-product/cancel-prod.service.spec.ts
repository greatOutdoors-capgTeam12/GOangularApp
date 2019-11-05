import { TestBed } from '@angular/core/testing';

import { CancelProdService } from './cancel-prod.service';

describe('CancelProdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CancelProdService = TestBed.get(CancelProdService);
    expect(service).toBeTruthy();
  });
});
