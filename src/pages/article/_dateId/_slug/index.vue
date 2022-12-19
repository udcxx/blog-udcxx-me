<template lang="html">
  <div>
    <Header></Header>

    <div class="contents">
        <div class="article_head">
            <div class="article_head-emoji" v-if="eyecatchEmoji">{{eyecatchEmoji}}</div><div class="article_head-emoji"  v-else="eyecatchEmoji">📄</div>
            <h1>{{title}}</h1>
        </div>
      <div class="article_content">
        <div class="article_left">
            <div class="article_meta">
              <div class="article_meta_title">公開</div>
              <div class="article_meta_content"><time>{{ date.slice(0, 10) }}</time></div>
              <div class="article_meta_title">タグ</div>
              <div class="article_meta_content"><Tags :tags="tags"></Tags></div>
            </div>
            <ShareButtons :title="title"></ShareButtons>
        </div>
        <div class="article_body" v-html="bodyHtml"></div>
        <adsbygoogle ad-slot="2499763349" style="max-width: calc(768px - 1rem); margin: 2rem auto;" />
        <adsbygoogle ad-slot="2499763349" style="max-width: calc(768px - 1rem); margin: 2rem auto;" />
        <!-- <div class="recommend_article">
          <span class="recommend_article-title-bg"><h2 class="recommend_article-title"><span class="recommend_article-title-initial">新</span>着記事</h2></span>
          <PostList :ls-from="0" :ls-to="3"></PostList>
        </div> -->
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
import Tags from '~/components/Tags.vue'
import PostList from '~/components/PostList.vue'
import Footer from '~/components/Footer.vue'
import {sourceFileArray} from '~/_BLOG/json/summary.json'
// import Article from '~/components/Article.vue'

export default {
  components: {
    Header, ShareButtons, Tags, PostList, Footer,
  },
  computed: {
    baseUrl() {
        return 'https://blog.udcxx.me/'
    },
    meta_description() {
        if (this.description) {
            return this.description;
        } else {
            return "無趣味なりにつらつらと戯言を。フロントエンドと車にちょっぴり興味あり。";
        }
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
        { hid: 'description', name: 'description', content: this.meta_description },
        { hid: 'og:url', property: 'og:url', content: `${this.baseUrl}${this.params.dateId}/${this.params.slug}/`},
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:description', property: 'og:description', content: this.meta_description },
        { hid: 'og:image', property: 'og:image', content: `${this.baseUrl}images/${this.eyecatch}` },
      ],
    }
  },
  mounted() {
      // H2タグ直前にGoogleAdを埋め込む
      // ※ H2が2個以上なら2個目の前、1個しかなければその前
      const googleAd = document.querySelector('ins:nth-of-type(2)');

      if (document.querySelectorAll('h2').length >= 2) {
          let target = document.querySelector('h2:nth-of-type(2)');
          let targetParent = target.parentNode;
          targetParent.insertBefore(googleAd, target)
      } else {
          let target = document.querySelector('h2');
          let targetParent = target.parentNode;
          targetParent.insertBefore(googleAd, target)
      }
  }
}
</script>

<style lang="scss">

.article_head {
    width: 100%; 
    max-width: 1024px;
    margin: 10rem auto 10.8rem;
    text-align: center;

    .article_head-emoji {
        font-size: 7.5rem;
        color: #f7f7f7;
    }
    h1 {
        padding: 0 4rem;
        font-size: 2.8rem; font-weight: bold;
        color: #f7f7f7;
    }
}

.article_content {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
}

.article_left {
    width: 21.6rem; height: 100%;
    margin-left: 4rem;
    position: sticky;
    top: 7.5vh;
    .article_meta {
        width: 21.6rem;
		padding: 2rem;
		border-radius: 1rem;
        color: #2C2C2C;
		background-color: #D1D5D5;
        .article_meta_title {
            margin-top: 1em;;
            font-size: 1.6rem;
            &:nth-of-type(1) {
                margin-top: 0;
            }
            @media (max-width:768px) {
                display: none;
            }
        }
        .article_meta_content {
            text-align: right;
            font-size: 1.6rem;
            @media (max-width:768px) {
                text-align: left;
                font-size: 1.4rem;
            }
        }
        @media (max-width: 768px) {
            width: 54.8rem;
            padding: 1.2rem;
            display: inline-block;
            &:nth-last-of-type(1) {
                margin-right: 0;
            }
        }
    }
    @media (max-width:768px) {
        width: 100%;
        margin-left: 0; margin-bottom: 1.6rem;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        position: relative;
        top: auto;
    }
}


.article_meta_date {
    padding-bottom: 1rem;
  margin-right: 1em;
  text-align: right;
}
.article_body {
  padding: 4rem 2rem;
  width: 100%; max-width: 768px;
  border-radius: 1rem;
  background-color: #D1D5D5;
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
  margin: 3rem auto;
  font-size: 1.6rem;
  text-align: center;
}
</style>
