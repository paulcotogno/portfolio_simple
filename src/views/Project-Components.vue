<template>
  <div class="project_wrapper">
    <div id="nav">
      <div class="nav_wrapper">
        <h1 id="title">
          <a @click.prevent="$router.go(-1)">&#8617;</a>
          <span>{{ data[$route.params.projetId].title }}</span>
        </h1>
        <h2><router-link to="/about">Contact</router-link></h2>
      </div>
    </div>
    <div
      class="background_wrapper"
      :style="{ backgroundImage: getLinearGradient }"
    ></div>
    <div class="project_home">
      <div class="image_wrapper" id="anchor">
        <img :src="'/img/' + data[$route.params.projetId].imagePath" alt="" />
        <div class="text_wrapper">
          <p>{{ data[$route.params.projetId].projectType }}</p>
          <h1>{{ data[$route.params.projetId].title }}</h1>
        </div>
      </div>
    </div>
    <div class="content_wrapper">
      <p class="resume">
        {{ data[$route.params.projetId].resume }}
      </p>
      <div
        class="link_website"
        :style="{
          backgroundImage:
            'url(/img/' + data[$route.params.projetId].imageLink + ')',
        }"
      >
        <a
          class="link_wrapper"
          :href="data[$route.params.projetId].webSiteLink"
        >
          <p>Go to the website</p>
        </a>
      </div>
      <p>Expériences</p>
      <hr />
      <ul>
        <li v-for="cat in data[$route.params.projetId].category" :key="cat">
          {{ cat }}
        </li>
      </ul>
      <p>Technologies utilisées</p>
      <hr />
      <ul>
        <li v-for="tech in data[$route.params.projetId].technology" :key="tech">
          {{ tech }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataBind: "",
      projetId: {
        type: Number,
        default: 0,
      },
    };
  },
  props: {
    data: {
      type: Array,
    },
  },
  methods: {
    navbar() {
      window.addEventListener("scroll", () => {
        let ws = window.pageYOffset;
        let an = document.getElementById("anchor");
        let nav = document.getElementById("nav");

        if (an) {
          if (ws > an.offsetTop + an.offsetHeight - 100) {
            nav.style.background =
              "rgba(" +
              this.data[this.$route.params.projetId].colorRGB +
              ",0.5)";
            nav.style.backdropFilter = "blur(2rem)";
          } else {
            nav.style.background = "none";
            nav.style.backdropFilter = "blur(0)";
          }

          if (ws > an.offsetTop + an.offsetHeight) {
            document.getElementById("title").classList.add("infos");
          } else {
            document.getElementById("title").classList.remove("infos");
          }
        }
      });
    },
  },
  computed: {
    getLinearGradient() {
      return (
        "linear-gradient(180deg,rgb(" +
        this.data[this.$route.params.projetId].colorRGB +
        ") 1%,rgb(3,3,3) 90%)"
      );
    },
  },
  props: {
    data: {
      type: Array,
    },
  },
  mounted() {
    this.navbar();

    this.projetId = this.$route.params.projetId;
  },
};
</script>

<style lang="scss">
#nav {
  background: none;
  backdrop-filter: none;
  transition: all 0.5s ease;
  .nav_wrapper {
    h1 {
      margin: 0;
      span {
        font-weight: 200;
        margin-left: 20px;
        opacity: 0;
        transition: all 0.2s ease;
        text-transform: uppercase;
      }
      &.infos {
        span {
          opacity: 1;
        }
      }
    }
  }
}

.project_wrapper {
  @include sm {
    padding: 0 6%;
    .project_home {
      .image_wrapper {
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img {
          margin: 0;
          width: 50vw;
        }
        .text_wrapper {
          h1 {
            font-size: 1.2em;
            text-align: center;
          }
          p {
            font-size: 0.7rem;
            text-align: center;
          }
        }
      }
    }
    .content_wrapper {
      padding: 2% 2%;
      ul {
        padding: 0 1%;
        flex-direction: column;
      }
      .resume {
        margin-top: 5vh;
        padding: 0 2px;
      }
      .link_website {
        width: 80%;
        height: 50px;
      }
    }
  }
  @include md {
    padding: 0 15%;
    .project_home {
      .image_wrapper {
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        img {
          margin-right: 20px;
          width: 20vw;
        }
        .text_wrapper {
          h1 {
            font-size: 5em;
            text-align: left;
          }
          p {
            font-size: 1.3rem;
            text-align: left;
          }
        }
      }
    }
    .content_wrapper {
      padding: 3% 0;
      ul {
        padding: 0 3%;
        flex-direction: row;
      }
      .resume {
        margin-top: 20vh;
        padding: 0 10px;
      }
      .link_website {
        width: 60%;
        height: 100px;
      }
    }
  }
  a {
    cursor: pointer;
  }
  .background_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: -1;
  }
  .project_home {
    .image_wrapper {
      box-shadow: 0 -20px 10px -20px rgba($color: #000000, $alpha: 0.4);
      display: flex;
      padding: 10% 0 5% 0;
      img {
        display: block;
        position: relative;
        z-index: 1;
        box-shadow: 0 0 5px 3px rgba($color: #000000, $alpha: 0.2);
      }
      .text_wrapper {
        display: flex;
        flex-direction: column;
        justify-items: flex-end;
        h1 {
          margin: 20px 0 0 0;
          text-transform: uppercase;
        }
        * {
          margin: 0;
        }
      }
    }
  }
  .content_wrapper {
    backdrop-filter: blur(3em);
    border-radius: 10px;
    box-shadow: 2px -2px 10px 1px rgba(#020202, 0.3);
    ul {
      display: flex;
      justify-content: space-evenly;
      margin: 0 0 15% 0;
      li {
        list-style-type: none;
        span {
          margin: 0 auto;
        }
      }
    }
    p {
      text-align: center;
    }
    .resume {
      margin: 10% 0 20% 0;
    }
    .link_website {
      margin: 10% auto;
      background-position: center;
      background-attachment: fixed;
      background-size: cover;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease;
      &:hover {
        border-radius: 15px;
        .link_wrapper {
          background: rgba($color: #020202, $alpha: 0.6);
          p {
            font-size: 1.1em;
          }
        }
      }
      .link_wrapper {
        transition: all 0.3s ease;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba($color: #020202, $alpha: 0.4);
        text-decoration: none;
        border-radius: 20px;
        p {
          color: white;
          text-transform: uppercase;
          font-family: "Pano";
          font-weight: 800;
          transition: all 0.1s ease;
        }
      }
    }
  }
}
</style>