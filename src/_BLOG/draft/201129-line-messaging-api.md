---
title: LINE Messaging APIで遊んでみました
date: 2020-11-29
tags: IT GAS
eyecatch: 
discription: LINE Messaging APIとGoogle Apps Scriptを組み合わせて、簡単なBotのようなものを作って遊んでみました
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

初めてLINE Messaging APIを使ってみたので、使い方などを軽くメモっておこうと思います。 [LINE Developersの公式ガイド](https://developers.line.biz/ja/docs/messaging-api/) を読めばやりたいことは大抵網羅されているし、何より日本語なので、詳しい説明は公式ガイドに譲ります。

今回作ったのは簡単なBotなのですが、SlackやChatworkではなくLINEにした理由は、非IT系な彼女とのプライベートな部分でもBotを取り入れてみたかったからです。Slackを入れてもらうのも手ですが、普段使い慣れてるものじゃないと見なくなってしまいそうだし、Botを内容を見るためにわざわざアカウント取ってアプリ増やすのも変な話だと思ったのでLINEにしました。

## アカウントの取得について

個人的にちょっと引っかかったところですが、結論からいうと、ちゃんと公式ガイド読んでおけば難しくないです。LINEアカウント・LINE公式アカウント・LINE Developer開発者アカウント、の3つが別物であることを意識しておけば大丈夫かと。あと、公式アカウントとチャネルが紐づく認識です。

**LINE公式アカウント（旧LINE@）** のアカウントを利用して、 **LINE Developersコンソール** にログインします。

LINE公式アカウントを持っていない、今回別で新規に作成したい場合は [こちら](https://www.linebiz.com/jp/entry/) から作成できます。ぼくのようにプライベートな利用が目的の場合は「未認証アカウント」がいいかと。

LINE＠のアカウントを数年前に取得していたのを忘れていたので手間取ってしまいましたが、普通にやってれば特に難しいことはありませんでした。

LINE Developersコンソールでも別途アカウントを作らされるので、手順に従います。プロバイダー・チャネルも作成します。

## メッセージの送受信について

メッセージを受信するには、LINE Developer コンソールで指定されているWebhook URLにHTTP POSTリクエストとして受け取ることができます。Google Apps Script［GAS］で `function doPost(e)`


▼画像
![](/images/191217.jpg)

▼リンク付き画像
[![](/images/191217.jpg)](https://meetupokinawans.coresv.com/)

▼リンク付き画像＋テキストリンク・・・Amazonとかコレ
[![](/images/191217.jpg)](https://meetupokinawans.coresv.com/)    
![テキストリンクのテキスト](https://meetupokinawans.coresv.com/)
