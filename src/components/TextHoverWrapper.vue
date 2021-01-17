<template>
  <transition name="hover">
    <div id="text_hover_wrapper" v-show="visible">
      <div class="text_wrapper">
        <p class="move-on-scroll">
          <span>{{ title }}</span> {{ title }} <span>{{ title }}</span>
        </p>
        <p class="move-on-scroll reverse_text">
          <span>{{ projectType }}</span> {{ projectType }}
          <span>{{ projectType }}</span>
        </p>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  data: function () {
    return {
      visible: this.initialVisible,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
  props: {
    imagePath: {
      type: String,
    },
    title: {
      type: String,
    },
    projectType: {
      type: String,
    },
    initialVisible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
#text_hover_wrapper {
  pointer-events: none;
}

.hover-enter-active,
.hover-leave-active {
  transition: all 0.3s ease;
  p {
    transition: all 0.3s ease;
  }
}
.hover-leave-to {
  opacity: 0;
  .text_wrapper {
    p {
      transform: translateX(-50vw);
      &.reverse_text {
        transform: translateX(50vw) !important;
      }
    }
  }
}
.hover-enter-from {
  opacity: 0;
  .text_wrapper {
    p {
      transform: translateX(50vw);
      &.reverse_text {
        transform: translateX(-50vw) !important;
      }
    }
  }
}
</style>