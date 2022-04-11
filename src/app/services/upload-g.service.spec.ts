import { TestBed } from '@angular/core/testing';

import { UploadGService } from './upload-g.service';

describe('UploadGService', () => {
  let service: UploadGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
