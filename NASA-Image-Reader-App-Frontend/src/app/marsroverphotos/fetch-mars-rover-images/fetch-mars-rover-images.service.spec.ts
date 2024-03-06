import { TestBed } from '@angular/core/testing';

import { FetchMarsRoverImagesService } from './fetch-mars-rover-images.service';

describe('FetchMarsRoverImagesService', () => {
  let service: FetchMarsRoverImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchMarsRoverImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
