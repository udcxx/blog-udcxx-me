<template lang="pug">
#app
  Header
  .blog-title
    img(src='~/assets/images/logo.png').logo
    img(src='~/assets/images/blogName.png').title
    ul
      li
        a(href='https://udcxx.me' target='_blank') PORTFOLIO
      li
        a(href='https://twitter.com/udc_xx' target='_blank') TWITTER
      li
        a(href='https://instagram.com/udcsk' target='_blank') INSTAGRAM
  .contents
    PostList(:ls-from="lsFrom", :ls-to="lsTo")
    adsbygoogle(ad-slot="2499763349" style="max-width: calc(768px - 1rem); margin: 2rem auto;")
    .pagination
      a(href="#", @click.prevent="onPrev", v-if="lsFrom > 1") ＜ 前へ
      a(href="#", class="totop" @click.prevent="onTop") TOP
      a(href="#", @click.prevent="onNext", v-if="lsTo < summaryLength") 次へ ＞
  Footer

</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import PostList from '~/components/PostList.vue'
import summary from '~/_BLOG/json/summary.json'


export default {
  components: {
    Header, PostList, Footer,
  },
  data() {
    return {
      lsFrom: 0,
      lsTo: 16,
      lsStep: 16,
      summaryLength: summary['sourceFileArray'].length,
    };
  },
  computed: {
    baseUrl() {
      return 'https://blog.udcxx.me/'
    },
    title() {
      return '無趣味の戯言'
    },
    description() {
      return '無趣味なりにつらつらと戯言を。フロントエンドと車にちょっぴり興味あり。'
    }
  },
  methods: {
    onPrev() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      if ( this.lsTo <= 32 ) { this.lsTo = 16; } else { this.lsTo = this.lsTo - this.lsStep; }
      if ( this.lsFrom <= 17 ) { this.lsFrom = 0; } else { this.lsFrom = this.lsFrom - this.lsStep; }
    },
    onTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.lsTo = 16;
      this.lsFrom = 0;
    },
    onNext() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.lsTo = this.lsTo + this.lsStep;
      this.lsFrom = this.lsFrom + this.lsStep;
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og:url', property: 'og:url', content: this.baseUrl},
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:type', property: 'og:type', content: 'blog' },
        { hid: 'og:description', property: 'og:description', content: this.description },
        { hid: 'og:image', property: 'og:image', content: `${this.baseUrl}images/blog-card.png` },
      ],
    }
  }
};
</script>

<style lang="scss">

.blog-title {
  margin: 0;
  width: 100%;
  img { display: inline-block; }
  .logo { width: 15%; }
  .title {
    margin-left: 3%;
    padding-bottom: 5%;
    width: 15rem;
  }
  ul {
    margin-left: -15rem;
    width: 80%;
    display: inline-block;
  }
  li {
    margin-left: 3%;
    display: inline-block;
    list-style: none;
    &:first-child {
      margin-left: 0;
    }
    &::before {
      content:'';
    }
  }
  a {
    text-decoration: none;
    color: #fff; font-weight: bold;
  }
}

.pagination {
  text-align: center;
  .totop {
    margin: 0 2rem;
  }
}


@media (max-width:764px) {
  .blog-title {
    img { display: block; }
    .logo {
      margin: 10% auto;
      width: 70%;
    }
    .title {
      margin: 10% auto;
      padding: 0;
      width: 70%;
    }
    ul { display: none; }
  }
}
</style>
