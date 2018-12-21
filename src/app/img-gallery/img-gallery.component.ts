import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {HostListener} from '@angular/core';
import { Img3D } from './src/Img3D';
import { E_ARRANGEMENT } from './src/Img3D';


@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.css']
})

/**
 * @description Main component class for the image gallery example.
 * It uses self created classes for webgl, css3d renderer.
 *
 * @exportll
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

  @ViewChild('btnGrid')
  private btnGrid_Ref: ElementRef;

  @ViewChild('id_spnShowGrid')
  private spnShowGrid_Ref: ElementRef;

  @ViewChild('id_spnRangeGridCols')
  private spnRangeGridCols_Ref: ElementRef;


  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    // console.log(`The user just released ${ev.key}!`);
    this.webGl.setKeyPressed('none');
  }
  @HostListener('document:keydown', ['$event'])
  onKeyDown(ev: KeyboardEvent) {
    // console.log(`The user just pressed ${ev.key}!`);
    this.webGl.setKeyPressed(ev.key);
  }




  /**
   * @description Hold the arrangement types in enum.
   *
   * @memberof ImgGalleryComponent
   */
  eArrgmt = E_ARRANGEMENT;


  /**
   * @private Members of this class
   */
  private webGl: Img3D;


  /**
   * Option settings
   *
   * @private
   * @type {boolean}
   * @memberof ImgGalleryComponent
   */
  private bShowGrid = false;

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
    this.webGl = new Img3D(this.canvasRef.nativeElement, 0.8);

    // set gui state:
    this.btnGrid_Ref.nativeElement.focus();
    console.log('OK');
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


  public filesPicked(files: any) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const path = file.webkitRelativePath.split('/');
      console.log('file ' + i + ': ' + path);
    }

    this.webGl.removeImgObj();

  }

  public arrangeGallery(eBtnArrgmt: E_ARRANGEMENT) {
    console.log(`switch from ${this.webGl.getArrangement()} to: ${eBtnArrgmt}`);

    // reload if state is not same as before, except random arrangement
    if (eBtnArrgmt !== this.webGl.getArrangement() || eBtnArrgmt === E_ARRANGEMENT.RANDOM) {
      // no need to load images again.. only arrange.
      this.webGl.setArrangement(eBtnArrgmt);
      this.webGl.arrangeImageScene();

      // delete the grid and create new
      this.webGl.removeGrid();
      this.webGl.loadLineGrid();  // the loadGrid() has access to the private E_ARRANGEMENT variable of Img3D instance
      this.toggleShowGrid(this.bShowGrid);
    }

    // show hide options depend on arrangement
    if (eBtnArrgmt === E_ARRANGEMENT.RANDOM) {
      this.spnShowGrid_Ref.nativeElement.style.display = 'none';
      this.spnRangeGridCols_Ref.nativeElement.style.display = 'none';
    } else {
      this.spnShowGrid_Ref.nativeElement.style.display = 'initial';
      this.spnRangeGridCols_Ref.nativeElement.style.display = 'initial';
    }
  }

  public arrangeDefault(e: any) {
    console.log(e);
  }

  public toggleLoadFullDefGal(bLoadMax: boolean) {
    // add images
    this.webGl.removeImgObj();
    this.webGl.loadImageScene(true, bLoadMax, this.webGl.getArrangement());

    // add grid
    this.webGl.removeGrid();
    this.webGl.loadLineGrid();
    this.toggleShowGrid(this.bShowGrid);
  }

  /**
   * toggleShowGrid
   */
  public toggleShowGrid(bShowGrid: boolean) {
    this.webGl.showGrid(bShowGrid);
    this.bShowGrid = bShowGrid;
  }

  public toggleCamYawCtrl(bCamYawCtrl: boolean) {
    this.webGl.toggleCamYawCtrl(bCamYawCtrl);
  }
  public toggleCamPitchCtrl(bCamPitchCtrl: boolean) {
    this.webGl.toggleCamPitchCtrl(bCamPitchCtrl);
  }

  /**
   * changeSldNumOfCols
   */
  public changeSldNumOfCols(value: any) {
    this.webGl.setNewGridColSize(Number(value));
    this.webGl.arrangeImageScene();
    // delete the grid and create new
    this.webGl.removeGrid();
    this.webGl.loadLineGrid();
    this.webGl.showGrid(this.bShowGrid);
  }

  public resetPerspective() {
    // this.webGl.resetPerspective();
  }

  public onKey(e: any) {
    const keyCode = e.which;
    console.log('Pressing Key: ' + keyCode);
  }

}
