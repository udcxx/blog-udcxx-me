---
title: 簡単なHTMLページを簡単に作るためのテンプレ
date: 2020-01-20
tags: Web IT
eyecatch: 200120.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

先日、 **[Meetup with locals in Okinawaのサイトを作った話](https://blog.udcxx.me/article/191217/meetup-with-locals-in-okinawa)** をした際にもちょろっと書きましたが、簡単なWebページを効率よく楽に作れるように、自分なりにあらかじめよく使うツールをセットにして用意しています。

WordpressやVue.jsなどのツールを使った制作も増えてきていますが、 **低単価案件** や **「サクッとLPみたいなの作ってよ」のような使い捨て（更新がほぼほぼ発生しない見込みの）案件** ではどうしてもツールの導入まで至らず、html / css / javascript（jQuery）でちゃっちゃと作りたい機会がまだまだ多いように感じています。

そんな依頼があったとき、 **すぐに自分の使い慣れた環境で開発が始められると便利だなー** と思い、自分なりのテンプレのようなものを持つようになりました。今では、そのテンプレが一式入ったフォルダを複製して `npm install` をするだけで制作を始められる環境が整っていてめっちゃ便利です！

テンプレの構成は随時アップデートしていくつもりですが、現段階でのテンプレを紹介します！HTMLでサクッとWeb制作をしてる方のヒントになれば幸いです。。。

## 構成内容

ファイル構成は下記のようになっています。

```
fast-html-developer/    
　├ dist/    
　│　├ css/    
　│　│　└ style.css    
　│　├ include/     
　│　│　├ header.html    
　│　│　└ footer.html    
　│　├ js/    
　│　│　└ 各種jsファイル    
　│　├ scss/    
　│　│　├ modules/    
　│　│　│　├ ress.css    
　│　│　│　└ common.scss    
　│　│　└ style.scss    
　│　└ index.html    
　├ config.js    
　├ ftp-upload.js    
　└ package.json
```

###### ※ 一部省略しています

利用しているnpmパッケージは下記のとおりです。

```
"browser-sync": "^2.26.7",    
"ftp-deploy": "^2.3.6",    
"node-sass": "^4.13.0",    
"onchange": "^6.1.0"    
```

また、下記のnpm scriptを設定しています。

```
"scss": "node-sass --include-path scss dist/scss/style.scss dist/css/style.css --output-style 'compressed'",     
"server": "browser-sync start -s dist -w dist/**/*.html dist/css/*.css dist/js/*.js",    
"upload": "node ftp-upload",    
"watch:scss": "node-sass --include-path scss dist/scss/style.scss dist/css/style.css --output-style 'compressed' -w",     
"watch:upload": "onchange 'dist/**/*' -e '**/*.{DS_Store,scss}' -- node ftp-upload",    
"watch:server": "browser-sync start -s dist -w dist/**/*.html dist/css/*.css dist/js/*.js",     
"dev": "npm run watch:scss & npm run watch:server",     
"dev-up": "npm run watch:scss & npm run watch:upload & npm run watch:server"     
```

## 機能1：ブラウザシンク

`npm run dev` もしくは `npm run dev-up` コマンドを実行すると自動的にブラウザが立ち上がり、index.html（http://localhost:3000/）が表示されます。これは、 [browser-symc](https://www.npmjs.com/package/browser-sync) を利用して、ローカルで確認用の環境を構築してくれるプラグインになります。また、構成ファイル内に変更があれば自動的に再読み込みが行われるので、例えばhtmlやscssの編集をして上書き保存するだけでブラウザが自動的にリロードされて常に最新の状況を確認することが出来ます。

## 機能2：scssの自動コンパイル

個人的にcssよりもscssが書きやすいと思っているのですが、コンパイルする必要があるので少々面倒に感じていました。この自分専用テンプレを作るきっかけになったのも、もっと楽にscssを使いたいという思ったからです。

これも `npm run dev` することでフォルダ監視が始まります。scssを編集して保存するだけでコンパイルされてcssが生成されます。

## 機能3：デプロイ

あらかじめconfig.jsファイルの設定が必要ですが、コマンド一つでFTPでのサーバーアップロードが可能です。 `npm run dev-up` を使って制作を進めている場合、各ファイルを保存する度にアップロードが実行されます。といっても最初のうちは毎回アップロードが発生してもウザいだけなので、基本的にはデプロイの発生しない `npm run dev` で制作をして、最終局面で細かい調整の時は `npm run dev-up` を使うイメージです。

 `npm run upload` を実行するとウォッチ無しで自分の好きなタイミングでアップロード出来るので、こっちのコマンドを使うことが多いですｗ

## 機能4：あらかじめスタイルが設定されている

ほぼおまじない状態の指定をあらかじめ設定しているので、いつも同じ状況から制作を始めることが出来ます。

あと、最近使うことの多いGoogle FontsのNoto Sans JPの読み込みの記述も最初から設定済みなので、特に指定しない限りは基本的にNotoになります。

## 機能5：よく使うjsもあらかじめ読み込み指定されている

jsディレクトリに、よく使うjsプラグインを4つほど＋jQueryを入れています。また、htmlにもそれを読み込む記述があらかじめされているので、デフォルトで読み込む状態になっています。もちろん使わない時は削除する必要がありますが、制作のスタードダッシュが早くなるのはメリットかなと思っています **（やりだすまでが一番めんどくさいですからね）**

## 機能6：ヘッダー・フッターをjsでインクルードさせている

複数ページを制作する際に便利なインクルードですが、あらかじめヘッダーとフッターだけは別ファイルにしていてインクルードで表示させるように設定されています。

SSIのほうがいろいろ良いらしいですが、ローカルで確認できるかつ.htaccessを書き換えないでいい手軽さからjsでのインクルードで対応してます。

-----

あくまで自分用に作ったものなので、あまり良いものではないかもしれませんが、 **個人的には制作をスタートするときのめんどくささが少し減った気がします。**

現状は **あくまでサクッと作れればOK！** なスタイルなので、今後はせっかくnpmでいろいろパッケージ入れてるので、 **パフォーマンスにも考慮したWeb制作** という点も考慮してアップデートしていけたらなと思っています。

オススメのパッケージとかあれば是非 [Twitter](https://twitter.com/udc_xx) で教えてくださいー！あと、こんなテンプレで良ければ差し上げますし、僕の分かる範囲なら相談にも応じますので、是非お気軽に絡んでくださいませ;)
