---
title: kintoneからIFTTTを経由してSlackへ通知する
date: 2022-07-21
tags: kintone IT
eyecatch: 220721.jpg
eyecatchEmoji:
description: kintoneとIFTTTを連携させて、レコードを開いたらSlackに通知するAppletを作ってみました。実用性はないので、応用必須です。
---

こんにちは、だいちゃんです。

kintoneとIFTTTの連携を試すべく、kintoneでレコード詳細画面を開いたらSlackへ通知するという激ウザアプレットを作成してみたので、メモっておきます。そのままだと実用性皆無だけど、一応動作が確認できれば問題ないので。

ちなみにIFTTTの画面、シンプルでいいんだけど、シンプルすぎて設定が裏に隠れすぎてるイメージがありません？数年前に、このブログの記事をランダムでツイートするbotを作った以来のIFTTTだったので思いの外はまりました。

## IFTTT側の設定

IFTTTのアカウントを作って、ログイン後、右上の Create から作成画面を開きます。

1つ目のIf Thisでは、Webhookの受け皿を設定するので、 Add をクリックして、Webhooksを検索して、そのうちの `Receive a web request` を選択します。

Event Nameを適当に入れる。ちなみに、あとで必要になるので、メモっておくといいかも。僕は `kintone_webhook` にしました。

Create triggerで1つ目完成。

2つ目のThen Thatには、Webhookを受けた後の動作を設定します。今回はさくっと確認したいので、Slackへの通知を行います。AddからSlackを検索して、 `Post to channel` を選択。

Slackと連携がまだなら、連携の設定をして、Which channel? で投稿先のチャンネルを設定します。

Messageには `{{Value1}}のレコードが閲覧されました` を、Titleには `kintoneからの通知` をとりあえず入れておきます。Title URLとThumbnail URLはOptionalらしいので一旦空のまま。ちなみにMessageの `{{Value1}}` は `Add ingredient` から選択できます。

〆はCreate trigger。

最終的にアプレット全体が下記になればOK。

![](/images/220721_1.png)

ちなみに、Slackの連携設定やWebhookの個人別のkeyみたいな、全部のAppletに関わる設定は、右上のアカウントアイコンの中にあるMy servicesから設定することができます。このあたりが慣れるまでちょっとややこい。

そんなMy servicesからWebhookを選んで、Documentationをクリックした画面に書かれている `Your key is:` の後ろの部分も控えておきます。

## kintone側の設定

続いて、kintone側の設定。

Webhookを使うパターンと、kintone APIでproxyを叩くパターンがあるらしいんだけど、proxyの方が個人的に柔軟性ありそうだと感じたので、今回はそちらでいきます。

レコード開いたら通知したいアプリを開いて、設定から「JavaScript/CSSでカスタマイズ」をクリック。下記のソースコードをJavaScriptファイルに保存しておいて、そいつを読み込ませたら完了です！

ちなみに、ソースコードは一部修正が必要で、4行目と5行目の変数に、IFTTTの設定中に控えた `Event Name` と `key` を入力します。

```
kintone.events.on('app.record.detail.show', (event) => {

    // IFTTT設定中に控えたものをこの2つに設定してください
    const eventName = '';
    const key = '';

    const body = {
      'id': kintone.app.getId()
    };

    kintone.api(kintone.api.url('/k/v1/app.json', true), 'GET', body, (resp) => {
      kintone.proxy(`https://maker.ifttt.com/trigger/${eventName}/with/key/${key}?value1=${resp.name}`, 'POST', {}, {});
    });

    return event;
});
```

あとは保存して、アプリを更新したらOK！

なにか1つレコードを開くと、設定したSlackのチャンネルに通知が飛ぶはず！多分！

![](/images/220721_2.png)

---

なんかIFTTTとkintoneを連携させてる記事が少なかったので、備忘録として。とはいえ別のサービスでもWebhook使ってればだいたいこんな感じになるけどね。

* [レコード詳細イベント](https://developer.cybozu.io/hc/ja/articles/201941974)
* [外部APIの実行](https://developer.cybozu.io/hc/ja/articles/202166320)
