<template>
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
          color: "#0000ff",
          webSiteLink : 'http://seo-elp.fr/',
          category : [
            'Developpement',
            'Design',
            'Group Workflow'
          ],
        },
        {
          id: 1,
          title: "terrence malick",
          link: "TerrenceMalick",
          imagePath: "project_terrencemalick.png",
          projectType: "Student Project",
          color: "#061512",
          webSiteLink : 'http://www.boss.paulcotogno.com/',
          category : [
            'Developpement',
            'Design',
            'Fast Deadlines'
          ],
        },
        {
          id: 2,
          title: "alias",
          link: "Alias",
          imagePath: "project_alias.png",
          projectType: "Personal Project",
          color: "#ffff00",
          webSiteLink : 'http://www.alias.paulcotogno.com/',
          category : [
            'Developpement',
            'Design',
            '3D Integration'
          ],
        },
        {
          id: 3,
          title: "the dots",
          link: "TheDots",
          imagePath: "project_thedots.png",
          projectType: "Student Project",
          color: "#ff0000",
          webSiteLink : 'http://www.thedots.paulcotogno.com/',
          category : [
            'Developpement',
            'Design',
            'Group Workflow'
          ],
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

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

h1{
  font-family: 'Pano';
  font-weight: 800;
}

p, ul, li, a{
  font-family: 'Pano';
  font-weight: 200;
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
