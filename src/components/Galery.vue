<template>
  <div class="galery">
    <h2>Galery</h2>
    <div class="galery_wrapper">
      <img
        src="img/galery/1_WA.webp"
        onmouseover="this.src='img/galery/1_Low.gif'"
        onmouseout="console.log('this.src=\'img/galery/1_WA.png\'')"
        alt=""
      />
      <img
        src="img/galery/2_WA.webp"
        onmouseover="this.src='img/galery/2.gif'"
        onmouseout="console.log('this.src=\'img/galery/1_WA.png\'')"
        alt=""
      />
      <img
        srcset="
          img/galery/3_Low.webp,
          img/galery/3_Mid.webp 1.5x,
          img/galery/3_Hi.webp  2x
        "
        src="img/galery/3_Hi.webp"
        alt=""
      />
      <img
        srcset="
          img/galery/4_Low.webp,
          img/galery/4_Mid.webp 1.5x,
          img/galery/4_Hi.webp  2x
        "
        src="img/galery/4_Hi.webp"
        alt=""
      />
      <img
        src="img/galery/5_WA.webp"
        onmouseover="this.src='img/galery/5_Mid.gif'"
        onmouseout="console.log('this.src=\'img/galery/1_WA.png\'')"
        alt=""
      />
      <img
        srcset="
          img/galery/6_Low.webp,
          img/galery/6_Mid.webp 1.5x,
          img/galery/6_Hi.webp  2x
        "
        src="img/galery/6_Hi.webp"
        alt=""
      />
      <img src="img/galery/7.jpg" alt="" />
    </div>
  </div>
</template>

<style lang="scss">
.galery {
  width: 100vw;
  h2 {
    margin: 20vh 0 0 0;
    text-align: center;
    font-family: "Pano";
  }
  .galery_wrapper {
    display: grid;
    gap: 4vw;
    padding: 0 5vw;
    margin: 20vh 0 0 0;
    @include sm {
      grid-template: 1fr / 1fr;
    }
    @include md {
      grid-template: 1fr / 1fr 1fr;
    }
    @include lg {
      grid-template: 1fr / 1fr 1fr 1fr;
    }
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>