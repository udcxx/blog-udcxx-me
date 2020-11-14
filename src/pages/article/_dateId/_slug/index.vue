<template lang="html">
  <div>
    <Header></Header>

    <div class="contents">
      <div class="article_content">
        <div class="article_head">
            <div class="article_eyecatch"><img :src="'/images/' +  eyecatch" :alt="params.title"></div>
            <div class="article_title"><h1>{{ title }}</h1></div>
            <div class="article_meta">
                <div class="article_meta_date">date: <time>{{ date.slice(0, 10) }}</time></div>
                <ShareButtons :title="title"></ShareButtons>
            </div>
        </div>
        <div class="article_body" v-html="bodyHtml"></div>
        <ShareButtons :title="title"></ShareButtons>
        <adsbygoogle ad-slot="2499763349" style="max-width: calc(768px - 1rem); margin: 2rem auto;" />
        <div class="recommend_article">
          <span class="recommend_article-title-bg"><h2 class="recommend_article-title"><span class="recommend_article-title-initial">新</span>着記事</h2></span>
          <PostList :ls-from="0" :ls-to="3"></PostList>
        </div>
      </div>
      <div class="pagination">
        <n-link to="/">TOP</n-link>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import ShareButtons from '~/components/ShareButtons.vue'
import PostList from '~/components/PostList.vue'
import Footer from '~/components/Footer.vue'
import {sourceFileArray} from '~/_BLOG/json/summary.json'
// import Article from '~/components/Article.vue'

export default {
  components: {
    Header, ShareButtons, PostList, Footer,
  },
  computed: {
    baseUrl() {
      return 'https://blog.udcxx.me/'
    }
  },
  validate({ params }) {
    return sourceFileArray.includes(`./src/_BLOG/markdown/${params.dateId}-${params.slug}.md`);
  },
  asyncData({ params }) {
    return Object.assign(
      {},
      require(`~/_BLOG/json/${params.dateId}-${params.slug}.json`),
      { params }
    )
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og:url', property: 'og:url', content: `${this.baseUrl}${this.params.dateId}/${this.params.slug}/`},
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:description', property: 'og:description', content: this.description },
        { hid: 'og:image', property: 'og:image', content: `${this.baseUrl}images/${this.eyecatch}` },
      ],
    }
  }
}
</script>

<style lang="scss">

.article_content {
  margin: 10px auto;
  width: 100%;
  max-width: 640px;
  background-color: rgba(231, 233, 233, 0.9);
  box-shadow: 0px 0px 7px 3px rgba(255, 255, 255, 0.4);
}

.article_eyecatch {
  margin: 0;
  width: 100%;
}
.article_eyecatch img {
  width: 100%;
  display: block;
}
.article_meta_date {
  margin-right: 1em;
  text-align: right;
}
.article_body {
  padding: 0 1rem;
  img {
    max-width: 100%; height: auto;
    display: block;
  }
  hr {
    margin: 2rem auto;
    border: none;
    text-align: center;
  }
  hr:after {
    content: "―";
    font-size: 2rem;
    color: #f49d37;
  }
}

.recommend_article-title {
  border: none;
}
.recommend_article-title-bg {
  width: 100%;
  padding: 0 1rem;
  display: block;
  position: relative;
}
.recommend_article-title-initial {
  color: #f49d37;
}
.recommend_article-title {
  text-align: left;
}
.recommend_article-title::after {
  margin-left: 1rem;
  width: calc(100% - 12rem);
  display: inline;
  border-bottom: solid 1px #000;
  position: absolute;
  bottom: 50%;
  content: '';
}
.recommend_article {
  #post_wrap {
    margin: 0;
    padding: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

.pagination {
  margin: 3vh auto;
  text-align: center;
}
</style>
