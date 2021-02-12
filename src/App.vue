<template>
  <div class="scrollBar_wrapper">
    <div id="scrollBar"></div>
  </div>
  <router-view :data="data" />
  <div class="footer-end-credits">
    <p>All of the creations above are the property of Paul Cotogno</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      data: {
        data: [],
      },
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

    axios
      .get("data.json")
      .then(
        function (response) {
          console.log(response.data);
          this.data = response.data;
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
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

@import url("https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap");

html {
  background: #030303;
  scroll-behavior: smooth;
}

h1 {
  font-family: "Pano";
  font-weight: 800;
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
    font-size: 0.8em;
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
    font-family: "JetBrains Mono", monospace;
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
  margin-right: 100%;
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
