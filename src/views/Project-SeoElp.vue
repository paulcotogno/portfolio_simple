<template>
  <div class="project_wrapper">
    <div class="background_wrapper"></div>
    <div class="project_home">
      <div class="image_wrapper" id="anchor">
        <img src="img/project_seoelp.png" alt="" />
        <div class="text_wrapper">
          <p>College Project</p>
          <h1>Seo Elp</h1>
        </div>
      </div>
    </div>
    <div class="content_wrapper">
      <ul>
        <li>Developement</li>
        <span>&#9883;</span>
        <li>Design</li>
        <span>&#9883;</span>
        <li>Group Workflow</li>
      </ul>
      <p class="resume">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus ipsam
        sit quam mollitia dignissimos cupiditate veritatis amet enim voluptates
        omnis, quibusdam quos, expedita totam delectus quia dolorem harum,
        exercitationem autem!
      </p>
      <div class="link_website">
        <a class="link_wrapper" href="http://seo-elp.fr">
          <p>Go to the website</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navbar() {
      window.addEventListener("scroll", () => {
        let ws = window.pageYOffset;
        let an = document.getElementById("anchor");

        if (ws > an.offsetTop + an.offsetHeight - 100) {
          document.getElementById("nav").classList.add("down");
        } else {
          document.getElementById("nav").classList.remove("down");
        }

        if (ws > an.offsetTop + an.offsetHeight) {
          document.getElementById("title").classList.add("infos");
        } else {
          document.getElementById("title").classList.remove("infos");
        }
      });
    },
  },
  mounted() {
    this.navbar();
  },
};
</script>

<style lang="scss">
#nav {
  background: none;
  backdrop-filter: none;
  transition: all 0.5s ease;
  &.down {
    background: rgba(61, 84, 217, 0.5);
    backdrop-filter: blur(2rem);
  }
  .nav_wrapper {
    h1 {
      &::after {
        content: "Seo Elp";
        font-weight: 200;
        margin-left: 20px;
        opacity: 0;
        transition: all 0.2s ease;
      }
      &.infos {
        &::after {
          opacity: 1;
        }
      }
    }
  }
}

.project_wrapper {
  height: 200vh;
  padding: 0 15%;
  .background_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(61, 84, 217);
    background: linear-gradient(
      180deg,
      rgba(61, 84, 217, 1) 1%,
      rgba(#020202, 1) 90%
    );
    height: 100vh;
    width: 100vw;
    z-index: -1;
  }
  .project_home {
    .image_wrapper {
      box-shadow: 0 -20px 10px -20px rgba($color: #000000, $alpha: 0.4);
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 10% 0 5% 0;
      img {
        display: block;
        position: relative;
        z-index: 1;
        width: 20vw;
        height: 20vw;
        margin-right: 20px;
        box-shadow: 0 0 5px 3px rgba($color: #000000, $alpha: 0.2);
      }
      .text_wrapper {
        display: flex;
        flex-direction: column;
        justify-items: flex-end;
        h1 {
          font-size: 5em;
          margin: 20px 0 0 0;
        }
        * {
          margin: 0;
        }
        p {
          font-size: 1.3rem;
        }
      }
    }
  }
  .content_wrapper {
    padding: 3% 0;
    backdrop-filter: blur(3em);
    border-radius: 10px;
    box-shadow: 2px -2px 10px 1px rgba(#020202, 0.3);
    ul {
      padding: 0 3%;
      display: flex;
      justify-content: space-evenly;
      li {
        list-style-type: none;
      }
    }
    .resume {
      margin-top: 20vh;
      text-align: center;
      padding: 0 10px;
    }
    .link_website {
      width: 60%;
      height: 100px;
      margin: 10% auto;
      background: url("~@/assets/img/SeoElp/1.png");
      background-position: center;
      background-attachment: fixed;
      background-size: cover;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease;
      &:hover{
          border-radius: 15px;
          .link_wrapper{
              background: rgba($color: #020202, $alpha: 0.6);
              p{
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