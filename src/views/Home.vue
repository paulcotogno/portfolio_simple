<template>
  <div id="nav">
    <div class="nav_wrapper">
      <h2 id="title">
        <router-link to="/"
          ><img src="@/assets/img/logo.svg" alt=""
        /></router-link>
      </h2>
      <h2><router-link to="/about">Contact</router-link></h2>
    </div>
  </div>
  <div id="home_page" class="home_page">
    <h1 ref="titre">
      <span class="left">Paul C</span><span class="middle">o</span
      ><span class="right">togno</span>
      <!--<span style="transitiondelay: 0s; color: #bbbbbb">Paul Cotogno</span>
      <span style="transitiondelay: 0.06s; color: #bcbcbc">Paul Cotogno</span>
      <span style="transitiondelay: 0.02s; color: #cccccc">Paul Cotogno</span>
      <span style="transitiondelay: 0.06s; color: #cdcdcd">Paul Cotogno</span>
      <span style="transitiondelay: 0.04s; color: #dddddd">Paul Cotogno</span>
      <span style="transitiondelay: 0.06s; color: #dedede">Paul Cotogno</span>
      <span style="transitiondelay: 0.06s; color: #eeeeee">Paul Cotogno</span>
      <span style="transitiondelay: 0.06s; color: #efefef">Paul Cotogno</span>
      <span style="transitiondelay: 0.08s; color: #ffffff">Paul Cotogno</span>-->
    </h1>
    <div id="renderer"></div>
    <div class="nav_down">
      <h2 class="downright"><a href="#">@Instagram</a></h2>
      <h2 class="downright">
        <a href="https://www.behance.net/PaulCotogno">@Behance</a>
      </h2>
    </div>
    <div class="home_wrapper"></div>

    <div id="project_wrapper_column">
      <div id="project_wrapper_row">
        <div id="project_wrapper">
          <ProjectsHome
            v-for="{ title, imagePath, id } in data"
            :key="title"
            :title="title"
            :imagePath="imagePath"
            :id="id"
            class="page_components"
            @click="this.visible"
          />
        </div>
      </div>
    </div>
    <TextHover
      ref="texthover"
      :title="this.title_projet"
      :imagePath="this.imagePath_projet"
      :projectType="this.projectType"
      :initialVisible="this.textHoverVisible"
      :id="this.id_project"
    />
  </div>
</template>

<script>
import ProjectsHome from "@/components/Projects-Home";
import TextHover from "@/components/TextHoverWrapper";
import Galery from "@/components/Galery";

import VueBlotter from "vue-blotter";
//import * as THREE from "three";
import { Noise } from "noisejs";

