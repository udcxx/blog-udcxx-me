<template>
    <div class='header cf'>
        <NuxtLink to="/" class="header_link">
            <div class="header_logo"><img src='~/assets/images/logo.png' class="header_logo_img" alt="だいちゃんロゴ"></div>
        </NuxtLink>
        <NuxtLink to="/" class="header_link">
            <div class="header_title">
                <h1><img src='~/assets/images/blogName.png' class="header_title_img" alt="無趣味の戯言"></h1>
            </div>
        </NuxtLink>

        <div class="header_menu">

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            position: 1
        }
    },
    mounted() {
        document.onscroll = (e) => {
            this.y = document.documentElement.scrollTop || document.body.scrollTop;
            this.h = document.body.clientHeight;
            this.position = (this.h - this.y) / this.h;

            if (this.position < 0.9) {
                document.querySelector('.header').classList.add('active');
            } else {
                document.querySelector('.header').classList.remove('active');
            }

        }
    }
}
</script>

<style lang="scss">
.header {
    width: 100%; height: 0;
    position: fixed;
    top: 0; z-index: 10;
    background-color: #071e22;
    box-shadow: 0px 3px 7px 0px rgba(7, 30, 34, 0.35);
    pointer-events: none;
    transition: height 1s ease 0s;

    &.active {
        height: 7rem;
        opacity: 1;
        pointer-events: auto;
    }
}

.header_logo {
    padding: 0.5%;
    height: 100%;
    float: left;
    text-align: left;
    align-items: center;
    box-sizing: border-box;

    .header_logo_img {
        height: 100%;
        width: auto;
        display: block;
    }

    &:hover {
        animation: 0.1s shake 1s infinite;
    }
}

.header_title {
    padding: 0 1vw;
    height: 100%;
    display: flex;
    align-items: center;
    float: left;
    text-align: left;
    color: #fff;
    vertical-align: bottom;
    font-size: 1rem;

    h1 {
        margin: 0;
        height: 50%;
        font-size: 0;
    }

    .header_title_img {
        height: 100%;
        display: block;
    }
}

@media (max-width:764px) {
    .header_title {
        padding: 0 0.5%;
    }
}

@keyframes shake {

    from, to {
        transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
        transform: translate3d(-10px, 0, 0);
    }

    20%, 40%, 60%, 80% {
        transform: translate3d(10px, 0, 0);
    }
}


@keyframes slide-in {
    0% {
        height: 0;
    }

    100% {
        height: 7rem;
    }
}

</style>
