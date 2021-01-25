<template>
    <div id="renderer"></div>
</template>

<script>
import ProjectsHome from "@/components/Projects-Home";
import TextHover from "@/components/TextHoverWrapper";
import Galery from "@/components/Galery";

import VueBlotter from "vue-blotter";
//import * as THREE from "three";
import { Noise } from "noisejs";

let mesh, scene;

export default {
  components: {
    ProjectsHome,
    TextHover,
    VueBlotter,
    Galery,
  },
  data: function () {
    return {
      title_projet: "default",
      imagePath_projet: "project_seoelp.png",
      projectType: "default",
      textHoverVisible: false,
      componentVisible: "ProjetSeoElp",
      projectHover: "",
      texture: "project_seoelp.png",
      amountNoise: "0.07",
      speed: "0.02",
      currentPos: window.pageYOffset,
      color: 0xffffff,
      varScroll: 0.5,
      BallSize: 10,
      visible: false,
      mouse: { x: "", y: "" },
      meshReact: "",
    };
  },
  props: {
    data: {
      type: Array,
    },
  },
  methods: {
    init() {
      let container = document.getElementById("renderer");

      scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );

      scene.add(this.camera);

      this.camera.position.z = 1;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor(0x020202, 1);
      container.appendChild(this.renderer.domElement);

      ///////////
      //LIGHTS///
      ///////////

      this.light = new THREE.AmbientLight(0x090909); // soft white light

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
      this.directionalLight.position.set(0, 1, 1);
      this.directionalLight.target.position.set(0, 0, 0);
      scene.add(this.directionalLight.target);
      scene.add(this.directionalLight);

      scene.add(this.directionalLight.target);

      scene.add(this.light);

      ////////////////////////////////
      ///////////sphere/////////////
      ////////////////////////////////

      this.material = new THREE.MeshNormalMaterial({
        wireframe: false,
      });
      this.sphere = new THREE.Mesh(
        new THREE.SphereGeometry(10, 100, 100),
        this.material
      );

      scene.add(this.sphere);

    }, 
    amountNoiseDistord() {
      var newPos = window.pageYOffset;
      const diff = Math.abs(newPos - this.currentPos);
      if (diff < 100) {
        this.speed = diff * 0.001 + 0.05;
      } else if (diff > 100) {
        this.speed = 0.15;
      }
      this.currentPos = newPos;
    },
    hover(title, path, type, color) {
      this.projectHover = event.target;
      if (this.projectHover.classList.contains("page_components")) {
        //this.projectHover.style.transform = "scale(1.05)";
        //this.projectHover.style.backgroundSize = "110%";
        this.projectHover.style.filter = "grayscale(0%)";
      }
      this.color = color;
      //this.material.wireframe = false;
      this.title_projet = title;
      this.imagePath_projet = path;
      this.texture = new THREE.TextureLoader().load("img/" + path);
      this.projectType = type;
      this.$refs.texthover.show();
    },
    leave() {
      //this.material.wireframe = true;
      this.projectHover.style.filter = "grayscale(100%)";
      this.$refs.texthover.hide();
      this.color = 0xffffff;
      //this.projectHover.style.transform = "scale(1)";
      //this.projectHover.style.backgroundSize = "contain";
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      //this.sphere.rotation.y += 0.008;
      this.material.color = new THREE.Color(this.color);
      this.update();
      this.amountNoiseDistord();
      this.renderer.render(scene, this.camera);
    },
    update() {
      var noise = new Noise();

      var k = 1;
      //noise.seed(Math.random());
      this.sphere.geometry.radius = +4;
      var timeV = performance.now() * 0.003;
      //var value = noise.perlin3(p.x * k + time, p.y * k, p.z * k);
      for (var i = 0; i < this.sphere.geometry.vertices.length; i++) {
        var v = this.sphere.geometry.vertices[i];
        v.normalize().multiplyScalar(
          this.BallSize +
            this.speed * noise.perlin3(v.x * k + timeV, v.y * k, v.z * k)
          //noise.perlin3(p.x * k + time, p.y * k, p.z * k)
        );
      }

      this.sphere.geometry.computeVertexNormals();
      this.sphere.geometry.normalsNeedUpdate = true;
      this.sphere.geometry.verticesNeedUpdate = true;
    },
    animInteract() {
      var m = { x: 0, y: 0 };
      var pos = { x: 0, y: 0 };

      window.addEventListener("mousemove", (e) => {
        m.x = e.clientX;
        m.y = e.clientY;

        pos.x = (m.x / window.innerWidth) * 2 - 1;
        pos.y = ((m.y / window.innerHeight) * 2 - 2) * -1;

        this.directionalLight.target.position.set(pos.x, pos.y, 0.5);

        this.sphere.rotation.x = pos.x;
        this.sphere.rotation.z = pos.y;
      });

      window.addEventListener("scroll", () => {
        this.varScroll =
          (window.scrollY + window.innerHeight) / (window.innerHeight * 2);
      });
    },
    responsiveValueCheck() {
      if (window.innerWidth < 500) {
        this.BallSize = 0.25;
      } else {
        this.BallSize = 0.45;
      }
    },
    windowResizeCheck() {
      window.addEventListener("resize", () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.responsiveValueCheck();
      });
    },
  },
  mounted() {
    this.init();
    this.animate();
    this.animInteract();
    this.responsiveValueCheck();
    this.windowResizeCheck();
  },
};
</script>