<template>
  <div class="post">
    <n-link :to="'/article/' + fileMap[sourceJson]['sourceBase'].replace('.md','').replace('-','/') + '/'" class="notscroll" >
      <img :src="'/images/' + fileMap[sourceJson]['eyecatch']">
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
  },
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
