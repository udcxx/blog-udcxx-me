---
title: MacBookの設定備忘録
date: 2023-04-20
tags: IT
eyecatch:
eyecatchEmoji: 🍎
description: 久しぶりにMacBook、初めてのM1をセットアップしたときに、やったことなどをまとめておきます。
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

久しぶりに個人用のMacを購入しました。久しぶりなのに加えて、M1 Macは初めて触るので、セットアップ中、所々で躓いてしまいました。そこを踏まえて、やったことを記録しておきます。

ちなみに、思いつきでいろいろやったので、順番には特に意味はないです。

## Google日本語入力のインストールに苦戦した

Google日本語入力は、M1にネイティブ対応していないので、インストール時に、自動でRosetta2のインストールを提案してくれました。

ただ、RosettaとGoogle日本語入力の両方インストールしたのに、キーボード > すべての入力ソース にGoogle日本語入力が出てきませんでした。PC再起動してもダメ。

一度アンインストール→PC再起動→インストール→PC再起動で使えるようになりました。再起動大事ですね。


## Node.jsのインストールに苦戦した

Node.jsはバージョンを変えられるようにしておくと便利なので、nodebrew経由でのインストールを行います。が、M1は、M1用にビルドされたパッケージがないらしく、 `nodebrew install` コマンドでのインストールに対応していないようです。

代わりに `nodebrew compile` コマンドを使うべしとの記事があったので、 `nodebrew compile v14.21.3` と実行してみたのですが、うまくいかず。

結局、[ここ](https://nodejs.org/dist/v14.21.3/) からソースコードを落としてきて、 `/Users/{user}/.nodebrew/src/v14.21.3` のなかに入れてあげた上で、 `nodebrew compile v14.21.3` を実行する必要があるみたいでした。

* [Apple SiliconのMacにnodebrewでNode.js14をインストールする方法 - kamoqq.info](https://kamoqq.info/post/how-to-install-nodejs14-on-apple-silicon-mac-with-nodebrew/)


## Git

Macってデフォルトで **Apple Git** が入ってるんですね！ｼﾗﾅｶｯﾀ


## zsh

今まで使っていた.zshrcを見つけられなかったので、下の記事を参考に、新しく作成しました。

* [【.zshrc解説】コピペで簡単zshカスタマイズ【設定方法】](https://suwaru.tokyo/%E3%80%90-zshrc%E8%A7%A3%E8%AA%AC%E3%80%91%E3%82%B3%E3%83%94%E3%83%9A%E3%81%A7%E7%B0%A1%E5%8D%98zsh%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA%E3%80%90%E8%A8%AD%E5%AE%9A%E6%96%B9%E6%B3%95/)

## ~~RicyDiminished~~

エディタ用のフォントとして `RicyDiminished` をインストールしていましたが、いつの間にか非推奨になっていました...

* [プログラミング用フォント Ricty Diminished](https://rictyfonts.github.io/diminished)

なにかオススメのコーディング用フォントがあれば教えてください🧐


## そのほか、インストールしたアプリたち

### ブラウザー

-  Chrome
-  Firefox
-  Brave

[Arc](https://arc.net/) も試してみたいけど、ブラウザ入れすぎ？

### エディタ

- Zed
- VSCode
- Cot Editer

Cot Editerは、[ここ](https://coteditor.com/archives) からnon Apple Store版をダウンロードしました。

### 便利系

- Alfred
- Googleドライブ
- Slack

AlfredのPowerpackライセンスが、自分が持っているのはAlfred 3専用のものだったので、Alfred5用のライセンスを購入し直しました。Alfredの設定は、 [前回のブログ記事](https://blog.udcxx.me/article/210226/alfred-re-setting/) を参考に行いました。


---

過去の記事が結構役立ってるので、ブログやっててよかったと痛感してます。

* [AlfredのPowerpackをやっと購入！](https://blog.udcxx.me/article/201114/alfred-powerpack/)
* [会社PCの設定備忘録](https://blog.udcxx.me/article/210306/pc-setup-memo/)
    
※ 内容が古くなってるものも多いので、ご注意を…