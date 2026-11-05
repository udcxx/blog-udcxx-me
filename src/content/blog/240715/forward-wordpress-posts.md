---
title: Wordpressの記事を移行するツールを公開しました
date: 2024-07-15
tags: JavaScript Web IT
eyecatch: 
eyecatchEmoji: 😺
description: Wordpress REST APIを使った記事移行を行うJavaScriptプログラムをGithubで公開しました。Basic認証で保護されたWordpressにも対応しています。
---

こんにちは。だいちゃんです。

[前回](https://blog.udcxx.me/article/240713/wordpress-rest-api-with-basic-authorization/)検討したWordpress REST APIを使った記事移行ですが、Node.jsから実行できるようにJavaScriptのプログラムとして作成して、Github上に公開しました🎉

[udcxx/forward-wordpress-posts](https://github.com/udcxx/forward-wordpress-posts)

今回は、使いどころとかについてまとめます。

## forward-wordpress-postsの使いどころ

Wordpressでは、テーマに関するファイルはFTPで投げつけることができますが、記事データなどはデータベース上に保存されるので、扱いがちょっとややこしいし、レンタルサーバーだと直接DBに繋ぐことができない場合もあって不便です。

なにより、テーマ開発者のフロントエンド大好きマンにはよくわかんない世界だと思います。僕はそうです。

なので、JavaScript（Node.js）を使った記事移行ができないかなぁと思って作ったのが[forward-wordpress-posts](https://github.com/udcxx/forward-wordpress-posts)です。

普段から `$npm run dev` するような流れで、ローカルからサーバー上のWordpressへ、記事の移行ができるようになります。

しかも、[前回の記事](https://blog.udcxx.me/article/240713/wordpress-rest-api-with-basic-authorization/)で検討した方法でセットアップしておけば、Basic認証環境下でも記事移行が可能です。これで、テーマ開発中（本番公開前）のWordpressにも記事を投げることができます！


## 記事の移行方法

セットアップがややこしいですが、[前回の記事](https://blog.udcxx.me/article/240713/wordpress-rest-api-with-basic-authorization/)を参考にがんばってください。

Wordpress REST APIがJWT認証で利用できるようになったら、設定ファイル `forward-wp-posts-config.json` を用意します。

認証情報を含むファイルになるので、`.gitignore`でignoreさせたあと、`forward-wp-posts-config-template.json` を参考に、移行元・移行先のURLや認証情報などを入力して、ファイル名から`-template`を外して保存します。

そしたらあとは、実行するだけ：

```bash
$node forward-wp-posts.js
```

※ ローカル・サーバー上の両方のWordpressが実行している必要があります。

オプションも用意しています：

```bash
$node forward-wp-posts.js --pull --force-create
```

### オプション：pull

通常は、設定ファイルの **Local → Remote** の方向で記事を移行しますが、`--pull`をつけて実行することで、逆の **Local ← Remote** の方向に記事が移行されます。

サーバー上の記事データをローカル環境に持ってきたいときに使えるオプションです。

### オプション：force-create

通常は、各記事のスラッグをみて同じ記事があるか判定し、記事が存在したら上書き更新するようにしていますが、`--force-create`をつけて実行すると、すべての記事を新しい記事として投稿します。

これはあんまり用途はわからん。

最初にプログラム作ったときは、記事がある場合を考慮してなくて、すべて新規追加する仕様だったのですが、実行するたびに記事が増殖するのはヤバいとあとから気づき、記事が存在するか確認する処理を追加しました。

なので、`--force-create`オプションは、僕の最初の頃の苦い思い出を味わえるオプションになっています。


## 制限事項について

### 100記事までしか処理できない件

Wordpress REST APIの仕様上、一度に取得できる記事の数が100件までなので、[forward-wordpress-posts](https://github.com/udcxx/forward-wordpress-posts)も100件までしか処理できないようになっています。

取得の処理を記事がなくなるまで回し続ければ可能と思いますが、そもそも本番運用しているデータの移行を想定していないので、今回は実装しませんでした。

あと、投稿処理をFor文で1件ずつ回してるので、処理する件数が多すぎると時間が掛かる懸念もありました。ForEachで書くとなんかいい感じに処理状況が表示できなくてかっこよくなかったんですよね...

大規模な移行にも使いたくなったら、そこら辺考えよう。


### PWを平文で保存してる件

設定ファイル `forward-wp-posts-config.json` に、Wordpressのログイン情報や、Basic認証の認証情報を平文で保存しています。

別の作業者でも簡単に使えるようにするため、こんな仕様になっています。絶対に `.gitignore` して、FTPでアップロードしない場所に保存するように、運用でカバーしてください🥺

あと、もしガチ運用するときは安全な方法で保存してくださいね...

---

ちゃんとツール作って公開したのは、初めてくらいの勢いかもしれない。

たぶん、考慮しなきゃなことがたくさん漏れてると思うので、フィードバックもお待ちしています🙋‍♂️

* [WP APIをBasic環境下で利用したい | 無趣味の戯言](https://blog.udcxx.me/article/240713/wordpress-rest-api-with-basic-authorization/)
* [udcxx/forward-wordpress-posts](https://github.com/udcxx/forward-wordpress-posts)
* [Pages – REST API Handbook](https://developer.wordpress.org/rest-api/reference/pages/)