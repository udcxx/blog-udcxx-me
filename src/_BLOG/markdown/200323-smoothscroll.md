---
title: 【JS】ページ内リンクをスムーススクロールさせる【IE対応】
date: 2020-03-23
tags: IT
eyecatch: 200323.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

素のJavascript（jQuery不使用）かつIE対応で、ページ内遷移のスムーススクロールを実装する方法を調べてみました。今後の自分の為にメモしておきます。

## SmothScrollとは

ページ内遷移のとき、しゅるるーと動きのある遷移をさせることで **ページ内で移動していることがわかりやすくなる** のと、なにより **なんかかっこいい** です（語彙力）

jQueryを使う方法は多々あるのですが、素のJavascriptで紹介しているものが少なく、あってもIE非対応の書き方だったりしました。

## 結論

こちらを利用させて頂きました！

[ページ内リンクをスマートにするsmoothScroll.js - to-R](https://blog.webcreativepark.net/2007/07/12-143406.html)

[smoothScroll.js](https://blog.webcreativepark.net/sample/js/53/smoothScroll.js) をダウンロードして読み込ませておくだけで適用される手軽さが最高です！

また、適用させたくない箇所も指定できるので、とりあえず読み込ませておくといいかもしれません。

-----

こんな感じの便利なライブラリを自分でサクッと作って公開できるだけの技量を目指したいです。
