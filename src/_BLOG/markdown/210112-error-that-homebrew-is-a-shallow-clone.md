---
title: 久しぶりにHomebrewをupdateしようとしたらエラーが出て進めなかった
date: 2020-01-12
tags: IT
eyecatch: 210112.jpg
description: Homebrewの実行時に Error: homebrew-core is a shallow clone. というエラーが出て処理を続行出来なかったので、その理由と対策方法について。
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

先程ふとHomebrewから git をアップデートしようとしたら下記のようなエラーが出てしまい、gitのインストールどころか、その手前のHomebrewのアップデートの段階でコケてしまって前に進めなくなってしまいました。

```
Error: homebrew-core is a shallow clone. To `brew update` first run:
  git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core fetch --unshallow
This restriction has been made on GitHub's request because updating shallow
clones is an extremely expensive operation due to the tree layout and traffic of
Homebrew/homebrew-core. We don't do this for you automatically to avoid
repeatedly performing an expensive unshallow operation in CI systems (which
should instead be fixed to not use shallow clones). Sorry for the inconvenience!
```

## 対処法

対処法は、言われたとおりに2行目のコマンドを実行するだけで完了です。

```
$ git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core fetch --unshallow
```

上記は環境によって出力が変わるようなので、ご自身のエラーメッセージからコピペするようにしてください。


## エラーの原因

エラーメッセージを訳すと下記のような内容になっています。

> shallow cloneの更新は、Homebrew / homebrew-coreのツリーレイアウトとトラフィックのために非常にコストのかかる操作であるため、この制限はGitHubのリクエストで行われました。    
CIシステムで高価なunshallow操作を繰り返し実行することを避けるために、これを自動的に行うことはありません（代わりに、shallow cloneを使用しないように修正する必要があります）。    
ご不便おかけしてすみません！

これまでのHomebrewは `shallow clone` という **変更履歴だけをクローンする方法** を使っていましたが、変更履歴を算出する際にGithub側に負荷を掛けてしまうため、Github側からのリクエストによって通常の完全なクローンを実行するように仕様変更したとのこと。

よって、これ以前にHomebrewがインストールされている環境下ではクローンの挙動を `unshallow` に変更する必要があるのですが、何度もこの処理を行ってしまうのを避けるため、手動でコマンドを実行してね！というメッセージでした。

Sorry for the inconvenience! とちゃんと謝ってるのがかわいいｗ


-----

## 参考

* [https://github.com/Homebrew/discussions/discussions/226#discussioncomment-147717](https://github.com/Homebrew/discussions/discussions/226#discussioncomment-147717)
