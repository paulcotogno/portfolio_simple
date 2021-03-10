<template>
  <div class="about">
    <div id="nav">
      <div class="nav_wrapper">
        <h2 id="title">
          <router-link to="/">
            <img src="@/assets/img/logo.svg" alt="" />
          </router-link>
        </h2>
      </div>
    </div>
    <div id="renderer"></div>
    <h1><img src="@/assets/logo2.gif" alt="" /></h1>
    <div id="contact_wrapper">
      <div id="line_wrapper">
        <div id="line_enter"></div>
      </div>
      <div class="contact_infos_wrap">
        <div id="contact_infos">
          <div id="text_wrapper">
            <h2>Hi, I'm Paul</h2>
            <p>a student who loves code and 3D stuff</p>
            <p>Feel free to contact me !</p>
            <div class="form-wrapper">
              <form @submit.prevent="sendEmail">
                <input
                  class="inp-text"
                  name="user_name"
                  type="text"
                  placeholder="E-mail"
                  v-model="email"
                />
                <textarea
                  class="inp-text"
                  name="message"
                  type="text"
                  placeholder="Message"
                />
                <div v-if="error">
                  <p>{{ error }}</p>
                </div>
                <button type="submit" value="send">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="popupSign" v-if="visible" @click="this.closePopup">
        <div class="popupWrapper">
          <img src="" alt="icone check" />
          <p>{{ messageSubmit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from "emailjs-com";

var scene;

export default {
  data: function () {
    return {
      error: null,
      email: null,
      visible: false,
      messageSubmit: "",
    };
  },
  methods: {
    sendEmail(e) {
      if (!this.email) {
        this.error = "Adresse mail manquante";
      } else if (!this.validEmail(this.email)) {
        this.error = "Adresse mail invalide";
      }

      if (!this.error) {
        emailjs
          .sendForm(
            "service_27keur2",
            "template_rujtomn",
            e.target,
            "user_pCyqfZr4WXgvDAINwQW9V"
          )
          .then(
            (result) => {
              console.log("SUCCESS!", result.status, result.text);
              (this.messageSubmit = "Votre message à bien été envoyé !"),
                (this.visible = true);
            },
            (error) => {
              console.log("FAILED...", error);
              (this.messageSubmit =
                "Votre message n'a pas pu être envoyé, veuillez réessayer plus tard."),
                (this.visible = true);
            }
          );
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    closePopup() {
      this.visible = false;
    },
    init() {
      let container = document.getElementById("renderer");

      scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );

      scene.add(this.camera);

      this.camera.position.z = 1;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor(0x030303, 1);
      container.appendChild(this.renderer.domElement);

      ///////////
      //LIGHTS///
      ///////////

      this.light = new THREE.AmbientLight(0x090909); // soft white light

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
      this.directionalLight.position.set(0, 1, 1);
      this.directionalLight.target.position.set(0, 0, 0);
      scene.add(this.directionalLight.target);
      scene.add(this.directionalLight);

      scene.add(this.directionalLight.target);

      scene.add(this.light);

      console.log("couocu");
      const loader = new OBJLoader();

      loader.load(
        // resource URL
        "3dmodel/logo.obj",
        // called when resource is loaded
        function (object) {
          console.log(object);
        },
        // called when loading is in progresses
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        function (error) {
          console.log("An error happened");
        }
      );
    },
    checkUserMobile() {
      if (window.innerWidth < window.innerHeight) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    var anim1 = true;
    var anim2 = false;
    var l = document.getElementById("line_enter");
    var t = document.getElementById('text_wrapper');

    if (this.checkUserMobile() === false) {
      window.addEventListener("scroll", () => {
        if (l && t) {
          var scroll = window.pageYOffset;

          var scrollVal = scroll / window.innerHeight;

          if (scrollVal < 0.3) {
            l.style.height = "30vh";
          } else if (scrollVal < 0.9) {
            l.style.height = scrollVal * 100 + "vh";
            l.style.width = "50vw";
          } else if (scrollVal > 0.9) {
            l.style.height = "90vh";
            l.style.width = "30vw";
          }

          if (scrollVal > 1) {
            if (anim1) {
              t.animate(
                [
                  { transform: "translateX(-100%)", opacity: "0" },
                  { transform: "translateX(0)", opacity: "1" },
                ],
                {
                  duration: 400,
                  fill: "forwards",
                }
              );
              anim1 = false;
              anim2 = true;
            }
          } else {
            if (anim2) {
              t.animate(
                [
                  { transform: "translateX(0)", opacity: "1" },
                  { transform: "translateX(-100%)", opacity: "0" },
                ],
                {
                  duration: 400,
                  fill: "forwards",
                }
              );
              anim1 = true;
              anim2 = false;
            }
          }
        }
      });
    } else {
      l.style.display = "none";
      document.getElementById("line_wrapper").style.pointerEvents = "none";
      document.getElementById("text_wrapper").style.opacity = 1;
      document.getElementById("text_wrapper").style.width = "100vw";
      document.getElementById("text_wrapper").style.margin = "0";
      document.getElementById("contact_wrapper").style.margin = "0";
    }
  },
};
</script>


<style lang="scss">
.about {
  width: 100vw;
  h1 {
    height: 70vh;
    display: flex;
    justify-content: center;
    overflow-x: hidden;
    img {
      height: 100%;
    }
  }
  #contact_wrapper {
    height: 200vh;
    margin-top: -40vh;
    #line_wrapper {
      pointer-events: none;
      height: 100vh;
      position: sticky;
      top: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      z-index: 1;
      #line_enter {
        width: 50vw;
        height: 30vh;
        border-right: solid 2px white;
        transition: width 0.5s ease;
        background: #030303;
      }
    }
    .contact_infos_wrap {
      width: 100vw;
      height: 100vh;
      position: sticky;
      bottom: 0;
      #contact_infos {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 70%;
        margin-left: auto;
        overflow: hidden;
        @include sm {
          width: 100%;
        }
        @include lg {
          width: 70%;
        }
        #img_wrapper {
          width: 30vw;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          height: 70%;
          opacity: 0;
          img {
            margin: 0 30px 0 0;
            filter: grayscale(100%);
          }
        }
        #text_wrapper {
          width: 60vw;
          justify-self: flex-end;
          padding: 0 5vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: fit-content;
          opacity: 0;
          //margin: 0 0 0 30vw;
          h2 {
            font-size: 4em;
            font-family: "Pano";
            font-weight: 900;
            margin: 0;
          }
          p {
            font-family: "Montserrat";
            font-weight: 400;
            font-size: 2.4vh;
          }
          .form-wrapper {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            color: white;
            form {
              display: flex;
              flex-direction: column;
              align-items: center;
              input,
              textarea {
                width: 100%;
                color: white;
                font-family: "Pano";
              }
              .inp-text:focus {
                font-family: "Pano";
                border: none;
                border-bottom: 4px solid #fafafa;
              }
              .inp-text::placeholder {
                font-family: "Pano";
                opacity: 1;
                color: #fafafa;
              }
              .inp-text {
                outline: none;
                margin-bottom: 20px;
                border: none;
                border-bottom: 2px solid white;
                transition: all 0.1s ease;
                padding: 10px 0;
                background: transparent;
                transition: all 0.1s ease;
              }
              textarea.inp-text {
                resize: none;
                height: 100px;
              }
              button {
                cursor: pointer;
                margin-top: 7%;
                border: none;
                background: none;
                width: fit-content;
                padding: 10px 10px 10px 10px;
                text-transform: uppercase;
                font-size: 0.8em;
                background-position: left;
                background-size: 55px auto;
                background-repeat: no-repeat;
                font-family: "Pano";
                color: white;
                font-weight: 200;
                border: 1px white solid;
              }
            }
          }
        }
      }
    }
  }
}
</style>