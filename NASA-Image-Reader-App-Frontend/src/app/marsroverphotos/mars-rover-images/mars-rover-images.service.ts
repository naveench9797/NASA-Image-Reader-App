import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarsRoverImagesService {

  constructor(private httpClient: HttpClient) { }

  public GetMarsRoverPhotosByDate(fetchdate: string): Observable<string[]> {
    return this.httpClient.get<string[]>(environment.NASAApiUrl + "api/MarsRoverPhotos/GetMarsRoverPhotosByDate?fetchdate="+ fetchdate);
  }
}
