---
title: GA4へ対応しました
date: 2022-03-21
tags: Blog Nuxt IT
eyecatch: 220321.png
eyecatchEmoji:
description: Nuxt.jsで制作している「無趣味の戯言」をGoogle Analytics 4へ対応させました。
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

Google Analyticsがバージョンアップし、 [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4) になる関係で、従来のタグから置き換える必要があるらしいです。（これまでの計測方法は、 2023/7/1 で [データ処理が終了するとのアナウンス](https://support.google.com/analytics/answer/11583528) がありました）

ということで、このブログもGA4に対応させるべく改修したので、やったことメモ。

## やったこと

ざっくり下記の通りです。

* GAのダッシュボード側で、GA4を有効にして、gtag のIDをゲットする
* nuxtで、モジュール `@nuxtjs/google-gtag` をインストールする
* これまで使っていた `ga.js` プラグインを読み込まないようにする

これまではUAタグを使っていましたが、今回からはgtagを使うようになります。

GA側での設定は [公式のチュートリアル](https://support.google.com/analytics/answer/9744165?hl=ja&ref_topic=9303319) を参照ください。僕は気がついたら出来てました←

## @nuxtjs/google-gtag

下記のコマンドを実行します。

```
$ npm install @nuxtjs/google-gtag
```

インストールが成功したら、 `nuxt.config.js` の `modules` 内に下記を追記します。

```
modules: [
  [
      '@nuxtjs/google-gtag',
      {
          id: secretInfos.gtag.id,
          // debug: true
      }
  ]
],
```

気にしすぎですが、僕はGAとかAdSenseとかのidは `secret-infos.js` というファイルに纏めるようにしています。結局ビルド時に展開されてHTMLに埋め込まれちゃうんだけどね☆

なので、普通に使う時には `secretInfos.gtag.id` の代わりにAnalyticsの設定画面からゲットしたgtagのIDを直接記述してください。

`debug: true` を使うとlocalhost上でも発火してくれるので、アップ前に動作確認ができます。確認後はコメントアウトしちゃいました。

---

## ついでに行ったアップデート

gtagのモジュールをインストールする際に、npmからvulnerabilityのエラーで怒られました。調べたところ、使ってるモジュールの内部で脆弱性のあるものが含まれているらしいです。この際なので ~ついでに~ 修正しておきましょう。

`$ npm audit fix` というコマンドを叩くとnpmさんが自動修復してくれます。僕の場合、3分の1くらいは修復できました。

それでもまだ脆弱性が残っていたので、さらに、 `$ npm audit` というコマンドを叩きます。このコマンドでは、どのモジュールのどの部分に脆弱性があるかを教えてくれるのですが、ざっくり見渡すと [cpx](https://www.npmjs.com/package/cpx) モジュールの比率が高かったので、ついでに [cpx2](https://www.npmjs.com/package/cpx2) へ移行も行いました。

cpx2 は cpx からフォークしていて、cpxのコマンドがそのまま使えるらしいので、cpxをremoveして、cpx2をインストールするだけで完了。楽ちん。

vulnerabilityのエラーの大半は自動修復と cpx2 への移行で消えました。まだ若干残ってるけど見ないふり... なんかnuxt内部にもあるような...
