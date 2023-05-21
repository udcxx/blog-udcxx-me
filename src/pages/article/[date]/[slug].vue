<script setup>
    const article = await queryContent(useRoute().path).findOne();

    const articleNew = await queryContent()
        .sort({ date: -1 })
        .limit(3)
        .find();

    const articleTag = await queryContent()
        .sort({ date: -1 })
        .where({ tags: { $contains: article.tags.split(' ')[0] } })
        .limit(3)
        .find();

    const tagArticlesLink = `/tags/${article.tags.split(' ')[0]}/1/`;

    const description = article.description ? article.description : 'ああああ';

    useHead({
        title: `${article.title} | 無趣味の戯言`,
        meta: [
            { name: 'description', content: description }
        ]
    });

    onMounted(() => {
        const googleAd = document.querySelector('ins:nth-of-type(2)');
        if (document.querySelectorAll('h2').length >= 3) {
            let target = document.querySelector('h2:nth-of-type(2)');
            let targetParent = target.parentNode;
            targetParent.insertBefore(googleAd, target)
        } else {
            let target = document.querySelector('h2');
            let targetParent = target.parentNode;
            targetParent.insertBefore(googleAd, target)
        } 
    })
</script>

<template>
    <Header></Header>

    <div class="article">
        <div class="article_head">
            <div class="article_head--emoji">
                <span v-if="article.eyecatchEmoji">{{ article.eyecatchEmoji }}</span>
                <span v-else="article.eyecatchEmoji">📄</span>
            </div>
            <h1 class="article_head--title">{{ article.title }}</h1>
        </div>
        <div class="article_content">
            <div class="article_left">
                <div class="article_meta">
                    <div class="article_meta--title">公開</div>
                    <div class="article_meta--content"><time>{{ article.date.slice(0, 10) }}</time></div>
                    <div class="article_meta--title">タグ</div>
                    <div class="article_meta--content"><Tags :tags="tags"></Tags></div>
                </div>
                <ShareButtons :title="title"></ShareButtons>
            </div>
            <div class="article_body">
                <content-doc :head="false" />
                <adsbygoogle ad-slot="2499763349" style="max-width: calc(768px - 1rem); margin: 2rem auto;" />
                <adsbygoogle ad-slot="2499763349" style="max-width: calc(768px - 1rem); margin: 2rem auto;" />
            </div>
        </div>


        <h3>新着記事</h3>
        <PostList :articles="articleNew" />
        <NuxtLink to="/tags/new/1/">新着記事をもっと見る</NuxtLink>

        <h3>{{ article.tags.split(' ')[0] }}タグ</h3>
        <PostList :articles="articleTag" />
        <NuxtLink :to="tagArticlesLink">{{ article.tags.split(' ')[0] }}タグの記事をもっと見る</NuxtLink>

    </div>

    <Footer></Footer>
</template>

<style lang="scss">
.article_head {
    width: 100%;
    max-width: 1024px;
    margin: 10rem auto 10.8rem;
    text-align: center;

    .article_head--emoji {
        font-size: 7.5rem;
        color: #f7f7f7;
        margin-bottom: 10rem;
        font-family: 'Noto Color Emoji', sans-serif;
    }

    .article_head--title {
        padding: 0 4rem;
        font-size: 2.8rem;
        font-weight: bold;
        color: #f7f7f7;
    }
}

.article_content {
    width: 100%; max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row-reverse;

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
}

.article_left {
    width: 21.6rem;
    height: 100%;
    margin-left: 4rem;
    position: sticky;
    top: 7.5vh;

    .article_meta {
        width: 21.6rem;
        padding: 2rem;
        border-radius: 1rem;
        color: #2C2C2C;
        background-color: #D1D5D5;

        @media (max-width:768px) {
            width: 54.8rem;
            padding: 1.2rem 1.2rem 0.5rem;
            display: inline-block;

            &:nth-last-of-type(1) {
                margin-right: 0;
            }
        }

        .article_meta--title {
            margin-top: 1em;
            ;
            font-size: 1.6rem;

            &:nth-of-type(1) {
                margin-top: 0;
            }

            @media (max-width:768px) {
                display: none;
            }
        }

        .article_meta--content {
            text-align: right;
            font-size: 1.6rem;
            font-weight: bold;

            @media (max-width:768px) {
                text-align: left;
                font-size: 1.4rem;
            }
        }
    }

    @media (max-width:768px) {
        width: 100%;
        margin-left: 0;
        margin-bottom: 1.6rem;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        position: relative;
        top: auto;
    }
}


.article_meta_date {
    padding-bottom: 1rem;
    margin-right: 1em;
    text-align: right;
}

.article_body {
    padding: 4rem 2rem;
    width: 100%;
    max-width: 768px;
    border-radius: 1rem;
    background-color: #D1D5D5;

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }

    hr {
        width: 8rem;
        margin: 6rem auto;
        border-top: none; border-left: none; border-right: none;
        border-bottom: 3px solid #F49D37;
    }
}

.recommend_article-title {
    border: none;
}

.recommend_article-title-bg {
    width: 100%;
    padding: 0 2rem;
    display: block;
    position: relative;
}

.recommend_article-title-initial {
    color: #f49d37;
}

.recommend_article-title {
    margin-bottom: 0;
    text-align: left;
    color: #fff;
}

.recommend_article-title::after {
    content: none;
}

.recommend_article {
    #post_wrap {
        margin: 0;
        padding: 2rem;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
}

.pagination {
    margin: 3rem auto;
    font-size: 1.6rem;
    text-align: center;
}
</style>