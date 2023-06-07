<template>
    <ul class="postlist">
        <li v-for="(article, index) of articles" :key="article.slug" class="postitem">
            <NuxtLink :to="article._path + '/'" class="postitem--link">
                <div class="postitem--background">
                    <img v-if="article.eyecatch" :src="'/images/' + article.eyecatch" alt="" class="postitem--eyecatch">
                    <span v-else class="postitem--eyecatchemoji">{{ article.eyecatchEmoji }}</span>
                </div>
                <div class="postitem--details">
                    <p class="postitem--title">{{ article.title }}</p>
                    <p class="postitem--date">{{ article.date.slice(0, 10) }}</p>
                </div>
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


<style lang="scss">
.postlist {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;
}

.postitem {
    width: 23.5rem; height: 23.5rem;
    margin: 0;
    background-color: #fff;

    &::before {
        content: none;
    }

    &--link {
        width: 100%; height: 100%;
        display: block;
        position: relative;

        &:hover {
            .postitem--background {
                width: 100%; height: 100%;
            }
        }
    }

    &--background {
        width: 95%; height: 95%;
        margin: 0 auto;
        position: absolute;
        top: 50%; left: 0; right: 0; z-index: 5;
        transition: 0.3s;
        transform: translateY(-50%);
        background-color: #071e22;
    }

    &--eyecatch {
        width: 100%; height: 100%;
        object-fit: cover;
    }

    &--eyecatchemoji {
        margin: 0 auto;
        text-align: center;
        font-size: 10rem;
        line-height: 2em;
        display: block;
        transition: 0.3s;

        &:hover {
            font-size: 12.5rem;
        }
    }

    &--details {
        width: 100%;
        position: absolute;
        bottom: 0; left: 0; z-index: 6;
        background-color: rgba(7, 30, 34, 0.8);
    }

    &--title {
        margin: 0;
        padding: 0.5rem;
        @include fontsize(14);
        line-height: 1.2em;
    }

    &--date {
        margin: 0;
        padding: 0.5rem;
        @include fontsize(10);
        font-weight: 400;
        line-height: 1em;
    }
}
</style>
