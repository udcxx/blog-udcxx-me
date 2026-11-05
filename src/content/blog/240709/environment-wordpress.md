---
title: Wordpress開発環境を整備してみる
date: 2024-07-09
tags: Web IT
eyecatch: 
eyecatchEmoji: 🌟
description: Wordpressの開発環境をやっと構築しました。
---

こんにちは。だいちゃんです。

これまではWordpressの制作案件があっても、静的ページとしてコーディングし、Wordpressへの組み込みは [ボス](https://remenbar.com/) にお願いしていました。

そんな僕ですが、この度、重い腰を上げて、苦手意識のあるdockerなんて使っちゃったりして、ローカル上にWordpressをたてて、Gitlabでテーマファイルの管理と、サーバー上のWordpressへの自動デプロイまでの一式の仕組み作りをしました！

これでWordpressも怖くない！たぶん！

## 構築したWordpress開発環境について

あくまで最低限度ですが、開発が便利になるように、以下の機能を用意しました。

* `npm run dev` したら `docker-compose up` も自動実行（よく忘れる）
* scssが使えるように（watchで自動コンパイル）
* ページごとに読み込むCSSを変える `function.php`
* Gitlab CI/CD で以下を実装
  * scssのコンパイル
  * サーバー上のWordpressに作ったテーマをデプロイ

### npm run dev で docker-compose up コマンドを叩く

`package.json` に以下のようなスクリプトを定義して、普段から使っているコマンド `npm run dev` を叩いたら、dockerを立ち上げるコマンド `docker-compose up` も勝手に実行してくれるようにしました。

```json
{
    // 省略
    "scripts": {
        "sass": "sass --no-source-map --style=compressed src/:dist/wp/wp-content/themes/",
        "watch:sass": "onchange \"src/**/*.scss\" -- npm run sass",
        "cpx": "cpx \"src/**/*.{php,html,css,js,jpg,jpeg,png,gif,svg}\" \"dist/wp/wp-content/themes/\"",
        "watch:cpx": "onchange \"src/**/*.{php,html,css,js,jpg,jpeg,png,gif,svg}\" -- npm run cpx",
        "docker-up": "docker-compose up -d",
        "dev": "run-s docker-up cpx sass all-run-watch",
        "all-run-watch": "run-p watch:*"
    },
    // 省略
}
```


### scssをwatchして自動コンパイル

[sass](https://www.npmjs.com/package/sass) を入れて、[onchange](https://www.npmjs.com/package/onchange) でwatchするようにしています。

ちなみに、今回用意したリポジトリでは、以下のようなディレクトリ構成にしています。

```
project-root/
  ├ dist/
  │  └ wp/
  │     └ wp-content/
  │         └ themes/
  │             └ theme-name/ **アップロードするテーマファイル**
  │                 ├ style/
  │                 │ ├ common.css
  │                 │ ├ front-page.css
  │                 │ ├ page-$slag.css
  │                 │ ︙
  │                 │ └ 404.css
  │                 ├ script/
  │                 │ └ main.js
  │                 ├ style.css
  │                 ├ front-page.php
  │                 ├ page-$slag.php
  │                 ︙
  │                 └ 404.php
  ├ src/
  │ └ theme-name/ **実際に操作するテーマファイル**
  │     ├ style/
  │     │ ├ include/
  │     │ │ ├ _reset.scss
  │     │ │ ︙
  │     │ │ └ _functions.scss 
  │     │ ├ common.scss **全ページに読み込むスタイル**
  │     │ ├ front-page.scss **フロントページの場合に読み込むスタイル**
  │     │ ├ page-$slag.scss **$slagページ（固定ページ）の場合**
  │     │ ︙
  │     │ └ 404.scss **404ページの場合**
  │     ├ script/
  │     │ └ main.js
  │     ├ style.scss **テーマの基本情報だけを記載**
  │     ├ front-page.php **フロントページ**
  │     ├ page-$slag.php **$slag（固定）ページ**
  │     ︙
  │     └ function.php **テーマの設定ファイル**
  ├ .gitignore
  ├ docker-compose.yml
  ├ package.json
  ├ package-lock.json
  └ README.md
```

上記のうち、Wordpressのファイルなどが含まれる `dist/` 配下は、Wordpressのバージョンや設定などによって、環境ごとに差分が出る可能性がある上、`src/` の中身をコンパイルなりコピーなりすれば制作したテンプレートは使えるため、`dist/` はGitで管理していません。

なので、`src/` 配下のファイルの変更を [onchange](https://www.npmjs.com/package/onchange) でwatchしつつ、拡張子に応じて、scssのコンパイルや、[cpx2](https://www.npmjs.com/package/cpx2) でのファイルコピーを行っています。


### functions.phpでページごとに読み込むCSSを変える

`header.php` に `<link rel="stylesheet" href="～` みたいな感じで書くのはあまりよろしくないらしいと聞いたので、頑張って `functions.php` で指定することにしました。

せっかくなので、ページごとに読み込むスタイルシートを分けるため、以下のような分岐を書きました。

```php
function loadscript() {
    wp_enqueue_style('original', get_template_directory_uri().'/style/common.css');
    
    if (is_front_page()) {
        // フロントページ
        wp_enqueue_style('front-page', get_template_directory_uri().'/style/front-page.css', array('original'));

    } else if (is_page()) {
        // 固定ページ
        global $wp_query;
        $post_obj = $wp_query->get_queried_object();
        $slug = $post_obj->post_name;

        wp_enqueue_style('page-'.$slug, get_template_directory_uri().'/style/page-'.$slug.'.css', array('original'));

    } else if (is_single()) {
        // 個別記事ページ
        wp_enqueue_style('single-post', get_template_directory_uri().'/style/single-post.css', array('original'));

    }
}

add_action('wp_enqueue_scripts', 'loadscript');
```

大まかに「フロントページ」「（フロントページ以外の）固定ページ」「個別記事（ブログ）ページ」の3つに分けて、固定ページはファイル名とスラッグを一致させることで、そのページだけのスタイルシートを呼び出しています。

`common.css` は全ページ共通で読み込み、ほかのスタイルシートを読み込む必要がある場合、`common.css` を最優先で読み込むようにしています。（`wp_enqueue_style()` の第3引数 `array('original')` がそれです）


### Gitlab CI/CD 

テーマ制作時、毎回確認用のサーバーにアップするのも面倒なので、Gitlab側にpushしたら自動でサーバーにFTPでアップロードしてもらう仕組みも作りました。最近これ系にハマってる。

```
deploy:
  stage: deploy
  image: node:lts # Dockerイメージの指定
  script:
    - npm install
    - npm run cpx
    - npm run sass
    - apt-get update -qq && apt-get install -y -qq lftp
    - lftp -c "set ftp:ssl-allow no; open -u $USERNAME_DEV,$PASSWORD_DEV $HOST_DEV; mirror -R $LOCAL $SERVER_DEV --parallel=10"
  rules:
    - if: $CI_COMMIT_BRANCH =~ /^dev-.*/ # dev-*** ブランチのときに実行する
```

ちなみに、事前に該当リポジトリの Setting > CI/CD > Variables で、以下の変数を設定する必要があります。

* **$HOST_DEV**：サーバーホスト名（例：`www.example.com`）
* **$USERNAME_DEV**：FTPのユーザー名
* **$PASSWORD_DEV**：FTPのパスワード
* **$SERVER_DEV**：サーバーディレクトリ（例：`/cms/wp-content/themes/`）
* **$LOCAL**：ローカルディレクトリ（例：`./dist/wp/wp-content/themes/`）

当初、`npm install` ～ `npm run sass` とFTPアップロードを別のjobとして定義していたのですが、`dist` がないよ！ってエラーが出たので、`script:` で生成したファイルやフォルダは、同じjobじゃないと参照できないようです。

（考えてみれば、jobごとに仮想環境立ててるはずだから当たり前か）

あと、`rules` で、`dev-` から始まるブランチ名のときだけ動作するように設定しています。ということは、`main` ブランチにmergeしたとき本番化する、みたいな運用も簡単にできそうですね。


## これからやりたいこと

現状、最初のセットアップさえしてしまえば、そのあとは静的ページの制作とさほど変わらずにやれるぐらいまでは用意できたんじゃないでしょうか！

ただ、完璧ってわけでもなく、今後用意していきたいことや、現状の悩みをまとめておこうと思ます。

### 記事データもシンクしたい

現状では、テーマファイルに含まれる部分であれば、ローカル⇔サーバー（Git）で同期がとれますが、管理画面上から追加した個別投稿や固定ページについては、それぞれの環境で作る必要があります。

この辺、DBも絡んでくることもあって苦手なんですよねぇ...

調べた感じ、[Wordpress REST API](https://developer.wordpress.org/rest-api/) があるようなので、いい感じに使えないか検証しようと思っています。


### CSSどこまで定義しておけばいいのか問題

個別投稿って、いろんな要素を想定しておかないとイケないけど、リセットCSSとか読み込ませた場合、どこまで定義する必要があるんだろう...というのが悩み。

Wordpressがデフォルトで当ててるスタイルもあると思うので、これは実際に見ながら調整する必要があるのか...🤔

ごちゃりそうで避けてたボイラープレートと呼ばれてるやつを素直に使うべきなのか...


### functions.phpどこまで定義しておけばいいのか問題

これもCSSと同じく。機能がありすぎてどこまで宣言するべきなのか...

---

1つ2つ案件こなしてみて、いい感じのテンプレートにまとまってきたら、Githubとかで公開しようかしら。