<template>
  <div class="seoelpproject">
    <div id="render"></div>
  </div>
</template>

<script>
import * as THREE from "@/js/three.js-dev/build/three.module.js";
import { OrbitControls } from "@/js/three.js-dev/examples/jsm/controls/OrbitControls.js";
import { ColladaLoader } from "@/js/three.js-dev/examples/jsm/loaders/ColladaLoader.js";
import { OBJLoader } from "@/js/three.js-dev/examples/jsm/loaders/OBJLoader.js";

var renderer, camera, scene, controls;
var SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_LEFT, SCREEN_TOP;

export default {
  methods: {
    init() {
      var container = document.getElementById("render");

      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0xf3f3f3, 1);

      document.getElementById("render").appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(
        20,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );

      camera.position.set(0, 0, 200);

      controls = new OrbitControls(camera, renderer.domElement);

      controls.update();

      let w = container.offsetWidth;
      let h = container.offsetHeight;
      SCREEN_WIDTH = container.scrollWidth;
      SCREEN_HEIGHT = container.scrollHeight;
      SCREEN_LEFT =
        container.offsetLeft - container.scrollLeft + container.clientLeft;
      SCREEN_TOP =
        container.offsetTop - container.scrollTop + container.clientTop;
      renderer.setSize(w, h);

      scene.add(camera);

      var loader = new ColladaLoader();
      //var loader = new OBJLoader();
      loader.load(
        "/3dmodel/seoelp.dae",
        this.onLoaded,
        this.onProgress,
        this.onError
      );

      //scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1));

      var ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientLight);

      this.animate();
    },
    animate() {
      requestAnimationFrame(this.animate);
      //camera.position.set(0, 0, -(window.pageYOffset * 0.2) + 50);

      console.log(camera.position);
      controls.update();
      renderer.render(scene, camera);
    },
    onLoaded(obj) {
      let object = obj.scene;

      scene.add(object);

      object.scale.set(1, 1, 1);
    },
    onProgress(data) {
      if (data.lengthComputable) {
        var percentComplete = (data.loaded / data.total) * 100;
        console.log(percentComplete);
        /*document.getElementById("action").value =
          "Loading:" + percentComplete.toFixed(1) + "%";*/
      }
    },
    onError(data) {
      console.error(data);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
.seoelpproject {
  height: 400vh;
  #render {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: -2;
  }
}
</style>