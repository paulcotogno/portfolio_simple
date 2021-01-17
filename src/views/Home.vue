<template>
  <div id="home_page" class="home_page">
    <div class="renderer_wrapper">
      <div id="renderer"></div>
      <div class="nav_down">
        <h2 class="downright"><a href="#">@Instagram</a></h2>
        <h2 class="downright"><a href="#">@Behance</a></h2>
      </div>
      <div class="home_wrapper">
        <div class="white-blend"></div>
      </div>
      <ProjectsHome
        v-for="{ title, imagePath, projectType, color } in data"
        :key="title"
        :title="title"
        :imagePath="imagePath"
        class="page_components"
        @mouseenter="hover(title, imagePath, projectType, color)"
        @mouseleave="leave"
        @click="this.visible = true"
      />
      <TextHover
        ref="texthover"
        :title="this.title_projet"
        :imagePath="this.imagePath_projet"
        :projectType="this.projectType"
        :initialVisible="this.textHoverVisible"
      />
    </div>
    <Galery />
    <component :is="this.componentVisible" v-show="false" />
  </div>
</template>

<script>
import ProjectsHome from "@/components/Projects-Home";
import TextHover from "@/components/TextHoverWrapper";
import Galery from "@/components/Galery";

import VueBlotter from "vue-blotter";
import THREE from "three";
import { Noise } from "noisejs";

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
      BallSize: 0.45,
      visible: false,
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

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );

      this.scene.add(this.camera);

      this.camera.position.z = 1;

      ///////////
      //LIGHTS///
      ///////////

      this.light = new THREE.AmbientLight(0x090909); // soft white light

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
      this.directionalLight.position.set(0, 1, 1);
      this.directionalLight.target.position.set(0, 0, 0);
      this.scene.add(this.directionalLight.target);
      this.scene.add(this.directionalLight);

      this.scene.add(this.directionalLight.target);

      this.scene.add(this.light);

      ////////////////////////////////
      ///////////geometry/////////////
      ////////////////////////////////


      /*this.enviMap = new THREE.CubeTextureLoader()
        .setPath('textures/')
        .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ]);
      */

      this.planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        refractionRatio: 0.95,
      });

      this.plane = new THREE.Mesh(this.rectangle, this.planeMaterial);
      this.plane.position.set(0, 0, 0.5);

      this.material = new THREE.MeshPhysicalMaterial({
        reflectivity: 0.47,
        wireframe: true,
      });

      this.sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0, 80, 80),
        this.material
      );

      this.scene.add(this.sphere);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor(0x020202, 1);
      container.appendChild(this.renderer.domElement);
    },
    amountNoiseDistord() {
      var newPos = window.pageYOffset;
      const diff = Math.abs(newPos - this.currentPos);
      if (diff < 100) {
        this.speed = diff * 0.0016 + 0.05;
      } else if (diff > 100) {
        this.speed = 0.21;
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
      this.plane.position.set(0, 0, -this.varScroll * 3 + 2);
      this.update();
      this.amountNoiseDistord();
      this.renderer.render(this.scene, this.camera);
    },
    update() {
      var noise = new Noise();

      //noise.seed(Math.random());
      this.sphere.geometry.radius = +4;
      var time = performance.now() * 0.003;
      //var value = noise.perlin3(p.x * k + time, p.y * k, p.z * k);

      var k = 2;
      for (var i = 0; i < this.sphere.geometry.vertices.length; i++) {
        var p = this.sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(
          this.BallSize +
            this.speed * noise.perlin3(p.x * k + time, p.y * k, p.z * k)
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

<style lang="scss">
.home_page {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  .nav_down {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 3% 4%;
    h2 {
      text-align: right;
      font-family: "Pano";
      font-size: 1em;
      font-weight: 300;
      a {
        color: white;
      }
    }
  }
  .home_wrapper {
    height: 70vh;
    width: 100vw;
  }
  .page_components {
    &::after {
      position: absolute;
      top: 30px;
      left: 30px;
      width: 40vw;
      height: 3px;
      display: block;
      background: white;
    }
    margin: 3% 5%;
    transition: all 0.1s ease;
    -moz-transition: background-size 2s ease;
    -ms-transition: background-size 4s ease;
    -o-transition: background-size 4s ease;
    -webkit-transition: background-size 4s ease;
    padding: 0;
    align-self: flex-start;
    height: fit-content;
    background: none;
    width: 15vw;
    height: 15vw;
    background-position: center;
    background-size: contain;
    filter: grayscale(100%);
    cursor: pointer;
    a {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.renderer_wrapper{
  margin-bottom: 40vh;
}
#renderer {
  width: 100vw;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: -2;
}
body {
  margin: 0;
  width: 100vw;
  background: #020202;
  color: #f3f3f3;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
#text_hover_wrapper {
  top: 0;
  width: 100vw;
  height: 100vh;
  font-size: 4em;
  text-transform: uppercase;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  background-color: rgba($color: #030303, $alpha: 0.5);
  .text_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      width: max-content;
      text-align: center;
      margin: 0;
      height: 45px;
      font-family: 'Monument';
      span {
        color: rgba($color: #808080, $alpha: 1);
      }
    }
  }
}
</style>