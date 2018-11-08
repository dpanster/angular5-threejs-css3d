import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CubeThreejsComponent } from './cube-threejs/cube-threejs.component';
import { Css3dThreejsComponent } from './css3d-threejs/css3d-threejs.component';
import { ImgGalleryComponent } from './img-gallery/img-gallery.component';

const routes: Routes = [
  {
      path: '',
      component: HomeComponent
  },
  {
      path: 'cube-threejs',
      component: CubeThreejsComponent
  },
  {
      path: 'css3d-threejs',
      component: Css3dThreejsComponent
  },
  {
      path: 'img-gallery',
      component: ImgGalleryComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
