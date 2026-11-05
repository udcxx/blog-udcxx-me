---
title: kintoneからメールワイズの検索画面を開く
date: 2023-09-26
tags: kintone IT
eyecatch: 
eyecatchEmoji: 🔍
description: メールワイズの検索をkintoneの画面上から行えるようなカスタマイズを実施しました。
---

こんにちは、だいちゃんです。

日頃からメールワイズとkintoneを行ったり来たりするので、kintoneの画面上からメールワイズの検索結果画面を立ち上げられないかなーと思って調査してみました。

## 結論

`mw.cgi?` に対して、`CSRFTicket`・`Page`・`WID`・`BS`・`VID`・`Keyword` を持った状態でPOSTすることで、検索結果画面を表示できそうです。

なので、kintoneの画面上にformを作って、6つの値を `https://(subdomain).cybozu.com/m/mw.cgi?` にPOSTすることで、検索窓を作ることはできました。

ただ、`CSRFTicket` が定期的に変動するランダムな文字列になっているため、次のような動きをするChrome拡張機能の作って、チケットをkintoneのアプリに保存し、POSTするタイミングでレコードとして存在する最新のチケットを使うことで回避可能でした。

1. URLが `https://(subdomain).cybozu.com/m/mw.cgi?formkeyupdate=true` だったら 2. 以降の処理を実行する
2. `document.getElementsByName('CSRFTicket')[0].value` で `CSRFTicket` を取得する
3. kintone上に用意したアプリにレコードを追加する

★ ブックマークに保存してるメールワイズのURLを 1. のものに変えておくことで、手間なく裏で勝手に新しいチケットを取得しててくれます。


## メールワイズの検索仕様

### URL

Google検索みたいに、URLに検索クエリも持つタイプの検索仕様であれば簡単に実装できたのですが、メールワイズは一筋縄ではいかなさそうです。

* Google検索などでは、 [https://www.google.com/search?q=無趣味の戯言](https://www.google.com/search?q=%E7%84%A1%E8%B6%A3%E5%91%B3%E3%81%AE%E6%88%AF%E8%A8%80) のように、URLに検索キーワードくっつければ動くので楽なのに...

調べた感じ、検索のたびに `st` の値が変動することから、検索キーワードとか絞り込み条件をどこかに保持してて、その条件のIDのようなもので検索結果を表示しているような動きに見えました。（st = search ticket...？）

となると、検索条件を投げてIDを返してくれるAPIのようなものが用意されていない限り、外から新しい検索条件を指定するのは難しそうです。

### 画面上の検索ボックス

次に、画面上部にある検索窓のHTML要素を見てみました。

Form タグで作られていて、`CSRFTicket`・`Page`・`WID`・`BS`・`VID`・`Keyword` を `mw.cgi?` にPOSTして、新しい `st` が発行され、検索結果を表示することができるようになるようです。

`WID` はメールスペースのIDで、`BS` はアプリケーションのID、`Keyword` は読んで字の如く検索キーワードを与えてあげれば良さそうでした。

これは憶測ですが、`CSRFTicket` は定期的に更新されるランダムな文字列なので、~~認証用のチケットとして利用しているかも。~~

> **2023/10/20 追記：**    
> クロスサイト・リクエスト・フォージェリっていう脆弱性を対策するための認証トークン、らしい。と認識しました。    
>     
> [安全なウェブサイトの作り方 - 1.6 CSRF（クロスサイト・リクエスト・フォージェリ） | IPA 独立行政法人 情報処理推進機構](https://www.ipa.go.jp/security/vuln/websecurity/csrf.html)


その他はちょっと何やってるかわかりませんでした。ちなみに、僕の環境のメールワイズでは、`Page` には `FtsMailSearch` が、`VID` は空が指定されていました。


## Chrome Extention

kintoneのカスタマイズだけで終わると思ってたのに、Chromeの拡張機能を作るハメになるとは...

しかも、一筋縄ではうまくいかず、content scriptsから普通にkintoneにレコードを追加しようとすると、クロスドメイン規制で怒られちゃいました。

最新のマニフェスト（v3）の日本語の情報が少なくて泣きそうでしたが、backgroundスクリプトのservice workerからfetch()を使うことでクロスドメインを回避してPOSTとかを実行することができました！

service workerからだとしても、XMLHttpRequestだとダメみたいです。

* [Manifest - background - Chrome for Developers](https://developer.chrome.com/docs/extensions/mv3/manifest/background/)
* [fetch() - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/fetch)


---

という感じで、kintoneのポータル画面に、メールワイズの検索ボックスがあったら便利かなーという思いつきから、メールワイズの検索仕様を調査したり、Chromeの拡張機能を作ったりすることになるとは想像もしていませんでしたw

ただ、初知りの情報は知的好奇心を満たしてくれるし、Chromeの拡張機能はずっと作ってみたかったけど重い腰が上がらずに触れていなかったので、結果いい機会になりました。