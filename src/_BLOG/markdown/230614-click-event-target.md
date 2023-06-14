---
title: clickイベントのtargetはclickされた要素とは限らない
date: 2023-06-14
tags: Web IT
eyecatch:
eyecatchEmoji: 🖱
description: イベントリスナーを付けた要素の情報を取得したいときには、currentTarget を使うほうが良さそう
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

スムーススクロールを作るときにハマったので、メモ。

イベントリスナーを付けた要素の情報を取得したいときには、`currentTarget` を使うほうが良さそうというお話です。

[target を currentTarget に変更する #9](https://github.com/udcxx/StaticPageStarter/issues/9)

## これまで

aタグ（便宜上、hogeというclassがついたaタグ）のクリックイベントで、hrefを取得する処理など、aタグに指定したプロパティを利用したいとき、以下のようなコードを書いていました。

```
const hoge = document.querySelector('a.hoge');

hoge.addEventListener('click', e => {
    const href = e.target.hash;
    console.log(href);
})
```

このコードだと、子要素を持たないaタグや、ちゃんとaタグ自身をクリックしたときにはうまくいきますが、imgなどの子要素を持つと、`hash` が取れないよ！というエラーになってしまいます。

```
<!-- これだとaタグのhrefがうまく取れない -->
<a href="https://udcxx.me" class="hoge"><img src="./path/to/img.jpg"></a>
```

clickイベント内の `target` を呼び出す要素、つまり `e` には、クリックされた要素自身が入るようになっているため、上記の例の場合、imgタグのhashを拾う動きになるから、取れないよ！とエラーが返されるわけです。

## 回避方法

結論、子要素を持つ可能性のある要素にclickイベントを持たせつつ、イベントを付けた側の要素から値を取得するときは、 `currentTarget` を使った処理を書くようにしようと思います。

---

ちなみに、 `target` と `currentTarget` の違いは、ちゃんとMDNでまとめられてました。ﾁｬﾝﾄﾖﾓｳﾈ。

[イベントターゲットの比較｜MDN](https://developer.mozilla.org/ja/docs/Web/API/Event/Comparison_of_Event_Targets)

[Event.target｜MDN](https://developer.mozilla.org/ja/docs/Web/API/Event/target)

[Event.currentTarget｜MDN](https://developer.mozilla.org/ja/docs/Web/API/Event/currentTarget)
