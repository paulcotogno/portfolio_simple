<template>
  <div
    ref="SkewIt"
    :class="'Project' + title"
    :style="{ backgroundImage: 'url(img/' + imagePath + ')' }"
  >
    <router-link :to="'/' + title"> </router-link>
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
  },
  methods: {
    distord() {
      var newPos = window.pageYOffset;
      const diff = newPos - this.currentPos;
      const speed = diff * 0.08;

      this.$refs.SkewIt.style.transform = "skewY(" + speed + "deg)";

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