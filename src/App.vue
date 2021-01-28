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
export default {
  data() {
    return {
      data: [
        {
          id: 0,
          title: "seo-elp",
          link: "SeoElp",
          imagePath: "project_seoelp.png",
          projectType: "Student Project",
          color: "#3d54d9",
          webSiteLink: "http://seo-elp.fr/",
          category: ["Developpement", "Design", "Group Workflow"],
        },
        {
          id: 1,
          title: "terrence malick",
          link: "TerrenceMalick",
          imagePath: "project_terrencemalick.png",
          projectType: "Student Project",
          color: "#061512",
          webSiteLink: "http://www.boss.paulcotogno.com/",
          category: ["Developpement", "Design", "Fast Deadlines"],
        },
        {
          id: 2,
          title: "alias",
          link: "Alias",
          imagePath: "project_alias.png",
          projectType: "Personal Project",
          color: "#fcff2a",
          webSiteLink: "http://www.alias.paulcotogno.com/",
          category: ["Developpement", "Design", "3D Integration"],
        },
        {
          id: 3,
          title: "the dots",
          link: "TheDots",
          imagePath: "project_thedots.png",
          projectType: "Student Project",
          color: "#730800",
          webSiteLink: "http://www.thedots.paulcotogno.com/",
          category: ["Developpement", "Design", "Group Workflow"],
        },
      ],
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

html{
  background: #030303;
}

h1 {
  font-family: "Pano";
  font-weight: 800;
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
    font-size: 11px;
    font-family: "JetBrains Mono", monospace;
  }
  height: 40vh;
  width: 100vw;
  backdrop-filter: blur(10em);
  margin-top: 20vh;
}
.scrollBar_wrapper {
  min-width: 100vw;
  height: 0.3em;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 10;
}

#scrollBar {
  min-width: 100vw;
  margin-right: 100%;
  height: 100%;
  display: block;
  background: rgb(131, 58, 180);
  background: linear-gradient(
    90deg,
    rgba(#FEAC5E, 1) 0%,
    rgba(#C779D0, 1) 50%,
    rgba(#4BC0C8, 1) 100%
  );
  transition: margin 0.2s ease;
}

body::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-track,
body::-webkit-scrollbar {
  display: none;
}
</style>
