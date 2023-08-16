---
title: 【GAS】毎日自動で記事を投下するbotを作る(1)
date: 2020-03-17
tags: IT GAS
eyecatch: 200317.png
---

こんにちは、だいちゃんです。

たまにAnalyticsを覗くのですが、僕のブログの場合ツイッター経由での流入が半分くらいを占めているようです。

ということは、ツイッターに記事を晒す機会を増やせばPVに繋がりそうです。たとえ新着記事じゃなくても、毎日1記事ずつツイッターで宣伝すれば何かしら結果が出そうな予感がしました。でもそれを自力で頑張ってみようと思った瞬間、自動化したいなって気持ちになったので実践してみました。

## 全体的な仕組み

全体的な仕組みとしては、こうです。

* Nuxt.jsが勝手に作ってくれるsummary.json（記事の一覧になってる）をGASが取りに行く
* それを元にGoogleスプレッドシートで記事一覧を作る
* その中からランダムに1記事を選ぶ
* IFTTTのwebhookを利用してツイートする

上記を時間主導型のトリガーで動かせば、ランダムに選ばれた記事をツイートするbotが作れそうです。

## 実践！

早速作ってみます。

長くなるので数日に分けて公開予定です！第一弾は、summary.jsonをGASが取りにいけるように、諸々設定します。

## summary.jsonをサーバー上にアップする

まずは、Markdownをjsonに変換するときに勝手に作ってくれる `summary.json` がレンサバ上にないと取得できないので、記事をアップする際に一緒にアップロードしてくれるように細工しておきます。

[ftp-deployというnpmパッケージでアップロードの処理](https://blog.udcxx.me/article/191111/ftp-update/) をさせていますが、distというディレクトリ配下のみを対象にしているので、dist直下に summary.json のコピーを作成します。

OS間でコピーのコマンドが異なるのでそれをいい感じにしてくれる `cpx` というパッケージを使います。

```
npm install --save-dev cpx
```

インストールが完了したら、 `package.json` にscriptを書き足します。

```
"scripts": {
  "copy": "cpx src/_BLOG/json/summary.json dist",	// ←追加
  "blog": "run-s md generate copy upload"			// ←copyを追記
},
```

僕は `blog` という名前のscriptを叩くだけで、Markdownの変換・Nuxt.jsによるページのgenerate・FTPアップロード を全て処理してくれるようにしています。そこに今回 `copy` というscriptを追加することで、アップロードの前に dist ディレクトリへ summary.json のコピーを作成してくれるようにしました！

-----

今回は下準備だけで終了！

* [（1）summary.json を更新のたびにサーバーに上がるように変更した回](https://blog.udcxx.me/article/200317/gas-blog-tweet-1/)←いまここ
* [（2）サーバー上にあるJSONデータの中身からスプシに一覧表を作る回](https://blog.udcxx.me/article/200318/gas-blog-tweet-2/)
* [（3）GASからIFTTTを使ってツイートする回](https://blog.udcxx.me/article/200319/gas-blog-tweet-3/)
