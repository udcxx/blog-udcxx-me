---
title: 無趣味の戯言 ver.1.1.0
date: 2024-02-29
tags: Nuxt Blog IT
eyecatch: 
eyecatchEmoji: 🎉
description: Nuxtで作ったブログにhighlight.jsを導入したりしました
---

こんにちは。だいちゃんです。

今日は久しぶりに平日休みだったので、役所めぐりのあと、ブログのメンテに勤しんでました。

やったことを覚えているうちに書いておきます。

## highlight.js の導入

やっと導入することができました！

一応、技術ブログの側面もあるつもりなので、たまにコードを晒したりもしているのですが、白い文字が並ぶだけで見る気失せてたと思いますw

今回のアップデートから、[highlight.js](https://highlightjs.org/) を導入したので、勝手に色がつくようになりました！

```javascript
const message = '色、ついてる？？';
console.log(message);
```

このブログはNuxt.jsで作っているのですが、そこにサードパーティのJavaScriptとかCSSとかをいい感じに読み込ませるのに苦労しました。

最終的には、`public` の中に `highlight` というディレクトリを作って、そこにJavaScriptとCSSファイルを入れ、`nuxt.config.ts` に以下を追記して読み込ませる感じにしました。

```javascript
// 追記した部分以外省略してます...
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                { rel: 'stylesheet', href: '/highlight/highlightjs.min.css'}
            ],
            script: [
                { src: '/highlight/highlight.min.js'}
            ]
        }
    }
});
```

記事ページにあたる `pages/article/[date]/[slug].vue` では、以下を追記することで、コード部分を探して実際に色をつけています。

```javascript
// こちらも関係あるとこだけ抜き取ってます...
<script setup>
    onMounted(() => {
        document.querySelectorAll('pre code').forEach((el) => {
            hljs.highlightElement(el);
        });
    })
</script>
```


## Buy me a coffee

[Buy Me a Coffee](https://www.buymeacoffee.com/) という投げ銭サービスも導入しました。

日本語対応してないし、支払いもドルベースっぽいので、抵抗ある方もいるかもですが、もし記事がよかったらコーヒー奢ってください😚

ちなみに、このサービスは [Re麺bar](https://remenbar.com/) の中の人に教えてもらった [このブログ](https://blog.takanorip.com/) で使われていたのを見て知りました。Buy me a Coffee だけでなく、デザインや文章、考え方も参考になるなぁと思ったので今後も継続的にチェックしようと思ってます。


## こまごまとした修正とか

あとは、CSS調整したり、README直したりとちょっとした修正を行って、無趣味の戯言 Version 1.1.0 としてMergeしました🎉

Nuxt.jsのバージョンを上げるタイミングから、無趣味の戯言 v1 としてナンバリングを開始したのですが、結局自分しか使ってないブログのバージョンのナンバリングなんてあってないようなもんですねw

そして、v1としたときに結構コード書き換えたはずなのに既にカオスを感じてる...

---

**参考**

* Github: [highlight.js の導入など #51](https://github.com/udcxx/blog-udcxx-me/pull/51)
* [takanorip blog](https://blog.takanorip.com/)
* [Nuxtのサードパーティ製Javascriptの読み込む方法を色々試してみた](https://zenn.dev/sengosha/articles/54ec4c57194626)