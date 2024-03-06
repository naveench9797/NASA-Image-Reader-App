import { TestBed } from '@angular/core/testing';

import { MarsRoverImagesService } from './mars-rover-images.service';

describe('MarsRoverImagesService', () => {
  let service: MarsRoverImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarsRoverImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
