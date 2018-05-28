// instaled with npm
import * as THREE from 'three';
import * as TrackballControls from 'three-trackballcontrols';
import * as CSS3DRenderer from 'three-css3drenderer';
import * as TWEEN from 'tween.js';
import * as Perlin from 'perlin-noise';
import * as Chroma from 'chroma-js';
import * as Cannon from 'cannon';

enum Texture {
    BRICK = "./../../../assets/texture/Bricks.jpg",
    EARTH = "./../../../assets/texture/earthmap.png",
    GAS_BRIGHT = "./../../../assets/texture/Gaseous_Bright.jpg",
    GAS_DARK = "./../../../assets/texture/Gaseous_Dark.png",
    GAS_GREEN = "./../../../assets/texture/Gaseous_Green.jpg",
    MOON_BW = "./../../../assets/texture/Moon_BW.jpg",
}

export class MainCSS3d {

    // private main parts
    private scene: THREE.Scene;
    private sceneCSS: THREE.Scene;
    private cannonWorld: Cannon.World;

    private renderer: THREE.WebGLRenderer;
    private rendererCSS: THREE.CSS3DRenderer;
    private camera: THREE.PerspectiveCamera;
    private controls: TrackballControls;

    // screen
    private aspRatio: number;
    private scrSize: number;

    // dom elements
    private htmlDivCanvas: HTMLDivElement;

    // objects
    private torus: THREE.Mesh;
    private sphereSatRotational: THREE.Mesh;
    private pivotPoint: THREE.Object3D;
    private pivotPointPmSystem: THREE.Object3D;
    private pmSystem: THREE.ParticleSystem;
    private terrain: THREE.Mesh;
    private sceneBalls: Array<THREE.Mesh> = [];

    // tween
    private tweenSphereScaleZ: TWEEN.Tween;
    private tweenPivotPartSysRotY: TWEEN.Tween;
    private tweenPhysicObjects: TWEEN.Tween;
    private tweenPhysicCSSElem: TWEEN.Tween;

    //material
    private terrainMat: THREE.MeshPhongMaterial;

    // light
    private directionalLight: THREE.SpotLight;

    // cannon physics
    private timestep: number = 1 / 60;
    private bPhysicsOn: boolean = false;
    private cannonBalls: Array<Cannon.Body> = [];

    /**
     * Creates an instance of MainCSS3d.
     * @param {HTMLDivElement} can 
     * @param {number} screenSizePercent 
     * @memberof MainCSS3d
     */
    constructor(can: HTMLDivElement, screenSizePercent: number) {
        // set
        this.htmlDivCanvas = can;
        this.aspRatio = (window.innerWidth * screenSizePercent) / (window.innerHeight * screenSizePercent);
        this.scrSize = screenSizePercent;

        // for all scene/renderes
        this.initiateCamera();

        /////// physics
        this.initPhysicWorld();

        /////// webGl 
        this.createRenderer();
        this.initiateGeometies();
        this.initiateLight();
        this.initiateParticles();
        this.initiateTerrain();
        //this.addHelpers();
        this.renderer.render(this.scene, this.camera);

        ////////// css3d
        this.createCSSRenderer();
        this.initiateCSSObjects();
        this.rendererCSS.render(this.sceneCSS, this.camera);

        // controls
        this.initTrackballControls();

        // tween
        this.initTween();

        // life cycle
        this.animate();
    }

    /**
     * @description Rendering (initial, loop)
     * @private
     * @memberof MainCSS3d
     */
    private createRenderer() {
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            //canvas: can,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setSize(window.innerWidth * this.scrSize, window.innerHeight * this.scrSize);

        // shadow
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;   // to antialias the shadow

        this.renderer.domElement.style.position = 'absolute'; // required
        //this.renderer.domElement.style.top = "40px";
        this.renderer.domElement.style.zIndex = "1"; // required

        this.htmlDivCanvas.appendChild(this.renderer.domElement);
    }

