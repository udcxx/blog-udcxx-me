<script setup lang="ts">
    const { data: article } = useAsyncData("article", () =>
        queryContent(useRoute().path).findOne()
    );
</script>

<template>
    <div class="tags">
        <ul>
            <li v-for="tag in article.tags.split(' ')" :key="tag">
                <NuxtLink :to="'/tags/' + tag + '/1'">{{ tag }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
.tags {
    width: 100%;

    ul {
        margin: auto;

        li {
            margin: 0 0 0 0.5rem;
            display: inline-block;

            &:nth-of-type(1) {
                margin: 0;
            }

            &::before {
                display: none;
            }
        }

        li:before {
            content: '';
        }
    }

    .share-twitter:hover {
        .fill_tw {
            fill: #55acee;
        }
    }

    .share-hatebu:hover {
        .fill_b {
            fill: #00A4DE;
        }
    }

    .share-line:hover {
        .fill_li_1 {
            fill: #00c300;
        }

        .fill_li_2 {
            fill: #ffffff;
        }
    }
}
</style>
