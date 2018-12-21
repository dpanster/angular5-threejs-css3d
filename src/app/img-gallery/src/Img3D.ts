import * as THREE from 'three';
import * as CSS3DRenderer from 'three-css3drenderer';
import * as TrackballControls from 'three-trackballcontrols';
import { Geometry } from 'three';
import * as TWEEN from 'tween.js';
import * as EXIF from 'exif-js';

/////// NOT WORKING: global problem with fs package/////////////////////////////////
// npm i fs from: https://www.npmjs.com/package/fs
// import * as fs from 'fs';
// import { writeFileSync, readFile } from 'fs';

/**
 * @description Constants for the Type of arrangement of the gallery
 * @default GRID
 * @export
 * @enum {number}
 */
export enum E_ARRANGEMENT { RANDOM, GRID, CUBE, TUBE }

/**
 *
 * @description Some properties about the screen.
 * @interface IScreenProp
 * @param aspRatio - Ratio according screen size value and window width/height.
 * @param scrSize - The scrren size as range from 0.0 .. 1.0
 */
interface IScreenProp {
    aspRatio: number;
    scrSize: number;
}

/**
 *
 *
 * @interface IHtmlImageDetailMenu
 */
interface IHtmlImageDetailMenu {
    value_file_name: HTMLParagraphElement;
    value_img_size_client: HTMLParagraphElement;
    value_img_size_natural: HTMLParagraphElement;
    value_date_time_original: HTMLParagraphElement;
    table_div: HTMLDivElement;
}
enum E_IMG_DETAIL_PROPERTIES { FILE_NAME = 0, IMG_SIZE_NATURAL, IMG_SIZE_CLIENT, DATE_TIME_ORIGINAL }


const IMG_MAX_W = 1000;
const IMG_MAX_H = 1000;
const OFFSET_ORIGIN = 0;
const OFFSET_PADDING = 50;   // It is a single offset, like bottom, top, left or right

/**
 *
 *
 * @export
 * @class Img3D
 */
export class Img3D {

    // dom elements
    private htmlDivCanvas: HTMLDivElement;

    // main parts
    private sceneWebGL: THREE.Scene;
    private sceneCSS: THREE.Scene;

    private camera: THREE.PerspectiveCamera;

    private rendererWebGL: THREE.WebGLRenderer;
    private rendererCSS: THREE.CSS3DRenderer;

    // cam control
    private controls: TrackballControls;
    private tweenCameraPos: TWEEN.Tween;
    private tweenCameraTrgt: TWEEN.Tween;

    // screen obj
    private scrProp: IScreenProp = {} as IScreenProp;

    // grid
    private oGrid: THREE.Object3D = new THREE.Object3D();  // the grid obj that holds the vertices
    private iImgCols = 4;

    // misc obj's
    private nImagesLoaded: number;
    private htmlImageDetailMenu = {} as IHtmlImageDetailMenu;
    private htmlImageDetailMenuObj: CSS3DRenderer.CSS3DObject;
    private arrV3ImgPositions: THREE.Vector3[] = [];
    // private arrHtmlDetailMenu: { property: string, value: HTMLParagraphElement }[] = [
    //     {property: 'Name:', value: new HTMLParagraphElement},
    //     {property: 'Image size (natural):', value: new HTMLParagraphElement},
    //     {property: 'Image size (in canvas):', value: new HTMLParagraphElement},
    //     {property: 'Date time original:', value: new HTMLParagraphElement}
    // ];

    // TODO:  try tuple with prop names enum
    private arrHtmlDetailMenuPropNames: string[] = [
        'Name:',
        'Image size (natural):',
        'Image size (in canvas):',
        'Date time original:'
    ];

    // user input
    private keyPressed: string;


    private eArrangement: E_ARRANGEMENT;

    // getter setter
    public setKeyPressed(keyPressed: string) {
        this.keyPressed = keyPressed;
    }

    public getArrangement(): E_ARRANGEMENT {
        return this.eArrangement;
    }
    public setArrangement(eArr: E_ARRANGEMENT) {
        this.eArrangement = eArr;
    }

