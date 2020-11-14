<template lang="html">
  <footer>
    <p>&copy; {{year}} udcxx.</p>
    <ul>
      <li><a href="https://twitter.com/udc_xx" target="_blank"><img src="~/assets/images/footer_twitter.png" alt="Twitter"></a></li>
      <li><a href="https://github.com/udcxx" target="_blank"><img src="~/assets/images/footer_github.png" alt="GitHub"></a></li>
    </ul>
  </footer>

</template>

<script>
export default {
  data() {
    return {
      year : new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
footer {
  padding: 10vh 0 0;
  width: 100%; height: 20vh;
  color: #fff;
  font-size: 0.8rem;
  p {
    padding: 0;
    margin-left: 2rem;
    float: left;
    font-weight: bold; line-height: 20vh;
  }
  ul {
    margin: 0 2rem 0 0;
    float: right;
    line-height: 20vh;
    li {
      margin-left: 1rem;
      list-style: none;
      display: inline-block;
      img {
        width: 1.3rem;
      }
    }
    li:before {
      content: '';
    }
  }
}
</style>
