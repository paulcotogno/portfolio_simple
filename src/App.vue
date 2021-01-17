<template>
  <div id="nav">
    <div class="nav_wrapper">
      <h1 id="title"><router-link to="/">Paul</router-link></h1>
      <h2><a href="#">Contact</a></h2>
    </div>
  </div>
  <router-view :data="data" />
  <div class="footer-end-credits">
    <p>All of the creations above are the property of Paul Cotogno</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          title: "seo-elp",
          imagePath: "project_seoelp.png",
          projectType: "Student Project",
          color: "#0000ff",
        },
        {
          title: "alias",
          imagePath: "project_alias.png",
          projectType: "Personal Project",
          color: "#ffff00",
        },
        {
          title: "the dots",
          imagePath: "project_thedots.png",
          projectType: "Student Project",
          color: "#ff0000",
        },
      ],
    };
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

h1{
  font-family: 'Pano';
  font-weight: 800;
}

p, ul, li, a{
  font-family: 'Pano';
  font-weight: 200;
}

#nav {
  z-index: 2;
  width: 100vw;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Pano";
  font-size: 0.7em;
  .nav_wrapper {
    width: 100%;
    display: flex;
    padding: 1% 4%;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    h1 {
      text-align: left;
      width: fit-content;
      margin: 0;
      a{
        color: white;
        text-decoration: none;
      }
    }
    h2 {
      width: fit-content;
      a {
        font-weight: 300;
        color: white;
      }
    }
  }
}
.footer-end-credits {
  p {
    text-align: center;
    font-weight: 300;
    font-size: 11px;
    font-family: "JetBrains Mono", monospace;
  }
}
</style>
