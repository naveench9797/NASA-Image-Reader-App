import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { MarsRoverImagesService } from './mars-rover-images.service';

@Component({
  selector: 'app-mars-rover-images',
  templateUrl: './mars-rover-images.component.html',
  styleUrls: ['./mars-rover-images.component.css']
})
export class MarsRoverImagesComponent implements OnInit {
  featchDate: Date = new Date();
  dateSelected: string = "";
  imagesUnchanged: string[] = [];
  imageBaseUrl: string = environment.NASAApiUrl;
  images: string[] = [];
  pageNumber = 1;
  pageSize = 12;
  lastPage = 0;
  constructor(private marsRoverImagesService: MarsRoverImagesService, 
    private router: Router, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.dateSelected = this.datePipe.transform(this.featchDate, 'yyyy-MM-dd')!;
    this.fetchImages();
  }
  dateChange(e: any) {

  }
  fetchImages() {
    if (this.dateSelected === null) {
      alert("invalid Date!")
      return;
    }
    this.featchDate = new Date(this.dateSelected);
    const dateString = this.datePipe.transform(this.featchDate, 'yyyy-MM-dd')
    this.marsRoverImagesService.GetMarsRoverPhotosByDate(dateString!).subscribe(data => {
      this.imagesUnchanged = data;
      this.pageNumber = 1;
      this.pageSize = 12;
      this.lastPage = Math.ceil(data.length/12)
      this.loadImages();
    })
  }
  loadImages(): void {
    this.images = this.imagesUnchanged.slice((this.pageNumber - 1)* 12, this.pageNumber * 12);
  }
  nextPage(): void {
    this.pageNumber++;
    this.loadImages();
  }

  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadImages();
    }
  }
}