    /**
     * 
     * @description Sets up camera position 
     * @private
     * @memberof MainCSS3d
     */
    private initiateCamera() {

        this.camera = new THREE.PerspectiveCamera(
            70,
            this.aspRatio,
            1,
            10000
        );
        this.camera.position.set(-200, 200, 800);

    }
    /**
     * 
     * @description sets up light(s)
     * @private
     * @memberof MainCSS3d
     */
    private initiateLight() {
        // light
        var light = new THREE.AmbientLight(0xBBBBBB); // soft white light
        this.scene.add(light);

        this.directionalLight = new THREE.SpotLight(0xffffff, 0.4);
        this.directionalLight.position.set(0, 400, 0);
        this.directionalLight.target.position.set(10, 10, 0);
        //this.directionalLight.target = this.sphereSatRotational; // target to an object
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);

    }

    /**
     * 
     * @description Creates an texture from assetTexture, adapt optional to a torus geometry.
     * @private
     * @param {string} assetTexture The texture path from asset folder.
     * @param {boolean} [isTorus=false] Is optional and default is false.
     * @returns {THREE.MeshPhongMaterial} The generated MeshPongMaterail contain the texture.
     * @memberof MainCSS3d
     */
    private getMeshPhongMaterialFromTexture(assetTexture: string, isTorus: boolean = false): THREE.MeshPhongMaterial {
        let texture: THREE.Texture = new THREE.TextureLoader().load(assetTexture);
        texture.minFilter = THREE.LinearFilter;

        if (isTorus === true) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(6, 2);
        }
        return (new THREE.MeshPhongMaterial({
            map: texture,
            specular: 0x773000, // green + blue
            shininess: 10
        }));
    }

    private initiateGeometies() {
        // geometry
        // main big torus
        var geometry = new THREE.TorusGeometry(
            200, // radius
            30, // tube
            16, // radial segments
            100 // tubular segments
        );

        // Torus
        this.torus = new THREE.Mesh(geometry, this.getMeshPhongMaterialFromTexture(Texture.GAS_BRIGHT, true));
        this.torus.userData = { texture: Texture.GAS_BRIGHT };       // velocity of pivot's update
        this.torus.rotateX(THREE.Math.degToRad(90)); // 90 degree
        this.torus.receiveShadow = true;
        this.torus.castShadow = true;


        // add a pivot point
        this.pivotPoint = new THREE.Object3D();

        //// rotation satellite top of torus
        var sphereGeom = new THREE.SphereGeometry(30, 32, 32);

        this.sphereSatRotational = new THREE.Mesh(sphereGeom, this.getMeshPhongMaterialFromTexture(Texture.MOON_BW));
        // 200 = R of torus, 15 = half tube torus, 10 = half diameter sphere 
        this.sphereSatRotational.position.set(200, 15 + 45, 0);

        this.sphereSatRotational.castShadow = true;
        this.sphereSatRotational.receiveShadow = true;

        // make the pivot points the sphere's parent
        this.pivotPoint.add(this.sphereSatRotational);

        // add to scene
        this.scene.add(this.torus);
        this.scene.add(this.pivotPoint);

        // Add different spheres with cannon shapes / bodies
        for (var i = 1; i < 3; i++) {
            for (var j = 1; j < 8; j++) {
                let factor = Math.random() * 30 + 5;
                console.log("factor: " + factor);

                let sign: number = (factor > 20) ? +1 : -1; // positive or negative
                var sphereShape = new Cannon.Sphere(factor);
                var sphereBody = new Cannon.Body({ mass: factor });
                sphereBody.addShape(sphereShape);
                sphereBody.position.set(-450 + 140 * j, 70 * i+100, 20 * i * j - 150);
                sphereBody.angularVelocity.set(0, factor / 100 * sign,0 );
                sphereBody.quaternion.set(0.2, 0.5, 0, 1);
                this.cannonBalls.push(sphereBody);
                this.cannonWorld.addBody(sphereBody);

                // visual
                var geom = new THREE.SphereGeometry(factor, 32, 32);
                var mesh = new THREE.Mesh(geom, this.getMeshPhongMaterialFromTexture(Texture.GAS_GREEN));
                mesh.position.set(-450 + 140 * j, 70 * i+100, 20 * i * j - 150);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.sceneBalls.push(mesh);
                this.scene.add(mesh);

            }
        }


    }

    private addHelpers() {
        //axes
        var axes = new THREE.AxesHelper(100);
        this.scene.add(axes);

        // 90° grid
        var size = 100;
        var divisions = 10;
        var gridHelperX = new THREE.GridHelper(size, divisions);
        gridHelperX.rotateX(THREE.Math.degToRad(90));
        this.scene.add(gridHelperX);

        var gridHelperY = new THREE.GridHelper(size, divisions);
        gridHelperY.rotateX(THREE.Math.degToRad(180));
        this.scene.add(gridHelperY);
    }

    private initTrackballControls() {
        // track control
        this.controls = new TrackballControls(this.camera, this.rendererCSS.domElement);
        this.controls.rotateSpeed = 2;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 2000;
    }

    private initTween() {

        // tween up particle system at init
        let component: MainCSS3d = this;
        this.tweenPivotPartSysRotY = new TWEEN.Tween({ yVel: 0.0 })
            .to({ yVel: 0.005 }, 3000)
            .onUpdate(function () {
                component.pivotPointPmSystem.userData.rotation_yVel = this.yVel;
            })
            .start();
    }

    private animate() {

        let component: MainCSS3d = this;
        let setImpls = false;

        (function render(time) {

            requestAnimationFrame(render);

            // objects
            component.pivotPointPmSystem.rotation.y -= component.pivotPointPmSystem.userData.rotation_yVel;

            // renderer
            component.rendererCSS.render(component.sceneCSS, component.camera);
            component.renderer.render(component.scene, component.camera);

            // trackball controls
            component.controls.update();

            /// tween
            TWEEN.update(time);
            component.pivotPoint.rotation.y += 0.01;
            component.sphereSatRotational.rotation.y += 0.01;

            // cannon physics                   
            component.cannonWorld.step(1 / 6);

            // physic the spheres
            for (let i = 0; i < component.cannonBalls.length; i++) {
                component.sceneBalls[i].position.set(
                    component.cannonBalls[i].position.x,
                    component.cannonBalls[i].position.y,
                    component.cannonBalls[i].position.z
                );

                component.sceneBalls[i].quaternion.set(
                    component.cannonBalls[i].quaternion.x,
                    component.cannonBalls[i].quaternion.y,
                    component.cannonBalls[i].quaternion.z,
                    component.cannonBalls[i].quaternion.w
                );
            }

        }());
    }


    //////////////////////// CSS
    private initiateCSSObjects() {

        let component: MainCSS3d = this;
        let menuPosX = -250;
        let liEmoj: string[] = ["🙏", "👽", "😈", "👻", "😮"];
        let liTxt: string[] = ["Physics!", "Torus Material", "Light", "Satelite Scale X (tween)", "Reset Objects and Move this CSS Element"];

        for (let i = 1; i <= 5; i++) {
            var element = document.createElement('div');
            element.className = 'element';
            element.id = 'elem_' + i;
            element.addEventListener('click', function (event) {

                //console.log("clicked element" + JSON.stringify(this.id));
                switch (this.id) {
                    case "elem_1":  //Physics
                        console.log("ok");
                        if (component.bPhysicsOn === false) {
                            document.getElementById(this.id).className = "elementClick";

                            // Add an impulse to the center
                            console.log("x: " + component.sphereSatRotational.position.x + ", z:" + component.sphereSatRotational.position.z);

                            // var currentPoint = new Cannon.Vec3(
                            //     component.sphereSatRotational.position.x+1,
                            //     component.sphereSatRotational.position.y,
                            //     component.sphereSatRotational.position.z);

                            // var impulse = new Cannon.Vec3(0,0,-1000);
                            // component.shapeBody.applyImpulse(impulse,currentPoint);
                            component.bPhysicsOn = true;
                            component.cannonWorld.gravity.set(0, -9.81, 0);
                        } else {
                            document.getElementById(this.id).className = "element";
                            component.cannonWorld.gravity.set(0, 0, 0);
                            component.bPhysicsOn = false;
                        }

                        break;
                    case "elem_2":  //Material
                        // toggle the torus material, with help of setting user data
                        console.log("component.torus.userData.texture: " + component.torus.userData.texture);

                        if (component.torus.userData.texture === Texture.GAS_BRIGHT) {
                            component.torus.material = component.getMeshPhongMaterialFromTexture(Texture.GAS_DARK, true);
                            component.torus.userData.texture = Texture.GAS_DARK;
                            document.getElementById(this.id).className = "elementClick";
                        } else {
                            component.torus.material = component.getMeshPhongMaterialFromTexture(Texture.GAS_BRIGHT, true);
                            component.torus.userData.texture = Texture.GAS_BRIGHT;
                            document.getElementById(this.id).className = "element";
                        }
                        break;
                    case "elem_3":  //light
                        if (component.directionalLight.intensity === 0.4) {
                            document.getElementById(this.id).className = "elementClick";
                            component.directionalLight.intensity = 0.0;
                        } else {
                            component.directionalLight.intensity = 0.4;
                            document.getElementById(this.id).className = "element";
                        }
                        break;
                    case "elem_4":  //trabant scale
                        document.getElementById(this.id).className = (component.sphereSatRotational.scale.z === 1.0 ? "elementClick" : "element");
                        console.log(component.sphereSatRotational.scale.z);

                        if (component.sphereSatRotational.scale.z === 1.0) {
                            component.tweenSphereScaleZ = new TWEEN.Tween({ z: 1.0 })
                                .to({ z: 3.0 }, 1000);
                        } else {
                            component.tweenSphereScaleZ = new TWEEN.Tween({ z: 3.0 })
                                .to({ z: 1.0 }, 1000);
                        }

                        component.tweenSphereScaleZ.onUpdate(function () {
                            component.sphereSatRotational.scale.z = this.z;
                        })
                            .start();
                        break;
                    case "elem_5":  //reset physic objects
                        // everytime do the same sequential steps
                        document.getElementById(this.id).className = "elementClick";
                        
                        component.cannonWorld.gravity.set(0, 0, 0);  // gravity off

                        document.getElementById("elem_1").className = "element";
                        component.bPhysicsOn = false;

                        // tween objects upwards
                        component.tweenPhysicObjects = new TWEEN.Tween({ yPos: 0 })
                            .to({yPos: 250}, 2000)
                            .onUpdate(function () {                            
                                for (let i = 0; i < component.cannonBalls.length; i++) {
                                    component.sceneBalls[i].position.y = component.cannonBalls[i].position.y = this.yPos;
                                }
                            })
                            .onComplete(function(){
                                document.getElementById("elem_5").className = "element";
                            })
                            .start();

                        // tween CSS 3d element
                        let targetPosZ = (component.sceneCSS.getObjectByName("elem_5").position.z === 0)? 150 : 0;
                        component.tweenPhysicCSSElem = new TWEEN.Tween({ zPos: component.sceneCSS.getObjectByName("elem_5").position.z })
                        .to({zPos: targetPosZ}, 1000)
                        .onUpdate(function () {                            
                            component.sceneCSS.getObjectByName("elem_5").position.z = this.zPos;
                        })
                        .start();

                        break;
                    default:
                        console.log(this.id + " not configured");
                        break;
                }

            }, false);
            //element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';

            // var number = document.createElement('div');
            // number.className = 'number';
            // number.textContent = i.toString(10);
            // element.appendChild(number);

            var symbol = document.createElement('div');
            symbol.className = 'symbol';
            symbol.textContent = liEmoj[i - 1];
            element.appendChild(symbol);

            var details = document.createElement('div');
            details.className = 'details';
            details.innerHTML = (i==5)? liTxt[i - 1] : "Toggle<br>" + liTxt[i - 1];
            element.appendChild(details);

            let object:CSS3DRenderer.CSS3DObject = new CSS3DRenderer.CSS3DObject(element);
            object.position.x = menuPosX + (-100 * i);
            object.position.y = 200;
            object.name = "elem_"+i;
           // object.userData = {id: "elem_"+i};
            this.sceneCSS.add(object);
        }

        ///////////////// examples of ui elements
        //  label wrap around checkbox
        // var eInp = document.createElement('input');
        // eInp.className = 'w3-check';
        // eInp.type = "checkbox";
        // eInp.addEventListener( 'change', function ( event ) {
        //     if(this.checked) {
        //         console.log("checked");
        //         component.torus.scale.set(2,2,2); 
        //     } else {
        //         console.log("unchecked");
        //         component.torus.scale.set(0.5,0.5,0.5);
        //     }     
        // }, false );
        // var eLblChkbx = document.createElement('label');
        // eLblChkbx.textContent = "flatten torus";
        // //eLblChkbx.style.backgroundColor = 'rgba(127,127,127,222)';
        // eLblChkbx.className = 'elementChk';
        // eLblChkbx.appendChild(eInp);
        // var objectChk = new CSS3DRenderer.CSS3DObject(eLblChkbx);
        // objectChk.position.x = menuPosX -4*100;
        // objectChk.position.y = 0;
        // this.sceneCSS.add(objectChk);

        // slider --> it's static, not working
        // var eSlider = document.createElement('input');
        // eSlider.type = "range";
        // eSlider.min = '1';        
        // eSlider.max = '100';
        // eSlider.value = '1';
        // eSlider.style.backgroundColor = 'rgba(127,127,127,222)';
        // eSlider.addEventListener('change', function (event) {
        //     debugger;
        //     component.torus.scale.set(0.5,0.5,0.5);
        // }, false);
        // var objectSlid = new CSS3DRenderer.CSS3DObject(eSlider);
        // objectSlid.position.x = -100;
        // objectSlid.position.y = 100;
        // this.sceneCSS.add(objectSlid);

        // dropdown menu
        var dd = document.createElement('div');
        dd.className = 'dropdown';
        dd.textContent = 'Dropdown Menu';

        // entry 1
        var dd_content = document.createElement('div');
        dd_content.className = 'dropdown-content';
        dd_content.textContent = 'Toggle Particle System Rotation Velocity (Tween)';
        dd_content.id = 'idPSystemRotY';
        dd.appendChild(dd_content);
        dd_content.addEventListener('click', function (event) {

            if (component.pivotPointPmSystem.userData.rotation_yVel === 0.0) {
                component.tweenPivotPartSysRotY = new TWEEN.Tween({ yVel: 0.0 })
                    .to({ yVel: 0.005 }, 3000);
                //document.getElementById('idPSystemRotY').textContent = 'Stop Particle System Rotation Velocity (Tween)';
            } else {
                component.tweenPivotPartSysRotY = new TWEEN.Tween({ yVel: 0.005 })
                    .to({ yVel: 0.0 }, 3000);
                //document.getElementById('idPSystemRotY').textContent = 'Start Particle System Rotation Velocity (Tween)';
            }

            component.tweenPivotPartSysRotY.onUpdate(function () {
                component.pivotPointPmSystem.userData.rotation_yVel = this.yVel;
            }).start();

            console.log(component.pivotPointPmSystem.userData.rotation_yVel);
        }, false);


        // Entry 2
        var dd_content2 = document.createElement('div');
        dd_content2.className = 'dropdown-content';
        dd_content2.textContent = 'New Terrain';
        dd_content2.style.fontWeight = "bold";
        dd_content.appendChild(dd_content2);
        dd_content2.addEventListener('click', function (event) {
            component.scene.remove(component.terrain);
            component.initiateTerrain();

        }, false);

        var object = new CSS3DRenderer.CSS3DObject(dd);
        object.position.set(menuPosX + 100, 240, 0);
        this.sceneCSS.add(object);
    }


    private initiateParticles() {
        let geom = new THREE.Geometry();
        let material = new THREE.PointsMaterial({
            size: 1,    // pixel default = 1
            //     transparent: true,
            //     opacity: 0.50,
            //     //vertexColors: true, // default = false
            sizeAttenuation: true, // default = false // same size, regardless of how far from the camera
            color: 0xf9ea63
        });

        let range = 290;
        for (let i = 0; i < 15000; i++) {
            var alpha = Math.random() * 360;
            var particle = new THREE.Vector3(
                range * Math.cos(alpha) - 30 + Math.random() * 60,//* Math.random(), //- range / 2,
                Math.random() - 5 + Math.random() * 15,
                range * Math.sin(alpha) - 30 + Math.random() * 60//* Math.random() //- range / 2
            );
            geom.vertices.push(particle);
            // var color = new THREE.Color(0x00ff00);
            //     color.setHSL(color.getHSL().h,
            //     color.getHSL().s,
            //     Math.random() * color.getHSL().l);
            // geom.colors.push(color);
        }

        this.pmSystem = new THREE.Points(geom, material);
        this.scene.add(this.pmSystem);

        // make the pivot points the particle system's parent
        this.pivotPointPmSystem = new THREE.Object3D();
        this.pivotPointPmSystem.userData = { rotation_yVel: 0.001 };       // velocity of pivot's update
        this.pivotPointPmSystem.add(this.pmSystem);
        this.scene.add(this.pivotPointPmSystem);

    }

    private initiateTerrain() {

        // create vertices
        var depth = 300;
        var width = 300;
        var spacingX = Math.random() * 10 + 10;
        var spacingZ = spacingX;
        var height = 120;
        let offsetX: number = -width * spacingX / 2;
        let offsetZ: number = depth * spacingZ / 2;
        let offsetY: number = -250;

        //var scale = Chroma.scale(['blue','green','gray']).domain([0,height]);
        //var scale = Chroma.scale([0x00FFFF,0xFF00FF,0x00FF00]).domain([0,height]);
        var scale = Chroma.scale([[Math.random() * 255, 128, 128], [0, Math.random() * 255, Math.random() * 255], [200, 200, 200]]).domain([1, height]);

        var geometry = new THREE.Geometry();


        //With Perlin
        let noise = Perlin.generatePerlinNoise(300, 300);
        for (var z = 0; z < depth; z++) {
            for (var x = 0; x < width; x++) {

                //var yValue = Math.abs(noise.perlin2(x / 10, z / 10) * height * 2);
                //let yValue = Math.abs(Perlin.generateWhiteNoise(2, 3) * height * 2);
                //z===0 ? (console.log("x: " + x + ", noise[x]: " + noise[x])) : 0;

                var vertex = new THREE.Vector3(
                    x * spacingX,
                    Math.abs(noise[(z * depth) + x]) * height,
                    //Math.random()*(height+x+x+z),
                    z * spacingZ
                );
                geometry.vertices.push(vertex);
            }
        }
        console.log("geometry.vertices[0]: " + JSON.stringify(geometry.vertices[0]));
        console.log("geometry.vertices[1]: " + JSON.stringify(geometry.vertices[1]));


        //define faces
        for (var z = 0; z < depth - 1; z++) {
            for (var x = 0; x < width - 1; x++) {
                // we need to point to the position in the array
                // a - - b
                // |  x  |
                // c - - d
                var a = x + z * width;
                var b = (x + 1) + (z * width);
                var c = x + ((z + 1) * width);
                var d = (x + 1) + ((z + 1) * width);

                var face1 = new THREE.Face3(b, a, c);
                var face2 = new THREE.Face3(c, d, b);

                // console.log("High1: " + this.getHighPoint(geometry, face1));
                //console.log("High2: " + this.getHighPoint(geometry, face2));

                face1.color = new THREE.Color(scale(this.getHighPoint(geometry, face1)).hex());
                face2.color = new THREE.Color(
                    //this.getHighPoint(geometry, face1)/(100*3),
                    //0.5,
                    //0.5
                    scale(this.getHighPoint(geometry, face2)).hex());
                geometry.faces.push(face1);
                geometry.faces.push(face2);
            }
        }

        geometry.computeVertexNormals(true); // smoother
        geometry.computeFaceNormals(); // light

        // setup the material
        this.terrainMat = new THREE.MeshPhongMaterial();
        this.terrainMat.vertexColors = THREE.FaceColors;

        // create the mesh
        this.terrain = new THREE.Mesh(geometry, this.terrainMat);

        this.terrain.position.set(offsetX, offsetY, offsetZ);
        this.terrain.quaternion.setFromAxisAngle(new THREE.Vector3(0, -1, 0), -Math.PI / 2);

        this.terrain.receiveShadow = true;

        this.scene.add(this.terrain);


        /////////////////////// Create the cannonjs body and shape for terrain
        // Create a matrix of height values
        var matrix = [];
        for (var i = 0; i < depth; i++) {
            matrix.push([]);
            for (var j = 0; j < width; j++) {
                var h = Math.abs(noise[(i * depth) + j]) * 100;
                matrix[i].push(h);
                //console.log(h);

            }
        }
        //console.log("matrix0: " + matrix[0][0]);
        //console.log("matrix1: " + matrix[0][1]);

        // Create the heightfield
        var groundShape = new Cannon.Heightfield(matrix, {
            elementSize: spacingX
        });

        //var groundShape = new Cannon.Plane();
        var groundBody = new Cannon.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new Cannon.Vec3(1, 0, 0), -Math.PI / 2);
        console.log("groundBody.quaternion: " + groundBody.quaternion);

        //groundBody.quaternion.z = THREE.Math.degToRad(45);
        //groundBody.position.set(-width*(spacingX/2), -520, depth*(spacingZ/2));
        groundBody.position.set(offsetX, offsetY, offsetZ);
        this.cannonWorld.addBody(groundBody);


    }

    private getHighPoint(geometry, face): number {

        var v1 = geometry.vertices[face.a].y;
        var v2 = geometry.vertices[face.b].y;
        var v3 = geometry.vertices[face.c].y;

        return Math.max(v1, v2, v3);
    }

    private createCSSRenderer() {
        this.sceneCSS = new THREE.Scene();

        this.rendererCSS = new CSS3DRenderer.CSS3DRenderer();
        this.rendererCSS.setSize(window.innerWidth * this.scrSize, window.innerHeight * this.scrSize);
        this.rendererCSS.domElement.style.position = 'absolute';
        //this.rendererCSS.domElement.style.top = "40px";
        this.rendererCSS.domElement.style.zIndex = "2"; // required

        this.htmlDivCanvas.appendChild(this.rendererCSS.domElement);
    }

    private initPhysicWorld() {
        this.cannonWorld = new Cannon.World();
        this.cannonWorld.quatNormalizeSkip = 2;
        this.cannonWorld.quatNormalizeFast = true;
        this.cannonWorld.gravity.set(0, 0, 0);    // X, Y, Z direction // deal with timestep in render func
        this.cannonWorld.broadphase = new Cannon.NaiveBroadphase(); // activate colliding bodies
        this.cannonWorld.solver.iterations = 10;
        this.cannonWorld.defaultContactMaterial.contactEquationRelaxation = 0.8;
    }


    public onResize() {
        this.camera.aspect = this.aspRatio;
        this.camera.updateProjectionMatrix();
        console.log(`onResize: Witdh: ${window.innerWidth * this.scrSize}, Height: ${window.innerHeight * this.scrSize}`);
        this.renderer.setSize(window.innerWidth * this.scrSize, window.innerHeight * this.scrSize);
        this.rendererCSS.setSize(window.innerWidth * this.scrSize, window.innerHeight * this.scrSize);
    }
}


