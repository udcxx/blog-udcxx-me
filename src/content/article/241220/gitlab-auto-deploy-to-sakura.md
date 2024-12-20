---
title: Gitlab CI/CDでさくらのレンサバに自動アップする
date: 2024-12-20
tags: Web IT
eyecatch: 
eyecatchEmoji: ⏫️
description: Gitlab CI/CDを利用して、Gitlabにpushした際に自動でレンタルサーバーにFTPアップロードする設定方法を紹介します。
---

こんにちは。だいちゃんです。

僕はWebサイトを作成する際、なるべくGitlab/Githubを使ってコードのバージョン管理するようにしています。Gitlabで管理するには当然commitやpushが必要になるので、せっかくなのでそこに連動させる形で、最近ではFTPを使ったWebサーバーへのアップロードも自動化できるように [なりました](/article/240709/environment-wordpress/#gitlab-cicd) 。

## .gitlab-ci.yml

次のようなymlファイルで設定しています。

```
stages:
  - deploy
  - publish

deploy:
  stage: deploy
  image: node:lts
  script:
    - npm install
    - npm run cpx
    - npm run sass
    - apt-get update -qq && apt-get install -y -qq lftp
    - lftp -c "set ftp:ssl-allow no; open -u $USERNAME_DEV,$PASSWORD_DEV $HOST_DEV; mirror -R $LOCAL $SERVER_DEV --parallel=10"
  rules:
    - if: $CI_COMMIT_BRANCH =~ /^dev-.*/ # dev-*** ブランチのときに実行する

publish:
  stage: publish
  image: node:lts
  script:
    - npm install
    - npm run cpx
    - npm run sass
    - apt-get update -qq && apt-get install -y -qq lftp
    - lftp -c "set ftp:ssl-allow no; open -u $USERNAME_PUB,$PASSWORD_PUB $HOST_PUB; mirror -R $LOCAL $SERVER_PUB --parallel=10"
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH # デフォルトブランチ（main）にマージされたとき
```

また、事前にリポジトリの設定で、各変数を指定しておく必要があります。

**設定場所**

該当リポジトリの `Setting` > `CI/CD` > `Variables`

**設定内容**

* HOST_DEV・・・・・検証サーバーホスト名（例：www.example.com）
* USERNAME_DEV・・・検証サーバーユーザー名
* PASSWORD_DEV・・・検証サーバーパスワード
* SERVER_DEV・・・・検証サーバーディレクトリ（例：/cms/wp-content/themes/）
* LOCAL ・・・・・・ローカルディレクトリ（例：./dist/wp-content/themes/）
* HOST_DEV・・・・・本番サーバーホスト名（例：www.example.com）
* USERNAME_DEV・・・本番サーバーユーザー名
* PASSWORD_DEV・・・本番サーバーパスワード
* SERVER_DEV・・・・本番サーバーディレクトリ（例：/cms/wp-content/themes/）

## さくらのレンタルサーバーでの設定

検証環境として利用しているCORE SERVERでは、上記の設定でそのまま使えた記憶ですが、さくらのレンタルサーバーを使っている場合、サーバー側でもうひと設定必要でした。

というのも、さくらのレンタルサーバーではデフォルトで海外からのFTP接続がブロックされているのですが、GitlabがGoogleCloud上にあるっぽく、その影響でアップロードができなかったです😢

セキュリティを少し犠牲にしてしまいますが、国外IPアドレスからのアクセス制限を「無効（利用しない）」に設定する必要があります。

※ 許可リストへGoogle系のIPアドレスを全部入れちゃいたいところですが、HTTP/HTTPSだけ許可されるらしいので、大元（アクセス制限）を無効にしないとダメそうでした。試してはないけど。

---

設定は若干腰が重いけど、運用に乗せてしまえば楽ちん＆Gitlabにpushしないとサーバーに反映されない縛りのおかげで管理漏れも防げるので、一石二鳥かと！