import { TestBed } from '@angular/core/testing';

import { NmdService } from './nmd.service';

describe('NmdService', () => {
  let service: NmdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NmdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
