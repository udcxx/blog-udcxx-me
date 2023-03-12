---
title: FTPアップまでコマンドで終わらせる
date: 2019-11-11
tags: Blog Vue IT
eyecatch: 191111.jpg
eyecatchEmoji:
description: FileZillaを使わずに、コマンド1つでデプロイからサーバーへのアップロードまで完了できるようにアップデートしました。
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

本日もブログをぷちアップデートしましたー！

## アップロードまでコマンドで

このブログは Nuxt.js で出来ていて、markdownで記事を書いたらあとはコマンドを叩くとgenerateしてくれる仕組みになっています。

今まではそのあと、 [FileZilla](https://filezilla-project.org/) などのアプリを使ってサーバーへアップロードしていました。

極力エディター内で作業を完結させたい（出来たらかっこいい）ので、今回はそのアップロード作業もコマンドで行えるようにしてみました。

使ったパッケージはコチラ

* ~~[ftp-cliant](https://www.npmjs.com/package/ftp-client)~~
* [ftp-deploy](https://www.npmjs.com/package/ftp-deploy)

`node-ftp` がラップされてるらしいです。あとは知らん←

最初、 `ftp-cliant` でやろうとしていましたが、`dist` 直下のファイルしか読み込めず、色々調べてみるとディレクトリごとアップするにはdeployのほうがいいらしかったのでそっちにしました。

## インストールと設定

まずはおまじない `npm install ftp-deploy --save-dev` を叩いてパッケージをインストール。

次に設定ファイル `ftp-upload.js` を作成し、下記の内容を書きます。

```
// FTP 接続先情報読み込み
const configInfos = require('./secret-infos');

// ftp-uploadの設定
var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
    user: configInfos.ftp.userName,
    password: configInfos.ftp.password,
    host: configInfos.ftp.host,
    port: 21,
    localRoot: "dist",
    remoteRoot: "/public_html/blog.udcxx.me/",
    include: ["*", "**/*"],
    exclude: ["/**/*.DS_Store"],
    deleteRemote: false,
    forcePasv: true
};

// アップロード中にログを残す
ftpDeploy.on("uploading", function(data) {
    console.log(`${data.filename}`, ' をアップロード中...（ ', `${data.transferredFileCount}`, ' / ', `${data.totalFilesCount}`, '）');
});
ftpDeploy.on("upload-error", function(data) {
    console.log(data.err);
});

// 終了時にログを残す
ftpDeploy.deploy(config, function(err, res) {
    if (err) console.log(err);
    else console.log("アップロードが終了しました。");
    process.exit();
});
```

あとは `node ftp-upload.js` を叩くだけでアップされます！便利！

僕の場合、`dist` 配下を `public_html/blog.udcxx.me` 配下に丸投げしちゃえばいいのでこんな感じの設定ファイルになっています。

あと、今後Github上にブログのソースコードも公開出来ればなぁと思っているので、念の為FTPのユーザー名とかパスワードは別ファイルに分けています（それだけgitignoneすれば安全かな〜と）。Google AnalyticsのID？とかも順次別ファイルにうつしておきたいですね。


## コマンドまとめたい

次は、「markdown→json変換」「generate」「アップロード」をコマンド1つでやってくれるようにしたいですねー

ちょっとずつ進化していく感じが最高にたのちい
