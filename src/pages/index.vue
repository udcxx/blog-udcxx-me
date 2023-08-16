<script setup>
    const articleNew = await queryContent()
    .sort({ date: -1 })
    .limit(8)
    .find();

    const articleTagShorts = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Shorts' } }).limit(4).find();
    const articleTagIt = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'IT' } }).limit(4).find();
    const articleTagCar = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Car' } }).limit(4).find();
    const articleTagLife = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Life' } }).limit(4).find();
    const articleTagGadget = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Gadget' } }).limit(4).find();
    const articleTagBook = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'Book' } }).limit(4).find();
    const articleTagMU = await queryContent()
        .sort({ date: -1 }).where({ tags: { $contains: 'MU' } }).limit(4).find();
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

    <div class="articles -new">
        <h3 class="articles--tagname">New</h3>
        <PostList :articles="articleNew" />
        <NuxtLink to="/tags/new/1/" class="articles--morebutton">More new posts... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3 class="articles--tagname">Shorts</h3>
        <PostList :articles="articleTagShorts" />
        <NuxtLink to="/tags/Shorts/1/" class="articles--morebutton">More Shorts... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3 class="articles--tagname">IT</h3>
        <PostList :articles="articleTagIt" />
        <NuxtLink to="/tags/IT/1/" class="articles--morebutton">More IT... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3 class="articles--tagname">Life</h3>
        <PostList :articles="articleTagLife" />
        <NuxtLink to="/tags/Life/1/" class="articles--morebutton">More Life... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3 class="articles--tagname">Car</h3>
        <PostList :articles="articleTagCar" />
        <NuxtLink to="/tags/Car/1/" class="articles--morebutton">More Car... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3 class="articles--tagname">Gadget</h3>
        <PostList :articles="articleTagGadget" />
        <NuxtLink to="/tags/Gadget/1/" class="articles--morebutton">More Gadget... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3 class="articles--tagname">Book</h3>
        <PostList :articles="articleTagBook" />
        <NuxtLink to="/tags/Book/1/" class="articles--morebutton">More Book... &Gt;</NuxtLink>
    </div>

    <div class="articles">
        <h3 class="articles--tagname">MU</h3>
        <PostList :articles="articleTagMU" />
        <NuxtLink to="/tags/MU/1/" class="articles--morebutton">More MU... &Gt;</NuxtLink>
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
    width: 100%; max-width: 1000px;
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

    &--morebutton {
        margin: 1rem 0 0 auto;
        @include fontsize(16);
        text-align: right;
        display: block;
    }

    .postlist {
        margin: 0 auto 2rem;

        @media (max-width: 980px) and (min-width: 740px) {
            .postitem:nth-of-type(4) {
                display: none;
            }
        }
    }

    &.-new {
        .postlist {
            @media (max-width: 980px) and (min-width: 740px) {
                .postitem:nth-of-type(4) {
                    display: block;
                }
                .postitem:nth-of-type(7), .postitem:nth-of-type(8) {
                    display: none;
                }
            }
        }
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
