<script setup lang="ts">
interface Props {
    Tag: string
    page: number
    skip: number
    limit: number
}

const Props = withDefaults(defineProps < Props > (), {
    Tag: 'new',
    page: 1,
    skip: 1,
    limit: 15
});

let article: Array<object>;
const prevPage = Number(Props.page) - 1;
const nextPage = Number(Props.page) + 1;

if (Props.Tag === 'new') {
    article = await queryContent()
        .find();
} else {
    article = await queryContent()
        .where({ tags: { $contains: Props.Tag } })
        .find();
}

const pageMax = Math.ceil(article.length / Props.limit);

const getpath = (page:number) => {
    return `/tags/${Props.Tag}/${page}/`
}
</script>

<template>
    <div class="pagenation">
        <NuxtLink :to="getpath(prevPage)" v-if="prevPage > 0">
            <p>前へ</p>
        </NuxtLink>
        <NuxtLink :to="getpath(nextPage)" v-if="nextPage <= pageMax">
            <p>次へ</p>
        </NuxtLink>
    </div>
</template>

<style>
.pagenation {
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: space-around;
}
</style>