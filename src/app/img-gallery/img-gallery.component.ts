import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { Img3D } from "./src/Img3D";

@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.css']
})

/**
 * @description Main component class for the image gallery example.
 * It uses self created classes for webgl, css3d renderer.
 *
 * @export
 * @class ImgGalleryComponent
 * @implements {AfterViewInit}
 */
export class ImgGalleryComponent implements AfterViewInit {

  /** 
   *
   *
   * @private
   * @type {ElementRef}
   * @memberof ImgGalleryComponent
   */
  @ViewChild('canvasImgGal')
  private canvasRef: ElementRef;

  @ViewChild('info')
  private info: ElementRef;

  /**
   * @private Members of this class
   */
  private webGl: Img3D;

  /**
   *Creates an instance of ImgGalleryComponent.
   * @memberof ImgGalleryComponent
   */
  constructor() {
  }

  /**
   *
   *
   * @memberof ImgGalleryComponent
   */
  ngAfterViewInit(): void {
    this.webGl = new Img3D(this.canvasRef.nativeElement, 1.0);
    console.log("OK");

  }

  /**
  * get the canvas element
  * 
  * @readonly
  * @private
  * @type {HTMLDivElement}
  * @memberof ImgGalleryComponent
  */
  private get canvas(): HTMLDivElement {
    return this.canvasRef.nativeElement;
  }

  /**
   * @event
   * @description Update scene after resizing. 
   * @memberof ImgGalleryComponent
   */
  public onResize() {
    this.webGl.onResize();
  }


  public filesPicked(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = file.webkitRelativePath.split('/');
      console.log("file " + i + ": " + path);    
    }

    this.webGl.removeObj();

  }
}
