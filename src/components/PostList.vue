<template>
    <ul class="postlist">
        <li v-for="(article, index) of articles" :key="article.slug" class="postitem">
            <NuxtLink :to="article._path + '/'" class="postitem--link">
                <div class="postitem--background">
                    <nuxt-img 
                        v-if="article.eyecatch" 
                        :src="'/images/' + article.eyecatch" 
                        alt="" 
                        format="webp" 
                        quality="70"
                        class="postitem--eyecatch" 
                        loading="lazy" />
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

    @media (max-width: 980px) {
        justify-content: space-around;
    }
}

.postitem {
    width: 240px; max-width: 48vw; height: 240px; max-height: 48vw;
    margin: 0;
    border-radius: 1rem;
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
        border-radius: 1rem;
        background-color: #071e22;
    }

    &--eyecatch {
        width: 100%; height: 100%;
        object-fit: cover;
        border-radius: 1rem;
    }

    &--eyecatchemoji {
        margin: 0 auto;
        text-align: center;
        font-size: 10rem;
        font-family: 'Noto Color Emoji', 'BIZ UDPGothic', sans-serif;
        font-weight: 400;
        line-height: 1em;
        display: block;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        transition: 0.3s;

        &:hover {
            font-size: 11rem;
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
        @include fontsize(14, 16);
        line-height: 1.2em;
        text-align: left;
    }

    &--date {
        margin: 0;
        padding: 0.5rem;
        @include fontsize(10, 12);
        font-weight: 400;
        line-height: 1em;
    }
}
</style>
