---
title: Ubuntu Server 入れてみた
date: 2026-01-02
tags: IT Linux
eyecatch: 
eyecatchEmoji: 🐧
description: 古いノートパソコンに Ubuntu Server をインストールして Linux の練習環境を作りました。
---

こんにちは。だいちゃんです。

冬休みの自由研究ということで、 [5年くらい前に 1.7万円で買った](https://blog.udcxx.me/article/201216/buy-windows/) Panasonic Let’s note CF-SX2 に Ubuntu Server を入れてみました。

元々、無理くり Windows11 を入れてたんだけど、右下に警告文が表示されるようになっちゃってダサかったのと、昨年、外でも作業できるように Surface Go 2 LTE を購入したことで Windows 環境は事足りたので、思い切って OS 入れ替えてみました。

あと、最近仕事で Linux を触ることが結構あったので、手元に環境あったほうがいいかな～と思い。

## Ubuntu Server にした理由

Ubuntu には GUI がある Ubuntu Desktop と、CLI 用の Ubuntu Server がある（正確な区分けは GUI の有無ではないと思うけど）。

元々は GUI がある Rocky Linux を入れる予定だったけど、ChatGPT と相談してたら、インストールする PC のスペックの低さと、常時稼働させておきたいという要件から、CLI を勧められた。また、情報量から Ubuntu がいいのでは？とも。

勧めの通り、Ubuntu Server を選択しました。


## インストール

まず、 [Ubuntu の日本語サイト](https://jp.ubuntu.com/download) から Ubuntu Server の LTS 版をダウンロードします。ダウンロードした .iso ファイルを USB メモリに書き込む際に、[Rufus](https://rufus.ie/ja/) というツールを使いました。
USB メモリ使うの久しぶりすぎて、家の中探すのに時間かかっちゃいました。引き出しの奥に埋もれてましたね。

Rufus で書き込むとき、「スタート」をクリックすると、ISO イメージモードと DVD イメージモードのどちらで書き込むか聞かれるんですけど、DVD イメージモードが正解みたいです。ISO イメージモードで書き込んだら起動しなくて、書き込み直しました。

ブートメディアができたら、そこから PC を起動して、あとはウィザードに従うだけです。英語しか選択肢がないんですけど、雰囲気でいけます。

迷ったら [この記事](https://zenn.dev/hatotk/articles/install-ubuntu-server-20-04-lts) が詳しくて助かりました。確かに Ubuntu は参考情報が豊富で本当に嬉しいですね。


## SSH接続の設定

サーバーとして運用する際、Mac や Surface などの別 PC から SSH で接続できないと不便なので、先に設定します。といっても、以下のコマンドを順番に実行するだけです。

```bash
$ sudo apt install openssh-server
$ sudo systemctl start ssh
$ sudo systemctl status ssh
```

これで別の PC から SSH で接続できるようになります。


## ディスプレイスイッチの無効化

ここで、ひとつ困ったことが。ノートパソコンなのでディスプレイが閉じられるんですけど、閉じると buntu がスリープしちゃうんですよね。サーバーとして使うならディスプレイ閉じた状態で放置したいので、これは困ります。

調べてみたら、ディスプレイが閉じたことを検知するスイッチの設定を変更すればいいみたいです。具体的には以下のように設定します。

```bash
$ sudo vim /etc/systemd/logind.conf
```

設定ファイルを開いたら、元々コメントアウトされている以下の行を探して、先頭の # を消します。

```
bashHandleLidSwitch=ignore
```

`:wq` で保存して終了したら、以下のコマンドで設定を反映させます。

```bash
$ sudo systemctl restart systemd-logind
$ sudo reboot
```

これで、本体の蓋を閉じて放置しても別の PC から SSH で操作できるようになりました。


## これからの使い道

せっかく準備したので、いくつか使い道を考えてみます。

### NAS

HDD を外付けで繋いで、自宅内 NAS にしようかと思っています。

Google ドライブがいっぱいになりつつあるのと、妻の iPhone も容量がヤバいみたいなので、使用頻度の低いデータの退避場所としてあると便利かな、と。

### DHCP サーバー

ネットワークの勉強がてら、DHCP サーバーを構築してみようと思ってます。

本当は DNS サーバーも作ってみたいんですけど、速度に直結しそうなので、まずは影響が少なそうな DHCP サーバーから試してみます。

### AI 処理

夜な夜な時間かかってもいいから、何か処理してくれたりしないかなぁ、なんて夢もあるんですけど、CPU が非力すぎて難しそうですね。これは追々遊びながら考えます。

---

[Ubuntu のフォント](https://fonts.google.com/specimen/Ubuntu) 結構好き。Google Fontsで公開されてるからWebとかで使っていきたい。