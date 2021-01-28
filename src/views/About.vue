<template>
  <div class="about">
    <div id="nav">
      <div class="nav_wrapper">
        <h2 id="title">
          <router-link to="/"
            ><img src="@/assets/img/logo.svg" alt=""
          /></router-link>
        </h2>
      </div>
    </div>
    <h1><img src="@/assets/logo2.gif" alt="" /></h1>
    <div class="contact_wrapper">
      <div class="line_wrapper">
        <div id="line_enter"></div>
      </div>
      <div id="contact_infos">
        <img src="@/assets/contact/contact.jpg" style="width='40%" alt="" />
        <div class="text_wrapper">
          <p>Just a student who loves code and 3D stuff</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var anim1 = true;
    var anim2 = false;

    window.addEventListener("scroll", () => {
      var l = document.getElementById("line_enter");

      if (l) {
        var scroll = window.pageYOffset;

        var scrollVal = scroll / window.innerHeight;

        console.log(scrollVal);

        if (scrollVal < 0.3) {
          l.style.height = "30vh";
        } else if (scrollVal < 0.9) {
          l.style.height = scrollVal * 100 + "vh";
        } else if (scrollVal > 0.9) {
          l.style.height = "90vh";
        }

        if (scrollVal > 1) {
          if (anim1) {
            document.getElementById("contact_infos").animate(
              [
                { transform: "translateX(100px)", opacity: "0" },
                { transform: "translateX(0)", opacity: "1" },
              ],
              {
                duration: 1000,
                fill: "forwards",
              }
            );
            anim1 = false;
            anim2 = true;
          }
        } else {
          if (anim2) {
            document.getElementById("contact_infos").animate(
              [
                { transform: "translateX(0)", opacity: "1" },
                { transform: "translateX(100px)", opacity: "0" },
              ],
              {
                duration: 1000,
                fill: "forwards",
              }
            );
            anim1 = true;
            anim2 = false;
          }
        }
      }
    });
  },
};
</script>


<style lang="scss">
.about {
  h1 {
    height: 70vh;
    display: flex;
    justify-content: center;
    img {
      height: 100%;
    }
  }
  .contact_wrapper {
    height: 200vh;
    margin-top: -40vh;
    .line_wrapper {
      height: 100vh;
      position: sticky;
      top: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      #line_enter {
        width: 50vw;
        height: 30vh;
        border-right: solid 2px white;
      }
    }
    #contact_infos {
      width: 100vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      bottom: 0;
      height: 100vh;
      opacity: 0;
      .text_wrapper {
        width: 40vw;
        justify-self: flex-end;
        padding: 0 5vw;
      }
    }
  }
}
</style>