---
title: ブログを修正アップデートしました
date: 2019-11-01
tags: Blog Vue IT
eyecatch: 191101.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

ハロウィンでしたね。

~~ということで~~ 下記の箇所を修正しました。

* Instagramへのリンクを、トップではなく、マイページに変更（ `instagram.com` → `instagram.com/udcsk` ）
* OGタグのタイトルが `title` で固定されてしまっていたので、記事名が入るように修正

1つ目は、リンク修正するだけなのですぐ完了。

2つ目は、コンポーネント側に上書きする記述があったのでそれを削除しました。コンポーネント化するときはなるべく使い回しがしやすいように設計しなきゃですね（そもそも変数をアポストロフィーで括るおちゃめさも悪い）