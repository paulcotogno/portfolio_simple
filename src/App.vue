<template>
  <div class="scrollBar_wrapper">
    <div id="scrollBar"></div>
  </div>

  <router-view v-slot="{ Component }">
    <transition
      name="view"
      mode="out-in"
      @after-leave="$root.$emit('triggerScroll')"
    >
      <component :is="Component" :data="data"></component>
    </transition>
  </router-view>

  <div class="footer-end-credits">
    <p>All of the creations above are the property of Paul Cotogno</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      data: [],
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      var scroll = window.pageYOffset;
      var scrollTotal = document.body.scrollHeight - window.innerHeight;

      var scrollVal = (scroll / scrollTotal) * 100;

      if (scrollVal <= 100) {
        document.getElementById("scrollBar").style.marginLeft =
          -(100 - scrollVal) + "%";
      } else {
        document.getElementById("scrollBar").style.marginLeft = "0%";
      }
    });

    var cheminComplet = document.location.href;
    if (cheminComplet.includes("project")) {
      axios
        .get(`../data.json`)
        .then(
          function (response) {
            console.log("app.vue", response.data);
            this.data = response.data;
          }.bind(this)
        )
        .catch(function (error) {
          console.log("app.vue", error);
        });
    } else {
      axios
        .get(`data.json`)
        .then(
          function (response) {
            console.log("app.vue", response.data);
            this.data = response.data;
          }.bind(this)
        )
        .catch(function (error) {
          console.log("app.vue", error);
        });
    }

    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "r") {
        e.preventDefault();
        e.stopPropagation();
        this.$router.push("/");
      }
    });
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Monument";
  src: url($font-path + "MonumentExtended-Ultrabold.woff") format("woff");
}

@font-face {
  font-family: "Pano";
  src: url($font-path + "Pano-Trial-Bold.woff") format("woff");
  font-weight: 800;
}

@font-face {
  font-family: "Pano";
  src: url($font-path + "Pano-Trial-Regular.woff") format("woff");
  font-weight: 300;
}

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap");

html {
  background: #030303;
  scroll-behavior: smooth;
  user-select: none;
}

h1 {
  font-family: "Pano";
  font-weight: 800;
}

.view-enter-active,
.view-leave-active {
  transition: all 0.7s ease;
  &.home_page {
    > * {
      //transition: all 0.8s ease;
    }
  }
  &.project_wrapper {
    transition: all 0.9s ease;
    .project_home {
      transition: all 0.7s ease;
    }
    .content_wrapper {
      transition: all 0.8s ease-out;
    }
  }
}

.view-enter-to,
.view-leave-from {
  &.project_wrapper {
    opacity: 1;
    .project_home {
      transform: translateX(0);
    }
    .content_wrapper {
      transform: translateY(0);
    }
  }
  &.home_page {
    > * {
      //transform: translateX(0);
      //opacity: 1;
    }
  }
}

.view-enter-from,
.view-leave-to {
  &.project_wrapper {
    opacity: 0;
    #nav {
      opacity: 1;
    }
    .project_home {
      transform: translateX(-100vw);
    }
    .content_wrapper {
      transform: translateY(200vh);
    }
  }
  &.home_page {
    > * {
      //transform: translateX(-50vw);
      //opacity: 0;
    }
  }
}

@include sm {
  h1 {
    font-size: 2em;
  }
  p,
  ul,
  li,
  a {
    font-size: 0.8em;
  }
}

@include md {
  h1 {
    font-size: 2em;
  }
  p,
  ul,
  li,
  a {
    font-size: 0.9em;
  }
}

p,
ul,
li,
a {
  font-family: "Pano";
  font-weight: 200;
}

.footer-end-credits {
  p {
    text-align: center;
    font-weight: 300;
    font-family: "Montserrat", monospace;
  }
  width: 100vw;
  backdrop-filter: blur(10em);
  margin-top: 20vh;
}
.scrollBar_wrapper {
  min-width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 10;
  @include sm {
    height: 0.2em;
  }
  @include md {
    height: 0.3em;
  }
}

#scrollBar {
  min-width: 100vw;
  margin-left: -100%;
  height: 100%;
  display: block;
  background: rgb(131, 58, 180);
  background: linear-gradient(
    90deg,
    rgba(#feac5e, 1) 0%,
    rgba(#c779d0, 1) 50%,
    rgba(#4bc0c8, 1) 100%
  );
  transition: margin 0.2s ease;
}

body::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-track,
body::-webkit-scrollbar {
  display: none;
}
</style>
