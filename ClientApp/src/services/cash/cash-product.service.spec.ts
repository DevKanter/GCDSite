import { TestBed } from '@angular/core/testing';

import { CashProductService } from './cash-product.service';

describe('CashProductService', () => {
  let service: CashProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
