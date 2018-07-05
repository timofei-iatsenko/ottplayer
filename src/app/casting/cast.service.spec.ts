import { TestBed, inject } from '@angular/core/testing';

import { CastService } from './cast.service';

describe('CastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CastService]
    });
  });

  it('should be created', inject([CastService], (service: CastService) => {
    expect(service).toBeTruthy();
  }));
});
