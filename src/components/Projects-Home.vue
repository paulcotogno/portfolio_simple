<template>
  <div ref="SkewIt" :class="'Project' + title" :id="id">
    <router-link
      :to="{ name: 'Project', params: { projetId: id } }"
      :style="{ backgroundImage: 'url(img/' + imagePath + ')' }"
    >
    </router-link>
    <div class="infos">
      <div class="disappear">
        <h2>{{ title }}</h2>
      </div>
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
      default: "project_alias.webp",
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
    //this.distord();
    //this.animDistord();
  },
};
</script>

<style lang="scss">
#project_wrapper_column {
  height: 300vh;
  #project_wrapper_row {
    backdrop-filter: invert(1);
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    //backdrop-filter: invert(100%);
    #project_wrapper {
      height: 100vh;
      display: flex;
      align-items: center;
      transition: all 0.5s ease;
      @include sm {
        width: 400vw;
        justify-content: space-around;
        .page_components {
          width: 70vw;
          margin: 0;
          align-items: center;
          .infos {
            margin: 10% 0 0 0;
            display: flex;
            font-size: 5vw;
          }
          a {
            height: 20vh;
          }
          &.on {
            a {
              height: 50vh;
              width: 100%;
            }
          }
        }
      }
      @include md {
        justify-content: center;
        width: 100vw;
        .page_components {
          width: fit-content;
          margin: 0 0 0 0;
          align-items: center;
          .infos {
            margin: 0 0 0 0;
            display: none;
            font-size: 3vw;
          }
          a {
            height: 60vh;
            margin: 0 10px;
          }
          &.on {
            a {
              height: 60vh;
              width: 60vh;
              margin: 0 10vh;
            }
          }
        }
      }
      .page_components {
        height: fit-content;
        padding: 0;
        filter: grayscale(100%);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        transition: all 0.1s ease;
        -moz-transition: background-size 2s ease;
        -ms-transition: background-size 4s ease;
        -o-transition: background-size 4s ease;
        -webkit-transition: background-size 4s ease;
        transition: all 1s ease;
        transition-delay: 0.2s;
        &.on {
          margin: 0;
          .infos {
            h2 {
              margin: 0 0 0 0;
              transform: translateY(0);
            }
          }
        }
        .infos {
          color: black;
          text-align: center;
          font-family: "Monument";
          text-transform: uppercase;
          transform: skewY(-10deg);
          justify-content: center;
          h2 {
            transform: translateY(-300%);
            transition: all 0.4s ease;
            transition-delay: 0.3s;
            max-width: min-content;
            mix-blend-mode: color-dodge;
          }
        }
        a {
          background: none;
          background-position: center;
          background-size: cover;
          width: 20vh;
          display: block;
          box-shadow: 3px 3px 8px rgba($color: #555555, $alpha: 0.1);
          transition: all 0.5s ease;
        }
        .disappear {
          width: fit-content;
          height: fit-content;
          overflow: hidden;
        }
      }
    }
  }
}
</style>