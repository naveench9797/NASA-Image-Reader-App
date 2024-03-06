import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchMarsRoverImagesComponent } from './fetch-mars-rover-images.component';

describe('FetchMarsRoverImagesComponent', () => {
  let component: FetchMarsRoverImagesComponent;
  let fixture: ComponentFixture<FetchMarsRoverImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FetchMarsRoverImagesComponent]
    });
    fixture = TestBed.createComponent(FetchMarsRoverImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
