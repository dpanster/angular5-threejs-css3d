import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public imgURL_cube_threejs = "assets/texture/cube_threejs.jpg";
  public imgURL_css3d_threejs = "/assets/texture/css3d_threejs.jpg";
  constructor() { }

  ngOnInit() {
  }

}