let mesh,
  scene,
  oldValue = 0;

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
      color: 0x000000,
      varScroll: 0.5,
      BallSize: 0.15,
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
      this.renderer.setClearColor(0x030303, 1);
      container.appendChild(this.renderer.domElement);

      ///////////
      //LIGHTS///
      ///////////

      this.light = new THREE.AmbientLight(0x090909); // soft white light

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
      this.directionalLight.position.set(0, 3, -10);
      this.directionalLight.target.position.set(0, 0, 0);
      scene.add(this.directionalLight.target);
      scene.add(this.directionalLight);

      scene.add(this.directionalLight.target);

      scene.add(this.light);

      ////////////////////////////////
      //////////EnvMap////////////////
      ////////////////////////////////

      var loader = new THREE.CubeTextureLoader();
      loader.setCrossOrigin("");
      loader.setPath("textures/");

      var cubeTexture = loader.load([
        "px.png",
        "nx.png",
        "py.png",
        "ny.png",
        "pz.png",
        "nz.png",
      ]);

      this.thedotsTexture = new THREE.TextureLoader().load(
        "textures/project_alias.png"
      );
      this.thedotsTexture.wrapS = THREE.RepeatWrapping;
      this.thedotsTexture.wrapT = THREE.RepeatWrapping;
      this.thedotsTexture.repeat.set(4, 4);

      ////////////////////////////////
      ///////////sphere/////////////
      ////////////////////////////////

      var cols = [
        {
          stop: 0,
          color: new THREE.Color(0x000000),
        },
        {
          stop: 1,
          color: new THREE.Color(0x000000),
        },
      ];

      var geom = new THREE.SphereGeometry(4, 70, 70);

      var rev = true;

      this.setGradient(geom, cols, "z", rev);

      var mat = new THREE.MeshPhysicalMaterial({
        //vertexColors: THREE.VertexColors,
        color: 0x000000,
        envMap: cubeTexture,
        wireframe: false,
        roughness: 0.3,
        metalness: 1,
        reflectivity: 1,
        clearcoat: 0.5,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 1,
        side: 2,
      });
      this.sphere = new THREE.Mesh(geom, mat);
      //this.sphere.material.envMap.mapping = THREE.CubeRefractionMapping;
      scene.add(this.sphere);
    },
    setGradient(geometry, colors, axis, reverse) {
      geometry.computeBoundingBox();

      var bbox = geometry.boundingBox;
      var size = new THREE.Vector3().subVectors(bbox.max, bbox.min);

      var vertexIndices = ["a", "b", "c"];
      var face,
        vertex,
        normalized = new THREE.Vector3(),
        normalizedAxis = 0;

      for (var c = 0; c < colors.length - 1; c++) {
        var colorDiff = colors[c + 1].stop - colors[c].stop;

        for (var i = 0; i < geometry.faces.length; i++) {
          face = geometry.faces[i];
          for (var v = 0; v < 3; v++) {
            vertex = geometry.vertices[face[vertexIndices[v]]];
            normalizedAxis = normalized
              .subVectors(vertex, bbox.min)
              .divide(size)[axis];
            if (reverse) {
              normalizedAxis = 1 - normalizedAxis;
            }
            if (
              normalizedAxis >= colors[c].stop &&
              normalizedAxis <= colors[c + 1].stop
            ) {
              var localNormalizedAxis =
                (normalizedAxis - colors[c].stop) / colorDiff;
              face.vertexColors[v] = colors[c].color
                .clone()
                .lerp(colors[c + 1].color, localNormalizedAxis);
            }
          }
        }
      }
    },
    amountNoiseDistord() {
      var newPos = window.pageYOffset;
      const diff = Math.abs(newPos - this.currentPos);
      if (diff < 100) {
        this.speed = diff * 0.002 + 0.05;
      } else if (diff > 100) {
        this.speed = 0.2;
      }
      this.currentPos = newPos;
    },
    scrollProject() {
      var pwcol = document.getElementById("project_wrapper_column"),
        pwrow = document.getElementById("project_wrapper_row"),
        pw = document.getElementById("project_wrapper");

      document.addEventListener("scroll", () => {
        var scrollprojectval =
          ((pwrow.offsetTop + pwrow.offsetHeight) /
            (pwcol.offsetTop + pwcol.offsetHeight) -
            0.5) *
          2;

        var valProject = parseInt(scrollprojectval * 4);

        if (valProject >= 0 && valProject <= 3) {
          pw.style.transform = "translateX(-" + valProject * 100 + "vw)";
        }
        if (valProject > 3) {
          pw.style.transform = "translateX(-300vw)";
        }

        if (scrollprojectval > 0 && scrollprojectval < 1) {
          var dataProjectGet = this.data[valProject];

          this.color = "0x" + dataProjectGet.color;
          this.title_projet = dataProjectGet.title;
          this.imagePath_projet = dataProjectGet.imagePath;
          this.projectType = dataProjectGet.projectType;
          this.id_project = dataProjectGet.id;
          document.getElementById(valProject).style.filter = "grayscale(0%)";

          this.sphere.position.x = 1;

          //scene.background = this.thedotsTexture;

          if (valProject != oldValue) {
            //this.$refs.texthover.hide();
            document.getElementById(oldValue).style.filter = "grayscale(100%)";
          } else {
            //this.$refs.texthover.show();
          }

          oldValue = valProject;
        } else {
          //this.$refs.texthover.hide();  
          this.color = "0x000000";
          this.sphere.position.x = 0;
          //scene.background = 0x030303;
        }
      });
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      //this.sphere.rotation.y += 0.008;
      this.update();
      this.amountNoiseDistord();

      this.renderer.render(scene, this.camera);
    },
    update() {
      var noise = new Noise();

      var k = 1;
      //noise.seed(Math.random());
      this.sphere.geometry.radius = +2;
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

      this.sphere.material.color.setHex(this.color);

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

        //this.directionalLight.target.position.set(pos.x, pos.y, 0.5);

        this.camera.rotationX = pos.x * 2;
        this.camera.rotationY = pos.y * 2;

        this.thedotsTexture.rotationX = THREE.Math.degToRad(90);
      });

      window.addEventListener("scroll", () => {
        this.varScroll =
          (window.scrollY + window.innerHeight) / (window.innerHeight * 2);

        this.sphere.rotation.y = window.pageYOffset / 700;

        this.scrollValSphere = window.pageYOffset / 1000 / 1.5 + 0.15;

        if (this.scrollValSphere <= 0.3) {
          this.BallSize = this.scrollValSphere;
        } else {
          this.BallSize = 0.3;
        }
      });
    },
    responsiveValueCheck() {
      if (window.innerWidth < 500) {
        //this.BallSize = 0.15;
      } else {
        //this.BallSize = 0.25;
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
    animateHomeTitle() {
      var titles = document.querySelectorAll(".home_page>h1>span");
      var titre = this.$refs.titre;
      var mouse = { x: 0, y: 0 };
      var pos = { x: 0, y: 0 };

      window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        pos.x = (mouse.x - window.innerWidth / 2) / 200 - 50;
        pos.y = (mouse.y - window.innerHeight / 2) / 15;

        if (titles) {
          titre.style.transform =
            "translate(" +
            ((mouse.x - window.innerWidth / 2) / 300 - 50) +
            "%," +
            (mouse.y - window.innerHeight / 2) / 15 +
            "px)";
          for (var i = 0; i < titles.length; i++) {
            var title = titles[i];
            title.style.transform =
              "translate(" +
              ((mouse.x - window.innerWidth / 2) / (200 + 80 * i) - 50) +
              "%," +
              ((mouse.y - window.innerHeight / 2) / (15 + 5 * i) - 30) +
              "px)";
          }
        }
      });

      window.addEventListener("scroll", () => {
        var scroll = window.pageYOffset;

        for (var i = 0; i < titles.length; i++) {
          var title = titles[i];
          title.style.marginTop = (scroll / 80) * i + "px";
        }
      });
    },
  },
  mounted() {
    this.init();
    this.animate();
    this.animInteract();
    this.responsiveValueCheck();
    this.windowResizeCheck();
    this.scrollProject();
  },
};
</script>

