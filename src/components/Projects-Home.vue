<template>
  <div
    ref="SkewIt"
    :class="'Project' + title + ' on'"
    :id="id"
    :style="{ backgroundImage: 'url(img/' + imagePath + ')' }"
  >
    <router-link :to="{ name: 'Project', params: { projetId: id } }">
    </router-link>
    <div class="infos">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      currentPos: window.pageYOffset,
    };
  },
  props: {
    title: {
      type: String,
      default: "seoelp",
    },
    imagePath: {
      type: String,
      default: "project_alias.png",
    },
    id: {
      type: Number,
    },
  },
  methods: {
    distord() {
      var newPos = window.pageYOffset;
      const diff = newPos - this.currentPos;
      const speed = diff * 0.08;
      if (this.$refs.SkewIt) {
        this.$refs.SkewIt.style.transform = "skewX(" + speed + "deg)";
      }

      this.currentPos = newPos;
    },
    animDistord() {
      requestAnimationFrame(this.animDistord);
      this.distord();
    },
  },
  mounted() {
    this.distord();
    this.animDistord();
  },
};
</script>

<style lang="scss">
#project_wrapper_column {
  height: 300vh;
  #project_wrapper_row {
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    #project_wrapper {
      width: 400vw;
      height: 100vh;
      display: flex;
      justify-content: space-around;
      align-items: center;
      transition: transform 0.5s ease;
      .page_components {
        margin: 0 0 50vh 0;
        transition: all 0.1s ease;
        -moz-transition: background-size 2s ease;
        -ms-transition: background-size 4s ease;
        -o-transition: background-size 4s ease;
        -webkit-transition: background-size 4s ease;
        padding: 0;
        height: fit-content;
        background: none;
        width: 30vh;
        height: 30vh;
        background-position: center;
        background-size: cover;
        filter: grayscale(100%);
        cursor: pointer;
        &.on{
          display: flex;
          .infos{
            
          }
        }
        a {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
}
</style>