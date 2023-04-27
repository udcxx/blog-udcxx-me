<template>
    <ul>
        <li v-for="(article, index) of articles" :key="article.slug">
            <NuxtLink :to="article._path">
                <p>{{ article.title }} - {{ article.date }}</p>
            </NuxtLink>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        articles: {
            required: true
        }
    }
}
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
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
}
</style>
