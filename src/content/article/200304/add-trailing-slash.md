---
title: Nuxt.jsでのURL表記を統一した【'20/12/04 追記】
date: 2020-03-04
tags: Blog Vue IT
eyecatch: 200304.jpg
eyecatchEmoji:
description: GAでURLがめちゃくちゃだったので、トレイリングスラッシュ付きに統一されるよう、Nuxt.jsの設定を見直しました
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

ふとGoogle Analyticsを覗いていると、同じページでもURL末尾のスラッシュの有無で別のページとしてカウント取られていて見づらかったし、そもそもなんかダサいと感じたので、統一してみることにしました。

## トレイリングスラッシュとは

URLの末尾に付くスラッシュのことを **トレイリングスラッシュ** と呼ぶらしいです。

ドメイン直後にくるトレイリングスラッシュに関しては、付いてても付いてなくても同じ意味で、実際にブラウザなどの挙動としてはスラッシュ付きの挙動に勝手に合わせられるようです。

つまり、下記2つは同じものとして（スラッシュ付きの方として）扱われます。

* https://blog.udcxx.me
* https://blog.udcxx.me/

それより深い階層に対しては、話が変わってきます。

* https://blog.udcxx.me/article/191001/hello-world
* https://blog.udcxx.me/article/191001/hello-world/

前者は **hello-worldというファイル** へ、後者は **hello-worldというディレクトリ** へのアクセスを意味するようです。

ただ、実際には、hello-worldというファイルが存在しなければ自動的にディレクトリへのアクセスだろうとみなし、トレイリングスラッシュを付けてリダイレクトさせている為、あまり意識しなくても問題になることは少ないかもしれません。

とはいえ、無駄なリダイレクトは防げるなら防いであげたいです。

## トレイリングスラッシュ付きへ統一

ここまでのことを踏まえると、このブログは記事タイトルと同名のディレクトリへアクセスしているという解釈が正解なので、トレイリングスラッシュを付けたURLを正として統一を進めていきます。

### trailing Slashオプションの設定

Nuxt.jsの標準機能としてv2.10以降に `router.trailingSlash` オプションが追加されています。ただ、これをつけるだけでn-linkがトレイリングスラッシュ付きになるわけではない上、トレイリングスラッシュ無しのURLが無効扱いになってしまうようです。

参考： [API: router プロパティ - NuxtJS](https://ja.nuxtjs.org/api/configuration-router/#trailingslash)

いまいちメリットを理解出来ていませんが、ノリで設定しておくことにしました。 `nuxt.config.js` に下記を追記するだけで有効になるようです。

###### 静的デプロイするならあんまり意味ないかも...？

```
export default {
	router: {
		trailingSlash: true
	}
}
```

### 記事一覧のコンポーネントの修正

記事一覧画面や、記事ページ下の新着記事の部分はコンポーネント化されているので、1つのファイルを編集するだけで全てに適用されます。コンポーネント化するメリットですね！

```
<n-link :to="'/article/' + fileMap[sourceJson]['sourceBase'].replace('.md','').replace('-','/') " class="notscroll" >
```

↑こう書かれていたものを    
↓こう書き換えました

```
<n-link :to="'/article/' + fileMap[sourceJson]['sourceBase'].replace('.md','').replace('-','/') + '/'" class="notscroll" >
```


実は結構無理やり（replace頼りで）実装していたのがバレますね（恥

注目すべきはそこではなく、 `:to=` の最後に `+ '/'` が追加されている点です。これだけで、記事一覧や、新着記事のリンクがトレイリングスラッシュ付きで出力されます。

### .htaccessの編集

Nuxt.jsのtrailingSlashオプションを使っているので、URLの末尾にスラッシュが入っていないと無効になってしまう的なことが書かれていて、外部から万が一スラッシュ無しで流入してきた時にどのような挙動になるか不安だったので `.htaccess` で強制的にスラッシュ付きにリダイレクトさせるようにしておきました。

htaccessって毎回コピペ継ぎ接ぎで利用していたのでこれが正しいのか、自信無いです...。

```
RewriteEngine on
	# www無しに統一
    RewriteCond %{HTTP_HOST} ^www\.blog\.udcxx\.me$
    RewriteRule ^(.*)$ https://blog.udcxx.me/$1/ [R=301,L]

	# httpsに統一
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://blog.udcxx.me/$1/ [R=301,L]

	# トレイリングスラッシュありに統一
    RewriteCond %{REQUEST_URI} !/$
    RewriteCond %{REQUEST_URI} !\.[^/\.]+$
    RewriteRule .* %{REQUEST_URI}/ [R=301,L]
```

**参考：** [.htaccessファイルで末尾のスラッシュを自動補完する - ノウハウブログ - カンタローCGI](https://kantaro-cgi.com/blog/web-server/htaccess_tail_slash.html)

-----

これでGoogle Analyticsの計測も見やすくなるかな...。

-----

## 【2020/12/04 追記】

Nuxt.js側の設定が良かったのか、htaccessの設定が功を奏したのか定かではありませんが、結果として、Google Analyticsのレポートは読みやすくなりました！！
