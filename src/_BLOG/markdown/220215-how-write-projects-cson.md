---
title: projects.cson の書き方
date: 2022-02-15
tags: IT
eyecatch: 220215.jpg
description: Atomでプロジェクトを切り替えてくれるパッケージ「project-plus」が参照するプロジェクト一覧のファイルの書き方
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

周りが VSCode に乗り換えていってるのを見つつも、未だにAtom信者してます。

そんなAtomの便利パッケージ [Project Plus](https://atom.io/packages/project-plus) の設定ファイル `projects.cson` の書き方がわからずずっと放置してたのをやっと解決したのでメモ。都度ブログにメモっておかないとわかんなくなっちゃうんですよね。

[Project Plus](https://atom.io/packages/project-plus) の説明は記事後半で。


## 書き方

※ Windows の場合

`C:\Users\{UserName}\.atom` に `projects.cson` ってファイルがあるので（なければ作成）中身を下記にする。

```
[
  {
    title: 'Project A'
    paths: [
      'C:/paths/to/project/a'
    ]
  },
  {
    title: 'Project B'
    paths: [
      'C:/paths/to/project/b'
    ]
  },
]
```

特に難しいことはなさそうなのに、何に詰まっていたのかというと、パスの区切り文字に悩まされていました。パスをエクスプローラーのアドレスバーからコピペすると `\` で区切られているので、それを `/` に書き換える必要がありました。

意外と基礎的なことかもしれないのですが...

ちなみにMacの場合も全体の形は同じで、パスの書き方を変えてあげればよかった気がする... 多分。

そもそもなぜか僕の環境（Windows/Atom1.59.0）だと `Ctrl` `Shift` `P` から `Project Plus: Save` しても効かなかったのが問題で、普通はそれで保存していけば設定ファイルの中を見る必要もないし、いちいち保存が面倒で一気に書きたいときでも、一度保存して、あとは書き方真似ればいいだけだから迷わないはず...


## Project Plus とは

[Project Plus](https://atom.io/packages/project-plus) は、Atomのパッケージで、プロジェクトを切り替えてくれるというもの。

左側のプロジェクトツリーも変わるし、[PlatformIO IDE Terminal](https://atom.io/packages/platformio-ide-terminal) でターミナルを立ち上げたときのカレントディレクトリも、プロジェクトごとのディレクトリに変わるので、複数のプロジェクトを同時に進行するときなどに重宝します。

僕の場合、副業のプロジェクトを触りつつブログを書いたりと、「Atomを起動したら必ずこのプロジェクトを触る！」みたいに決まってないので、Project Plusの恩恵をより受けてます。

使い方は `Ctrl` `Alt` `P` を押してプロジェクト名を数文字入れればサジェストしてくれるので、それを選択するだけです。わざわざ「フォルダを開く」から開く必要も無いし、なんならマウスを触る必要すらありません。キーボードだけで操作できるので早いし、何よりかっこいいのがお気に入りです。