    public getImageGridColumns() {
        return this.iImgCols;
    }


    /**
     * @description Creates an instance of Img3D.
     * @param {HTMLDivElement} can
     * @param {number} screenSizePercent
     * @memberof Img3D
     */
    constructor(can: HTMLDivElement, screenSizePercent: number) {
        console.log('ctor Img3D');
        this.nImagesLoaded = 0;
        this.eArrangement = E_ARRANGEMENT.GRID;
        this.htmlDivCanvas = can;
        this.scrProp.aspRatio = (window.innerWidth * screenSizePercent) / (window.innerHeight * screenSizePercent);
        console.log('aspRatio: ' + this.scrProp.aspRatio);

        this.scrProp.scrSize = screenSizePercent;

        // set up camera
        this.initiateCamera();

        // set up scenes in webGl + css3D + renderer
        this.sceneWebGL = new THREE.Scene();
        this.sceneCSS = new THREE.Scene();
        this.initiateCompleteScene();
        this.createRendererCSS();
        this.createRendererWebGL();

        // controls... must focus on rendererCSS, otherwise no control of the scene is possible, specially css elements not in focus
        // because zIndex: An element with greater stack order is always in front of an element with a lower stack order.
        this.initTrackballControls();

        // set renderers
        this.rendererWebGL.render(this.sceneWebGL, this.camera);
        this.rendererCSS.render(this.sceneCSS, this.camera);

        // target view and positioning camera
        this.adjustCamera();

        // a coordinate grid at origin
        // this.addHelpers();

        // user input

        // life cycle
        this.animate();
    }

    /**
     *
     *
     * @private
     * @memberof Img3D
     */
    private initiateCamera() {

        this.camera = new THREE.PerspectiveCamera(
            70,
            this.scrProp.aspRatio,
            1,
            10000
        );
        this.camera.position.set(0, 0, 0);
    }

