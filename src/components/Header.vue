<template lang="html">
  <header class='header cf' v-bind:class="{'active' : this.position < 0.9}">
    <n-link to="/" class="header_link"><div class="header_logo"><img src='~/assets/images/logo.png' class="header_logo_img" alt="だいちゃんロゴ"></div></n-link>
    <n-link to="/" class="header_link"><div class="header_title"><h1><img src='~/assets/images/blogName.png' class="header_title_img" alt="無趣味の戯言"></h1></div></n-link>
    <div class="header_menu">

    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      position: 1
    }
  },
  mounted() {
    document.onscroll = (e) => {
      this.y = document.documentElement.scrollTop || document.body.scrollTop;
      this.h = document.body.clientHeight;
      this.position = (this.h - this.y) / this.h;
    }
  }
}
</script>

<style lang="scss">

header {
  width: 100%; height: 7vh;
  position: fixed;
  top: 0;
  z-index: 2;
  background-color: #071e22;
  box-shadow: 0px 3px 7px 0px rgba(7, 30, 34, 0.35);
}

.nuxt-link-active {
  display: inline;
}

@keyframes slide-in {
  0% { height: 0; }
  100% { height: 7vh; }
}

.header {
  height: 0;
  pointer-events: none;
  transition: height 1s ease 0s;
  &.active {
    height: 7vh;
    opacity: 1;
    pointer-events: auto;
  }
}

.header_logo {
  padding: 0.5%;
  height: 100%;
  float: left;
  text-align: left;
  align-items: center;
  .header_logo_img {
    height: 100%;
    width: auto;
    display: block;
  }
  :hover {
    animation: 0.1s shake 1s infinite;
  }
}

.header_title {
  padding: 1.5vh 1vw;
  height: 100%;
  display: flex;
  align-items: center;
  float: left;
  text-align: left;
  color: #fff;
  vertical-align: bottom;
  font-size: 1rem;
  h1 {
    margin: 0;
    height: 100%;
    font-size: 0;
  }
  .header_title_img {
    height: 100%;
    display: block;
  }
}

@media (max-width:764px) {
  .header_title {
    padding: 3.5% 0.5%;
  }
}

@keyframes shake {
  from, to { transform: translate3d(0, 0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); }
  20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); }
}

</style>
