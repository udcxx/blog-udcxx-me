<template lang="html">
  <div class="tags">
    <ul>
      <li v-for="tag in tagArr()" :key="tag"><n-link :to="'/tags/' + tag.toLowerCase() + '/'">{{tag}}</n-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tags",
  props: ['tags'],
  data() {
    return {
      url: `https://blog.udcxx.me/`
    };
  },
  methods: {
      tagArr() {
          return this.tags.split(' ');
      }
  }
};
</script>

<style lang="scss">

.tags {
  width: 100%;
  ul {
    padding-right: 1rem;
    text-align: right;
    li {
        margin: 0 0 0 0.5rem;
        display: inline-block;
    }
    li:before {
      content: '';
    }
  }
  .share-twitter:hover {
    .fill_tw { fill: #55acee; }
  }
  .share-hatebu:hover {
    .fill_b { fill: #00A4DE; }
  }
  .share-line:hover {
    .fill_li_1 { fill: #00c300; }
    .fill_li_2 { fill: #ffffff; }
  }
}

</style>
