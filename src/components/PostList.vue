<template>
  <div id="post_wrap">
    <div v-for="viewFileArray in viewFileArray" :key="viewFileArray">
        <PostListContent :source="viewFileArray"></PostListContent>
    </div>
  </div>
</template>

<script>
import summary from '~/_BLOG/json/summary.json'
import PostListContent from '~/components/PostListContent.vue'
export default {
  components: {
    PostListContent,
  },
  props: ['lsFrom', 'lsTo'],
  data() {
    return {
        isLoaded: true,
        sourceFileArray: summary['sourceFileArray'].sort().reverse(),
        viewFileArray: 0,
    };
  },
  watch: {
    lsFrom: function() {
      this.viewFileArray = this.sourceFileArray;
      this.viewFileArray = this.viewFileArray.slice(this.lsFrom, this.lsTo);
    }
  },
  created() {
    this.viewFileArray = this.sourceFileArray;
    this.viewFileArray = this.viewFileArray.slice(this.lsFrom, this.lsTo);
  },
};
</script>


<style>
#post_wrap {
  margin: 10vh auto 3vh;
  padding: 1rem;
  width: 100%;
  display: grid;
  font-size: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-auto-flow: dense;
  align-items: center;
  justify-content: center;
  grid-row-gap: 1rem; grid-column-gap: 1rem;
}

</style>
