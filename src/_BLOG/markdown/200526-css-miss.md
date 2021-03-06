---
title: CSS Tips集
date: 2020-05-26
tags: IT
eyecatch: 200526.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

今回は、普段僕がCSSを書いていてよくやってしまう失敗やクセをまとめてみようと思います。

それぞれで記事にしようかと思っていたのですが、いつまで経っても書かない気がしたので1つの記事にまとめますw めちゃくちゃ初歩的なミスばかりなので恥ずかしいですが、でも大抵上手くいかない時って初歩的なミスしてるよね、って言い聞かせながら書きます。

## flex-box を使ったときにiPhoneで画像が伸びる！

**FlexBox** 便利ですよね！

といいつつ僕もまだまだ初心者なので [チートシート](https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet#flexbox8) 片手にじゃないと使いこなせません...(汗)

そんな便利なFlexBoxですが、iPhoneのSafariで実機確認する際、画像が縦に伸びてしまっている現象に何度か遭遇したことがあります。

対策・解決方法として `align-items: flex-start;` を入れてあげるとうまくいきます。直らなかったことがないので詳しく調査してませんが、恐らく `align-items` を何かしら明示してあげればいいんだと思います。

## 疑似要素が表示されない！

疑似要素とは `:before` とか `:after` とかのことです。

まぁ疑似要素が表示されない時って `content: "";` 入れ忘れてる事が5割だよね。

最近は疑似要素のcss書くときは一番真っ先に `content: "";` 書くようになりました。

残り5割は、元になる要素に `position: relative;` 忘れてるか、疑似要素に  `position: absolute;` 忘れてます。僕の場合はそう。

## 動画の自動再生ができない！

特にiPhoneは厳しいと聞きます。

音ありの状態だとユーザーがびっくりしちゃうので自動再生（autoplay）出来ない仕様らしいです。videoタグ使うときは下記のオプションと一緒に使うことが多いです。

```
<!-- ▼自動再生のとき -->
<video src="./video.mp4" muted loop playsinline autoplay></video>

<!-- ▼自動再生じゃないとき -->
<video src="./video.mp4" muted playsinline controls preload="metadata"></video>
```

* `muted` … ミュート（消音）にします。自動再生のときは必須かと。
* `loop` … ループ再生させます。コントロールパネルを表示させないときや、自動再生のときに使うことが多いですね。
* `playsinline` … これ入れないとiPhoneで再生したときに全画面表示になっちゃう可能性があるらしいです。
* `autoplay` … 自動再生させます。
* `controls` … 再生・一時停止をユーザーに操作させる場合にはこのオプションが必要です。これかautoplayがないと再生されません。
* `preload` … 手動再生のときはmeta（動画の長さとか）情報だけをダウンロードして、再生ボタン押されたときに初めて動画本体のダウンロードが始まるように設定してます。

## 背景画像が表示されない！

`background-image` で指定したとき、パスをミスる確率グンと上がりますよね？え、そんなミスしないって！？

Macだと、Finderで右クリックしたときに `alt(option)` を押しながらすると **パスをコピーできます** 。あんま使わないですが。

## （おまけ）僕のCSS書くときのクセ

良いか悪いかは別として、似たプロパティーは横並びで書いちゃうクセがあります。

~~あんまり縦に長いと、メディアクエリー書くときの上下運動だけで疲れちゃうので~~ 嘘です、特に理由はないですw

```
.style {
	font-size: 1rem; font-weight: bold;
	background-image: url("../img.jpg");
	background-position: center; background-repeat: no-repeat; background-size: contain;
}
```

**いい加減、ショートハンド覚えろよ。**

-----

やっぱり書いてて恥ずかしいミスばっかりですね。まだまだ修行が足りません(泣)
