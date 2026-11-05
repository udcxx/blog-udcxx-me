---
title: ランダムに文字が飛び散るCSS Animationを作って遊びました
date: 2020-06-18
tags: Web IT
eyecatch: 200618.jpg
---

こんにちは、だいちゃんです。

CSSアニメーションを使って、文字を飛び散らしてみました。ただ、毎回同じ動きでは芸がないので、Javascriptを組み合わせてランダムな方向へ飛び散らすようにしてみました。

今回始めてKeyframesを後から追加する処理を行ったのでメモ。

サンプルは [こちら](http://play.udcxx.me/20-css-ani-random/) から確認できます。

## 元になるHTMLとCSSを記述する

あまり芸が無いし、綺麗なソースではありませんがw

HTMLはbodyの中身だけ書いておきます。

```
<body>
	<div class="txt">
		<span class="txt-ani">に</span><span class="txt-ani">ほ</span><span class="txt-ani">ん</span><span class="txt-ani">ご</span><span class="txt-ani">で</span><span class="txt-ani">あ</span><span class="txt-ani">そ</span><span class="txt-ani">ぼ</span>
	</div>
</body>
```

```
body {
	width: 650px;
	margin: 0 auto;
	overflow-x: hidden;
}
.txt {
	width: 0;
	margin: 40vh auto;
	text-align: center;
	position: relative;
}
.txt-ani {
	position: absolute;
}
```

## JSでkeyframeを追加する

要素にstyleを追加するだけでは、動かすことは出来ますがアニメーションにはならないので、 `document.styleSheets` に追記するように書くのがポイントです。

あと、DOM操作するので、なるべく後から処理させるように注意が必要です。 [この辺](https://blog.udcxx.me/article/200227/js-onload-event/) も参考になったりしちゃうかも。

```
// アニメーションの大きさを設定
let animationSize = 50;

let txts = document.getElementsByClassName('txt-ani');
let styles; let i; let randomX; let randomY; let keyframes;

for (i in txts) {
	if (i >= 0) {
		styles = document.styleSheets[0];
		randomX = Math.random() * animationSize - animationSize / 2;
		randomY = Math.random() * animationSize - animationSize / 2;
		keyframes = "@keyframes move" + i + " { from { transform: translate(0, 0) } to { transform: translate(" + randomX + "vw, " + randomY + "vh) } }";
		styles.insertRule(keyframes, styles.cssRules.length);

		txts[i].style.left = i - txts.length / 2 + "em";
		txts[i].style.animation = "move" + i + " 5s 10s both";
	}
}
```

`animationSize` で文字の飛び散る大きさを指定できるようにしてみました。

txtsというclassの数だけfor文が回り、その中で乱数を2個ずつ発生させて、X軸・Y軸の行き先をランダムに決めます。その際に `animationSize` を使ってゴニョゴニョしています。 `Math.random()` だけだと、0〜1の間の乱数しか発生しないので、掛けたり引いたりしています。

変数 `keyframes` の部分では、その名の通り Keyfremes の形になるように整形しています。よく見ると、乱数をvw/vhの単位で利用しているので、 `animationSize` は100以内がいいかもしれません。元々50vw/50vh付近にテキストを配置しているので、100のとき、乱数の最大値が50になるはずなので、いい感じに画面ギリギリになるんじゃないかなぁとか思ったりしてます。計算違いしてたらごめんなさい。

そして、

```
styles.insertRule(keyframes, styles.cssRules.length);
```

この部分で、styleを生成しているらしいです。 `insertRule` の第2引数は省略可能らしいんですがIEだとダメっぽい？ので `styles.cssRules.length` で一応最後に挿入されるようにしています。

```
txts[i].style.left = i - txts.length / 2 + "em";
txts[i].style.animation = "move" + i + " 5s 10s both";
```

この部分で、文字の初期位置を設定したり、アニメーションを設定したりしています。

これは普通にstyleプロパティを書き足させてるだけなのでよくやることかと思います。

アニメーションの速度・ディレイはここで調整出来ます（激しさは前述の変数で調整）。

----

久しぶりに頭でイメージしたものを実装したので、楽しかったです。やっぱり出来たら嬉しいですねぇ。

最近進捗がない新ポートフォリオに使おうかな。
