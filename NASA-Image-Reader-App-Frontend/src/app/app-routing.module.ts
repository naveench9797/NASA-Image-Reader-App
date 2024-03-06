import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchMarsRoverImagesComponent } from './marsroverphotos/fetch-mars-rover-images/fetch-mars-rover-images.component';
import { MarsRoverImagesComponent } from './marsroverphotos/mars-rover-images/mars-rover-images.component';

const routes: Routes = [{
  path: '', component: FetchMarsRoverImagesComponent, pathMatch: 'full'
},
{
  path: 'marsroverimages', component: MarsRoverImagesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
