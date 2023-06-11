import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RentalsService } from './rentals.service';

describe('RentalsServiceService', () => {
  let service: RentalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RentalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
