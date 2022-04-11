import { TestBed } from '@angular/core/testing';

import { UploadPService } from './upload-p.service';

describe('UploadPService', () => {
  let service: UploadPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
