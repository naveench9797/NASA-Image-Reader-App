import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchMarsRoverImagesService } from './fetch-mars-rover-images.service';

@Component({
  selector: 'app-fetch-mars-rover-images',
  templateUrl: './fetch-mars-rover-images.component.html',
  styleUrls: ['./fetch-mars-rover-images.component.css']
})
export class FetchMarsRoverImagesComponent implements OnInit {  
  featchDate: Date = new Date();
  dateSelected: string = "";
  result:string = "";
  datesArray: string[] = [];
  constructor(private fetchMarsRoverImagesService: FetchMarsRoverImagesService, 
    private router: Router, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.dateSelected = this.datePipe.transform(this.featchDate, 'yyyy-MM-dd')!;
  }
  downLoadImages(){
    if (this.dateSelected === null) {
      alert("invalid Date!")
      return;
    }
    this.featchDate = new Date(this.dateSelected);
    const dateString = this.datePipe.transform(this.featchDate, 'yyyy-MM-dd');
    this.fetchMarsRoverImagesService.DownloadMarsRoverPhotosByDate(dateString!).subscribe(data => {
      this.result = data;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e) => {
      const fileContent: string = reader.result as string;
      this.datesArray = fileContent.split('\n');
      this.fetchImages();
    };

    reader.readAsText(file);
  }

  fetchImages(){
    if(this.datesArray.length > 0){
      this.datesArray.forEach(datetoFetch => {
          const dateSelected = new Date(datetoFetch);
          const dateString = this.datePipe.transform(dateSelected, 'yyyy-MM-dd');
          this.fetchMarsRoverImagesService.DownloadMarsRoverPhotosByDate(dateString!).subscribe((data: string) => {
            this.result += dateString  + ": " + data + "<br />";
          });
      });
    }
  }
}
