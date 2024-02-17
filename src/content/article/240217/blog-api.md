---
title: ブログの記事情報を返すAPIを作ってみた
date: 2024-02-17
tags: IT
eyecatch: 
eyecatchEmoji: 🎉
description: 無趣味の戯言の記事情報が取得できるAPIを作って公開しました
---

こんにちは。だいちゃんです。

僕得でしかない、ブログ記事のタイトルやURL、ディスクリプションなどを取得できる [無趣味の戯言API](https://app.udcxx.me/document/blog-api/) をリリースしました！

## ブログAPI

このブログ[無趣味の戯言](https://blog.udcxx.me/)に掲載されている記事を[ポートフォリオ](https://udcxx.me/)とかに貼りたいと思っても、記事の情報を外から取得する術がなかったので、あらかじめ掲載する記事を決めて、固定リンクを貼るしか方法がありませんでした。

この方法だと、人力でリンクを差し替えない限り、最新の記事を紹介することができなかったので、最新記事も機械的に取得できるように、APIを用意することにしました。

ちなみに、2023年6月ごろまでは、[processmd](https://www.npmjs.com/package/processmd)というモジュールで記事を生成していて、こいつは `summary.json` という記事情報をまとめたJSONファイルも吐き出してくれていたので、そのJSONをパースするだけで簡単に記事情報を取得することができていました。

ただ、2023年6月ごろに、このブログをNuxt3にアップデートする際、同時に記事を管理するモジュールを[Nuxt Content](https://content.nuxt.com/) に移行したことで、記事がまとめられたファイルが生成されなくなったので、APIとして用意する必要がでてきた背景もあります。

* [Nuxt3へのアップデート | 無趣味の戯言](https://blog.udcxx.me/article/230617/update-to-nuxt3/)


## 特徴

自分がポートフォリオなどに記事へのリンクを掲載したいというモチベーションで作ったAPIなので、そこでの使いやすさを重視して設計しています。

* 1リクエストでの最大取得件数：50件
* offsetパラメーターで続きから取得可能。moreresponceプロパティで続きがあるかどうかの判定が可能。
* orderパラメーターにRAND（ランダム）を用意

1回のリクエストでは50件までしか取得できませんが、繰り返し実行することで全件取得も可能です。

また、記事をランダムに返す機能も用意しているので、最新記事だけではない紹介の仕方もできます。古い記事にもPVほしいですからね。


## 実装時の裏話的な

今回はちゃんと（？）仕様書を起点にコーディングするようにしてみました。

個人開発だとコーディング先行になってしまいがちですが、先に仕様を書き起こしておくことで、コーディング時に迷うことは少なくなったと思います。一方で、仕様書自体の詰めが甘くて、特にエラー処理周りではコーディング後にドキュメントにまとめる場面もあったので、これは成長の余地ありです。

あと、そもそもレンサバで動かしてるので、Nodeが使えず、JavaScriptで育った僕でも、こういうサーバーで捌く系の処理を作るときはPHPと対峙しなくちゃいけないので、PHPパワーが足りなくてめっちゃググりました。セミコロンないだけで動かないのマジ勘弁。


## 使用例

多分、僕以外にこのブログの記事情報を取得したい人はいないと思いますが、最後に一応、使用例も紹介しておきます。

### 古い記事から5件分取得する場合

👇️ リクエスト

```
https://app.udcxx.me/api/blog/?type=article&order=ASC&limit=5&offset=0
```

👇️ レスポンス

```
{
	"articles": [
		{
			"title": "特定の予定のみを別カレンダーにコピーするスクリプト",
			"url": "https://blog.udcxx.me/article/181208/gas-schedule-copy/",
			"tags": "IT GAS",
			"description": "こんにちは、だいちゃんです。",
			"eyecatch": "181208.jpg",
			"eyecatchemoji": "📄"
		},
		{
			"title": "【読書録】コンビニ人間",
			"url": "https://blog.udcxx.me/article/181210/konbini-ningen/",
			"tags": "Book",
			"description": "こんにちは、だいちゃんです。",
			"eyecatch": "181210.jpg",
			"eyecatchemoji": "📄"
		},
		{
			"title": "オリジナル香水「Dance」を1年以上使ってる話",
			"url": "https://blog.udcxx.me/article/190109/perfume-dance/",
			"tags": "Blog Vue IT GAS Life",
			"description": "こんにちは、だいちゃんです。",
			"eyecatch": "190109.jpg",
			"eyecatchemoji": "📄"
		},
		{
			"title": "お金の流れを整えてみました",
			"url": "https://blog.udcxx.me/article/190504/money-flow/",
			"tags": "Life Money",
			"description": "こんにちは、だいちゃんです。",
			"eyecatch": "190504.jpg",
			"eyecatchemoji": "📄"
		},
		{
			"title": "ポートフォリオサイトリニューアルしました",
			"url": "https://blog.udcxx.me/article/190616/portfolio-updated/",
			"tags": "Portfolio IT Life",
			"description": "こんにちは、だいちゃんです。",
			"eyecatch": "190616.jpg",
			"eyecatchemoji": "📄"
		}
	],
	"moreresponce": true
}
```

### 2番目に新しい記事を取得する場合

👇️ リクエスト

```
https://app.udcxx.me/api/blog/?type=article&limit=1&order=DESC&offset=1
```

👇️ レスポンス

```
{
    "articles": [
        {
            "title": "VSCodeにMinifyAllを導入してみた",
            "url": "https://blog.udcxx.me/article/240129/minifyall-in-vscode/",
            "tags": "IT",
            "description": "VSCode（Visual Studio Code）にMinifyAllという拡張機能を入れて使ってみました",
            "eyecatch": null,
            "eyecatchemoji": "👜"
        }
    ],
    "moreresponce": true
}
```

### ランダムな記事を1件取得する場合

👇️ リクエスト

```
https://app.udcxx.me/api/blog/?type=article&limit=1&order=RAND
```

👇️ レスポンス

```
{
	"articles": [
		{
			"title": "営業日数APIを公開しました",
			"url": "https://blog.udcxx.me/article/230908/workday-api/",
			"tags": "IT",
			"description": "営業日の日数などを返してくれるAPIを公開しました",
			"eyecatch": null,
			"eyecatchemoji": "🎉"
		}
	],
	"moreresponce": true
}
```

---

んで、API作っただけでAPI呼び出すポートフォリオ側はなにも触ってない。