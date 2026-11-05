---
title: 11日連続でkintoneアプリなどを作って売る
date: 2024-10-31
tags: kintone IT
eyecatch: 
eyecatchEmoji: 🎃
description: kintoneのアプリやJavaScriptカスタマイズを大量に作って販売しました。
---

こんにちは。だいちゃんです。

諸事情により会社を辞めて無職になったので、あり余った時間を使って、1日1つ、11日間連続でkintoneに関するなにかしらを作って自分のストアで発売する、というチャレンジをしてみました。

## 作ったもの一覧

**アプリテンプレート**
* [採用管理](https://udcxx.stores.jp/items/672304ea3ef3060287a25dc6)
* [給食レシピ](https://udcxx.stores.jp/items/67205d767c8691083e4db66c)
* [アプリ作成依頼箱](https://udcxx.stores.jp/items/671b44a1e7c5ab02be0f3a64)
* [補助金・助成金アプリ](https://udcxx.stores.jp/items/671891b8720e9806544ced36)
* [業務委託先管理](https://udcxx.stores.jp/items/671742349d83270d512e360b)
* [協賛記録](https://udcxx.stores.jp/items/671601efa517630cac547c92)

**JavaScriptカスタマイズ**
* [一覧背景色指定カスタマイズ](https://udcxx.stores.jp/items/6721a96010fe3900b9def4bc)
* [表示間隔縮小カスタマイズ](https://udcxx.stores.jp/items/672199af467cc703ba47ae97)
* [URLパラメータで初期値を設定するカスタマイズ](https://udcxx.stores.jp/items/6719a57d243a750bfd31702d)
* [レコード再利用ショートカット](https://udcxx.stores.jp/items/6717600bb354bf00adf4cbd6)

**カスタマイズ付きアプリテンプレート**
* [URL短縮アプリ](https://udcxx.stores.jp/items/6721d5e8427a88044020f70b)


## 作ったもののちょこっと解説

全部はちょっとボリューミーなので、作ったもののなかから一部だけ、ちょっと詳しく紹介します。ほとんどタイトルどおりですが...

### 一覧背景色指定カスタマイズ

[https://udcxx.stores.jp/items/6721a96010fe3900b9def4bc](https://udcxx.stores.jp/items/6721a96010fe3900b9def4bc)

JavaScriptカスタマイズです。

よくある条件書式プラグインは、プラグインの設定画面から背景色と、その背景色にする条件を設定することが多いと思いますが、このカスタマイズでは、`JS_INDEX_BG_COLOR` というフィールドコードに指定したフィールドの値に応じて色を変えるという設計にしています。

また、10色限定ですが、日本語で色の指定もできるので、文字列(1行)に直接 *「赤」のように* 色の名前を入力したり、自動計算を使って他のフィールドの値に応じた色にしたり、ドロップダウンフィールドで色を選ぶことも可能です。

さらに、16進数カラーコードで指定することもできるので、あらかじめ用意された10色以外の色にすることもできます。


### 表示間隔縮小カスタマイズ

[https://udcxx.stores.jp/items/672199af467cc703ba47ae97](https://udcxx.stores.jp/items/672199af467cc703ba47ae97)

こちらもJavaScriptカスタマイズです。

kintoneって、良くも悪くも余白がしっかり取られてて、見やすい反面ちょっと間延びしてるようにも感じてしまいまして。とくにレコード一覧は1つの画面内に多くの情報を表示して、ざっと眺めたいときもあるので、paddingを削る処理をカスタマイズで追加しました。

前述の[一覧背景色指定カスタマイズ](https://udcxx.stores.jp/items/6721a96010fe3900b9def4bc)とも組み合わせて使えるので、一覧画面でたくさんのデータをざっと眺めることが多い方には、両方導入することもおすすめです。


## アプリ作成時に使ったツール

アプリにどんなフィールドを配置すべきかは、自分で開発した [RECITONE](https://app.udcxx.me/recitone/) というツールを使って決めました。

[RECITONE](https://app.udcxx.me/recitone/) は、作りたいアプリの詳細を入力するだけで、AIが必要と考えられるフィールドを提案してくれるツールです。このツールのお陰でアプリを量産できたと思っています。

あと、普通にChatGPTとかでリサーチもしましたし、カスタマイズ処理もAIといっしょに書きました。

---

kintoneやWebについてなら、なにかお役に立てるかもしれません。[お仕事ください](https://udcxx.me/contact/)。