---
title: フィールド一覧をリリースしました
date: 2023-12-19
tags: kintone IT
eyecatch: 231219.jpg
eyecatchEmoji: 👓
description: kintone アプリに配置したフィールドのフィールド名やフィールドコード、計算式などを一覧で確認できるツールをリリースしました！
---

こんにちは、だいちゃんです。

kintoneアプリに配置したフィールドの情報を一覧で確認することができる [フィールド一覧](https://app.udcxx.me/field-info/) というツールを公開しました🎉

[![](/images/231219.jpg)](https://app.udcxx.me/field-info/)    
[▲ フィールド一覧の結果画面](https://app.udcxx.me/field-info/)

## フィールド名・フィールドコード

kintoneで計算式を組んだり、カスタマイズを作ったりするときに必要になる「フィールドコード」ですが、各フィールドの設定画面から確認するしかなく、画面上から一覧で見ることができないため、ちょっと不便だったりします。

そこで、フィールド名とフィールドコードの対応付けが一覧で確認できるツールを作りました！

[フィールド一覧](https://app.udcxx.me/field-info/)

このツールを使うことで、いちいちフィールドコードとフィールド名の組み合わせるを何処かにメモっておいたり、コードや計算式を書く度にアプリの設定からフィールドの設定状況を確認する必要も不要になります。


## 選択肢や計算式の表示も

せっかくなので、選択式フィールド（ドロップダウンやチェックボックスなど）の場合は選択肢を、自動計算が設定されているフィールドの場合は計算式もそれぞれ表示するようにしてみました。

テーブル内のフィールドであることも、見た目で分かりやすいようになっているので、カスタマイズや計算式を作るとき以外にも、配置しすぎたフィールドの棚卸しや、設定状況の把握、バックアップなんかにも活用できるのではないでしょうか...！


## 仕組み

kintone REST API のフィールドを取得するAPIを利用しています。

[フィールドを取得する - cybozu developer network](https://cybozu.dev/ja/kintone/docs/rest-api/apps/form/get-form-fields/)

実行には、APIトークンを入力してもらう必要があります。

もちろん、入力いただいたAPIトークン・サブドメイン・アプリIDや、それらを使って得たフィールドの情報は一切保存していません。

が、心配であれば、アプリに登録されている情報を閲覧できないように **レコード追加権限だけ付与したAPIトークン** を利用することをおすすめします。

---

今回のツールは、特に自分のために作ったところがあって、自分が楽になると思うとモチベに繋がるし、達成感あっていいね。