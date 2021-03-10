<template>
  <div class="project_wrapper">
    <div id="nav" class="nav_projet">
      <div class="nav_wrapper">
        <h1 id="title">
          <a @click.prevent="$router.go(-1)">&#8617;</a>
          <span>{{ data[router].title }}</span>
        </h1>
        <h2><router-link to="/about">Contact</router-link></h2>
      </div>
    </div>
    <div
      class="background_wrapper"
      :style="{ backgroundImage: getLinearGradient }"
      v-scrollanimation
    ></div>
    <div class="project_home">
      <img :src="'/img/' + data[router].imagePath" alt="" />
      <div class="text_wrapper">
        <h1>{{ data[router].titleBr }}</h1>
        <p>{{ data[router].projectType }}</p>
      </div>
      <div class="experiences">
        <p class="FUp">Expériences</p>
        <ul>
          <li v-for="cat in data[router].category" :key="cat">
            {{ cat }}
          </li>
        </ul>
      </div>
      <div class="technology">
        <p class="FUp">Technologies utilisées</p>
        <ul>
          <li v-for="tech in data[router].technology" :key="tech">
            {{ tech }}
          </li>
        </ul>
      </div>
    </div>
    <div class="content_wrapper">
      <div class="content">
        <p class="resume">
          {{ data[router].resume }}
        </p>
        <div class="link">
          <a class="link_wrapper" :href="data[router].webSiteLink"
            >Go to the website <span>&#8640;</span>
          </a>
          <a class="link_wrapper" :href="data[router].webSiteLink"
            >Go to the GitHub <span>&#8640;</span>
          </a>
        </div>
        <div class="textes">
          <p v-for="texte in data[router].textes" :key="texte">{{ texte }}</p>
        </div>
        <div class="images">
          <div class="image" v-for="image in data[router].images" :key="image">
            <img :src="image.link" v-if="image.type === '1'">
            <video :src="image.link" v-if="image.type === '2'"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      router: this.$route.params.projetId,
    };
  },
  props: {
    title: String,
    projetId: String,
    data: Array,
  },
  computed: {
    getLinearGradient() {
      return (
        "linear-gradient(180deg,rgb(" +
        this.data[this.router].colorRGB +
        ") 1%,rgb(3,3,3) 90%)"
      );
    },
  },
  mounted() {
    console.log(this.data, this.router);
  },
};
</script>

<style lang="scss">
#nav {
  background: none;
  backdrop-filter: none;
  transition: all 0.5s ease;
  &.nav_projet {
    .nav_wrapper {
      padding-left: 27vw;
    }
  }
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
  p {
    font-family: "Montserrat";
    &.FUp {
      font-family: "Pano";
    }
  }
  ul {
    li {
      font-family: "Montserrat";
      font-weight: 500;
    }
  }
  display: flex;
  justify-content: space-between;
  .project_home {
    width: 25vw;
    height: 100vh;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    background: rgba($color: #151515, $alpha: 0.3);
    backdrop-filter: blur(2em);
    justify-content: flex-start;
    align-items: flex-start;
    img {
      padding: 5%;
      width: 90%;
    }
    .text_wrapper {
      text-align: center;
      width: 100%;
      h1 {
        font-size: 2.5vw;
        width: 100%;
        margin: 20px 0;
      }
      p {
        font-size: 1.3rem;
        margin: 10px 0;
      }
    }
    .technology,
    .experiences {
      width: 100%;
      display: flex;
      flex-direction: column;
      p {
        border-bottom: solid white 2px;
        margin-bottom: 0;
        padding-right: 10px;
        padding-bottom: 10px;
        white-space: nowrap;
        text-align: left;
        padding: 0 0 10px 5%;
      }
      ul {
        display: inline-flex;
        flex-direction: column;
        margin: 10px 5% 0 0;
        padding: 0 0 0 5%;
        li {
          margin: 2px 0;
          list-style-type: none;
        }
      }
    }
  }
  .content_wrapper {
    width: 75vw;
    display: flex;
    justify-content: center;
    .content {
      width: 80%;
      margin-top: 10vh;
      background: rgba($color: #151515, $alpha: 0.2);
      backdrop-filter: blur(3em);
      border-radius: 10px;
      box-shadow: 2px -2px 10px 1px rgba(#020202, 0.3);
      padding: 0 5%;
      p {
        text-align: left;
      }
      ul {
        padding: 0 3%;
        flex-direction: row;
      }
      .resume {
        margin: 5% 0 10% 0;
        font-weight: 800;
        font-size: 1.2em;
      }
      .link {
        display: flex;
        justify-content: space-around;
        margin: 10% 0;
        a {
          color: white;
          text-transform: uppercase;
          font-family: "Pano";
          font-weight: 800;
          transition: all 0.2s ease;
          text-decoration: none;
          position: relative;
          &::after {
            content: "";
            transition: opacity 0.3s;
            width: 100%;
            height: 2px;
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
          }
          &:hover {
            &::after {
              animation: coverUp 0.3s ease forwards;
            }
          }
        }
      }
      .textes {
        p {
          font-size: 1em;
        }
        margin: 0 0 10% 0;
        padding: 0 2%;
      }
      .images {
        video,
        img {
          width: 100%;
          margin-bottom: 1vh;
        }
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
    background-position-y: center;
    background-size: 100% 100%;
    transition: all 3s ease;
    &.before-enter {
      background-position-y: bottom;
      background-size: 100% 2000px;
    }
  }
}

@keyframes coverUp {
  0% {
    left: 0;
    width: 100%;
  }

  50% {
    left: 100%;
    width: 0;
  }

  51% {
    width: 0;
    left: 0;
  }

  100% {
    width: 100%;
  }
}
</style>