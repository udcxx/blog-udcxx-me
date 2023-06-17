---
title: LINE Messaging APIで遊んでみました
date: 2020-11-29
tags: GAS IT
eyecatch: 201129.jpg
eyecatchEmoji:
description: LINE Messaging APIとGoogle Apps Scriptを組み合わせて、簡単なBotのようなものを作って遊んでみました
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

初めてLINE Messaging APIを使ってみたので、使い方などを軽くメモっておこうと思います。 [LINE Developersの公式ガイド](https://developers.line.biz/ja/docs/messaging-api/) を読めばやりたいことは大抵網羅されているし、何より日本語で読みやすいので、詳しい説明は公式ガイドに譲ります。

今回作ったのは簡単なBotですが、プラットフォームとしてSlackやChatworkではなくLINEを選んだ理由は、非IT系な彼女との間にもBotを取り入れてみたかったからです。Slackを入れてもらうのも手ですが、普段使い慣れてるものじゃないと見なくなってしまいそうだし、Botを内容を見るためにわざわざアカウント取ってアプリ増やすのも変な話だと思ったのでLINEにしました。

理想の最終形態は下記の方々のように運用することですが、一気に導入しても抵抗があると思うので、徐々に...ね。

* [家族というチームを回すために我が家がしていること｜ムラキ｜note](https://note.com/u_vf3/n/n01007cf1d5ee)
* [Slackがカップル専用アプリだった件 - くまのからあげ](http://kuma-no-kara-age.hatenablog.com/entry/2016/01/10/212347)

## アカウントの取得について

個人的にちょっと引っかかったところですが、結論からいうと、ちゃんと公式ガイド読んでおけば難しくないです。LINEアカウント・LINE公式アカウント・LINE Developer開発者アカウント、の3つが別物であることを意識しておけば大丈夫かと。あと、公式アカウントとチャネルが紐づく認識です。

**LINE公式アカウント（旧LINE@）** のアカウントを利用して、 **LINE Developersコンソール** にログインします。

LINE公式アカウントを持っていない、今回別で新規に作成したい場合は [こちら](https://www.linebiz.com/jp/entry/) から作成できます。ぼくのようにプライベートな利用が目的の場合は「未認証アカウント」がいいかと。

LINE＠のアカウントを数年前に取得していたのを忘れていたので手間取ってしまいましたが、普通にやってれば特に難しいことはありませんでした。

LINE Developersコンソールでも別途アカウントを作らされるので、手順に従います。プロバイダー・チャネルも作成します。

## メッセージの送受信について

メッセージを受信するには、LINE Developer コンソールで指定されているWebhook URLにHTTP POSTリクエストとして受け取ることができます。Google Apps Script［GAS］で `function doPost(e)` して受け取るやつですね。

メッセージを送る方法は、大きく分けて「プッシュメッセージ」と「応答メッセージ」の二種類があります。

プッシュメッセージは、任意のタイミングで送信するもので事前にチャンネルアクセストークンの発行が必要です。対する応答メッセージは、前述のWebhookで受け取ったメッセージごとにリプライトークンが発行されるので、そのリプライトークンを利用して送り返すメッセージです。どっちがいいというより、タイミングの違いです。

## Messaging API でオウム返しBotを作ってみる

手始めに、メッセージに対して、そのメッセージをそのまま返すだけのBotを作成してみました。

```
// LINE Developersコンソールで貰えるアクセストークン
// （めっちゃ長い）
const accessToken = 'xxxxx';


// メッセージを受け取る関数
function doPost(e) {
  const json = JSON.parse(e.postData.contents);
  const reply_token = json.events[0].replyToken;

  if (typeof reply_token === 'undefined') {
      return;
  }

  const message = json.events[0].message.text;

  replyMessage(reply_token, message);
}


// リプライメッセージを送信する関数
function replyMessage(reply_token, message) {
   const url = 'https://api.line.me/v2/bot/message/reply';
   UrlFetchApp.fetch(url, {
     'headers': {
       'Content-Type': 'application/json; charset=UTF-8',
       'Authorization': 'Bearer '+ accessToken,
     },
     'method': 'post',
     'payload': JSON.stringify({
       'replyToken': reply_token,
       'messages': [{
         'type': 'text',
         'text': message,
         }],
     }),
   });

   return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
```

スクリプトエディタで上記を書けば、あとは `公開` → `Webアプリケーションとして導入` を行えばOKです。（ `Projext Version` を `new` にするのをお忘れなく...）

あとは、GAS側の「アプリケーションURL」をLINE Developersコンソールの「Webhook URL」に入れてあげれば完了です。

先程作った公式アカウントとお友だちになり、メッセージを送信すると、送った内容をそのまま返してくれます。

message の内容に応じて条件分岐させて、リプライメッセージを変えることで、これだけでもそこそこなbotになってくれるんじゃないでしょうか。

-----

今回作ったbotの全貌は、また別の機会に記事にします（めんどくさくなった奴）
