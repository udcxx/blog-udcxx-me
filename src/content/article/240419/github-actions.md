---
title: Github ActionでNuxtの静的デプロイを自動化した
date: 2024-04-19
tags: IT
eyecatch: 
eyecatchEmoji: 🛠
description: Github ActionsでSSGからFTPでのアップロードまでを自動化してみました
---

こんにちは。だいちゃんです。

[このブログ](https://blog.udcxx.me/) は、Nuxt.jsを使って作っていて、SSG（Static Site Generation）で生成したHTMLファイルなどなどをアップロードして公開しています。

ただ、ブログ更新のたびに、ローカル側でSSGして、FTPでサーバーへのアップロードを行う必要があり、コマンド 1つでSSG～アップロードまでをまとめて実行できるようにしたものの、それでも少し手間に感じていました。

* [FTPアップまでコマンドで終わらせる | 無趣味の戯言](https://blog.udcxx.me/article/191111/ftp-update/)

今回は、記事を管理しているブランチが更新されたときに、SSG～アップロードをGithub側で行うActionを使ってみることにしました。

## 重い腰を上げて Github Actions を試す

知ってはいたものの、難しそうで敬遠していた **Github Actions**。

実際に使ってみると、Github側でFTPのユーザー名やパスの設定を行い、ソースコード側で `.github/workflows/generate-to-upload.yml` を追加するだけの簡単な作業でした。

追加した `generate-to-upload.yml` は以下のように記述しています。

```yml
name: Generate to Upload

on: 
    push:
        branches: ['blog']

jobs:
    build:
        runs-on: ubuntu-latest

        strategy:
          matrix:
            node-version: [20]
        steps:
            - uses: actions/checkout@v4
            - name: Use Node.js ${{ matrix.node-version }}
              uses: actions/setup-node@v4
              with:
                node-version: ${{ matrix.node-version }}
                cache: "npm"
            - name: npm install
              run: npm install
            - name: generate # SSG
              run: npm run generate

            - name: List output files
              run: ls -la .output/public/

            - name: 📂 Sync files
              uses: SamKirkland/FTP-Deploy-Action@v4.3.5
              with:
                server: ${{ secrets.FTP_SERVER }} 
                username: ${{ secrets.FTP_USERNAME }}
                password: ${{ secrets.FTP_PASSWORD }}
                server-dir: /public_html/blog.udcxx.me/
                local-dir: .output/public/
```

[YAML](https://ja.wikipedia.org/wiki/YAML) を初めてちゃんと書いた気がする。インデントに厳格な規格なんですね。何度もインデントがなっとらん！って怒られました。


## Github 側の設定

該当のリポジトリの Settings から、Secrets > Actions と進み、`New repository secret` をクリックします。

Name に以下を指定して、Value にはそれに対応する値を入力して Add すれば完了です。

* `FTP_SERVER` ・・・FTPサーバーのHost
* `FTP_USERNAME` ・・・FTPにログインするユーザー名
* `FTP_PASSWORD` ・・・FTPにログインするためのパスワード

---

設定が済んだら、これまで同様、ローカル上でMarkdownファイルに記事を書いて、GithubにPushします。
そのあとのSSG～アップロードの操作や待ち時間が今後、不要になります。

こういう自動化、ちゃんと動くと気持ちいいですね✌