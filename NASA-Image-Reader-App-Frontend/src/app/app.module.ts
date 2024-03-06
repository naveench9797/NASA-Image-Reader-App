import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchMarsRoverImagesComponent } from './marsroverphotos/fetch-mars-rover-images/fetch-mars-rover-images.component';
import { MarsRoverImagesComponent } from './marsroverphotos/mars-rover-images/mars-rover-images.component';

@NgModule({
  declarations: [
    AppComponent,
    FetchMarsRoverImagesComponent,
    MarsRoverImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
