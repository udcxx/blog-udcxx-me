---
title: フィールドコードからフィールドIDを取得する関数を公開した
date: 2025-07-08
tags: kintone IT
eyecatch: 
eyecatchEmoji: 🧰
description: kintoneで、フィールドコードからフィールドIDを取得するJavaScript関数をGithub Gistで公開しました。
---

こんにちは。だいちゃんです。

kintoneのカスタマイズとかプラグインを開発してると、DOM触って表示をイジりたいシチュエーションが出てくると思いますが、kintone JavaScript APIではそれはできないんですよね...

ということで、kintoneの非公式関数を使って、フィールドコードとフィールドIDを変換するJavaScript関数を作成・公開しました。

公式にサポートされてるものではないので、いつか使えなくなるかも。

## コード

Github Gistで公開してみました。

👉️ [https://gist.github.com/udcxx/629c4d1bfe9746e56a89e62cbe796aea](https://gist.github.com/udcxx/629c4d1bfe9746e56a89e62cbe796aea)

## 使いどころ

そもそも、なんでフィールドIDが必要なのかを簡単に説明します。

kintoneでは、画面上のElementのClass名にフィールドIDが付与されてます。

* `.field-{フィールドID}` ・・・フィールド全体の要素（例： `.field-7654321` ）
* `.label-{フィールドID}` ・・・フィールド名の要素（この下に span で囲まれてフィールド名が記載されます）
* `.value-{フィールドID}` ・・・フィールドの値が入る要素（フィールドの種類によってこの下の構造が変わります）

逆に、フィールドコードはClass名などには出てこないので、フィールドIDが得られないとDOMをイジることが難しいわけです。

ということで、今回作った関数を使って、フィールドIDを取得し、上記のように `.field-` などと組み合わせることで、該当フィールドコードのDOM要素をイジることができるようになります。

---

お小遣い稼ぎのために、kintoneのカスタマイズ・プラグインを作って売ったりしています。   
今回のコードもそれらを作る中で「関数化しちゃえば楽じゃん！」と思って作りましたw

* [udcstore](https://udcxx.stores.jp/)

コードを書く方は [Github Gist](https://gist.github.com/udcxx/629c4d1bfe9746e56a89e62cbe796aea) のコードを参考にして貰えたら幸いですし、コードを書かない方は [ストア](https://udcxx.stores.jp/) から購入したり、 [お問い合わせ](https://udcxx.me/contact/?sub=TOOL) から開発の相談なんかもいただければ嬉しいです。

ってめっちゃ宣伝くさくなっちゃった...