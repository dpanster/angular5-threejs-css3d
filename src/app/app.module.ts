import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CubeThreejsComponent } from './cube-threejs/cube-threejs.component';
import { HomeComponent } from './home/home.component';
import { Css3dThreejsComponent } from './css3d-threejs/css3d-threejs.component';
import { ImgGalleryComponent } from './img-gallery/img-gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    CubeThreejsComponent,
    HomeComponent,
    Css3dThreejsComponent,
    ImgGalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
