webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cube_threejs_cube_threejs_component__ = __webpack_require__("../../../../../src/app/cube-threejs/cube-threejs.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css3d_threejs_css3d_threejs_component__ = __webpack_require__("../../../../../src/app/css3d-threejs/css3d-threejs.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */]
    },
    {
        path: 'cube-threejs',
        component: __WEBPACK_IMPORTED_MODULE_3__cube_threejs_cube_threejs_component__["a" /* CubeThreejsComponent */]
    },
    {
        path: 'css3d-threejs',
        component: __WEBPACK_IMPORTED_MODULE_4__css3d_threejs_css3d_threejs_component__["a" /* Css3dThreejsComponent */]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"w3-sidebar w3-bar-block w3-black w3-top\" style=\"z-index:3;width:10%;\">\n  <div class=\"w3-container w3-display-container w3-padding-16\">\n    <h3>\n      <b>3D Test</b>\n    </h3>\n  </div>\n  <code>\n    <a routerLink=\"\" class=\"w3-bar-item w3-button\">About</a>\n    <a routerLink=\"cube-threejs\" class=\"w3-bar-item w3-button\">Cube - Three.js</a>\n    <a routerLink=\"css3d-threejs\" class=\"w3-bar-item w3-button\">CSS3D - Three.js</a>\n  </code>\n</div>\n\n\n<div style=\"margin-left:10%;\">\n  <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// component decorator(s)
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.test = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            styles: [__webpack_require__("../../../../../src/app/app.component.css")],
            template: __webpack_require__("../../../../../src/app/app.component.html")
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cube_threejs_cube_threejs_component__ = __webpack_require__("../../../../../src/app/cube-threejs/cube-threejs.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__css3d_threejs_css3d_threejs_component__ = __webpack_require__("../../../../../src/app/css3d-threejs/css3d-threejs.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__cube_threejs_cube_threejs_component__["a" /* CubeThreejsComponent */],
                __WEBPACK_IMPORTED_MODULE_6__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_7__css3d_threejs_css3d_threejs_component__["a" /* Css3dThreejsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/css3d-threejs/css3d-threejs.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/css3d-threejs/css3d-threejs.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- wrap w3 -->\n<div class=\"w3-container\">\n  <header>\n    <div class=\"w3-container \">\n      <h1>\n        <b>A Three.js CSS3d showcase...</b>\n      </h1>\n      This canvas contains two scenes from\n      <em>THREE.js</em> and two renderer elements, a\n      <em>WebGLRenderer</em> and a\n      <em>CSS3DRenderer</em>.\n      <br> The focus is the integration and handling on the CSS 3d in the scene. Features for this showcase are clickable, highlight,\n      moveable css elements. One drop-down menu is integrated.\n      <br> Additionally the WebGL scene contains a random generated terrain, light, shadow, camera handling with mouse, physics\n      with collision detection, tween, object scaling, rotation around a (pivot-)point and a simple particle system. Play with the clickable elements and see whats happen.\n      <br>\n      <br> A list of used libraries / packages for this angular controller example:\n    </div>\n  </header>\n  <div class=\"w3-container \">\n    <code>\n      <ul>\n        <li>Three.js R91 (V0.91.0) / NPM: npm i three / main 3D part</li>\n        <li>CSS3dRenderer (V1.0.1) / NPM: npm i three-css3drenderer / CSS part</li>\n        <li>Trackball controls (V0.0.7) / NPM: npm i three-trackballcontrols / Camera control with mouse</li>\n        <li>Tween (V16.6.0) / NPM: npm i @tweenjs/tween.js / Soft moving objects</li>\n        <li>Cannon (V0.6.1) / NPM: npm i cannon / Physics</li>\n        <li>Perlin Noise (V0.0.1) / NPM: npm i perlin-noise / Noise for terrain</li>\n        <li>Chroma (V1.3.7) / NPM: npm i chroma-js / Color scaling for heightfield</li>\n      </ul>\n    </code>\n  </div>\n  <!-- canvas here -->\n  <!--<canvas class=\"w3-center\" #canvasCSS3d (window:resize)=\"onResize($event)\"></canvas>-->\n  <div class=\"w3-container\">\n      <div #canvasCSS3d (window:resize)=\"onResize()\"></div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/css3d-threejs/css3d-threejs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Css3dThreejsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_main__ = __webpack_require__("../../../../../src/app/css3d-threejs/src/main.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// local class source ts

var Css3dThreejsComponent = /** @class */ (function () {
    /**k
     * Creates an instance of Css3dThreejsComponent.
     * @memberof Css3dThreejsComponent
     */
    function Css3dThreejsComponent() {
    }
    Object.defineProperty(Css3dThreejsComponent.prototype, "canvas", {
        /**
       * get the css3d canvas
       *
       * @readonly
       * @private
       * @type {HTMLDivElement}
       * @memberof Css3dThreejsComponent
       */
        get: function () {
            return this.canvasRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Wait until template is bound to DOM.
     *
     * @memberof Css3dThreejsComponent
     */
    Css3dThreejsComponent.prototype.ngAfterViewInit = function () {
        this.world = new __WEBPACK_IMPORTED_MODULE_1__src_main__["a" /* MainCSS3d */](this.canvas, 0.6);
        // this.canvasRef.nativeElement.style.position = 'relative';
        // let domCanvas:HTMLCanvasElement = document.querySelector("canvas");
        // console.log(domCanvas);
        // domCanvas.style.position = 'relative';
    };
    /* EVENTS */
    /**
     * Update scene after resizing.
     */
    Css3dThreejsComponent.prototype.onResize = function () {
        this.world.onResize();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('canvasCSS3d'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], Css3dThreejsComponent.prototype, "canvasRef", void 0);
    Css3dThreejsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-css3d-threejs',
            template: __webpack_require__("../../../../../src/app/css3d-threejs/css3d-threejs.component.html"),
            styles: [__webpack_require__("../../../../../src/app/css3d-threejs/css3d-threejs.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], Css3dThreejsComponent);
    return Css3dThreejsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/css3d-threejs/src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainCSS3d; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__("../../../../three/build/three.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three_trackballcontrols__ = __webpack_require__("../../../../three-trackballcontrols/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three_trackballcontrols___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_three_trackballcontrols__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three_css3drenderer__ = __webpack_require__("../../../../three-css3drenderer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_three_css3drenderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_three_css3drenderer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tween_js__ = __webpack_require__("../../../../tween.js/src/Tween.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tween_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_tween_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_perlin_noise__ = __webpack_require__("../../../../perlin-noise/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_perlin_noise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_perlin_noise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_chroma_js__ = __webpack_require__("../../../../chroma-js/chroma.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_chroma_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_chroma_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_cannon__ = __webpack_require__("../../../../cannon/build/cannon.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_cannon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_cannon__);
// instaled with npm







var Texture;
(function (Texture) {
    Texture["BRICK"] = "assets/texture/Bricks.jpg";
    Texture["GAS_BRIGHT"] = "assets/texture/Gaseous_Bright.jpg";
    Texture["GAS_DARK"] = "assets/texture/Gaseous_Dark.png";
    Texture["GAS_GREEN"] = "assets/texture/Gaseous_Green.jpg";
    Texture["MOON_BW"] = "assets/texture/Moon_BW.jpg";
})(Texture || (Texture = {}));
var MainCSS3d = /** @class */ (function () {
    /**
     * Creates an instance of MainCSS3d.
     * @param {HTMLDivElement} can
     * @param {number} screenSizePercent
     * @memberof MainCSS3d
     */
    function MainCSS3d(can, screenSizePercent) {
        this.sceneBalls = [];
        // cannon physics
        this.timestep = 1 / 60;
        this.bPhysicsOn = false;
        this.cannonBalls = [];
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
    MainCSS3d.prototype.createRenderer = function () {
        this.scene = new __WEBPACK_IMPORTED_MODULE_0_three__["Scene"]();
        this.renderer = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderer"]({
            //canvas: can,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setSize(window.innerWidth * this.scrSize, window.innerHeight * this.scrSize);
        // shadow
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = __WEBPACK_IMPORTED_MODULE_0_three__["PCFSoftShadowMap"]; // to antialias the shadow
        this.renderer.domElement.style.position = 'absolute'; // required
        //this.renderer.domElement.style.top = "40px";
        this.renderer.domElement.style.zIndex = "1"; // required
        this.htmlDivCanvas.appendChild(this.renderer.domElement);
    };
    /**
     *
     * @description Sets up camera position
     * @private
     * @memberof MainCSS3d
     */
    MainCSS3d.prototype.initiateCamera = function () {
        this.camera = new __WEBPACK_IMPORTED_MODULE_0_three__["PerspectiveCamera"](70, this.aspRatio, 1, 10000);
        this.camera.position.set(-200, 200, 800);
    };
    /**
     *
     * @description sets up light(s)
     * @private
     * @memberof MainCSS3d
     */
    MainCSS3d.prototype.initiateLight = function () {
        // light
        var light = new __WEBPACK_IMPORTED_MODULE_0_three__["AmbientLight"](0xBBBBBB); // soft white light
        this.scene.add(light);
        this.directionalLight = new __WEBPACK_IMPORTED_MODULE_0_three__["SpotLight"](0xffffff, 0.4);
        this.directionalLight.position.set(0, 400, 0);
        this.directionalLight.target.position.set(10, 10, 0);
        //this.directionalLight.target = this.sphereSatRotational; // target to an object
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);
    };
    /**
     *
     * @description Creates an texture from assetTexture, adapt optional to a torus geometry.
     * @private
     * @param {string} assetTexture The texture path from asset folder.
     * @param {boolean} [isTorus=false] Is optional and default is false.
     * @returns {THREE.MeshPhongMaterial} The generated MeshPongMaterail contain the texture.
     * @memberof MainCSS3d
     */
    MainCSS3d.prototype.getMeshPhongMaterialFromTexture = function (assetTexture, isTorus) {
        if (isTorus === void 0) { isTorus = false; }
        var texture = new __WEBPACK_IMPORTED_MODULE_0_three__["TextureLoader"]().load(assetTexture);
        texture.minFilter = __WEBPACK_IMPORTED_MODULE_0_three__["LinearFilter"];
        if (isTorus === true) {
            texture.wrapS = texture.wrapT = __WEBPACK_IMPORTED_MODULE_0_three__["RepeatWrapping"];
            texture.repeat.set(6, 2);
        }
        return (new __WEBPACK_IMPORTED_MODULE_0_three__["MeshPhongMaterial"]({
            map: texture,
            specular: 0x773000,
            shininess: 10
        }));
    };
    MainCSS3d.prototype.initiateGeometies = function () {
        // geometry
        // main big torus
        var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["TorusGeometry"](200, // radius
        30, // tube
        16, // radial segments
        100 // tubular segments
        );
        // Torus
        this.torus = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](geometry, this.getMeshPhongMaterialFromTexture(Texture.GAS_BRIGHT, true));
        this.torus.userData = { texture: Texture.GAS_BRIGHT }; // velocity of pivot's update
        this.torus.rotateX(__WEBPACK_IMPORTED_MODULE_0_three__["Math"].degToRad(90)); // 90 degree
        this.torus.receiveShadow = true;
        this.torus.castShadow = true;
        // add a pivot point
        this.pivotPoint = new __WEBPACK_IMPORTED_MODULE_0_three__["Object3D"]();
        //// rotation satellite top of torus
        var sphereGeom = new __WEBPACK_IMPORTED_MODULE_0_three__["SphereGeometry"](30, 32, 32);
        this.sphereSatRotational = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](sphereGeom, this.getMeshPhongMaterialFromTexture(Texture.MOON_BW));
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
        for (var i = 1; i < 8; i++) {
            for (var j = 1; j < 3; j++) {
                var factor = Math.random() * 30 + 5;
                console.log("factor: " + factor);
                var sign = (factor > 20) ? +1 : -1; // positive or negative
                var sphereShape = new __WEBPACK_IMPORTED_MODULE_6_cannon__["Sphere"](factor);
                var sphereBody = new __WEBPACK_IMPORTED_MODULE_6_cannon__["Body"]({ mass: factor });
                sphereBody.addShape(sphereShape);
                sphereBody.position.set(j * 50, 100 * i, 20 * i * j - 150);
                sphereBody.angularVelocity.set(0, factor / 100 * sign, 0);
                sphereBody.quaternion.set(0.2, 0.5, 0, 1);
                this.cannonBalls.push(sphereBody);
                this.cannonWorld.addBody(sphereBody);
                // visual
                var geom = new __WEBPACK_IMPORTED_MODULE_0_three__["SphereGeometry"](factor, 32, 32);
                var mesh = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](geom, this.getMeshPhongMaterialFromTexture(Texture.GAS_GREEN));
                mesh.position.set(j * 50, 100 * i, 20 * i * j - 150);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.sceneBalls.push(mesh);
                this.scene.add(mesh);
            }
        }
    };
    MainCSS3d.prototype.addHelpers = function () {
        //axes
        var axes = new __WEBPACK_IMPORTED_MODULE_0_three__["AxesHelper"](100);
        this.scene.add(axes);
        // 90° grid
        var size = 100;
        var divisions = 10;
        var gridHelperX = new __WEBPACK_IMPORTED_MODULE_0_three__["GridHelper"](size, divisions);
        gridHelperX.rotateX(__WEBPACK_IMPORTED_MODULE_0_three__["Math"].degToRad(90));
        this.scene.add(gridHelperX);
        var gridHelperY = new __WEBPACK_IMPORTED_MODULE_0_three__["GridHelper"](size, divisions);
        gridHelperY.rotateX(__WEBPACK_IMPORTED_MODULE_0_three__["Math"].degToRad(180));
        this.scene.add(gridHelperY);
    };
    MainCSS3d.prototype.initTrackballControls = function () {
        // track control
        this.controls = new __WEBPACK_IMPORTED_MODULE_1_three_trackballcontrols__(this.camera, this.rendererCSS.domElement);
        this.controls.rotateSpeed = 2;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 2000;
    };
    MainCSS3d.prototype.initTween = function () {
        // tween up particle system at init
        var component = this;
        this.tweenPivotPartSysRotY = new __WEBPACK_IMPORTED_MODULE_3_tween_js__["Tween"]({ yVel: 0.0 })
            .to({ yVel: 0.005 }, 3000)
            .onUpdate(function () {
            component.pivotPointPmSystem.userData.rotation_yVel = this.yVel;
        })
            .start();
    };
    MainCSS3d.prototype.animate = function () {
        var component = this;
        var setImpls = false;
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
            __WEBPACK_IMPORTED_MODULE_3_tween_js__["update"](time);
            component.pivotPoint.rotation.y += 0.01;
            component.sphereSatRotational.rotation.y += 0.01;
            // cannon physics                   
            component.cannonWorld.step(1 / 6);
            // physic the spheres
            for (var i = 0; i < component.cannonBalls.length; i++) {
                component.sceneBalls[i].position.set(component.cannonBalls[i].position.x, component.cannonBalls[i].position.y, component.cannonBalls[i].position.z);
                component.sceneBalls[i].quaternion.set(component.cannonBalls[i].quaternion.x, component.cannonBalls[i].quaternion.y, component.cannonBalls[i].quaternion.z, component.cannonBalls[i].quaternion.w);
            }
        }());
    };
    //////////////////////// CSS
    MainCSS3d.prototype.initiateCSSObjects = function () {
        var component = this;
        var menuPosX = -250;
        var liEmoj = ["🙏", "👽", "😈", "👻", "😮"];
        var liTxt = ["Physics!", "Torus Material", "Light", "Satelite Scale X (tween)", "Reset Objects and Move this CSS Element"];
        for (var i = 1; i <= 5; i++) {
            var element = document.createElement('div');
            element.className = 'element';
            element.id = 'elem_' + i;
            element.addEventListener('click', function (event) {
                //console.log("clicked element" + JSON.stringify(this.id));
                switch (this.id) {
                    case "elem_1"://Physics
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
                        }
                        else {
                            document.getElementById(this.id).className = "element";
                            component.cannonWorld.gravity.set(0, 0, 0);
                            component.bPhysicsOn = false;
                        }
                        break;
                    case "elem_2"://Material
                        // toggle the torus material, with help of setting user data
                        console.log("component.torus.userData.texture: " + component.torus.userData.texture);
                        if (component.torus.userData.texture === Texture.GAS_BRIGHT) {
                            component.torus.material = component.getMeshPhongMaterialFromTexture(Texture.GAS_DARK, true);
                            component.torus.userData.texture = Texture.GAS_DARK;
                            document.getElementById(this.id).className = "elementClick";
                        }
                        else {
                            component.torus.material = component.getMeshPhongMaterialFromTexture(Texture.GAS_BRIGHT, true);
                            component.torus.userData.texture = Texture.GAS_BRIGHT;
                            document.getElementById(this.id).className = "element";
                        }
                        break;
                    case "elem_3"://light
                        if (component.directionalLight.intensity === 0.4) {
                            document.getElementById(this.id).className = "elementClick";
                            component.directionalLight.intensity = 0.0;
                        }
                        else {
                            component.directionalLight.intensity = 0.4;
                            document.getElementById(this.id).className = "element";
                        }
                        break;
                    case "elem_4"://trabant scale
                        document.getElementById(this.id).className = (component.sphereSatRotational.scale.z === 1.0 ? "elementClick" : "element");
                        console.log(component.sphereSatRotational.scale.z);
                        if (component.sphereSatRotational.scale.z === 1.0) {
                            component.tweenSphereScaleZ = new __WEBPACK_IMPORTED_MODULE_3_tween_js__["Tween"]({ z: 1.0 })
                                .to({ z: 3.0 }, 1000);
                        }
                        else {
                            component.tweenSphereScaleZ = new __WEBPACK_IMPORTED_MODULE_3_tween_js__["Tween"]({ z: 3.0 })
                                .to({ z: 1.0 }, 1000);
                        }
                        component.tweenSphereScaleZ.onUpdate(function () {
                            component.sphereSatRotational.scale.z = this.z;
                        })
                            .start();
                        break;
                    case "elem_5"://reset physic objects
                        // everytime do the same sequential steps
                        document.getElementById(this.id).className = "elementClick";
                        component.cannonWorld.gravity.set(0, 0, 0); // gravity off
                        document.getElementById("elem_1").className = "element";
                        component.bPhysicsOn = false;
                        // tween objects upwards
                        component.tweenPhysicObjects = new __WEBPACK_IMPORTED_MODULE_3_tween_js__["Tween"]({ yPos: 0 })
                            .to({ yPos: 250 }, 2000)
                            .onUpdate(function () {
                            for (var i_1 = 0; i_1 < component.cannonBalls.length; i_1++) {
                                component.sceneBalls[i_1].position.y = component.cannonBalls[i_1].position.y = this.yPos;
                            }
                        })
                            .onComplete(function () {
                            document.getElementById("elem_5").className = "element";
                        })
                            .start();
                        // tween CSS 3d element
                        var targetPosZ = (component.sceneCSS.getObjectByName("elem_5").position.z === 0) ? 150 : 0;
                        component.tweenPhysicCSSElem = new __WEBPACK_IMPORTED_MODULE_3_tween_js__["Tween"]({ zPos: component.sceneCSS.getObjectByName("elem_5").position.z })
                            .to({ zPos: targetPosZ }, 1000)
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
            details.innerHTML = (i == 5) ? liTxt[i - 1] : "Toggle<br>" + liTxt[i - 1];
            element.appendChild(details);
            var object_1 = new __WEBPACK_IMPORTED_MODULE_2_three_css3drenderer__["CSS3DObject"](element);
            object_1.position.x = menuPosX + (-100 * i);
            object_1.position.y = 200;
            object_1.name = "elem_" + i;
            // object.userData = {id: "elem_"+i};
            this.sceneCSS.add(object_1);
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
                component.tweenPivotPartSysRotY = new __WEBPACK_IMPORTED_MODULE_3_tween_js__["Tween"]({ yVel: 0.0 })
                    .to({ yVel: 0.005 }, 3000);
                //document.getElementById('idPSystemRotY').textContent = 'Stop Particle System Rotation Velocity (Tween)';
            }
            else {
                component.tweenPivotPartSysRotY = new __WEBPACK_IMPORTED_MODULE_3_tween_js__["Tween"]({ yVel: 0.005 })
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
        var object = new __WEBPACK_IMPORTED_MODULE_2_three_css3drenderer__["CSS3DObject"](dd);
        object.position.set(menuPosX + 100, 240, 0);
        this.sceneCSS.add(object);
    };
    MainCSS3d.prototype.initiateParticles = function () {
        var geom = new __WEBPACK_IMPORTED_MODULE_0_three__["Geometry"]();
        var material = new __WEBPACK_IMPORTED_MODULE_0_three__["PointsMaterial"]({
            size: 1,
            //     transparent: true,
            //     opacity: 0.50,
            //     //vertexColors: true, // default = false
            sizeAttenuation: true,
            color: 0xf9ea63
        });
        var range = 290;
        for (var i = 0; i < 15000; i++) {
            var alpha = Math.random() * 360;
            var particle = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](range * Math.cos(alpha) - 30 + Math.random() * 60, //* Math.random(), //- range / 2,
            Math.random() - 5 + Math.random() * 15, range * Math.sin(alpha) - 30 + Math.random() * 60 //* Math.random() //- range / 2
            );
            geom.vertices.push(particle);
            // var color = new THREE.Color(0x00ff00);
            //     color.setHSL(color.getHSL().h,
            //     color.getHSL().s,
            //     Math.random() * color.getHSL().l);
            // geom.colors.push(color);
        }
        this.pmSystem = new __WEBPACK_IMPORTED_MODULE_0_three__["Points"](geom, material);
        this.scene.add(this.pmSystem);
        // make the pivot points the particle system's parent
        this.pivotPointPmSystem = new __WEBPACK_IMPORTED_MODULE_0_three__["Object3D"]();
        this.pivotPointPmSystem.userData = { rotation_yVel: 0.001 }; // velocity of pivot's update
        this.pivotPointPmSystem.add(this.pmSystem);
        this.scene.add(this.pivotPointPmSystem);
    };
    MainCSS3d.prototype.initiateTerrain = function () {
        // create vertices
        var depth = 300;
        var width = 300;
        var spacingX = Math.random() * 10 + 10;
        var spacingZ = spacingX;
        var height = 120;
        var offsetX = -width * spacingX / 2;
        var offsetZ = depth * spacingZ / 2;
        var offsetY = -250;
        //var scale = Chroma.scale(['blue','green','gray']).domain([0,height]);
        //var scale = Chroma.scale([0x00FFFF,0xFF00FF,0x00FF00]).domain([0,height]);
        var scale = __WEBPACK_IMPORTED_MODULE_5_chroma_js__["scale"]([[Math.random() * 255, 128, 128], [0, Math.random() * 255, Math.random() * 255], [200, 200, 200]]).domain([1, height]);
        var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["Geometry"]();
        //With Perlin
        var noise = __WEBPACK_IMPORTED_MODULE_4_perlin_noise__["generatePerlinNoise"](300, 300);
        for (var z = 0; z < depth; z++) {
            for (var x = 0; x < width; x++) {
                //var yValue = Math.abs(noise.perlin2(x / 10, z / 10) * height * 2);
                //let yValue = Math.abs(Perlin.generateWhiteNoise(2, 3) * height * 2);
                //z===0 ? (console.log("x: " + x + ", noise[x]: " + noise[x])) : 0;
                var vertex = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](x * spacingX, Math.abs(noise[(z * depth) + x]) * height, 
                //Math.random()*(height+x+x+z),
                z * spacingZ);
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
                var face1 = new __WEBPACK_IMPORTED_MODULE_0_three__["Face3"](b, a, c);
                var face2 = new __WEBPACK_IMPORTED_MODULE_0_three__["Face3"](c, d, b);
                // console.log("High1: " + this.getHighPoint(geometry, face1));
                //console.log("High2: " + this.getHighPoint(geometry, face2));
                face1.color = new __WEBPACK_IMPORTED_MODULE_0_three__["Color"](scale(this.getHighPoint(geometry, face1)).hex());
                face2.color = new __WEBPACK_IMPORTED_MODULE_0_three__["Color"](
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
        this.terrainMat = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshPhongMaterial"]();
        this.terrainMat.vertexColors = __WEBPACK_IMPORTED_MODULE_0_three__["FaceColors"];
        // create the mesh
        this.terrain = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](geometry, this.terrainMat);
        this.terrain.position.set(offsetX, offsetY, offsetZ);
        this.terrain.quaternion.setFromAxisAngle(new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](0, -1, 0), -Math.PI / 2);
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
        var groundShape = new __WEBPACK_IMPORTED_MODULE_6_cannon__["Heightfield"](matrix, {
            elementSize: spacingX
        });
        //var groundShape = new Cannon.Plane();
        var groundBody = new __WEBPACK_IMPORTED_MODULE_6_cannon__["Body"]({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new __WEBPACK_IMPORTED_MODULE_6_cannon__["Vec3"](1, 0, 0), -Math.PI / 2);
        console.log("groundBody.quaternion: " + groundBody.quaternion);
        //groundBody.quaternion.z = THREE.Math.degToRad(45);
        //groundBody.position.set(-width*(spacingX/2), -520, depth*(spacingZ/2));
        groundBody.position.set(offsetX, offsetY, offsetZ);
        this.cannonWorld.addBody(groundBody);
    };
    MainCSS3d.prototype.getHighPoint = function (geometry, face) {
        var v1 = geometry.vertices[face.a].y;
        var v2 = geometry.vertices[face.b].y;
        var v3 = geometry.vertices[face.c].y;
        return Math.max(v1, v2, v3);
    };
    MainCSS3d.prototype.createCSSRenderer = function () {
        this.sceneCSS = new __WEBPACK_IMPORTED_MODULE_0_three__["Scene"]();
        this.rendererCSS = new __WEBPACK_IMPORTED_MODULE_2_three_css3drenderer__["CSS3DRenderer"]();
        this.rendererCSS.setSize(window.innerWidth * this.scrSize, window.innerHeight * this.scrSize);
        this.rendererCSS.domElement.style.position = 'absolute';
        //this.rendererCSS.domElement.style.top = "40px";
        this.rendererCSS.domElement.style.zIndex = "2"; // required
        this.htmlDivCanvas.appendChild(this.rendererCSS.domElement);
    };
    MainCSS3d.prototype.initPhysicWorld = function () {
        this.cannonWorld = new __WEBPACK_IMPORTED_MODULE_6_cannon__["World"]();
        this.cannonWorld.quatNormalizeSkip = 2;
        this.cannonWorld.quatNormalizeFast = true;
        this.cannonWorld.gravity.set(0, 0, 0); // X, Y, Z direction // deal with timestep in render func
        this.cannonWorld.broadphase = new __WEBPACK_IMPORTED_MODULE_6_cannon__["NaiveBroadphase"](); // activate colliding bodies
        this.cannonWorld.solver.iterations = 10;
        this.cannonWorld.defaultContactMaterial.contactEquationRelaxation = 0.8;
    };
    MainCSS3d.prototype.onResize = function () {
        this.camera.aspect = this.aspRatio;
        this.camera.updateProjectionMatrix();
        console.log("onResize: Witdh: " + window.innerWidth * this.scrSize + ", Height: " + window.innerHeight * this.scrSize);
        this.renderer.setSize(window.innerWidth * this.scrSize, window.innerHeight * this.scrSize);
        this.rendererCSS.setSize(window.innerWidth * this.scrSize, window.innerHeight * this.scrSize);
    };
    return MainCSS3d;
}());



/***/ }),

/***/ "../../../../../src/app/cube-threejs/cube-threejs.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cube-threejs/cube-threejs.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- \nHelp:\n    Desc: Template reference variables ( #var )\n        Link: https://angular.io/guide/template-syntax#ref-vars\n    Desc: HTML DOM Events (function)\n        Link: https://www.w3schools.com/jsref/dom_obj_event.asp \n-->\n\n<!-- wrap w3 -->\n<div class=\"w3-container\">\n    <header>\n            <div class=\"w3-container \">\n                <h1><b>A Three.js cube showcase...</b></h1>\n                In the canvas below you can play with at least one spinning cube. It's size is set to 1.0 \"unitless\" length of each edge.<br>\n                The scene contains a plane below the cubes and a spotlight over it.<br>\n                In this example the user cannot interact directly with the canvas via keybord or mouse movement.<br>\n                Play around with the settings you can change.\n            </div>\n            <div class=\"w3-container \">\n                <b>Note:</b>\n                <ul>\n                    <li>The 3D scene is set up on a HTML canvas element.</li>\n                    <li>Only the <em>Threejs</em> library is used here.</li>\n                </ul>\n            </div>\n    </header>\n\n    <div class=\"w3-container\">\n        <!-- Angular Template reference variable '#': Use the hash symbol (#) to declare a reference variable.  -->\n        \n        <!-- canvas here -->\n        <canvas #canvas (window:resize)=\"onResize()\"></canvas>\n               \n        <!-- Setting UI -->\n        <div class=\"w3-row\">\n            <!-- with two way binding with ngModule, we need here to import the FormsModule-->\n            \n            <!-- Cube Rotation Speed X, Y, Z-->\n            <div class=\"w3-col s4 w3-left\">Cube Rotation Speed X: {{rotationSpeedX/1000}}</div>\n            <div class=\"w3-col s8 w3-left\">\n                <input [(ngModel)]=\"rotationSpeedX\" type=\"range\" min=\"1\" max=\"100\" class=\"slider\">\n            </div>\n            <div class=\"w3-col s4 w3-left\">Cube Rotation Speed Y: {{rotationSpeedY/1000}}</div>\n            <div class=\"w3-col s8 w3-left\">\n                <input [(ngModel)]=\"rotationSpeedY\" type=\"range\" min=\"1\" max=\"100\" class=\"slider\">\n            </div>\n            <div class=\"w3-col s4 w3-left\">Cube Rotation Speed Z: {{rotationSpeedZ/1000}}</div>\n            <div class=\"w3-col s8 w3-left\">\n                <input [(ngModel)]=\"rotationSpeedZ\" type=\"range\" min=\"1\" max=\"100\" class=\"slider\">\n            </div>\n\n            <!-- Camera Position Z -->\n            <div class=\"w3-col s4 w3-left\">Camera Position Z: {{camPosZ}}</div>\n            <div class=\"w3-col s8 w3-left\">\n                <input [(ngModel)]=\"camPosZ\" type=\"range\" min=\"2\" max=\"30\" class=\"slider\">\n            </div>\n\n            <!-- Number Of Cubes -->\n            <div class=\"w3-col s4 w3-left\">Number Of Cubes: {{numOfCubes}}</div>\n            <div class=\"w3-col s8 w3-left\">\n                <input type=\"range\" #id_In_NumOfCubes (input)=\"changeNumOfCubes(id_In_NumOfCubes.value)\" min=\"1\" max=\"100\" [value]=\"numOfCubes\" class=\"slider\">\n            </div>\n\n            <!-- Color or texture -->\n            <div class=\"w3-col s4 w3-left\">Use Texture Or Colors:</div>\n            <div class=\"w3-col s8 w3-left\">\n                <input #id_In_ChangeMaterial (change)=\"changeMaterial(id_In_ChangeMaterial.checked)\" type=\"checkbox\">\n            </div>\n        </div> \n\n        <!-- with property binding... a clear solution\n        <input type=\"range\" #refInRotSpeedX (change)=\"changeRotSpeedX(refInRotSpeedX.value)\" min=\"1\" max=\"100\" [value]=\"rotationSpeedX\" class=\"slider\">\n        X {{rotationSpeedX}}\n        -->\n\n        <!-- with event binding... no godd solution-->\n        <!-- <input type=\"range\" (change)=\"changeNumOfCubes($event)\" min=\"1\" max=\"100\" [value]=\"numOfCubes\" class=\"slider\">\n        Cubes {{numOfCubes}} -->\n    </div>\n\n    <!-- textual info state-->\n    <br>\n    <div class=\"w3-container \">\n    You currently have {{numOfCubes}} cube(s) on the canvas. The rotational speed\n    is set to X={{rotationSpeedX/1000}}, Y={{rotationSpeedY/1000}}, Z={{rotationSpeedZ/1000}} for each cube.<br>\n    The camera is {{camPosZ}} units away from the zero point Z. The cubes have now a material with {{(id_In_ChangeMaterial.checked)? 'brick texture':'colors'}}.\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/cube-threejs/cube-threejs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CubeThreejsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three__ = __webpack_require__("../../../../three/build/three.module.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import loacl ts files: https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html
//import * as Triangleee from "./src/cube";
//import * as Stats from './../../external-lib/stats-js/src/Stats';
var CubeThreejsComponent = /** @class */ (function () {
    /* DEPENDENCY INJECTION (CONSTRUCTOR) */
    function CubeThreejsComponent() {
        this.cubes = [];
        /* CUBE PROPERTIES */
        // @Input()
        this.rotationSpeedX = 10;
        // changeRotSpeedX(v: number) {
        //     this.rotationSpeedX = v;
        //     console.log('changeRotSpeedX: ' + v);
        // }
        // @Input()
        this.rotationSpeedY = 10;
        // changeRotSpeedY(e) {
        //     this.rotationSpeedY = e.target.value;
        //     console.log('changeRotSpeedY: ' + e.target.value);
        // }
        this.rotationSpeedZ = 10;
        this.camPosZ = 15;
        this.size = 1;
        this.isTextured = false;
        this.numOfCubes = 20;
    }
    Object.defineProperty(CubeThreejsComponent.prototype, "canvas", {
        get: function () {
            return this.canvasRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    //called after the constructor and called  after the first ngOnChanges() 
    CubeThreejsComponent.prototype.ngOnInit = function () {
    };
    /* LIFECYCLE */
    /**
     * We need to wait until template is bound to DOM, as we need the view
     * dimensions to create the scene. We could create the cube in a Init hook,
     * but we would be unable to add it to the scene until now.
     * https://angular.io/guide/lifecycle-hooks
     */
    CubeThreejsComponent.prototype.ngAfterViewInit = function () {
        this.createScene();
        this.changeNumOfCubes(this.numOfCubes.toString());
        var planeGeometry = new __WEBPACK_IMPORTED_MODULE_1_three__["PlaneGeometry"](200, 200);
        var planeMaterial = new __WEBPACK_IMPORTED_MODULE_1_three__["MeshLambertMaterial"]();
        var plane = new __WEBPACK_IMPORTED_MODULE_1_three__["Mesh"](planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 100;
        plane.position.z = 100;
        this.scene.add(plane);
        //axes
        var axes = new __WEBPACK_IMPORTED_MODULE_1_three__["AxesHelper"](100);
        this.scene.add(axes);
        // light
        var directionalLight = new __WEBPACK_IMPORTED_MODULE_1_three__["DirectionalLight"](0xffffff, 1.0);
        directionalLight.castShadow = false;
        this.scene.add(directionalLight);
        var directionalLight = new __WEBPACK_IMPORTED_MODULE_1_three__["DirectionalLight"](0xffffff, 0.5);
        directionalLight.position.set(10, 10, 50);
        directionalLight.target.position.set(10, 10, 0);
        this.scene.add(directionalLight);
        this.topLight = new __WEBPACK_IMPORTED_MODULE_1_three__["SpotLight"](0x111111, 0.5);
        this.topLight.position.set(0, 15, 0);
        this.topLight.castShadow = true;
        this.scene.add(this.topLight);
        this.startRenderingLoop();
    };
    /* STAGING, ANIMATION, AND RENDERING */
    /**
     * Animate the cube
     */
    CubeThreejsComponent.prototype.animateCubes = function () {
        // this.cubes[0].rotation.x += (this.rotationSpeedX/1000);
        // this.cubes[0].rotation.y += (this.rotationSpeedY/1000);
        // this.cubes[0].rotation.z += (this.rotationSpeedZ/1000);
        var component = this;
        this.cubes.forEach(function (cube) {
            cube.rotation.x += (component.rotationSpeedX / 1000);
            cube.rotation.y += (component.rotationSpeedY / 1000);
            cube.rotation.z += (component.rotationSpeedZ / 1000);
        });
    };
    CubeThreejsComponent.prototype.updateCamera = function () {
        this.camera.position.z = this.camPosZ;
    };
    CubeThreejsComponent.prototype.changeNumOfCubes = function (v) {
        console.log("input cubes: " + v + ", scene cubes: " + this.cubes.length);
        var targetVal = parseInt(v, 10);
        // add cubes to scene
        while (targetVal > this.cubes.length) {
            this.addCube();
        }
        // remove cubes from scene
        while (targetVal < this.cubes.length) {
            this.removeCube();
        }
        //
        this.numOfCubes = this.cubes.length;
    };
    CubeThreejsComponent.prototype.changeMaterial = function (textured) {
        console.log("textured: " + textured);
        this.isTextured = textured;
        // check to set texture or pure color
        var matProps = {};
        if (textured) {
            matProps.map = this._texture_brick;
        }
        else {
            matProps.color = (new __WEBPACK_IMPORTED_MODULE_1_three__["Color"](Math.random(), Math.random(), Math.random()));
        }
        // re-materialize presented cubes
        var component = this;
        var matCube = new __WEBPACK_IMPORTED_MODULE_1_three__["MeshPhongMaterial"](matProps);
        this.cubes.forEach(function (cube) {
            cube.material = matCube;
        });
    };
    /**
     * Create the cube
     */
    CubeThreejsComponent.prototype.addCube = function () {
        var geometry = new __WEBPACK_IMPORTED_MODULE_1_three__["BoxGeometry"](this.size, this.size, this.size);
        //let geometry = new THREE.IcosahedronGeometry(1, 1);
        this._texture_brick = new __WEBPACK_IMPORTED_MODULE_1_three__["TextureLoader"]().load("/assets/texture/Bricks.jpg");
        this._texture_brick.minFilter = __WEBPACK_IMPORTED_MODULE_1_three__["LinearFilter"];
        // check to set texture or pure color
        var matProps = {};
        if (this.isTextured) {
            matProps.map = this._texture_brick;
        }
        else {
            matProps.color = (new __WEBPACK_IMPORTED_MODULE_1_three__["Color"](Math.random(), Math.random(), Math.random()));
        }
        this.cubes.push(new __WEBPACK_IMPORTED_MODULE_1_three__["Mesh"](geometry, new __WEBPACK_IMPORTED_MODULE_1_three__["MeshPhongMaterial"](
        //{color: (new THREE.Color( Math.random(), Math.random(), Math.random() ))}
        matProps)));
        this.cubes[this.cubes.length - 1].position.x = Math.ceil(Math.random() * 10);
        this.cubes[this.cubes.length - 1].position.y = Math.ceil(Math.random() * 10);
        this.cubes[this.cubes.length - 1].position.z = Math.ceil(Math.random() * 10);
        this.cubes[this.cubes.length - 1].castShadow = true;
        this.cubes[this.cubes.length - 1].receiveShadow = true;
        // Add cube to scene
        this.scene.add(this.cubes[this.cubes.length - 1]);
    };
    CubeThreejsComponent.prototype.removeCube = function () {
        this.scene.remove(this.cubes[this.cubes.length - 1]);
        this.cubes.pop();
    };
    /**
     * Create the scene
     */
    CubeThreejsComponent.prototype.createScene = function () {
        /* Scene */
        this.scene = new __WEBPACK_IMPORTED_MODULE_1_three__["Scene"]();
        /* Camera */
        var aspectRatio = this.getAspectRatio();
        this.camera = new __WEBPACK_IMPORTED_MODULE_1_three__["PerspectiveCamera"](70, aspectRatio, 1, 1000);
        this.camera.position.set(5, 10, this.camPosZ);
        this.camera.lookAt(new __WEBPACK_IMPORTED_MODULE_1_three__["Vector3"](5, 0, 0));
    };
    /**
     * Start the rendering loop
     */
    CubeThreejsComponent.prototype.startRenderingLoop = function () {
        /* Renderer */
        // Use canvas element in template
        this.renderer = new __WEBPACK_IMPORTED_MODULE_1_three__["WebGLRenderer"]({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.setSize(window.innerWidth * 0.66, window.innerHeight * 0.66);
        // shadow
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = __WEBPACK_IMPORTED_MODULE_1_three__["PCFSoftShadowMap"]; // to antialias the shadow
        this.renderer.render(this.scene, this.camera);
        var component = this;
        (function render() {
            requestAnimationFrame(render);
            component.animateCubes();
            component.updateCamera();
            component.renderer.render(component.scene, component.camera);
        }());
    };
    /* EVENTS */
    /**
     * Update scene after resizing.
     */
    CubeThreejsComponent.prototype.onResize = function () {
        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();
        console.log("onResize: Witdh: " + window.innerWidth * 0.66 + ", Height: " + window.innerHeight * 0.66);
        this.renderer.setSize(window.innerWidth * 0.66, window.innerHeight * 0.66);
    };
    /**
    *
    *
    * @private
    * @returns
    * @memberof CubeThreejsComponent
    */
    CubeThreejsComponent.prototype.getAspectRatio = function () {
        return this.canvas.clientWidth / this.canvas.clientHeight;
        //return window.innerWidth/4 / window.innerHeight/2;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('canvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], CubeThreejsComponent.prototype, "canvasRef", void 0);
    CubeThreejsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-cube-threejs',
            template: __webpack_require__("../../../../../src/app/cube-threejs/cube-threejs.component.html"),
            styles: [__webpack_require__("../../../../../src/app/cube-threejs/cube-threejs.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CubeThreejsComponent);
    return CubeThreejsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- wrap w3 -->\n<div class=\"w3-container\">\n  <header>\n    <div class=\"w3-container \">\n      <h1>\n        <b>3D showcase examples set up on Angular 5, Three.js</b>\n      </h1>\n      Currently there is an example with rotating cubes and an example with a terrain, CSS3D and pysics developed.\n      <br> A small game included most features of the examples will be implemented...\n      <br>\n    </div>\n\n  </header>\n  <div class=\"w3-container\">\n    <p>\n      <b>Note: This page is not responsive for mobile screens yet.</b>\n    </p>\n  </div>\n  <ul>\n    <li>Cube - Three.js</li>\n    <a routerLink=\"cube-threejs\">\n      <img [src]=\"imgURL_cube_threejs\" alt=\"\" height=\"150\" width=\"150\">\n    </a>\n\n    <li>CSS3D - Three.js</li>\n    <a routerLink=\"css3d-threejs\">\n      <img [src]=\"imgURL_css3d_threejs\" alt=\"\" height=\"150\" width=\"150\">\n    </a>\n  </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        // thumbnails
        this.imgURL_cube_threejs = "assets/screens/cube_threejs.jpg";
        this.imgURL_css3d_threejs = "assets/texture/css3d_threejs.jpg";
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map