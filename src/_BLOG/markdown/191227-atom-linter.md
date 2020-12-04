---
title: Atomで構文チェックする linter の導入が難しかった話
date: 2019-12−27
tags: IT
eyecatch: 191227.png
description: AtomでWebコーディングの時に構文チェックをしてくれるパッケージをインストールする奮闘記
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

コーディング時のミスを減らすためには構文チェックが欠かせませんが、Atomでそのチェックを自動でしてくれる `linter` というパッケージが存在するのですが、インストールする際につまずいたのでメモ。ググって書かれた通りにやっても動かなかったので調べてみると、古い情報が多いようでした。

## 結論

いきなり結論です。htmlとcssさえチェック出来れば良いなら、下記4つのパッケージをインストールし、brewで `tidy` をアップデートすれば良いっぽいです。

* [linter](https://atom.io/packages/linter)
  * 構文チェックの本体
* [linter-ui-default](https://atom.io/packages/linter-ui-default)
  * チェックの結果を画面上に表示するためのパッケージ
* [linter-tidy](https://atom.io/packages/linter-tidy)
  * html用
* [linter-stylelint](https://atom.io/packages/linter-stylelint)
  * css用

（Homebrewがインストール済みのMacの場合）ターミナルで、

```
$ brew install tidy-html5
```

を実行すると、PC内の tidy がアップデートされるらしいです（詳しいことはわからん）

## linter

Atomで構文チェックといえば [linter](https://atom.io/packages/linter) が有名どころっぽかったのでインストールしました。

ただ、これ単体では画面表示などが出来ないので、何も考えずに下記もインストールしてください。

* [linter-ui-default](https://atom.io/packages/linter-ui-default)

ここまでで、構文チェックする **準備** が整いました。ここまでの情報は調べたらたくさん出てくるので問題なく済んでる方も多いと思います。

ここから先、言語ごとのパッケージをインストールしていくのですが、そこが原因でうまく動かなかったみたいです。

## つまづきポイント

ネット上の記事には、 htmlのチェックには「 **[linter-htmlhint](https://atom.io/packages/linter-htmlhint)** 」を入れようとか、cssのチェックには「 **[linter-csslint](https://atom.io/packages/linter-csslint)** 」を入れようとか書かれてるものが多いのですが、試してみたもののうまく動かず。

csslintの方は、古いせいでエラーを吐いちゃうらしいです。僕の場合も `Invalid response received from CSSLint, check your console for more details.` というエラーが出てチェックが全く機能していませんでした。なので、csslintの代わりに **linter-stylelint** を使うのがミソです。競合が怖いのでcsslintはアンインストールしておきます。

htmlhintは、うんともすんとも言わず、動いてるのか動いてないのかもわからない状況でした。ただ、htmlhintはhtml5に対応しておらず、使うなら **[linter-tidy](https://atom.io/packages/linter-tidy)** にしようぜってことらしいので試してみたところ、ちゃんと動いてくれました！

tidyはhtmlを整形するコマンドらしく、デフォルト？で入ってるらしいです？（わからん）ただ、古いままだとhtml5に対応していないのでアップデートさせる必要があるらしいです。単体でも転がってるみたいですが、面倒そうなのでHomebrewでインストールします。    
Homebrewのインストールは済んでる前提で、ターミナルで

```
$ brew install tidy-html5
```

を実行するだけでアップデートされます。

## I ♡ Atom

というほどでもないけど（爆弾発言）

周りにはVS Code勢が圧倒的に多くなってきていますが、めげずにAtomを使い続けていこうと思っています。もっと軽くならないかなぁ。
