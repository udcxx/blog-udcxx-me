---
title: DockerでWordpressのローカル環境を爆速で構築する
date: 2020-06-10
tags: IT
eyecatch: 200610.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

Wordpressのテーマを作成する際、ローカル環境で行うほうが何かと便利なので、今回はその環境構築をDockerを使って行いたいと思います。

## Wordpress、テンプレートで書くか、固定ページで書くか問題

あまり更新しないようなページは、テーマ（テンプレート）に直接書いちゃった方が楽じゃね？とか思ったりするのですが、巷では固定ページに書く方を推奨されてたりします。

テンプレートに直書きされたものは、DBに登録されないのでWPの検索機能に引っかからないようです。そもそも、コンテンツを管理できないCMS（コンテンツ・マネジメント・システム）ってなんやねんって話らしいですw

ということで、テーマ作成時には **コンテンツは書かずに枠組みだけ作るようにしましょう。**

## Dockerのインストール

それでは早速、Dockerをインストールします。

Homebrew導入済のMacなら、コマンド2発で完結します！

```
$ brew install docker
```

```
$ brew cask install docker
```

2つ目の `$ brew cask` は、Homebrewでデスクトップアプリ（〜.app）をインストールするためのコマンドとのことです。

## Docker Composeの作成

Docker Composeを利用すると、複数のコンテナをまとめて扱えたり、 `docker-compose.yml` というファイルにコンテナの情報を記録が出来るので、それを共有するだけで、他のPCでも同じ環境を簡単に利用できるようになります。

今回は、Wordpress

Wordpressを保存したいディレクトリに `docker-compose.yml` というファイルを作成し、下記を記載します。

```
ersion: '2'

services:
  db:
    image: mysql:5.6
    volumes:
     - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
  wordpress:
    image: wordpress:latest
    depends_on:
     - db
    ports:
     - "8080:80"
    restart: always
    volumes:
     - ./wp-content:/var/www/html/wp-content
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
volumes:
  db_data:
```

参考： [Docker Compose でWordPress環境を作ってみる | バシャログ。](http://bashalog.c-brains.jp/19/08/15-120000.php)

docker-compose.ymlの書き方を知りたい方・もっとカスタマイズしたい方は [こちら](https://knowledge.sakura.ad.jp/16862/) も参考になると思います。

## 起動する！

あとは、docker-compose.ymlのあるディレクトリへ移動し、下記コマンドを叩くだけでdockerが起動し、Wordpressが利用できるようになります。

```
$ docker-compose up -d
```

ブラウザで [http://localhost:8080/](http://localhost:8080/) にアクセスするとWordpressの初期設定画面が開くと思います。

## 停止・再開・削除する

### 停止

コンテナを停止するコマンドです。作業終了時には停止してあげましょ。

```
$ docker-compose stop
```

### 再開

再び作業をする際は、docker-compose.ymlのあるディレクトリへ移動して下記コマンドを使用します。

```
$ docker-compose restart
```

### 削除

**もうこのコンテナ使わないよ！** って時は削除してあげます。

docker-compose.ymlさえ残しておけば、同じ環境を再度立ち上げるのは楽ちんなので、納品など一区切りついたら削除しちゃって良いと思います。ただ毎回削除すると、毎回セットアップからすることになるので注意が必要です。

```
$ docker-compose down
```

### 状態確認

今dockerが立ち上がってるのかの確認をする際は下記コマンドを利用します。

```
$ docker ps
```

全コンテナの情報が出るので、やっぱり利用していないコンテナは削除しておくほうが良さそうです。

-----

Dockerを使うことで、ローカルでもWordpress環境が整いました。

敷居が高いかと思っていましたが意外にもサクッと導入出来ました。

WordpressでのWeb制作需要は一応まだあるようなので、オリジナルテーマくらいはサクッと制作出来るようになっておきたいです。Wordpressの独自関数なども勉強しておかねば。
