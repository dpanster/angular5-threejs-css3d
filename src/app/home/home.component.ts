import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // thumbnails
  public imgURL_cube_threejs = "assets/screens/thumb_cube_threejs.jpg";
  public imgURL_css3d_threejs = "assets/screens/thumb_css3d_threejs.jpg";
  public imgURL_img_gallery_threejs = "assets/screens/thumb_img_gallery_threejs.jpg";

  constructor() { }

  ngOnInit() {
  }

}
