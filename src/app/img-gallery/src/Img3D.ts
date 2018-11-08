
import * as THREE from 'three';
import * as CSS3DRenderer from 'three-css3drenderer';
import * as TrackballControls from 'three-trackballcontrols';

/////// NOT WORKING: global problem with fs package/////////////////////////////////
// npm i fs from: https://www.npmjs.com/package/fs
// import * as fs from 'fs';
// import { writeFileSync, readFile } from 'fs';
///////////////////////////////////////////////////

// npm i glob from: https://www.npmjs.com/package/glob
// import * as Glob from 'glob';

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

    // screen obj
    private scrProp: IScreenProp = {} as IScreenProp;

    /**
     * @description Creates an instance of Img3D.
     * @param {HTMLDivElement} can
     * @param {number} screenSizePercent
     * @memberof Img3D
     */
    constructor(can: HTMLDivElement, screenSizePercent: number) {
        console.log('ctor Img3D');

        this.htmlDivCanvas = can;
        this.scrProp.aspRatio = (window.innerWidth * screenSizePercent) / (window.innerHeight * screenSizePercent);
        console.log('aspRatio: ' + this.scrProp.aspRatio);

        this.scrProp.scrSize = screenSizePercent;

        // 1st set up camera
        this.initiateCamera();


        // 2. set up scene in css3d + renderer
        this.initiateCSS3dScene();
        this.createCSSRenderer();


        // 3. set up scene in webGl + renderer
        /*** init scene */
        this.sceneWebGL = new THREE.Scene();
        const material = new THREE.MeshBasicMaterial();
        material.color.set('green');
        material.opacity = 0;
        material.blending = THREE.NoBlending;
        // any mesh using this material will act as a see-thru to the css renderer
        const cube = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), material);
        this.sceneWebGL.add(cube);
        /**** */
        this.createRendererWebGL();


        // 4. set renderers
        this.rendererWebGL.render(this.sceneWebGL, this.camera);
        this.rendererCSS.render( this.sceneCSS, this.camera );


        // add various things
        // const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        // this.sceneWebGL.add(light);
        // const light2 = new THREE.AmbientLight(0x4FFFFFF); // soft white light
        // this.sceneWebGL.add(light2);



        /// DAMN!!!!
        // object
        // let texture2 = new THREE.TextureLoader().load('assets/texture/Moon_BW.jpg');

        // let material2 = new THREE.MeshBasicMaterial({
        //     map: texture2,
        //     side: THREE.DoubleSide
        // });



        // let group = new THREE.Group();
        // group.position.y = 50;
        // this.scene.add(group);

        // let loader = new THREE.TextureLoader();
        // let texture = loader.load('assets/texture/1.jpg');
        // // it's necessary to apply these settings in order to correctly display the texture on a shape geometry
        // //texture.minFilter = THREE.LinearFilter;


        // let texture2 = loader.load('assets/texture/2.jpg');
        // // it's necessary to apply these settings in order to correctly display the texture on a shape geometry
        // texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
        // texture2.repeat.set(0.008, 0.008);




        // // Square
        // let sqLength = 80;
        // let squareShape = new THREE.Shape();
        // squareShape.moveTo(0, 0);
        // squareShape.lineTo(0, sqLength);
        // squareShape.lineTo(sqLength, sqLength);
        // squareShape.lineTo(sqLength, 0);
        // squareShape.lineTo(0, 0);

        // let color = 0x0040f0;
        // let extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };


        // // flat shape with texture
        // // note: default UVs generated by ShapeBufferGeometry are simply the x- and y-coordinates of the vertices
        // let geometry = new THREE.ShapeBufferGeometry(squareShape);
        // let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, map: texture2 }));
        // mesh.position.set(150, 100, 0 - 175);
        // group.add(mesh);

        // // flat shape
        // let geometry = new THREE.ShapeBufferGeometry(squareShape);
        // let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide, map: texture2 }));
        // mesh.position.set(150, 100, 0 - 125);
        // group.add(mesh);

        // // // extruded shape
        // // let geometryX = new THREE.ExtrudeGeometry(squareShape, extrudeSettings);
        // // let mesh = new THREE.Mesh(geometryX, [new THREE.MeshPhongMaterial({ map: texture2 }), new THREE.MeshPhongMaterial({ color: 0xFFFFFF })]);
        // // mesh.position.set(150, 100, 0 - 75);
        // // group.add(mesh);





        // // look at this:
        // new THREE.ImageLoader()
        //     .load('assets/texture/2.jpg', function (image) {
        //         let texture3 = new THREE.CanvasTexture(image);
        //         let geometryX = new THREE.ExtrudeGeometry(squareShape, extrudeSettings);
        //         let mesh = new THREE.Mesh(geometryX, [new THREE.MeshBasicMaterial({ color: 0xff8888, map: texture3 }), new THREE.MeshPhongMaterial({ color: 0xFFFFFF })]);
        //         mesh.position.set(150, 100, 0 - 75);
        //         group.add(mesh);
        //     });




        // //let imgElem = loaderImg.load('assets/texture/2.jpg');
        // //let texture3 = new THREE.CanvasTexture( imgElem );

        // //let geometryX = new THREE.ExtrudeGeometry(squareShape, extrudeSettings);
        // //let mesh = new THREE.Mesh(geometryX, [new THREE.MeshBasicMaterial({ color: 0xff8888, map: texture3 }), new THREE.MeshPhongMaterial({ color: 0xFFFFFF })]);
        // //mesh.position.set(150, 100, 0 - 75);
        // //group.add(mesh);


        // //     new THREE.ImageLoader()
        // //     .load( 'assets/texture/2.jpg' + performance.now(), function ( image ) {
        // //             let texture = new THREE.CanvasTexture( image );
        // //             let material = new THREE.MeshBasicMaterial( { color: 0xff8888, map: texture } );
        // //             addCube( material );
        // // });


        // controls... must focus on rendererCSS, otherwise no control of the scene is possible, specially css elements not in focus
        // because zIndex: An element with greater stack order is always in front of an element with a lower stack order.
        this.initTrackballControls();

        this.addHelpers();

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
        this.camera.position.set(0, 200, 400);

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
        this.rendererWebGL.domElement.style.top = '0px';
        this.rendererWebGL.domElement.style.zIndex = '1'; // required

        this.htmlDivCanvas.appendChild(this.rendererWebGL.domElement);
    }

    private createCSSRenderer() {

        this.rendererCSS = new CSS3DRenderer.CSS3DRenderer();
        this.rendererCSS.setSize(window.innerWidth * this.scrProp.scrSize, window.innerHeight * this.scrProp.scrSize);
        this.rendererCSS.domElement.style.position = 'absolute';
        this.rendererCSS.domElement.style.top = '0px';
        this.rendererCSS.domElement.style.zIndex = '2'; // required
        this.htmlDivCanvas.appendChild(this.rendererCSS.domElement);
    }

    private initiateCSS3dScene() {
        // img properties
        this.sceneCSS = new THREE.Scene();
        let scCSS = this.sceneCSS;  // scCSS referenced 'this' to the image function, this is the workaround

        // load the default gallery images into CSS3DObjects
        for (let i = 1; i <= 72; i++) {
            let img = new Image();
            img.src = 'assets/galleries/example (' + i + ').jpg';

            img.onload = function () {
                let th = this as HTMLInputElement;
                console.log(th.width + 'x' + th.height);

                // add css3d things
                let el = document.createElement('div');
                el.className = 'galImg';
                //el.textContent = img.src;
                // this.sceneCSS.add(new CSS3DRenderer.CSS3DObject(el));

                let photo = document.createElement('img');
                photo.src = th.src;

                console.log(parseInt(th.width, 10) / 10);
                console.log(parseInt(th.height, 10) / 10);

                // neccessary
                photo.width = parseInt(th.width, 10) / 10;//th.width.valueOf;
                photo.height = parseInt(th.height, 10) / 10;//th.height.valueOf;

                // set an event listener
                el.addEventListener('click', function (event) {
                    let child: HTMLInputElement = this.firstChild as HTMLInputElement;
                    console.log('this: ' + JSON.stringify(child.src));
                }, false);


                el.appendChild(photo);
                let k = new CSS3DRenderer.CSS3DObject(el);
                k.position.y = Math.random() * 1000;
                k.position.z = Math.random() * 1000;
                k.position.x = Math.random() * 1000;
                scCSS.add(k);
                console.log('CSS img added: ' + photo.src);
            }
        }

        // add fixex css3d menu
        // const element = document.createElement('div');
        // element.innerHTML = 'Toggle<br>';
        // element.style.position = 'absolute';
        // element.style.bottom = '20px';
        // element.style.color = 'yellow';
        // const object: CSS3DRenderer.CSS3DObject = new CSS3DRenderer.CSS3DObject(element);
        // this.sceneCSS.add(object);

        // Light
        // let spotLight = new THREE.SpotLight(0xaaaaaa);
        // spotLight.position.set(0, 15, 0);
        // spotLight.castShadow = true;
        // scCSS.add(spotLight);
    }

    /**
     *
     *
     * @private
     * @memberof Img3D
     */
    private animate() {
        let cp: Img3D = this;

        (function render() {
            requestAnimationFrame(render);

            cp.controls.update();// trackball controls

            cp.rendererCSS.render(cp.sceneCSS, cp.camera);
            cp.rendererWebGL.render(cp.sceneWebGL, cp.camera); // renderer


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
        //axes
        let axes = new THREE.AxesHelper(100);
        this.sceneWebGL.add(axes);

        // 90° grid
        let size = 100;
        let divisions = 10;
        let gridHelperX = new THREE.GridHelper(size, divisions);
        gridHelperX.rotateX(THREE.Math.degToRad(90));
        this.sceneWebGL.add(gridHelperX);

        let gridHelperY = new THREE.GridHelper(size, divisions);
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
        this.controls.minDistance = 1;
        this.controls.maxDistance = 4000;
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

    public removeObj() {
        while (this.sceneCSS.children.length) {
            this.sceneCSS.remove(this.sceneCSS.children[0]);
        }
    }
}