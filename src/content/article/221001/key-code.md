---
title: ブラウザによってキーのコードが異なることがある
date: 2022-10-01
tags: kintone IT
eyecatch: 221001.jpg
eyecatchEmoji:
description: ブラウザによって、入力されたキーを判定するコードが異なるらしく、解決するために悩んだことメモ。
---

こんにちは、だいちゃんです。

[Handling Keyboard Shortcuts in JavaScript](http://www.openjs.com/scripts/events/keyboard_shortcuts/) というライブラリを利用して、キーボードショートカットを追加するJavaScriptの簡単なプログラムを作っていたのですが、Firefoxでは動くのにChromeでは動かない現象にぶち当たってしまったので、解決までに得た知識をメモ。

## 結論

`onkeydown` イベントで `187` のコードを受け取ったときに `;` キーが押下されたように無理やり読み替えさせる処理を追記したら動くようになりました。

詳しく調べきれてないけど、キーボードレイアウトの違いとかでも差異出そうな予感...


## Handling Keyboard Shortcuts とは

何が起こったのかをお話する前に、まずは今回利用したライブラリの紹介を。

今回利用した [Handling Keyboard Shortcuts in JavaScript](http://www.openjs.com/scripts/events/keyboard_shortcuts/) は、キーボードの入力を受けて処理をする、いわゆるキーボードショートカットを簡単に実装できるライブラリ。（ライブラリ？）

Handling Keyboard Shortcutsのソースを読み込んだ後に、以下のような処理を書いておくと、 `Ctrl` + `Shift` + `X` を同時押しでアラートが表示できちゃいます。めっちゃ直感的に書けて良い。

```
shortcut.add("Ctrl+Shift+X",function() {
	alert("Hi there!");
});
```

僕のブログとかポートフォリオにも埋め込みたいと思っちゃうレベルで、簡単に利便性上げられそうな予感がします。


## ; が反応しない

今回、あるWebサービスにキーボードショートカットを追加しようと、上記ライブラリを使って以下のようなスクリプトを書いてました。

```
shortcut.add("Ctrl+;",function() {
	alert("Hi there!");
});
```

**ブラウザ既定のショートカット（ページズーム）と競合するのは仕様上見逃してください**

すると、Firefoxでは想定通りアラートが出るのに、Chromeだと普通にページズームしちゃう事態に。

ブラウザによって、ショートカットの処理のタイミングが違うのかなとか考えたのですが、いろいろ調べてみると、どうやら入力されているキーのコードが異なっているようでした。

ライブラリ側では、 `;` は、コード `59` の入力を期待しているようです。んで、Firefoxは `;` キーを押したときに `59` のコードを返すのだけれど、Chrome系は何故か `187` を返しているために、 `;` の入力があったと判定されなかったことが原因で、上記の処理が発火しなかったっぽいです。

何故異なるかとか、Firefoxが `187` を返すことがあるのかとかまでは調べきれてません...w

とにかく、Chromeが `;` のときに `187` を返すことがわかったので、ライブラリ側を改造して `187` は `;` だよーってことを覚えさせる力技で挑みました。


## やったこと

48行目あたりに以下を追記する簡単なお仕事。

```
if (code == 187) character = ";";
```

手元で試せる限りは試したのでヨシッ！

Macとか USキー配列のPCとかだとどうなるのかまでは調べきれてないです。


---

ちょっと込み入ったことすると、ブラウザ間の挙動差に悩まされがちですよね。

そうこうして作ったスクリプトは [こちら](https://udcxx.stores.jp/items/6337052ec808a4299283ba9b) にあります。

参考

* [キーコード一覧 【JavaScript 動的サンプル】](https://web-designer.cman.jp/javascript_ref/keyboard/keycode/)
* [Element: keydown イベント - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Element/keydown_event)
