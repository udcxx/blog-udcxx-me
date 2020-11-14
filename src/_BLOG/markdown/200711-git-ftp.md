---
title: git ftpでアップロードを実行させる
date: 2020-07-11
tags: IT
eyecatch: 200711.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

以前の記事で、git pushをトリガーにFTPアップロードまで自動化させる方法を紹介し、今もそれで運用しています。

[git pushしただけでアップロードまで終わらせる - 無趣味の戯言](https://blog.udcxx.me/article/200409/husky-ftp-upload/)

しかし、2つの小さな問題が発生したので、このサーバーへのアップロードフローを再度見直し、git ftpを導入することにしました。

## 小さな問題点

### FTP認証情報を.jsファイルで管理している

FTPを利用する際に必要なユーザー名やパスワードといった認証情報は、jsファイルとして管理しています。

個人で利用する分には便利で快適なのですが、パブリックなリポジトリでは利用することが出来ません（悪用される恐れがあるため）。このブログは将来的にソースごと公開してみたいという思いがあるので、パブリックリポジトリでもリスクのない方法を採りたいです。

FTPの認証情報だけ別ファイルとしてignoreすることも考えましたが、gitignoreファイルの取扱に依存してしまうのはちょっと危険がありそうです。gitの特性上、一度pushしてしまうと履歴として残り続けてしまうので、できれば実ファイルとしての保存は避けたいと思うようになりました。

### 毎回、全データをアップロードしている

`ftp-deploy` がgitと連動していないので、差分という概念がありません。結果、ブログを更新するたびに全データをアップロードするという力技になってしまっていますw

テキストと少しの画像程度なので重さが気になるわけではありませんが、スマートではないので、改善したいところです。

## git-ftpを使おう

`git ftp` なら、差分だけを認識してアップロードすることが出来るようです。しかも、FTPの認証情報は `.git/config` に記録できるので、cloneしたときの手間は増えますが、より安全にユーザー名・パスワードを管理出来るようになります。

## git-ftp を使う準備

それでは早速、 git-ftp を利用する準備をご紹介します。

### 1, git ftpをインストールする

Macの場合、homebrewからインストール可能です。

```
$ brew install git-ftp
```

インストール出来たかの確認は、 下記のようにします。

```
$ git ftp
git-ftp <action> [<options>] <url>
```

### 2, FTP情報の設定を行う

`package.json` などと同じ階層まで `cd` で移動して、下記コマンドを順番に実行します。もちろん、アドレス・ディレクトリ・ユーザー名・パスワードはそれぞれ書き換えてください。

```
$ git config git-ftp.master.url ftp://アドレス/ディレクトリ/
$ git config git-ftp.master.user ユーザー名
$ git config git-ftp.master.password パスワード

$ git config git-ftp.dev.url ftp://アドレス/ディレクトリ/
$ git config git-ftp.dev.user ユーザー名
$ git config git-ftp.dev.password パスワード
```

masterとdevの二種類用意しているのは、masterブランチにいる時は本番環境に、それ以外のブランチにいる時はdevelop環境にそれぞれアップロードされるように設定するためです。その間にstg（ステージング）環境が必要な場合はもう1パターン作成します。

### 3, ブランチを判別するjsファイルを作成する

作業しているブランチを判別して、アップロード先を決めるための `git-ftp.js` というファイルを作成します。

```
const EXEX_SYNC = require("child_process").execSync;
const BRANCH = EXEX_SYNC("git rev-parse --abbrev-ref HEAD")
    .toString()
    .replace(/\r?\n/g, "");
let cmd_ftp;

if (BRANCH === "master") {
    cmd_ftp =
        "git ftp push -s master";
} else {
    cmd_ftp =
        "git ftp push -s dev";
}
EXEX_SYNC(cmd_ftp);
```

if文で分岐してるだけなので、 else ifしたらブランチごとにいろいろ決められます。 `git ftp push -s ☆☆☆` の☆☆☆は上記 2, で用意したパターンと連動しています。

### 4, git-ftp-includeを作成する

`.git-ftp-include` というファイルを作成し、内容を下記にします。

```
!dist/
```

### 5, husky と npm-run-all をインストール

下記の記事で既に利用していますが、インストールしていない場合はインストールしておきます。

ちなみに、 `husky` を入れることで `git push` をトリガーに実行することが出来るようになります。複数のnpmスクリプトを利用する場合は `npm-run-all` の導入が必要になります。

[git pushしただけでアップロードまで終わらせる - 無趣味の戯言](https://blog.udcxx.me/article/200409/husky-ftp-upload/)


### 6, package.json で git push 時のアクションを設定する

`package.json` を下記のように更新し、git push コマンドが叩かれた時（preなのでpush直前）に `deploy` というnpmスクリプトを走らせるように設定します。また、その deploy というスクリプトには 3, で作ったjsを実行する記述をしておきます。

```
{
    "scripts" : {
        "deploy": "node git-ftp.js"
    },
    "husky": {
        "hooks": {
            "pre-push": "npm run deploy"
        }
    },
}
```

※ 変更箇所以外は省略してます。

## あとは普通に git push するだけ！

以上で準備が整いました。

あとはいつもやっているように add して commit して push するだけで自動的にサーバーにデプロイまで完了します！ master ブランチで実行すれば本番公開も楽に出来ます！

-----

実際の業務などで利用する際、 push だけでデプロイされるのは不安という場合には、 `git-ftp.js` の内容を書き換えれば、masterブランチの時は何もしない、みたいな処理も可能ですので様々なシチュエーションで使えるのではないでしょうか！