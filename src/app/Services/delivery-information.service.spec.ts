import { TestBed } from '@angular/core/testing';

import { DeliveryInformationService } from './delivery-information.service';

describe('DeliveryInformationService', () => {
  let service: DeliveryInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
