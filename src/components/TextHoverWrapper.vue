<template>
  <transition name="hover">
    <div id="text_hover_wrapper" v-show="visible">
      <router-link :to="{ name: 'Project', params: { projetId: id } }">
        <div class="text_wrapper">
          <p class="move-on-scroll">
            <span>{{ title }}</span> {{ title }} <span>{{ title }}</span>
          </p>
          <p class="move-on-scroll reverse_text">
            <span>{{ projectType }}</span> {{ projectType }}
            <span>{{ projectType }}</span>
          </p>
        </div>
      </router-link>
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
      if (this.visible === false) {
        setTimeout(() => {
          this.visible = true;
        }, 250);
      }
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
    id: {
      type: Number,
      default: 0,
    }
  },
};
</script>

<style lang="scss">

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

#text_hover_wrapper {
  opacity: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  font-size: 10vh;
  text-transform: uppercase;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  a{
    color: #898989;
    text-decoration: none;
  }
  //background-color: rgba($color: #030303, $alpha: 0.5);
  .text_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      width: max-content;
      text-align: center;
      margin: 0;
      height: 45px;
      font-family: "Monument";
      span {
        color: rgba($color: #808080, $alpha: 1);
      }
    }
  }
}
</style>