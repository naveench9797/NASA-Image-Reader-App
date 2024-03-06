import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchMarsRoverImagesService {

  constructor(private httpClient: HttpClient) { }

  public DownloadMarsRoverPhotosByDate(fetchdate: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain', 
      'Accept': 'text/plain' 
    });
    return this.httpClient.get(environment.NASAApiUrl + "api/MarsRoverPhotos/DownloadMarsRoverPhotosByDate?fetchdate="+ fetchdate, { headers, responseType: 'text' });
  }
}
