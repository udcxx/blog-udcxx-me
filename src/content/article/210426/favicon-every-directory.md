---
title: ルートパスで指定されたfaviconをディレクトリごとに出し分ける
date: 2021-04-26
tags: Web IT
eyecatch: 210426.png
eyecatchEmoji:
description: ファビコンをディレクトリごとに変えたい、けど、ルートディレクトリに置いてる時と同じ記述にしたい、を叶えてみました。ちょっと前提条件のせいで汎用性ないかも。
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。随分お久しぶりになってしまいました。

最近、ドメインを十数個も持ってるクライアントの案件を担当しているのですが、社内確認用のデベロップサーバーにも、クライアント側の環境と同じ数だけサブドメ切るのはさすがに面倒だったので、1つのドメイン内でディレクトリを分けてテストアップすることにしました。
基本的には相対パスで書かれていたので、この運用でも問題ない認識だったのですが、faviconだけルートディレクトリを指定する必要があり、しかも、本番環境ではドメインごとにfaviconが異なっているという状況でした。

絶対サブドメ切りたくないマンの執念を持って試行錯誤を重ねた結果、どうにか `.htaccess` の設定だけで、個別にドメインを切ること無く、ルートパスで指定されたfaviconを表示することができたので、備忘録として残しておこうと思います。

ただ、前提条件として、下記のように本番環境の全てのドメインで、同じ名前のディレクトリ（例では `/lp/` ）に入ってる必要があるので、ものすごく使い回しの効かないニッチな状況かもしれないです😢

* https://domain01.com/lp/index.html
* https://domain02.com/lp/index.html
* https://domain03.com/lp/hoge/index.html
* https://domain04.com/lp/hoge/hoge/index.html

テスト環境では、下記のように、1つのドメインの中にディレクトリをわけることで、それぞれのドメイン向けのデータを管理しています。

* https://test.com/domain01-com/lp/index.html
* https://test.com/domain02-com/lp/index.html
* https://test.com/domain03-com/lp/hoge/index.html
* https://test.com/domain04-com/lp/hoge/hoge/index.html


## htaccessの記述

```
RewriteEngine on
RewriteBase /
SetEnvIf REFERER "^https://test.com/(.*)/lp/(.*)$" from_dir=$1
RewriteRule ^favicon.ico$ /%{ENV:from_dir}/favicon.ico [R,L]
```

試行錯誤の結果、上記のような書き方に落ち着きました。 .htaccessに対してはやっぱりまだまだ苦手意識が強いですが、特にリダイレクト系はよく使うので、もう少しサクッと書けるようになっておきたいですね。このブログを [トレイリングスラッシュ付きに統一した回](https://blog.udcxx.me/article/200304/add-trailing-slash/) とかでも.htaccessのリダイレクトを利用していますが記事内でもめちゃくちゃ不安になりながら設定してますねw

たった4行ですが、その中でも特にポイントになりそうな部分を個別に分かる範囲でまとめておきます。

### 3行目：環境変数にドメインを代入

`SetEnvIf` でアクセス元のURLが `https://test.com/(.*)/lp/(.*)` の形にマッチしたら `from_dir` という環境変数にディレクトリ名をぶちこむということをしています。

正規表現、全然慣れなくて毎回試行錯誤しながら使ってます...難しい。

今回は [キャプチャリング括弧](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions#special-capturing-parentheses) という `$1` で1つ目の `()` の内容、つまり本番ドメインごとに作ったディレクトリ名がヒットするという機能？を使っています。

### 4行目：favicon.icoの参照先を書き換える

4行目でついにfaviconの参照先を書き換え/読み替えをしてもらいます！

3行目でどこのディレクトリからのアクセスかを記憶しているので、それを使って、そのディレクトリ直下にあるfavicon.icoを読み込むように指定しています。リダイレクトと同じ仕組みですね。

-----

自分で理解するのも難しいですが、自分の言葉で記録を残すのもまた別の難しさがありますね。

そして試行錯誤してる時間が、新しい事を知れたり、知識と知識が繋がるのを実感できるので、楽しくて好きです😊
