<script setup lang="ts">
const slug = useRoute().path.split('/');
let article: Array<object>;
let page: number = Number(slug[3]);
let skip = (page === 2) ? 1 : (page * 15) - 14;
let limit = 15;

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
</script>
<template>
    <Header></Header>

    <div class="blog_title">
        <img src="~/assets/images/logo.png" alt="" class="blog_title--logo">
        <img src="~/assets/images/blogName.png" alt="" class="blog_title--name">

        <ul>
            <li><a href="https://udcxx.me" target="_blank">PORTFOLIO</a></li>
            <li><a href="https://twitter.com/udc_xx" target="_blank">TWITTER</a></li>
            <li><a href="https://instagram.com/udcsk" target="_blank">INSTAGRAM</a></li>
        </ul>
    </div>

    <h3>{{ slug[2] }} 記事</h3>
    <PostList :articles="article" />

    <Pagenation :Tag="slug[2]" :page="page" :skip="skip" :limit="limit" />

    <Footer></Footer>
</template>

<style lang="scss">
.blog_title {
    margin: 0;
    width: 100%;

    img {
        display: inline-block;
    }

    &--logo {
        width: 15%;
    }

    &--name {
        margin-left: 3%;
        padding-bottom: 5%;
        width: 15rem;
    }

    ul {
        margin-left: -15rem;
        width: 80%;
        display: inline-block;
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

.pagination {
    text-align: center;

    .totop {
        margin: 0 2rem;
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
