<template>
  <div class="post">
    <n-link :to="'/article/' + fileMap[sourceJson]['sourceBase'].replace('.md','').replace('-','/') + '/'" class="notscroll" >
      <img v-if="fileMap[sourceJson]['eyecatch']" :src="'/images/' + fileMap[sourceJson]['eyecatch']">
      <div v-else class="article_head-emoji">{{fileMap[sourceJson]['eyecatchEmoji']}}</div>
      <div class="post_inner">
        <span class="tag">{{fileMap[sourceJson]['tags']}}</span>
        <span class="title">{{fileMap[sourceJson]['title']}}</span>
        <span class="date">{{fileMap[sourceJson]['date'].slice(0, 10)}}</span>
      </div>
    </n-link>
  </div>
</template>

<script>
import summary from '~/_BLOG/json/summary.json'

export default {
  props: ['source'],
  data() {
    return {
      isLoaded: true,
      sourceJson: this.source.replace('./', '').replace('markdown', 'json').replace('.md', '.json'),
      fileMap: summary['fileMap'],
    };
  }
};
</script>


<style>

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

.post .article_head-emoji {
  width: 100%; height: 100%;
  padding-bottom: 3rem;
  position: absolute;
  top: 0; left: 0;
  display: inline-flex;
  justify-content: center; align-items: center;
  font-size: 10rem;
  transition-duration: 0.3s;
  border: 3px solid #fff;
  border-radius: 10px;
  background-color: #071e22;
}
.post:hover .article_head-emoji {
  opacity: 0.6;
  font-size: 13rem;
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
  padding-top: 3px; padding-left: 0.4rem;
  margin-bottom: 0.5rem;
  font-size: 1.28rem; font-weight: 300;
  line-height: 1.2rem;
  display: block;
}
span.title {
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
  line-height: 1.25em;
  letter-spacing: -0.05em;
  display: block;
}
@media (max-width:768px) {
  span.tag {
    margin-bottom: 1rem;
  }
  span.title {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
}
span.date {
  padding-left: 0.4rem;
  font-size: 1.28rem; font-weight: 300;
  display: block;
}
</style>
