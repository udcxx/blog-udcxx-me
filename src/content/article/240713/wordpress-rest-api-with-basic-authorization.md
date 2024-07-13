---
title: WP APIをBasic環境下で利用したい
date: 2024-07-13
tags: Web IT
eyecatch: 
eyecatchEmoji: 🔒
description: Basic認証が有効な環境にあるWorpdressでもWorpdress REST APIを利用する術を考えます
---

こんにちは。だいちゃんです。

Wordpressでは、バージョン4.7.0以降からREST APIを搭載しているらしく、今回ちょっと記事の移行なんかに使えないかなと思い、試してみたことをまとめておきます。

## （Basic認証下で）Wordpress REST APIを有効にするステップ

1. [JWT Authentication for WP REST API](https://ja.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)をインストール・有効化する
2. `wp-config.php` を書き換える
3. `.htaccess` を書き換える

### wp-config.php の書き換え方

以下を追記します：

```php
define( 'JWT_AUTH_SECRET_KEY',  '***' );
```

`***` の部分は、[ここ](https://api.wordpress.org/secret-key/1.1/salt/)で生成した秘密鍵を入れることが推奨されてるみたい。


### .htaccess の書き換え方

[issue](https://github.com/Tmeister/wp-api-jwt-auth/issues/1)でもいろんな書き方があって、うまく行った人もうまくいかない人もいるらしいので自己責任で。

僕はこんな感じで書いたらうまくいきました：

```htaccess
SetEnvIf X-Authorization "(.*)" HTTP_AUTHORIZATION=$1

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /project/index.php [L]
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
</IfModule>
```

ポイントは1行目。

今回使ってるプラグインは、Authorizationを見て認証してるんだけど、みなさんご存知、Basic認証も `Authorization` ヘッダー使ってるから、競合して認証が通らないわけです。

んで、今回はドメイン直下でBasic認証をし、その下層ディレクトリにWPを入れてるので、WP側にたどり着くときにはBasic認証を突破してるはずなので、JWT用の認証情報は `X-Authorization` に一旦持たせておいて、WP側の.htaccessで`Authorization` ヘッダーに上書きしてます。

これで、二段階の認証を突破することができました。

Special Thanks：[Basic認証とBearer認証を同時に利用する - yasudacloudの日記](https://yasuda.cloud/entry/2023/06/07/204321)


## JWT認証を選んだ理由

[前回](https://blog.udcxx.me/article/240709/environment-wordpress/)、ローカルで作ったWordpressのテーマを、Gitlab CD/CIとかを駆使して、自動で検証サーバー上のWordpressに展開したりできる開発環境を整備しましたが、テーマファイルで管理されない投稿記事については、それぞれの環境で用意する必要がありました。

そこで、Wordpress REST APIを使えば、記事を同期するしくみを作れるんじゃね？と思ったのがきっかけです。

でも、サーバー側のWordpressは公開前のテスト用環境のため、Basic認証が掛かっています。Wordpress標準のアプリケーションパスワードを使った認証だとBasic認証との併用がサポートされていないので、 [JWT Authentication for WP REST API](https://ja.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) というプラグインでJWT認証を行うことにしたというわけ。


---

↑の.htaccessの書き方したら、Basic認証とアプリケーションパスワードの併用もいけそうじゃね？？

あと、ドメイン直下にWordpress入れてたらこの技使えない...？

---

**参考**

* [Basic認証とBearer認証を同時に利用する - yasudacloudの日記](https://yasuda.cloud/entry/2023/06/07/204321)
* [WordPress REST APIでJWT認証を利用してWordPressを操作する方法 | N-LAB](https://n-laboratory.jp/articles/wp-rest-api-jwt)
* [Tmeister/wp-api-jwt-auth](https://github.com/Tmeister/wp-api-jwt-auth)