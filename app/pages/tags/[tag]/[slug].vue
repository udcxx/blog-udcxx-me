<script>
const slug = useRoute().path.split('/');
let article;
let page = Number(slug[3]);
let skip = (page === 1) ? 0 : (page * 12) - 11;
let limit = 12;

if (slug[2] === 'new') {
    article = await queryContent()
        .sort({ date: -1 })
        .limit(limit)
        .skip(skip)
        .find();
} else {
    article = await queryContent()
        .sort({ date: -1 })
        .where({ tags: { $contains: slug[2] } })
        .limit(limit)
        .skip(skip)
        .find();
}


useHead({
    title: `${slug[2]}タグの記事一覧｜無趣味の戯言`
})
</script>
<template>
    <Header></Header>

    <div class="blog_title">
        <img src="~/assets/images/logo.png" alt="" class="blog_title--logo">
        <NuxtLink to="/"><img src="~/assets/images/blogName.png" alt="" class="blog_title--name"></NuxtLink>

        <ul>
            <li><a href="https://udcxx.me" target="_blank">PORTFOLIO</a></li>
            <li><a href="https://www.amazon.co.jp/hz/wishlist/ls/3S78SPACY6TSJ" target="_blank">WANT IT</a></li>
            <li><a href="https://app.udcxx.me/surl/" target="_blank">SURL</a></li>
        </ul>
    </div>

    <div class="articles">
        <h3 class="articles--tagname">{{ slug[2] }}</h3>
        <PostList :articles="article" />
        <Pagenation :Tag="slug[2]" :page="page" :skip="skip" :limit="limit" />
    </div>

    <Footer></Footer>
</template>

<style lang="scss">
.blog_title {
    margin: 0 auto;
    width: 100%;

    img {
        display: inline-block;
    }

    &--logo {
        width: 25rem;
    }

    &--name {
        margin-left: 5rem;
        padding-bottom: 5rem;
        width: 25rem;
    }

    ul {
        margin: 0 0 0 30rem;
        display: block;

        @media (max-width: 768px) {
            width: 100%;
            margin: 0 auto;
            text-align: center;
        }
    }

    li {
        margin-left: 3%;
        display: inline-block;
        list-style: none;

        &:first-child {
            margin-left: 0;
        }

        &::before {
            content: '';
        }
    }

    a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
    }
}

.articles {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;

    &--tagname {
        @include fontsize(80);
        font-weight: 400;
        color: #6C7A7C;
        line-height: 0.8em;
        margin-bottom: 0;
    }

    .postlist {
        margin: 0 auto 10px;
    }

    .postitem {
        margin: 0 0 2rem;
    }
}


@media (max-width:764px) {
    .blog-title {
        img {
            display: block;
        }

        .logo {
            margin: 10% auto;
            width: 70%;
        }

        .title {
            margin: 10% auto;
            padding: 0;
            width: 70%;
        }

        ul {
            display: none;
        }
    }
}
</style>
