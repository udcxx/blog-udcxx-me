<script setup>
    const articleNew = await queryContent()
    .sort({ date: -1 })
    .limit(6)
    .find();

    const articleTagShorts = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Shorts' } }).limit(3).find();
    const articleTagIt = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'IT' } }).limit(3).find();
    const articleTagCar = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Car' } }).limit(3).find();
    const articleTagLife = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Life' } }).limit(3).find();
    const articleTagGadget = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Gadget' } }).limit(3).find();
    const articleTagBook = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Book' } }).limit(3).find();
    const articleTagMU = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'MU' } }).limit(3).find();
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

    <div class="articles -new">
        <PostList :articles="articleNew" />
    </div>

    <div class="articles">
        <h3>Shorts</h3>
        <PostList :articles="articleTagShorts" />
        <NuxtLink to="/tags/Shorts/1/">More Shorts... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3>IT</h3>
        <PostList :articles="articleTagIt" />
        <NuxtLink to="/tags/IT/1/">More IT... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3>Life</h3>
        <PostList :articles="articleTagLife" />
        <NuxtLink to="/tags/Life/1/">More Life... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3>Car</h3>
        <PostList :articles="articleTagCar" />
        <NuxtLink to="/tags/Car/1/">More Car... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3>Gadget</h3>
        <PostList :articles="articleTagGadget" />
        <NuxtLink to="/tags/Gadget/1/">More Gadget... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3>Book</h3>
        <PostList :articles="articleTagBook" />
        <NuxtLink to="/tags/Book/1/">More Book... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3>MU</h3>
        <PostList :articles="articleTagMU" />
        <NuxtLink to="/tags/MU/1/">More MU... &Gt;</NuxtLink>
    </div>
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

.articles {
    width: 100%; max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
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
