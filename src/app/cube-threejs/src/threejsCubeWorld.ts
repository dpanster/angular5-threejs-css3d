import { HostListener } from '@angular/core';
import * as THREE from 'three';

export class World {

    /**
     * example from: https://github.com/LayZeeDK/ng-three-examples/blob/master/src/app/cube/cube.component.ts
     */

    /* HELPER PROPERTIES (PRIVATE PROPERTIES) */
    public camera: THREE.PerspectiveCamera;

   private cubes: Array<THREE.Mesh> = [];
   private renderer: THREE.WebGLRenderer;
   private scene: THREE.Scene;
   private _texture_brick: THREE.Texture;

   private htmlCanvas: HTMLCanvasElement;

   /*
   private get canvas() : HTMLCanvasElement {
       return this.canvasRef.nativeElement;
   }
    */

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

   public camPosZ: number = 20;

   public size: number = 1;

   public isTextured: boolean = false; 

    constructor(canvasRefNative :HTMLCanvasElement){
        this.htmlCanvas = canvasRefNative;


        console.log("new world");
        this.createScene();
        this.addCube();

        var spotLight = new THREE.SpotLight(0xaaaaaa);
        spotLight.position.set(0,15,0);
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        var directionalLight = new THREE.DirectionalLight( 0x999999, 1.0 );
        directionalLight.castShadow = true;
        //this.scene.add( directionalLight );

        var directionalLight2 = new THREE.DirectionalLight( 0xdddddd, 1.0 );
        directionalLight.castShadow = false;
        directionalLight.position.set( 10, 0, 30 );
        directionalLight.target.position.set( 0, 0, 0 );
        this.scene.add( directionalLight2 );

        var planeGeometry = new THREE.PlaneGeometry(20, 20);
        var planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc
        });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 10;
        plane.position.z = 10;
        this.scene.add(plane);

        //axes
        var axes = new THREE.AxesHelper(100);
        this.scene.add(axes);

        //var s = new Stats();

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

        let worldComponent: World = this;

        this.cubes.forEach(function (cube) {
            cube.rotation.x += (worldComponent.rotationSpeedX/1000);
            cube.rotation.y += (worldComponent.rotationSpeedY/1000);
            cube.rotation.z += (worldComponent.rotationSpeedZ/1000);
          });

    }

    private updateCamera (){
        this.camera.position.z = this.camPosZ;
    }

    public numOfCubes: number = 1;

    private changeNumOfCubes(v: string){
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

    private changeMaterial(textured: boolean){
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
        let worldComponent: World = this;
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
    
        this._texture_brick = new THREE.TextureLoader().load( "./../../assets/texture/brick_stone_wall_0078_01.jpg" );
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

    /* LIFECYCLE */
    /**
     * Start the rendering loop
     */
    private startRenderingLoop() {
        /* Renderer */
        // Use canvas element in template
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.htmlCanvas,
            antialias: true
        });
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(window.innerWidth/2, window.innerHeight/2);
        
        // shadow
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;   // to antialias the shadow


        let worldComponent: World = this;
        
        (function render() {
            requestAnimationFrame(render);
            worldComponent.animateCubes();
            worldComponent.updateCamera();
            worldComponent.renderer.render(worldComponent.scene, worldComponent.camera);
        }());

    }

    /* EVENTS */
    /**
     * Update scene after resizing. 
     */
    // public onResize() {
    //     this.camera.aspect = this.getAspectRatio();
    //     this.camera.updateProjectionMatrix();
    //     console.log(`onResize: Witdh: ${window.innerWidth/2}, Height: ${window.innerHeight/2}`);
    //     this.renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    // }

    @HostListener('window:resize', ['$event'])
    onResize(event){
        console.log("hostlistener " + event.target.innerWidth);
    }

    /**
     * 
     * 
     * @private
     * @returns 
     * @memberof CubeThreejsComponent
     */
    private getAspectRatio() {
        return this.htmlCanvas.clientWidth / this.htmlCanvas.clientHeight;
    }



}