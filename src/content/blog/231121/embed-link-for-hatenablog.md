---
title: はてブロのMarkdownモードで、埋め込みリンクを書く方法
date: 2023-11-21
tags: IT
eyecatch:
eyecatchEmoji: 🌏
description: はてなブログのMarkdownモードで、埋め込み形式のリンクを記載する方法と、その記載形式にでURLをコピーできるブックマークレットの紹介です！
---

こんにちは、だいちゃんです。

なんだかんだ、どうにかこうにか、[はてブロ](https://udcxx.hateblo.jp/archive/category/%E3%81%97%E3%82%85%E3%81%86%E3%81%BB%E3%81%86)でやってる週報が続いてます。

* [週報を復活しようと思います | 無趣味の戯言](https://blog.udcxx.me/article/230914/weekly-report/)

そんな週報を見返してみると、写真もない上に、リンクがすべて[こんな感じ](https://udcxx.hateblo.jp/entry/2023/11/19/090000)のテキストリンクになってて、全体的に寂しい印象を受けました。

見た目を少しでも華やか(？)にするためにも、せっかくはてなブログ使ってるんだから、埋め込み形式のリンクを使えばいいんじゃね！ってことを思い立ったわけです。

## 埋め込み形式のリンク

```Markdown
[https://blog.udcxx.me/:embed:title]
```

はてなブログでは、はてな記法モードや見たままモードのように、編集モードを選択することができます。僕はkintoneで記事を書いて、はてなブログAtomPub経由で投稿しているので、kintone上でも書きやすくてイメージしやすい **Markdownモード** を利用しています。

* kintoneからはてなブログに投稿してる話の詳細は [この記事](https://blog.udcxx.me/article/230915/kintone-to-hateblo/) をご覧あれ。

Markdownモードでは、上記のような形式で、URLの末尾に `:embed:title` を追記することで、埋め込み形式のリンクとして表示させることができます。

ちなみに、 `:embed` だけだと埋め込みのカードだけ表示され、`:embed:cite` にするとカード＋その下にURLが表示されます。上の例のように `:embed:title` とするとカード＋その下にタイトルが表示されます。僕の週報ではカード＋タイトルの形式を採用しました。


## ブックマークレットもつくる

```javascript
javascript:(function(){e=document.createElement('textarea');e.textContent = '[' + document.URL + ':embed:title]';document.body.appendChild(e);e.select();document.execCommand('copy');e.remove();})();
```

ブックマークにJavaScriptを埋め込んでおいて、クリックするだけで簡単なプログラムを走らせることができるブックマークレットも作成しました。

上のスクリプトをURLとしてブックマークを作ることで、そのブックマークをクリックするだけで、見てるページのURL＋ `:embed:title` がクリップボードに保存される仕組みです。


### 例

`https://blog.udcxx.me/` を開いてるときに、作成したブックマークレットをクリックすると、次の文字がクリップボードに保存されます...

```Markdown
[https://blog.udcxx.me/:embed:title]
```

---

ちなみに、これまでは、[この記事で紹介した](https://blog.udcxx.me/article/220726/make-bookmarklet-to-copy-url/)普通のMarkdown用のブックマークレットを使ってました。このブログは埋め込み形式のリンクに対応していないので、このブログ用としては今後も使い続けるけどね。

---

**参考**

[はてなブログの埋め込みリンクの挿入と表示内容の調整 - nujust's blog](https://nujust.hatenablog.com/entry/2022/07/24/202935)