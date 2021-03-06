---
title: Gitのアカウントをリポジトリごとに使い分ける
date: 2020-03-03
tags: IT
eyecatch: 200303.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

みなさんGit使ってますか？僕は業務でも、プライベートでも、Gitの恩恵を受けまくっています！このブログもプライベートなGithubで管理されています。

## 複数のアカウントを使い分けたい

Gitをガンガン使っていると、複数のGithubアカウントをリポジトリごとに使い分けたい日が来るかもしれません。僕は来ました←

~~べ、別に、会社でプライベートなソースを触ったり、仕事の合間にブログ更新したりしてないんだからねっ~~

そんな時は、clone後にひと手間加えるだけで、そのリポジトリに対するGithubアカウントを設定することが出来ます。

## clone後に行う設定

リポジトリをcloneしてきた後、そのディレクトリの中に移動した状態で、下記を順に実行します。

```
$ git config --local user.name "GitアカウントのID"
$ git config --local user.email "Gitアカウントのメールアドレス"
```

clone後1回だけこの設定を行えば、このリポジトリに関しては設定したユーザー名とメールアドレスとしてコミットが残るようになります。

逆にこの設定を忘れてしまうと、 `~/.gitconfig` **に設定されているID・メールアドレスが適用されてしまう** ので注意が必要です。メインで使うアカウントをルート側（ `~/.gitconfig` ）に設定し、サブで使うアカウントは個別のlocalで設定するイメージです。

## 設定の確認方法

対象のディレクトリに移動した状態で下記のコマンドを叩けば設定ファイルの中身が確認できます。先程の設定が反映されているか、 **事前に確認することをおすすめします。**

```
$ cat .git/config
```

設定ファイルの中の `[user]` **が先程設定したアカウント・メールアドレスになっていれば成功です！**

また、コミットログからでも確認することが出来ます。何かコミットを作った後で `$ git log` を実行するとコミットのログが表示されるので、その中の `Author` **欄に先程設定したアカウントが記録されていれば成功です！** ただ、この方法だと一度何かコミットする必要があるので、万が一設定がうまくいってなかった場合、コミットログの編集が必要になるので、事前に `$ cat .git/config` で確認する方が安全かもしれません。

-----

そもそも、1つのアカウントでやれればいいんですけどね...。

【参考】 [複数のgitアカウントを使い分ける - Qiita](https://qiita.com/0084ken/items/f4a8b0fbff135a987fea)
