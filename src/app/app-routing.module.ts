import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CubeThreejsComponent } from './cube-threejs/cube-threejs.component';
import { Css3dThreejsComponent } from './css3d-threejs/css3d-threejs.component';

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
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
