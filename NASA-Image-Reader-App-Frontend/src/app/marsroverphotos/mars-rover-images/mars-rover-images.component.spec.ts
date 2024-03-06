import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarsRoverImagesComponent } from './mars-rover-images.component';

describe('MarsRoverImagesComponent', () => {
  let component: MarsRoverImagesComponent;
  let fixture: ComponentFixture<MarsRoverImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarsRoverImagesComponent]
    });
    fixture = TestBed.createComponent(MarsRoverImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
