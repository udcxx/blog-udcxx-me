![blog-card](https://user-images.githubusercontent.com/54884080/99138597-10cf9200-2675-11eb-8e29-c4d47ad39913.png)

# 無趣味の戯言

僕の個人ブログ [無趣味の戯言 https://blog.udcxx.me/](https://blog.udcxx.me/) を管理するためのリポジトリです。

このドキュメントでは、リポジトリ全体の概要を記載します。

## :dolphin: 目次

* <a href="#about_blog">無趣味の戯言について</a>
* <a href="#technology">主な使用技術</a>
* <a href="#how_to_use">使用方法</a>
* <a href="#url">URL構成</a>
* <a href="#history">変更履歴</a>
* <a href="#contact">管理者への連絡</a>



<h2 id="about_blog"> :dolphin: 無趣味の戯言について</h2>

主に、日々気づいた技術的なTipsの備忘録を書き残す場として利用していきます。

フレームワークにはAstroを利用して、静的デプロイの上、Cloudflare Workersから配信しています。


<h2 id="technology"> :dolphin: 主な使用技術</h2>

### Nuxt.js v3

フレームワークとして [Astro](https://astro.build/) を使用し、静的サイト生成（Static Site Generation, SSG）機能を用いて生成されたファイルを Cloudflare Workers 上に公開しています。

### Cloudflare Workers

生成された静的サイトは、GitHub Actions 連携経由で [Cloudflare Workers](https://www.cloudflare.com/ja-jp/developer-platform/products/workers/) へ自動デプロイされます。


<h2 id="how_to_use"> :dolphin: 使用方法</h2>

1. （初回のみ：リポジトリをクローンし、 `$ npm install` で必要なプラグインをインストールします。）
2. `src/content/blog/` ディレクトリ配下に `YYMMDD` の形式でディレクトリを作成し、その中に `article-title.md` の形式で命名したマークダウンファイルに記事を保存します
3. `blog` ブランチに push することで、GitHub Actions が自動的にビルドおよび Cloudflare Pages へのデプロイを実行します :tada:



<h2 id="branch"> :dolphin: ブランチルール</h2>

### main

現在公開されているブログを管理するブランチです。

### {type}-{name}

上記に該当しない、ブログ基盤の更新や修正を行うためのブランチです。

例： `dev-update-to-nuxt3`

※ **type** に入力する項目例：

* `dev` ・・・新機能などを実装するブランチです
* `fix` ・・・バグなどを修正するブランチです
* `test` ・・・blogブランチのデータを用いてテストを行うためのブランチです
* `future` ・・・将来的な実装に向けて、試験的なブランチです


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
* 2026/11/05    FWをAstroに移行



<h2 id="contact"> :dolphin: 管理者への連絡</h2>

僕へのお問い合わせは [お問い合わせフォーム](https://udcxx.me/contact/) などからお気軽にどうぞ！

* [ポートフォリオサイト](https://udcxx.me/)