    /**
     *
     *
     * @private
     * @memberof Img3D
     */
    private createRendererWebGL() {
        this.rendererWebGL = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });
        this.rendererWebGL.setPixelRatio(window.devicePixelRatio);
        this.rendererWebGL.setClearColor(0x000000, 1);
        this.rendererWebGL.setSize(window.innerWidth * this.scrProp.scrSize, window.innerHeight * this.scrProp.scrSize);

        this.rendererWebGL.domElement.style.position = 'absolute'; // required
        // this.rendererWebGL.domElement.style.top = '0px';
        this.rendererWebGL.domElement.style.zIndex = '1'; // required

        this.htmlDivCanvas.appendChild(this.rendererWebGL.domElement);
    }


    /**
     *
     *
     * @private
     * @memberof Img3D
     */
    private createRendererCSS() {

        this.rendererCSS = new CSS3DRenderer.CSS3DRenderer();
        this.rendererCSS.setSize(window.innerWidth * this.scrProp.scrSize, window.innerHeight * this.scrProp.scrSize);
        this.rendererCSS.domElement.style.position = 'absolute';
        // this.rendererCSS.domElement.style.top = '0px';
        this.rendererCSS.domElement.style.zIndex = '2'; // required
        this.htmlDivCanvas.appendChild(this.rendererCSS.domElement);
    }


    /**
     *
     *
     * @private
     * @memberof Img3D
     */
    private initiateCompleteScene() {

        // add images
        this.loadImageScene(true, false, this.eArrangement);

        // add grid
        this.loadLineGrid();
        this.showGrid(false);

        // add detail menu

        this.htmlImageDetailMenu.table_div = document.createElement('div');
        this.htmlImageDetailMenu.table_div.className = 'detailMenu w3-container';

        // for each row ... create cols + p
        for (let index = 0; index < this.arrHtmlDetailMenuPropNames.length; index++) {
            const row: HTMLDivElement = document.createElement('div');
            const leftCol: HTMLDivElement = document.createElement('div');
            const rightCol: HTMLDivElement = document.createElement('div');
            const property: HTMLParagraphElement = document.createElement('p');

            row.className = 'w3-row w3-container';
            leftCol.className = 'w3-col s5 ';
            rightCol.className = 'w3-col s7 ';

            property.textContent = this.arrHtmlDetailMenuPropNames[index];
            leftCol.appendChild(property);
            row.appendChild(leftCol);

            switch (index) {
                case E_IMG_DETAIL_PROPERTIES.FILE_NAME:
                    this.htmlImageDetailMenu.value_file_name = document.createElement('p');
                    rightCol.appendChild(this.htmlImageDetailMenu.value_file_name);
                    break;
                case E_IMG_DETAIL_PROPERTIES.IMG_SIZE_CLIENT:
                    this.htmlImageDetailMenu.value_img_size_client = document.createElement('p');
                    rightCol.appendChild(this.htmlImageDetailMenu.value_img_size_client);
                    break;
                case E_IMG_DETAIL_PROPERTIES.IMG_SIZE_NATURAL:
                    this.htmlImageDetailMenu.value_img_size_natural = document.createElement('p');
                    rightCol.appendChild(this.htmlImageDetailMenu.value_img_size_natural);
                    break;
                case E_IMG_DETAIL_PROPERTIES.DATE_TIME_ORIGINAL:
                    this.htmlImageDetailMenu.value_date_time_original = document.createElement('p');
                    rightCol.appendChild(this.htmlImageDetailMenu.value_date_time_original);
                    break;
                default:
                    break;
            }

            row.appendChild(rightCol);
            this.htmlImageDetailMenu.table_div.appendChild(row);
        }

        this.htmlImageDetailMenuObj = new CSS3DRenderer.CSS3DObject(this.htmlImageDetailMenu.table_div);
        this.htmlImageDetailMenuObj.Name = 'htmlImageDetailMenuObj';
        this.sceneCSS.add(this.htmlImageDetailMenuObj);
    }


    /**
     * @description Set the target position and target view point
     *              depend on the current arrangement.
     *              Note that's trackball controlls overrides THREE. camera.lookAt().
     *
     * @memberof Img3D
     */
    public adjustCamera() {
        const component: Img3D = this;
        const cam: THREE.PerspectiveCamera = component.camera;
        const trgt: THREE.Vector3 = component.controls.target;
        this.tweenCameraPos = new TWEEN.Tween({ x: cam.position.x, y: cam.position.y, z: cam.position.z });
        this.tweenCameraTrgt = new TWEEN.Tween({ x: trgt.x, y: trgt.y, z: trgt.z });

        switch (this.eArrangement) {
            case E_ARRANGEMENT.RANDOM:
                this.tweenCameraTrgt.to({ x: 1000, y: 0, z: 0 }, 1000);
                this.tweenCameraPos.to({ x: 500, y: 500, z: 3000 }, 2000);
                break;
            case E_ARRANGEMENT.GRID:
                this.tweenCameraTrgt.to({ x: 2000, y: -800, z: 0 }, 1000);
                this.tweenCameraPos.to({ x: 1700, y: -400, z: 3500 }, 2000);
                break;
            default:
                console.log(`case '${this.eArrangement}' in adjustCamera() not implemented.`);
        }

        // options and execute tweens
        this.tweenCameraPos
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(function () {
                cam.position.set(this.x, this.y, this.z);
            })
            .start();

        this.tweenCameraTrgt
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(function () {
                trgt.x = this.x;
                trgt.y = this.y;
                trgt.z = this.z;
            })
            .start();
    }

    /**
     *
     *
     * @param {boolean} bDefGal
     * @param {boolean} [bFullLoad] optional (used when load default gallery)
     * @memberof Img3D
     */
    public loadImageScene(bDefGal: boolean, bFullLoad?: boolean, eArr?: E_ARRANGEMENT) {

        const scCSS = this.sceneCSS;  // scCSS referenced 'this' to the image function, this is the workaround
        const comp: Img3D = this;

        // load and draw images
        if (bDefGal === true) {
            // load the default gallery images into CSS3DObjects
            // (load X images by default... the other XX default images can be loaded after clicking "load all images")
            let iColCnt = 0;
            let iRowCnt = 0;

            this.nImagesLoaded = (bFullLoad === true) ? 46 : 7;

            for (let i = 1; i <= this.nImagesLoaded; i++) {
                const img = new Image();
                img.src = 'assets/galleries/example (' + i + ').jpg';

                img.onload = function () {
                    const th = this as HTMLInputElement;

                    // add css3d things
                    const el = document.createElement('div');
                    el.className = 'galImg';
                    // el.textContent = img.src;
                    // this.sceneCSS.add(new CSS3DRenderer.CSS3DObject(el));

                    const photo = document.createElement('img');
                    photo.src = th.src;

                    // Resize if neccessary to IMG_MAX_ .
                    // If the largest size > 1000 px reduce with % to max 1000 px the largest size.
                    // Adapt the smaller one with the same %.
                    let wImg = Number(th.width);
                    let hImg = Number(th.height);
                    // console.log(`Original w: ${wImg} x h:${hImg}`);

                    const nBiggest: number = (hImg > wImg) ? hImg : wImg;
                    if (nBiggest > IMG_MAX_H) {
                        const nScaleF = 100 / nBiggest * IMG_MAX_H;
                        // console.log('scaleF: ' + nScaleF);
                        wImg = Math.floor(wImg * nScaleF / 100);
                        hImg = Math.floor(hImg * nScaleF / 100);
                        // console.log(`Resized w: ${wImg} x h:${hImg}`);
                    }
                    photo.width = wImg;
                    photo.height = hImg;

                    // set event listeners
                    el.addEventListener('click', function (event) {
                        const child: HTMLInputElement = this.firstChild as HTMLInputElement;
                        console.log('this: ' + JSON.stringify(child.src));
                    }, false);

                    el.addEventListener('mouseover', function (event) {
                        const child: HTMLInputElement = this.firstChild as HTMLInputElement;
                        // console.log('mouseover');

                        // positioning menu
                        comp.htmlImageDetailMenuObj.position.x = comp.camera.position.x + 400;
                        comp.htmlImageDetailMenuObj.position.y = comp.camera.position.y - 200;
                        comp.htmlImageDetailMenuObj.position.z = comp.camera.position.z - 600;
                        // fill / show menu
                        comp.htmlImageDetailMenu.table_div.style.visibility = 'visible';
                        // comp.htmlImageDetailMenu.table_div.style.opacity = '1.0';
                        comp.htmlImageDetailMenu.value_file_name.textContent = child.src.substr(child.src.lastIndexOf('/') + 1);
                        comp.htmlImageDetailMenu.value_img_size_client.textContent = `(H x B)
                         ${child.clientHeight} px X ${child.clientWidth} px`;
                        // more via exif-tags
                        EXIF.getData(child, function () {
                            comp.htmlImageDetailMenu.value_img_size_natural.textContent =
                                `${EXIF.getTag(this, 'PixelYDimension')} x ${EXIF.getTag(this, 'PixelXDimension')} px`;
                            comp.htmlImageDetailMenu.value_date_time_original.textContent =
                                `${EXIF.getTag(this, 'DateTimeOriginal')}`;
                            // console.log(EE.getAllTags(this));
                        });

                        // natural size property not accessible, why ???
                        // comp.htmlImageDetailMenu.value_img_size_natural.textContent = `(H x B) ${child.naturalHeight}
                        // px X ${child.naturalWidth} px`;

                    }, false);

                    el.addEventListener('mouseout', function (event) {
                        const child: HTMLInputElement = this.firstChild as HTMLInputElement;
                        // console.log('mouseout');
                        comp.htmlImageDetailMenu.table_div.style.visibility = 'hidden';
                        // tween it out! ...
                        // const tw: TWEEN.Tween = new TWEEN.Tween(
                        //     { opacity: comp.htmlImageDetailMenu.table_div.style.opacity })
                        //     .to({ opacity: '0.0' }, 2000)
                        //     .onUpdate(function () {
                        //         comp.htmlImageDetailMenu.table_div.style.opacity = this.opacity;
                        //     })
                        //     .start();
                    }, false);


                    el.appendChild(photo);
                    const objImg = new CSS3DRenderer.CSS3DObject(el);

                    // the arrangement part for css3D images
                    switch (eArr) {
                        case E_ARRANGEMENT.RANDOM:
                            objImg.position.y = Math.random() * 3000;
                            objImg.position.z = (Math.random() * 6500) - 6000;
                            objImg.position.x = (Math.random() * 5000) - 1000;

                            comp.arrV3ImgPositions.push(objImg.position);
                            break;
                        case E_ARRANGEMENT.GRID:
                            // image position default is center of image
                            objImg.position.x = iColCnt * (IMG_MAX_W + OFFSET_PADDING * 2) + (IMG_MAX_W / 2) + OFFSET_PADDING;
                            objImg.position.y = -iRowCnt * (IMG_MAX_H + OFFSET_PADDING * 2) - (IMG_MAX_H / 2) - OFFSET_PADDING;
                            objImg.position.z = 0;
                            // console.log('img no: ' + i + ',pos: x:' + iColCnt * IMG_MAX_W + ', y: ' + iRowCnt * IMG_MAX_H);

                            // finally, to beware the grid presentation --> mod(iImgCols) and new row if true
                            iColCnt++;
                            if (iColCnt % comp.iImgCols === 0) {
                                iColCnt = 0;
                                iRowCnt++;
                            }

                            break;
                        default:
                            break;
                    }

                    scCSS.add(objImg);
                    console.log('CSS img added: ' + photo.src);
                };
            }
        }
    }

    /**
     * @description The current css3d scene (image gallery) will not removed,
     *              only set the new arrangement. The Grid must killed and created new.
     * @memberof Img3D
     */
    public arrangeImageScene() {
        const component: Img3D = this;

        let iColCnt = 0;
        let iRowCnt = 0;
        console.log('image arrangement: E_ARRANGEMENT.' + this.eArrangement);
        console.log('this.sceneCSS.children.length: ' + this.sceneCSS.children.length);

        for (const it of this.sceneCSS.children) {
            // create a tween
            // console.log(`
            //     id: ${it.id}
            //     pos: ${it.position.x}, ${it.position.y}, ${it.position.z}
            // `);


            const twImgPos = new TWEEN.Tween({
                x: it.position.x,
                y: it.position.y,
                z: it.position.z
            });

            switch (this.eArrangement) {
                case E_ARRANGEMENT.RANDOM:
                    twImgPos.to(
                        {
                            x: Math.random() * 3000,
                            y: (Math.random() * 4000) - 2000,
                            z: (Math.random() * 5000) - 5000
                        }, 4000);
                    // it.position.y = Math.random() * 3000;
                    // it.position.z = (Math.random() * 6500) - 6000;
                    // it.position.x = (Math.random() * 5000) - 1000;
                    break;
                case E_ARRANGEMENT.GRID:
                    // Note: image position default is center of image
                    twImgPos.to(
                        {
                            x: iColCnt * (IMG_MAX_W + OFFSET_PADDING * 2) + (IMG_MAX_W / 2) + OFFSET_PADDING,
                            y: -iRowCnt * (IMG_MAX_H + OFFSET_PADDING * 2) - (IMG_MAX_H / 2) - OFFSET_PADDING,
                            z: 0
                        }, 4000);
                    // it.position.x = iColCnt * (IMG_MAX_W + OFFSET_PADDING * 2) + (IMG_MAX_W / 2) + OFFSET_PADDING;
                    // it.position.y = -iRowCnt * (IMG_MAX_H + OFFSET_PADDING * 2) - (IMG_MAX_H / 2) - OFFSET_PADDING;
                    // it.position.z = 0;
                    // console.log('img no: ' + 0 + ',pos: x:' + iColCnt * IMG_MAX_W + ', y: ' + iRowCnt * IMG_MAX_H);

                    // finally, to beware the grid presentation --> mod(iImgCols) and new row if true
                    iColCnt++;
                    if (iColCnt % this.iImgCols === 0) {
                        iColCnt = 0;
                        iRowCnt++;
                    }

                    break;
                default:
                    break;
            }
            // options and execute tween
            twImgPos
                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                .onUpdate(function () {
                    it.position.set(this.x, this.y, this.z);
                })
                .start();
        }
        // cam
        this.adjustCamera();
    }



    public loadLineGrid() {

        // draw a grid
        let geometry: THREE.Geometry;
        const material = new THREE.LineBasicMaterial({ color: 0x00ee00, linewidth: 5 });
        let line: THREE.Line;

        switch (this.eArrangement) {
            case E_ARRANGEMENT.RANDOM:
                // console.log(this.arrV3ImgPositions.length);
                // this.oGrid = new THREE.Object3D();

                // // for .. of --> for arrays
                // let i = 0;
                // for (const v3 of this.arrV3ImgPositions) {
                //     geometry = new Geometry();
                //     geometry.vertices.push(new THREE.Vector3(i * 10, i * i + 10, -100 + (i * 10))); // x, y, z
                //     geometry.vertices.push(new THREE.Vector3(100, 100*i, -100 + (i * 10))); // x, y, z
                //     geometry.vertices.push(new THREE.Vector3(-i*i*100, 100*i, -100 + (i * 10))); // x, y, z
                //     line = new THREE.Line(geometry, material);
                //     this.oGrid.add(line);
                //     i++;
                // }
                // this.sceneWebGL.add(this.oGrid);
                break;
            case E_ARRANGEMENT.GRID:
                // to draw the grid rows...
                const numOfRows = Math.ceil(this.nImagesLoaded / this.iImgCols) + 1; // round up if rest
                for (let i = 0; i < numOfRows; i++) {
                    geometry = new Geometry();
                    geometry.vertices.push(new THREE.Vector3(0, -(i * (IMG_MAX_H + OFFSET_PADDING * 2)), 0)); // x, y, z
                    geometry.vertices.push(new THREE.Vector3(
                        (IMG_MAX_W + OFFSET_PADDING * 2) * this.iImgCols,
                        - (i * (IMG_MAX_H + OFFSET_PADDING * 2)),
                        0));
                    line = new THREE.Line(geometry, material);
                    this.oGrid.add(line);
                }

                // draw column lines to present the grid
                const numOfCols = this.iImgCols + 1;
                for (let i = 0; i < numOfCols; i++) {
                    geometry = new Geometry();
                    geometry.vertices.push(new THREE.Vector3(i * (IMG_MAX_W + OFFSET_PADDING * 2), 0, 0)); // x, y, z
                    geometry.vertices.push(new THREE.Vector3(
                        i * (IMG_MAX_W + OFFSET_PADDING * 2),   // x
                        - ((IMG_MAX_H + OFFSET_PADDING * 2) * (numOfRows - 1)), // y
                        0));    // z
                    line = new THREE.Line(geometry, material);
                    this.oGrid.add(line);
                }

                this.oGrid.position.set(OFFSET_ORIGIN, -OFFSET_ORIGIN, 0);
                this.sceneWebGL.add(this.oGrid);
                break;
            default:
                break;
        }
    }

    /**
     *
     *
     * @private
     * @memberof Img3D
     */
    private animate() {
        const cp: Img3D = this;

        (function render(time) {
            requestAnimationFrame(render);

            // User input
            cp.updateKeyPressed();

            cp.controls.update(); // trackball controls

            cp.rendererCSS.render(cp.sceneCSS, cp.camera);
            cp.rendererWebGL.render(cp.sceneWebGL, cp.camera); // renderer

            TWEEN.update(time);


        }());
    }

    /**
     *
     *
     * @returns {String}
     * @memberof Img3D
     */
    public getClassName(): String {
        return 'TestClassName';
    }

    /**
     *
     *
     * @private
     * @memberof Img3D
     */
    private addHelpers() {
        // axes
        const axes = new THREE.AxesHelper(100);
        this.sceneWebGL.add(axes);

        // 90° grid
        const size = 10000;
        const divisions = 10;
        const gridHelperX = new THREE.GridHelper(size, divisions);
        gridHelperX.rotateX(THREE.Math.degToRad(90));
        this.sceneWebGL.add(gridHelperX);

        const gridHelperY = new THREE.GridHelper(size, divisions);
        gridHelperY.rotateX(THREE.Math.degToRad(180));
        this.sceneWebGL.add(gridHelperY);
    }

    /**
     *
     *
     * @private
     * @memberof Img3D
     */
    private initTrackballControls() {
        // track control
        this.controls = new TrackballControls(this.camera, this.rendererCSS.domElement);
        // this.controls = new TrackballControls(this.camera, this.rendererWebGL.domElement);
        this.controls.rotateSpeed = 3;
        this.controls.dynamicDampingFactor = 0.5;
        this.controls.noPitch = true;
        this.controls.noYaw = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 10000;
    }


    /**
     * @description Jumping with arrow keys from image to image
     *
     * @private
     * @memberof Img3D
     */
    private updateKeyPressed() {
        const xSpeed = 40;
        const ySpeed = 40;

        //         for (const it of this.sceneCSS.children) {
        // it.position.x
        //         }

        // handle keyboard events
        switch (this.keyPressed) {
            case 'ArrowUp':
                this.camera.position.set(
                    this.camera.position.x,
                    (this.camera.position.y += ySpeed),
                    this.camera.position.z
                );
                this.controls.target.y += ySpeed;
                break;
            case 'ArrowDown':
                this.camera.position.set(
                    this.camera.position.x,
                    (this.camera.position.y -= ySpeed),
                    this.camera.position.z
                );
                this.controls.target.y -= ySpeed;
                break;
            default:

                break;
        }
    }

    /**
     *
     *
     * @memberof Img3D
     */
    public onResize() {
        this.camera.aspect = this.scrProp.aspRatio;
        this.camera.updateProjectionMatrix();
        console.log(`onResize: Witdh: ${window.innerWidth * this.scrProp.scrSize}, Height: ${window.innerHeight * this.scrProp.scrSize}`);

        this.rendererCSS.setSize(window.innerWidth * this.scrProp.scrSize, window.innerHeight * this.scrProp.scrSize);
        this.rendererWebGL.setSize(window.innerWidth * this.scrProp.scrSize, window.innerHeight * this.scrProp.scrSize);
    }


    /**
     * @description Remove only the images from the CSS3d scene
     *
     * @memberof Img3D
     */
    public removeImgObj() {
        // @deprecated not good
        const htmlTmpObj = this.htmlImageDetailMenuObj;

        while (this.sceneCSS.children.length) {
            this.sceneCSS.remove(this.sceneCSS.children[0]);
        }
        this.sceneCSS.add(htmlTmpObj);

        // better go for a reference like
        // this.sceneCSS.remove(this.sceneWebGL.getObjectById(this.imgobj.id));
    }


    /**
     * @description Remove the grid from the WebGL scene.
     *
     * @memberof Img3D
     */
    public removeGrid() {
        this.sceneWebGL.remove(this.sceneWebGL.getObjectById(this.oGrid.id));
        this.oGrid = new THREE.Object3D();
    }

    public showGrid(bShow: boolean) {
        this.oGrid.visible = bShow;
        console.log(`Show grid: ${bShow}`);

    }

    public toggleCamYawCtrl(bCamYawCtrl: boolean) {
        console.log(`YAW: ${!bCamYawCtrl}`);
        this.controls.noYaw = !bCamYawCtrl;
    }

    public toggleCamPitchCtrl(bCamPitchCtrl: boolean) {
        console.log(`PITCH: ${!bCamPitchCtrl}`);
        this.controls.noPitch = !bCamPitchCtrl;
    }

    /**
     * @param {number} iImgCols
     * @memberof Img3D
     */
    public setNewGridColSize(iImgCols: number) {
        this.iImgCols = iImgCols;
    }
}
