![blog-card](https://user-images.githubusercontent.com/54884080/99138597-10cf9200-2675-11eb-8e29-c4d47ad39913.png)

# 無趣味の戯言

僕の個人ブログ [無趣味の戯言 https://blog.udcxx.me/](https://blog.udcxx.me/) を管理するためのリポジトリです。

このドキュメントでは、リポジトリ全体の概要を記載します。

## :dolphin: 目次

* <a href="#about_blog">無趣味の戯言について</a>
* <a href="#technology">主な使用技術</a>
* <a href="#how_to_use">使用方法</a>
* <a href="#directory">ディレクトリ構成</a>
* <a href="#url">URL構成</a>
* <a href="#history">変更履歴</a>
* <a href="#contact">管理者への連絡</a>



<h2 id="about_blog"> :dolphin: 無趣味の戯言について</h2>

主に、日々気づいた技術的なTipsの備忘録を書き残す場として利用していきます。

Nuxt.jsやcontentを利用して静的デプロイし、一般的なレンタルサーバーから配信しています。


<h2 id="technology"> :dolphin: 主な使用技術</h2>

### Nuxt.js v3

フレームワークとして [Nuxt](https://nuxt.com/) を使用し、静的サイト生成（Static Site Generation, SSG）機能を用いて生成されたファイルをサーバー上に公開しています。

### Nuxt Content v2 

マークダウン形式（`*.md`）で記述された記事ファイルから各記事ページを生成・管理するために、 [Nuxt Content](https://content.nuxtjs.org/) モジュールを使用しています。

### ftp-deploy

生成されたファイルをサーバー上にアップロードするために、[ftp-deploy](https://www.npmjs.com/package/ftp-deploy) を使用しています。



<h2 id="how_to_use"> :dolphin: 使用方法</h2>

1. （初回のみ：リポジトリをクローンし、 `$ npm install` で必要なプラグインをインストールします。また、管理者から `secret-infos.js` を入手し、ルートディレクトリ配下に保存します。 ）
2. `content/` ディレクトリ配下に `YYMMDD` の形式でディレクトリを作成し、その中に `article-title.md` の形式で命名したマークダウンファイルに記事を保存します
3. 最後に `$ npm run blog` を実行することで、デプロイ・アップロードが完了し、公開されます :tada:



<h2 id="branch"> :dolphin: ブランチルール</h2>

### master

現在公開されているブログの基盤を管理するブランチです。

記事データはHello Worldのみを保持します。

### blog

記事の更新に使用するブランチです。

`master` ブランチが更新されたら、適宜取り込みますが、`master` ブランチにmergeする必要はありません。

記事データを用いたテストを行いたい場合には、`blog` ブランチから分岐したブランチに、`dev` ・ `fix` または `future` ブランチにて開発した内容をmergeし、テストを行います。

### {type}-{name}

上記に該当しない、ブログ基盤の更新や修正を行うためのブランチです。

例： `dev-update-to-nuxt3`

※ **type** に入力する項目例：

* `dev` ・・・新機能などを実装するブランチです
* `fix` ・・・バグなどを修正するブランチです
* `test` ・・・blogブランチのデータを用いてテストを行うためのブランチです
* `future` ・・・将来的な実装に向けて、試験的なブランチです



<h2 id="directory"> :dolphin: ディレクトリ構成</h2>

```
blog-udcxx-me
┣━━ .nuxt                    #触らない。gitignore対象
┣━━ .output                  #gitignore対象
┃   ┣━━ public               #このディレクトリ配下をサーバーにアップする
┃   ┗━━ server
┣━━ assets                   #共通で使うcss/画像を格納するディレクトリ
┃   ┣━━ css
┃   ┗━━ images
┣━━ components               #コンポーネント
┣━━ content                  #記事を管理するディレクトリ
┃   ┗━━ article
┃       ┗━━ 181208
┃           ┗━━ article-title.md
┣━━ dist                     #触らない。gitignore対象
┣━━ node_modules             #触らない。gitignore対象
┣━━ pages
┃   ┣━━ article
┃   ┃   ┗━━ [date]
┃   ┃       ┗━━ [slug].vue   #記事ページ
┃   ┣━━ tags
┃   ┃   ┗━━ [tag]
┃   ┃       ┗━━ [slug].vue   #タグ別の一覧ページ
┃   ┗━━ index.vue            #トップページ
┣━━ public
┣━━ static
┃   ┗━━ images               #記事内で使う画像を格納する
┣━━ .gitignore               #Gitで管理しないファイルを記載する
┣━━ .npmrc                   #npmの設定ファイル
┣━━ app.vue                  #全ページの枠になるファイル
┣━━ movecont.js              #移行に際して記事ファイルのディレクトリを
┃                             整えるために利用したスクリプト
┣━━ nuxt.config.ts           #nuxtの設定ファイル
┣━━ package-lock.json        #Nodeのパッケージファイル
┣━━ package.json             #Nodeのパッケージファイル
┣━━ README.md                #本ファイル
┗━━ tsconfig.json            #TSの設定ファイル
```


<h2 id="url"> :dolphin: URL構成</h2>

### [https://blog.udcxx.me/](https://blog.udcxx.me/)

- TOPページ
- 新着記事一覧（最新 6件）
- タグ別記事一覧（最新 3件ずつ）

### https://blog.udcxx.me/article/{YYMMDD}/{title}/

- 記事詳細ページ
- 例： [https://blog.udcxx.me/article/191001/hello-world/](https://blog.udcxx.me/article/191001/hello-world/)

### https://blog.udcxx.me/tags/{tag}/1/

- タグ別の記事一覧ページ

### [https://blog.udcxx.me/tags/new/1/](https://blog.udcxx.me/tags/new/1/)

- 新着記事一覧ページ


<h2 id="history"> :dolphin: 変更履歴</h2>

* 2019/10/01    ブログリリース
* 2020/11/14    Githubにソースコードを公開
* 2023/06/17    Nuxt.jsをv2→v3に移行 blog-udcxx-me v1.0.0 としてリリース [📓 ReleaseNote](https://github.com/udcxx/blog-udcxx-me/releases/tag/v.1.0.0)



<h2 id="contact"> :dolphin: 管理者への連絡</h2>

僕へのお問い合わせは [お問い合わせフォーム](https://udcxx.me/contact/) などからお気軽にどうぞ！

* [ポートフォリオサイト](https://udcxx.me/)
