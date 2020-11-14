<template>
  <div>
    <div class="top-content">
      <div class="title">{{ title }}</div>
      <div class="post-meta">
        <div class="post-meta-date">日付: <time v-html="date">{{ params.tags }}</time></div>
      </div>
    </div>
    <div
      class="body-content"
      v-html="bodyHtml"></div>
  </div>
</template>

<script>
import { sourceFileArray } from '~/_BLOG/json/summary.json'

export default {
  validate({ params }) {
    return sourceFileArray.includes(`./_BLOG/markdown/${params.year}-${params.slug}.md`)
  },
  asyncData({ params }) {
    return Object.assign(
      {},
      require(`~/_BLOG/json/${params.year}-${params.slug}.json`),
      { params }
    )
  },
  head() {
    const title = `${this.title} - 無趣味の戯言`
    const url = `https://blog.udcxx.me/article/${this.params.year}/${
      this.params.slug
    }/`
    return {
      title: title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title }
      ],
      link: [{ rel: 'canonical', href: url }]
    }
  }
}
</script>
