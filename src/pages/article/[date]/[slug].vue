<script setup>
    const article = await queryContent(useRoute().path).findOne();

    const articleNew = await queryContent()
        .sort({ date: -1 })
        .limit(4)
        .find();

    const articleTag = await queryContent()
        .sort({ date: -1 })
        .where({ tags: { $contains: article.tags.split(' ')[0] } })
        .limit(4)
        .find();

    const tagArticlesLink = `/tags/${article.tags.split(' ')[0]}/1/`;

    const description = article.description ? article.description : '無趣味なりにつらつらと戯言を。フロントエンドと車にちょっぴり興味あり。';
    const ogImage = article.eyecatch ? article.eyecatch : '/images/blog-card.png';

    const adjustEmoji = (emoji) => {
        let needAdd = true;
        let newEmoji = '';
        for (let i = 0; i < emoji.length; i++) {
            const charCode = emoji.charCodeAt(i).toString(16);
            if (charCode === 'fe0f') { needAdd = false; }
            newEmoji += '0x' + charCode;
        }
        if (needAdd) {
            newEmoji += '0xfe0f';
        }
        return String.fromCodePoint(...newEmoji.split('0x').slice(1).map(hex => parseInt(hex, 16)));
    }

    useHead({
        title: `${article.title} | 無趣味の戯言`,
        meta: [
            { name: 'description', content: description },
            { name: 'og:image', content: ogImage}
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
        document.querySelectorAll('pre code').forEach((el) => {
            hljs.highlightElement(el);
        });
    })
</script>

<template>
    <Header></Header>

    <div class="article">
        <div class="article_head">
            <div class="article_head--emoji">
                <span v-if="article.eyecatchEmoji">{{ adjustEmoji(article.eyecatchEmoji) }}</span>
                <span v-else="article.eyecatchEmoji">{{ adjustEmoji('📄') }}</span>
            </div>
            <h1 class="article_head--title">{{ article.title }}</h1>
        </div>
        <div class="article_content">
            <div class="article_left">
                <div class="article_meta">
                    <div class="article_meta--title">公開</div>
                    <div class="article_meta--content"><time>{{ article.date.slice(0, 10) }}</time></div>
                    <div class="article_meta--title">タグ</div>
                    <div class="article_meta--content"><Tags :tags="article.tags"></Tags></div>
                </div>
                <ShareButtons :title="article.title"></ShareButtons>
            </div>
            <div class="article_body">
                <content-doc :head="false" />
                <a href="https://www.buymeacoffee.com/udcxx" target="_blank" class="buymeacoffee"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
                <adsbygoogle ad-slot="2499763349" style="max-width: calc(768px - 1rem); margin: 2rem auto;" />
                <adsbygoogle ad-slot="2499763349" style="max-width: calc(768px - 1rem); margin: 2rem auto;" />
            </div>
        </div>

        <div class="recommend">
            <h3 class="recommend--tagname">New</h3>
            <PostList :articles="articleNew" />
            <NuxtLink to="/tags/new/1/" class="recommend--morebutton">More New posts... &Gt;</NuxtLink>

            <h3 class="recommend--tagname">{{ article.tags.split(' ')[0] }}</h3>
            <PostList :articles="articleTag" />
            <NuxtLink :to="tagArticlesLink" class="recommend--morebutton">More {{ article.tags.split(' ')[0] }}... &Gt;</NuxtLink>
        </div>
        
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
        font-family: 'Noto Color Emoji', 'BIZ UDPGothic', sans-serif;
        font-weight: 400;
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
    top: 7.5rem;

    .article_meta {
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
    max-width: 74.4rem;
    border-radius: 1rem;
    background-color: #D1D5D5;
    box-sizing: border-box;

    @media (max-width:768px) {
        max-width: none;
    }

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

    .buymeacoffee {
        margin: 4rem auto 2rem;
        display: block;

        img {
            margin: 0 auto;
        }
    }
}

.recommend {
    width: 100%; max-width: 1024px;
    margin: 2rem auto;

    .postlist {
        @media (max-width: 980px) and (min-width: 720px) {
            .postitem:nth-of-type(4) {
                display: none;
            }
        }
    }

    &--tagname {
        @include fontsize(40);
        font-weight: 400;
        color: #6C7A7C;
        line-height: 0.8em;
        margin-bottom: 0;
    }

    &--morebutton {
        margin: 1rem 0 0 auto;
        @include fontsize(16);
        text-align: right;
        display: block;
    }
}

// Safari対策
::-webkit-full-page-media, :future, :root .article_head .article_head--emoji {
    font-family: -apple-system, serif;
}
</style>