<style lang="scss">
#nav {
  z-index: 2;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Pano";
  font-size: 1.7vh;
  @include sm {
    padding-top: 0.7em;
    .nav_wrapper {
      #title {
        a {
          img {
            height: 13px;
          }
        }
      }
    }
  }
  @include lg {
    padding-top: 0.5em;
    .nav_wrapper {
      #title {
        a {
          img {
            height: 20px;
          }
        }
      }
    }
  }
  .nav_wrapper {
    width: 100%;
    display: flex;
    padding: 1% 3%;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    h2 {
      text-align: left;
      width: fit-content;
      margin: 0;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
}
.home_page {
  display: block;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  @include sm {
    .nav_down {
      display: none;
    }
  }
  @include md {
    .nav_down {
      display: block;
    }
  }
  h1 {
    position: absolute;
    text-align: center;
    margin: 0 auto;
    width: max-content;
    text-transform: uppercase;
    font-size: 4vw;
    left: 50%;
    top: 50vh;
    transform: translate(-50%, -50%);
    color: #fff;
    display: flex;
    align-items: center;
    span {
      transition: all 0.2s ease;
      &.middle {
        animation: example 2s ease forwards;
      }
    }
    /*span {
      position: absolute;
      transition: all 0.2s ease;
      width: max-content;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      color: rgb(255, 255, 255);
    }*/
  }
  .nav_down {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 3% 4%;
    h2 {
      text-align: right;
      font-family: "Pano";
      font-weight: 300;
      a {
        color: white;
      }
    }
  }
  .home_wrapper {
    height: 100vh;
    width: 100vw;
  }
}
#renderer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
}
body {
  margin: 0;
  width: 100vw;
  color: #f3f3f3;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

@keyframes example {
  from {
    transform: rotate(90deg);
    opacity: 0;
    margin: 0 500px;
  }
  39% {
    transform: rotate(90deg);
    opacity: 1;
    margin: 0 500px;
  }
  50% {
    transform: rotate(0);
    font-size: 80vh;
    margin: 0 500px;
  }
  to {
    font-size: inherit;
    margin: 0 0;
  }
}
</style>