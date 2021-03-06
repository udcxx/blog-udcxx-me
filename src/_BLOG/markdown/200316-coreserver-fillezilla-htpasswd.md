---
title: コアサーバー✕FileZillaでhtpasswd設定するとき毎回ハマるのでメモ
date: 2020-03-16
tags: IT
eyecatch: 200316.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

まだ公開したくないけど本番環境で確認したいようなとき、さっとアイパスで保護掛けられるBASIC認証を使うことも多いかと思います。

僕が利用している「コアサーバー」とFTPクライアント「FileZilla」の組み合わせのせいなのか、毎回同じミスしてんんんっ！って15分くらい悩むのでメモを残しておきますｗ

## BASIC認証とは

BASIC認証とは、 `.htaccess` と `.htpasswd` というファイルを用いて（に記述して）、簡易的にWebサーバーに認証を設定する仕組みのことです。逆に言うと、FTPソフトなどでこれらのファイルを誤って削除してしまうと、制限が掛からなくなってしまいます。

認証方法としてはあくまで簡易的な方法ですので、使いどころには注意が必要です。また、制限はあくまでアクセスに関してだけで、通信内容に関しては影響を与えません。

ただ、簡易的な分、気軽に利用できるので、本番公開前のWebサイトのテストページなどに設定することも多いのではないでしょうか。

## 設定方法

設定ファイルである `.htaccess` と `.htpasswd` を用意します。既にhtaccessがある場合は追記します。

ちなみに、「.（ピリオド）」から始まる隠しファイルは通常画面上に表示されません。Macの場合 `⌘` + `shift` + `.` を同時に押すことで、隠しファイルを表示することが出来ます。

### .htaccessの記述例

```
AuthType Basic
AuthName "Input your ID and Password."
AuthUserFile /home/ドメイン名/フォルダ名/.htpasswd
require valid-user
```

### .htpasswdの記述例

htpasswdに記載するパスワードは、あらかじめ暗号化しておく必要があります。 [このサイト](https://www.luft.co.jp/cgi/htpasswd.php) などを利用すると簡単に暗号化することができます。

```
id:ycoHreJVAjhjI
```

※ 上記はIDに `id` ・パスワードに `passwd` を指定した例。

## 僕のハマりポイント

htaccessの中に `AuthUserFile` というhtpasswdまでのパスを記述する欄があるのですが、そのパスが原因で500エラーになるという失態を今まで何度も繰り返してきた気がします。（学習しろ）

Filezillaに表示されるパスは下記の通り。

```
public_html/ドメインごとのディレクトリ/.htaccess
```

右クリックしてフルパスを取得すると下記のパスがコピーされます。

```
ftp://アカウント名@サーバー番号.coreserver.jp/public_html/ドメインごとのディレクトリ/.htaccess
```

ここまで調べて、AuthUserFile欄に

```
AuthUserFile /public_html/ドメインごとのディレクトリ/.htaccess
```

て書けばええんやろ( ˘ω˘ )って毎回思っちゃうのですが、これではうまくいきません...。

## 正しいhtpasswdへのパス

結論、コアサーバーの場合、ファイルまでのパスは下記にする必要があるようです。

```
AuthUserFile /virtual/アカウント名/public_html/ドメインごとのディレクトリ/.htpasswd
```

public_htmlの上に `/virtual/アカウント名/` というディレクトリが存在しているようです。FTPクライアントだと public_html がある階層以下からしかアクセス出来ないため、このようなパスは出てこないようでした。

-----

ということで、次からはサクッとBASIC認証掛けられるように、自分へのメモでしたｗ
