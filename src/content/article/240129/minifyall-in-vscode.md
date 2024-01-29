---
title: VSCodeにMinifyAllを導入してみた
date: 2024-01-29
tags: IT
eyecatch: 
eyecatchEmoji: 👜
description: VSCode（Visual Studio Code）にMinifyAllという拡張機能を入れて使ってみました
---

こんにちは。だいちゃんです。

VSCodeに拡張機能 [MinifyAll](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall) を入れてみました。

## MinifyAll

[MinifyAll](https://marketplace.visualstudio.com/items?itemName=josee9988.minifyall)は、JavaScriptとかCSSとかをMinfyしてくれる拡張機能です。

例えば、こんな感じ。

```javascript
function main () {
    // コメント
    const hoge = 100;
    const huga = 50;
    let gosen = hoge * huga; // 5,000
    const element = document.querySelector('.gosen');
    element.innerText = gosen
}

main();
```

コメントなんかが削除されて、全体を解析した上で、結果に影響しない ~~無駄な~~ 定数・変数もできる限り排除されて、以下のような形で出力される。

```javascript
function main(){document.querySelector(".gosen").innerText=5e3}main();
```


JavaScriptのmangleもしてくれるので、ネーミングセンスに自信がない僕でも安心してリリースすることができる()

ただ、難読化としてはほとんど意味を成さないかなと思ってます。変数名・関数名がeとかfとかtとか意味を持たない文字になってるから、そこから得られるヒントがなくてちょっとめんどくさいけど、Devtoolとか使ってデバッグすれは結構わかるのが正直なところですね。

ちなみに、200行程度のプログラムだと、ファイルサイズが10KBから3KBに削減したので、圧縮の効果はあるかもです。そもそも膨大なプログラムじゃいないと恩恵は軽微でしょうけど。

ともあれ、毎日コード読むわけではないので、久し振りに読んだらなにがなんだかって感じになっちゃうので、これからはminifyを前提に、プログラムにはガッツリコメント残す運用もアリかもしれないな、と思うくらい気軽に使えて良かったです。特にnpmのセットアップもしなくていいのも楽でよき。


## 実行方法

コマンドパレットから `Minify this document and preserve the original ⛏` を実行して使っています。この実行方法だと、表示しているファイルをMinify後、別ファイルとして保存してくれるので、オリジナルのファイルを保持することができます。

設定は「Prefix Of New Minified Files」を「.min」に変えたくらいで、基本的にデフォルトで使っています。

ちなみに、中では [Terser](https://terser.org/) が動いてるらしく、Terserのオプションも指定できるらしいですが、結局なにも触ってないです。


--- 

MinifyAllを使った事例第一号として、kintoneで使える [サジェストプラグイン](https://udcxx.stores.jp/items/65b5cdf78e3e650ad6230d95) をリリースしました。

MinifyAllのお陰でオリジナルのソースコードにはゴリゴリコメントを残しつつも、プラグインにパッケージングするファイルからは余計な記述が省かれるので、万が一ソースコードを覗かれても恥ずかしさが半減する効果があります。

※ リバースエンジニアリングは禁止ですよ！