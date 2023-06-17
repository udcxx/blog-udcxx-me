---
title: 【GAS】毎日自動で記事を投下するbotを作る(3)
date: 2020-03-19
tags: Blog Vue IT GAS
eyecatch: 200319.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

[昨日に引き続き](https://blog.udcxx.me/article/200318/gas-blog-tweet-2/) 、GASによる自動過去記事ツイートBotを実装していきます！

今日は実際にツイートする部分を実装していこうと思います。

## IFTTTの設定

本来なら、ツイートする為にはTwitterのAPI申請をしなければいけないのですが、それがめちゃくちゃめんどくさいです。途中で諦めたことが3度ほどありますｗ でも今回使うIFTTTなら、めんどうな申請無しでツイートすることができます！IFTTTは他にもWebサービス同士を連携させることが出来るので他にも色々使ってみたいです！

ツイッターとの連携が済んでる前提で、下記を行います。

* 右上にあるプロフィール画像をクリックして出てくるメニューから「Create」を選択
* 「if」の後ろにある＋マークをクリック
* 「Webhook」→「Receive a web request」の順に選んでいく
* 「Event Name」は適当なものにしておきます（メモっておいてください）
* 今度は「this」をクリック
* 「twitter」→「Post a tweet」の順に選ぶ
* ツイート内容を決める画面になるので、一旦「TweetText」の中を全部消し、 「Add ingredient」を押して「{{value1}}」を選択。TweetTextの中が `{{value1}}` だけになってればOK
* トップに戻り、右上にあるプロフィール画像をクリックして出てくるメニューから「My service」を選択
* 「Webhook」を探してクリック→右上の「Documentation」をクリック
* Your key is:の後ろの部分をメモっておく

参考： [TwitterのAPI申請なんてやりたくない！GASからIFTTTを経由してTwitterにツイートを投稿してみよう - ポンコツエンジニアのごじゃっぺ開発日記。](https://www.pnkts.net/2019/09/23/gas-tweet-by-ifttt)

## GASからIFTTTへhookを投げてツイートする

では実際にGASからIFTTTを通してツイートする部分を実装していきます！

```
function postTweet(contents) {
  var key = '**上記でメモったYour keyってやつ**';
  var eventName = '**上記でメモったEvent Nameってやつ**';

  var url = 'https://maker.ifttt.com/trigger/' + eventName + '/with/key/' + key;
  var data = {'value1':contents};
  var headers = {
    "Content-Type": "application/json"
  };
  var options = {
    'method' : 'post',
    'headers' : headers,
    'payload' : JSON.stringify(data),
  };
  UrlFetchApp.fetch(url,options);
}
```

postTweetという関数に、ツイートしたい内容を引数で渡してあげるだけで簡単にGASからツイートできるようになりました！

ここで、下記のようなコードを書いて動かしてみれば、実際の動きを確認することができます。

```
function testTweet() {
  postTweet('テスト\nツイートです。\n\n#テストツイート')
}
```

これでちゃんとツイートされると結構嬉しいです（ニヤニヤ

## ツイート内容を生成する

あとは、スプシの中身からランダムで記事を選んで、ツイートされる内容を自動で作る部分を実装していきます！

```
function makeTweet() {
  var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/**スプシのIDみたいなやつ**/';
  var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  var sheet = spreadsheet.getSheetByName("シート1");

  var header = [
    '&#x1f38a; ブログやってますっ &#x1f38a;',
    '&#x1f38a; ブログの紹介 &#x1f38a;',
  ];

  var RowLength = sheet.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  var rm_atcl = Math.floor( Math.random() * RowLength ) + 1;
  var rm_head = Math.floor( Math.random() * header.length );

  var title = sheet.getRange(rm_atcl, 2).getValues();
  var link = sheet.getRange(rm_atcl, 3).getValues();

  var tweet = header[rm_head] + '\nブログの記事をランダムでツイートしてます！今日の記事はこちら▼\n\n' + title + '\n' + link + ' #無趣味の戯言';
  sheet.deleteRows(rm_atcl);
  postTweet(tweet);
}
```

どういう処理になっているかというと、、、

### ver header について

配列に見出しになるワードを入れてます。この中からランダムで1つ選ばれる想定です。上記コードでは2つだけですが、実際は8パターンくらい用意しています。 **残りのパターンはツイートをおたのしみに（笑）**

### var RowLength 〜 var rm_head の行について

`RowLength` には、A列の何行目までデータが入っているか＝行数が入ります。

`rm_atcl` と `rm_head` にはそれぞれ、記事選定用・見出し選定用の乱数が入ります。仕組みとしては、 `Math.random()` 関数を利用することで出来るらしいです。詳しくは下記サイトの「2 つの値の間のランダムな整数を得る」を参照してください ~~（丸投げ）~~

[Math.random() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

### sheet.deleteRows(rm_atcl) について

`sheet.deleteRows(rm_atcl)` は、rm_atcl で選ばれた行を **まるっと削除する関数** です。

記事数が少ないので、毎日全記事からランダムに選んだとしても、例えば50記事しか無ければ 1/50 の確率で **翌日も連続して同じ記事がツイートされてしまいます。**

それでも悪くはないんですが、避けれるならなるべく避けたいので、 **一度記事一覧を作ったらそれを全て消化し終わるまで記事一覧を取得しないように** 下記のようなロジックにしました。

* 一覧を作る
* 一覧からランダムに選んでツイート。ツイートした記事は一覧から削除
* 次の日は、1つ減った一覧からランダムに選んでツイート。ツイートしたら消す。
* その次の日も... 一覧表が空になるまで毎日ツイート→消すを繰り返す。
* 一覧表が空になったらまたJSONからデータを拾ってくる

記事一覧を一度作ると、すべての記事をツイートし終わるまで、最新記事が反映されなくなってしまいますが、そもそも過去記事を掘り起こすことが目的なので、そこは気にしません。

## すべてをまとめる関数

```
function tweetblog() {
  var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/**スプシのIDみたいなやつ**/';
  var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  var sheet = spreadsheet.getSheetByName("シート1");

  var RowLength = sheet.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();

  if( RowLength < 1) {
    getArticleList();
  }
  makeTweet();
}
```
スプシの中を確認し、一覧が空になってた時だけ `getArticleList()` （サーバー上のsummary.jsonを参照してスプシに記事一覧を作成します。

その後、 `makeTweet()` （スプシからランダムで記事を選んでツイートする関数）を実行します。

この `tweetblog()` にトリガーを設定して、毎日20時〜21時に発動するようにしています。

-----

これで一通り、スプシを元にツイートをするbotをGASで実装することができました。動いた嬉しさのまま勢いで書いたので読みづらい箇所もあるかと思いますので、こっそり手直しもしておこうと...思いま...su

気が向いたら。

ここまでのまとめは下記からどうぞ〜

* [（1）summary.json を更新のたびにサーバーに上がるように変更した回](https://blog.udcxx.me/article/200317/gas-blog-tweet-1/)
* [（2）サーバー上にあるJSONデータの中身からスプシに一覧表を作る回](https://blog.udcxx.me/article/200318/gas-blog-tweet-2/)
* [（3）GASからIFTTTを使ってツイートする回](https://blog.udcxx.me/article/200319/gas-blog-tweet-3/)←いまここ
