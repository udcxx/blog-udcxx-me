<template lang="html">
  <div>
    <Header></Header>
    <div class="contents">
        <p class="category_name">{{p.tag.toUpperCase()}}タグ</p>
        <div class="post_wrap">
            <div v-for="categoryArry in categoryArry" :key="categoryArry" class="post">
                <n-link :to="'/article/' + categoryArry[3].replace('.md','').replace('-','/')" class="notscroll" >
                  <img :src="'/images/' + categoryArry[4]">
                  <div class="post_inner">
                    <span class="tag">{{categoryArry[1]}}</span>
                    <span class="title">{{categoryArry[0]}}</span>
                    <span class="date">{{categoryArry[2].slice(0, 10)}}</span>
                  </div>
                </n-link>
            </div>
        </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import summary from '~/_BLOG/json/summary.json'
import Header from '~/components/Header.vue'
import ShareButtons from '~/components/ShareButtons.vue'
import Footer from '~/components/Footer.vue'
import {sourceFileArray} from '~/_BLOG/json/summary.json'

export default {
    components: {
      Header, Footer,
    },
    data() {
        return {
            sourceFileArray: summary['fileMap'],
            fileMap: summary['fileMap'],
        };
    },
    validate({ params }) {
      return  /^[0-9a-z]+$/.test(params.tag)
    },
    asyncData ({ params }) {
        return {
            p: params
        }
    },
    computed: {
        categoryArry() {
            let arry = [];
            const source = this.sourceFileArray;

            for (var key in source) {
                if (source[key]['tags'].toUpperCase().includes(this.p.tag.toUpperCase())) {
                    arry.unshift([source[key]['title'], source[key]['tags'], source[key]['date'], source[key]['sourceBase'], source[key]['eyecatch']]);
                }
            }
            return arry;
        }
    }
}

</script>

<style lang="scss">

.contents {
    max-width: 768px;
    margin-top: 10vh;
    padding: 0 5px;
}
.category_name {
    font-size: 1.5rem;
    letter-spacing: 0.2em;
    color: #edefeb;
}
.post_wrap {
    width: 100%;
    margin: 3vh auto;
    padding: 1rem;
    display: grid;
    font-size: 1rem;
    grid-template-columns: repeat(auto-fill,minmax(230px,1fr));
    grid-auto-flow: dense;
    align-items: center;
    justify-content: center;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
}
.post {
  padding-top: 100%;
  display: flex;
  position: relative;
  color: #edefeb;
  font-size: 0;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.post a {
  text-decoration: none;
  color: #edefeb;
}
.post a:hover {
    color: #f49d37 !important;
}

.post img {
  padding: 3px;
  width: 100%; height: 100%;
  max-width: inherit;
  position: absolute;
  top: 0px; left: 0;
  -o-object-fit: cover; object-fit: cover;
  display: block;
  transition-duration: 0.3s;
}

/* .post img::before {
  content: '';
  display: block;
  padding-top: 100%;
} */

.post:hover img {
  opacity: 0.6;
  filter: alpha(opacity=60); -ms-filter: "alpha(opacity=60)";
  -webkit-transform: scale(1.1); -moz-transform: scale(1.1); -o-transform: scale(1.1); -ms-transform: scale(1.1); transform: scale(1.1);
}

.post_inner {
  padding: 3px;
  width: calc(100% + 6px);
  display: block;
  position: absolute;
  bottom: 0; left: -3px;
  background: rgba(7, 30, 34, 0.9);
}

span.tag {
  padding-left: 0.4rem;
  font-size: 0.8rem; font-weight: 300;
  line-height: 1.2rem;
  display: block;
}
span.title {
  padding-left: 0.5rem;
  font-size: 1rem;
  line-height: 1.5em;
  letter-spacing: -0.05em;
  display: block;
}
span.date {
  padding-left: 0.4rem;
  font-size: 0.8rem; font-weight: 300;
  display: block;
}

</style>
