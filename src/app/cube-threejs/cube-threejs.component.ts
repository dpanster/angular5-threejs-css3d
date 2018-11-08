import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import * as THREE from 'three';

// import loacl ts files: https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html
//import * as Triangleee from "./src/cube";

//import * as Stats from './../../external-lib/stats-js/src/Stats';

@Component({
  selector: 'app-cube-threejs',
  templateUrl: './cube-threejs.component.html',
  styleUrls: ['./cube-threejs.component.css']
})
export class CubeThreejsComponent implements OnInit{

    /**
     * example from: https://github.com/LayZeeDK/ng-three-examples/blob/master/src/app/cube/cube.component.ts
     */

    /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
    public camera: THREE.PerspectiveCamera;
    //public tr = new Triangleee.Triangleee();


    // get the first element or the directive matching the selector from the view DOM
    @ViewChild('canvas')
    private canvasRef: ElementRef;
    private cubes: Array<THREE.Mesh> = [];
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private _texture_brick: THREE.Texture;

    private get canvas() : HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }


    /* CUBE PROPERTIES */
    // @Input()
    public rotationSpeedX: number = 10;
    // changeRotSpeedX(v: number) {
    //     this.rotationSpeedX = v;
    //     console.log('changeRotSpeedX: ' + v);
    // }

    // @Input()
    public rotationSpeedY: number = 10;
    // changeRotSpeedY(e) {
    //     this.rotationSpeedY = e.target.value;
    //     console.log('changeRotSpeedY: ' + e.target.value);
    // }

    public rotationSpeedZ: number = 10;

    public camPosZ: number = 15;

    public size: number = 1;

    public isTextured: boolean = false; 

    private topLight: THREE.SpotLight;

    public numOfCubes: number = 20;

    /* DEPENDENCY INJECTION (CONSTRUCTOR) */
    constructor() { }

    //called after the constructor and called  after the first ngOnChanges() 
    ngOnInit() {
    }

    /* LIFECYCLE */
    /**
     * We need to wait until template is bound to DOM, as we need the view
     * dimensions to create the scene. We could create the cube in a Init hook,
     * but we would be unable to add it to the scene until now.
     * https://angular.io/guide/lifecycle-hooks 
     */
    public ngAfterViewInit() {
        this.createScene();
        this.changeNumOfCubes(this.numOfCubes.toString());

        var planeGeometry = new THREE.PlaneGeometry(200, 200);
        var planeMaterial = new THREE.MeshLambertMaterial();
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 100;
        plane.position.z = 100;
        this.scene.add(plane);

        //axes
        var axes = new THREE.AxesHelper(100);
        this.scene.add(axes);

        // light
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
        directionalLight.castShadow = false;
        this.scene.add( directionalLight );

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.position.set(10,10,50);
        directionalLight.target.position.set(10,10,0);
        this.scene.add( directionalLight );

        this.topLight = new THREE.SpotLight(0x111111, 0.5);
        this.topLight.position.set(0,15,0);
        this.topLight.castShadow = true;
        this.scene.add(this.topLight);

        this.startRenderingLoop();
        }

    /* STAGING, ANIMATION, AND RENDERING */
    /**
     * Animate the cube
     */
    private animateCubes() {

        // this.cubes[0].rotation.x += (this.rotationSpeedX/1000);
        // this.cubes[0].rotation.y += (this.rotationSpeedY/1000);
        // this.cubes[0].rotation.z += (this.rotationSpeedZ/1000);
        let component: CubeThreejsComponent = this;

        this.cubes.forEach(function (cube) {
            cube.rotation.x += (component.rotationSpeedX/1000);
            cube.rotation.y += (component.rotationSpeedY/1000);
            cube.rotation.z += (component.rotationSpeedZ/1000);
          });

    }

    private updateCamera (){
        this.camera.position.z = this.camPosZ;
    }

    public changeNumOfCubes(v: string){
        console.log("input cubes: " + v + ", scene cubes: " +this.cubes.length);
        
        let targetVal: number = parseInt(v,10);

        // add cubes to scene
        while(targetVal > this.cubes.length){
            this.addCube();
        }

        // remove cubes from scene
        while(targetVal < this.cubes.length){
            this.removeCube();
        }

        //
        this.numOfCubes = this.cubes.length;
    }

    public changeMaterial(textured: boolean){
        console.log("textured: " + textured);
        
        this.isTextured = textured;

        // check to set texture or pure color
        var matProps:any = {};
        if(textured){
            matProps.map = this._texture_brick;
        }else{
            matProps.color = (new THREE.Color( Math.random(), Math.random(), Math.random()));
        }


        // re-materialize presented cubes
        let component: CubeThreejsComponent = this;
        let matCube = new THREE.MeshPhongMaterial(
            matProps
        )

        this.cubes.forEach(function (cube) {
            cube.material = matCube;
        });
    }
    

    /**
     * Create the cube
     */
    private addCube() {
    
        let geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        //let geometry = new THREE.IcosahedronGeometry(1, 1);
    
        this._texture_brick = new THREE.TextureLoader().load( "assets/texture/Bricks.jpg" );
        this._texture_brick.minFilter = THREE.LinearFilter;
        // check to set texture or pure color
        var matProps:any = {};
        if(this.isTextured){
            matProps.map = this._texture_brick;
        }else{
            matProps.color = (new THREE.Color( Math.random(), Math.random(), Math.random()));
        }

        this.cubes.push(
            new THREE.Mesh(
                geometry,
                new THREE.MeshPhongMaterial(
                    //{color: (new THREE.Color( Math.random(), Math.random(), Math.random() ))}
                    matProps
                )
            )
        );
        this.cubes[this.cubes.length-1].position.x = Math.ceil(Math.random() * 10);
        this.cubes[this.cubes.length-1].position.y = Math.ceil(Math.random() * 10);
        this.cubes[this.cubes.length-1].position.z = Math.ceil(Math.random() * 10);
       
        this.cubes[this.cubes.length-1].castShadow = true;
        this.cubes[this.cubes.length-1].receiveShadow = true;

        // Add cube to scene
        this.scene.add(this.cubes[this.cubes.length-1]);
    }

    private removeCube() {
        this.scene.remove(this.cubes[this.cubes.length-1]);
        this.cubes.pop();
    }

    /**
     * Create the scene
     */
    private createScene() {
        /* Scene */
        this.scene = new THREE.Scene();

        /* Camera */
        let aspectRatio = this.getAspectRatio();
        this.camera = new THREE.PerspectiveCamera(
            70,
            aspectRatio,
            1,
            1000
        );
        this.camera.position.set(5,10,this.camPosZ);
        this.camera.lookAt(new THREE.Vector3( 5, 0, 0 ));
    }

    /**
     * Start the rendering loop
     */
    private startRenderingLoop() {
        /* Renderer */
        // Use canvas element in template
        this.renderer = new THREE.WebGLRenderer({
             canvas: this.canvas,
             antialias: true,
                alpha: true
        });
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.setSize(window.innerWidth*0.66, window.innerHeight*0.66);
 
        // shadow
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;   // to antialias the shadow

      this.renderer.render(this.scene, this.camera);

        let component: CubeThreejsComponent = this;
        
        (function render() {
            requestAnimationFrame(render);
            component.animateCubes();
            component.updateCamera();
            component.renderer.render(component.scene, component.camera);
        }());

    }

    /* EVENTS */
    /**
     * Update scene after resizing. 
     */
    public onResize() {
        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();
        console.log(`onResize: Witdh: ${window.innerWidth*0.66}, Height: ${window.innerHeight*0.66}`);
        this.renderer.setSize(window.innerWidth*0.66, window.innerHeight*0.66);
    }

     /**
     * 
     * 
     * @private
     * @returns 
     * @memberof CubeThreejsComponent
     */
    private getAspectRatio() {
        return this.canvas.clientWidth / this.canvas.clientHeight;
        //return window.innerWidth/4 / window.innerHeight/2;
    }


}
