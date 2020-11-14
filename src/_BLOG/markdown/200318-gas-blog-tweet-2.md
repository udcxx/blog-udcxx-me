---
title: 【GAS】毎日自動で記事を投下するbotを作る(2)
date: 2020-03-18
tags: Blog Vue IT GAS
eyecatch: 200318.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

[昨日に引き続き](https://blog.udcxx.me/article/200317/gas-blog-tweet-1/) 、GASによる自動過去記事ツイートBotを実装していきます！

summary.jsonがサーバーにあがるようになったので、今回はGASを使ってjsonを拾いに行き、スプレッドシート上に成形させる部分を実装していきます！

## いきなりコード

```
function getArticleList() {
  var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/**スプシのIDみたいなやつ**/';
  var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  var sheet = spreadsheet.getSheetByName("シート1");

  var summaryJsonUrl = '**jsonが置かれてるURL**';
  var json = UrlFetchApp.fetch(summaryJsonUrl).getContentText();
  var jsonData = JSON.parse(json);

  for (var i = 0; i < Object.keys(jsonData['fileMap']).length; i++) {
    var dir = Object.keys(jsonData['fileMap'])[i];
    var cnt = jsonData['fileMap'][dir];

    sheet.getRange(i + 1, 1).setValue(dir);
    sheet.getRange(i + 1, 2).setValue(cnt['title']);
    sheet.getRange(i + 1, 3).setValue('https://blog.udcxx.me/article/' + cnt['base'].replace('-','/').replace('.json','') + '/');
  }
}
```

## ちょこっと解説

### 2〜3行目

GASでスプシを扱う時の必須の設定で、ある意味おまじないですね。

スプシのIDは、スプシを開いた時のURLから拾えます。 edit#gid=0 みたいなやつは無視で大丈夫です。

### 5〜7行目

JSONデータを取得し、JS（GAS）上で扱えるようにパースしてます。

`**jsonが置かれてるURL**` には、summary.jsonのアドレスを置き換えてください。

### 9行目以降

あとは、JSONデータの中身の分だけfor文を回して繰り返し処理をしていきます。

JSONは連想配列になっているため、数字で「何番目！」みたいな指定が出来ないので、 `Object.keys()` というメゾットを使ってfor文内でも使えるようにしています。

参考： [Object.keys() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

例えば、下記は `filemap` という配列の `i` 番目のキー（連想配列のタイトルみたいなやつ）を `dir` という変数に代入し、その中身（今回の場合その中身も配列になってます）を `cnt` という変数に代入しています。

```
var dir = Object.keys(jsonData['fileMap'])[i];
var cnt = jsonData['fileMap'][dir];
```

dir が記事ごとのキーになっていて、 cnt に記事のタイトルやタグ、アイキャッチ画像のファイル名などが入っています。

あとは、この cnt という配列から必要な情報をスプレッドシートに setValue を用いて書き込んでいきます。

URLはすぐ使えるようにドメインもひっつけてスプシに書き込ませています。

-----

ここまでで、サーバー上にあるJSONデータからスプレッドシートへデータの整理が出来ました。

あとは、これをベースにツイートするだけです！

ここまでのまとめは下記からどうぞ〜

* [（1）summary.json を更新のたびにサーバーに上がるように変更した回](https://blog.udcxx.me/article/200317/gas-blog-tweet-1/)
* [（2）サーバー上にあるJSONデータの中身からスプシに一覧表を作る回](https://blog.udcxx.me/article/200318/gas-blog-tweet-2/)←いまここ
* [（3）GASからIFTTTを使ってツイートする回](https://blog.udcxx.me/article/200319/gas-blog-tweet-3/)
