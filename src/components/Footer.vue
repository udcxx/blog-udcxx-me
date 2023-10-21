<template>
    <footer>
        <p>&copy; {{ year }} udcxx.</p>
        <ul>
            <li><a href="https://github.com/udcxx" target="_blank"><img src="~/assets/images/footer_github.png" alt="GitHub"></a></li>
            <li><a href="https://www.amazon.co.jp/hz/wishlist/ls/3S78SPACY6TSJ" target="_blank" title="ほしいものリスト"><img src="/images/amazon.svg" alt="Amazon"></a></li>
            <li><a href="https://udcxx.me/contact/" target="_blank" title="お問い合わせ"><img src="/images/contact.svg" alt="Contact"></a></li>
        </ul>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>

<style lang="scss">
footer {
    padding: 10vh 2rem 10vh;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    color: #fff;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    p {
        padding: 0;
        font-weight: bold;
        line-height: 1em;
    }

    ul {
        margin: 0;
        display: flex;
        align-items: center;

        li {
            margin: 0 0 0 2rem;
            list-style: none;
            display: inline-block;

            a {
                display: block;
                display: flex;
                align-items: center;
            }

            img {
                width: 2.4rem;
            }
        }

        li:before {
            display: none;
        }
    }
}
</style>
