import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

// local class source ts
import * as CSS3dWorld from "./src/main";

@Component({
  selector: 'app-css3d-threejs',
  templateUrl: './css3d-threejs.component.html',
  styleUrls: ['./css3d-threejs.component.css']
})
export class Css3dThreejsComponent implements AfterViewInit {
  /**
   * Canvas Specific vars
  */
  @ViewChild('canvasCSS3d')
  private canvasRef: ElementRef;

  private world: CSS3dWorld.MainCSS3d;


  /**
 * get the css3d canvas
 * 
 * @readonly
 * @private
 * @type {HTMLDivElement}
 * @memberof Css3dThreejsComponent
 */
  private get canvas(): HTMLDivElement {
    return this.canvasRef.nativeElement;
  }


  /**k
   * Creates an instance of Css3dThreejsComponent.
   * @memberof Css3dThreejsComponent
   */
  constructor() {
  }

  /**
   * Wait until template is bound to DOM.
   * 
   * @memberof Css3dThreejsComponent
   */
  public ngAfterViewInit() {
    this.world = new CSS3dWorld.MainCSS3d(this.canvas, 0.6);
    
    // this.canvasRef.nativeElement.style.position = 'relative';

    // let domCanvas:HTMLCanvasElement = document.querySelector("canvas");
    // console.log(domCanvas);
    // domCanvas.style.position = 'relative';
  }


  /* EVENTS */
  /**
   * Update scene after resizing. 
   */
  public onResize() {
    this.world.onResize();
  }
}
