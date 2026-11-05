---
title: VSCodeでBizin Gothicを使う
date: 2024-06-06
tags: IT
eyecatch: 
eyecatchEmoji: 🆚
description: コーディング用フォント Bizin Gothic をインストールして、VS Code のフォントに設定しました。
---

こんにちは。だいちゃんです。

前職でガンガンコーディングしてた頃は、プログラミングフォントの [Ricty Diminished](https://rictyfonts.github.io/diminished) を愛用していましたが、結構前からメンテナンスが終了していたのもあって、最近では特にフォントにこだわらずにいました。

* [PowerShellのフォントとか色をカスタマイズしてみた | 無趣味の戯言](https://blog.udcxx.me/article/210216/power-shell-customize/)
* [会社PCの設定備忘録 | 無趣味の戯言](https://blog.udcxx.me/article/210306/pc-setup-memo/)
* [MacBookの設定備忘録 | 無趣味の戯言](https://blog.udcxx.me/article/230420/mac-setup/)

ほかのフォントに乗り換えようかとも思ったのですが、そもそも日本語に対応しているプログラミングフォントが少ないんですよねぇ...。

そんな中、Rictyと似た日本語対応プログラミングフォントとして **Bizin Gothic** (ビジン・ゴシック) がリリースされたと知り、さっそく試してみました。

## Bizin Gothicとは

このブログでも採用している BIZ UD ゴシックと、過去に愛用していたRictyでも採用されていたInconsolataが組み合わされ、微調整が加わった、プログラミングなどに最適なフォントです。

プログラミングフォントを入れるメリットは、読みやすさ以外にも、文字の幅が一定だったり、記号が普通のフォントよりもはっきり見えるように調整されているため、見間違いやタイピングミスを防ぎやすくなる点にあります。    
全角スペースも見えるようになるので、半角スペースとの間違いにも気づけます。

ただ、フォントがキレイだとやる気が出る（汚いとやる気が起きない）のが一番のメリットですね。


## VS Code への設定方法

早速、Bizin Gothic を VS Code (Visual Studio Code) で使っていきます。

まず、[Releases](https://github.com/yuru7/bizin-gothic/releases) ページの Assets から必要なzipファイルをダウンロードします。

※ 僕は BizinGothic_v0.0.2.zip をダウンロードしました。

ダウンロードしたzipファイルを展開後、2つの .ttf ファイルを開いてインストールをクリックします（Windowsの場合）

フォントのインストールが済んだら、VS Code の画面左上の `ファイル > ユーザー設定 > 設定` （または `Ctrl` + `,` ）から設定画面を開き、検索窓に `font famiily` と入力して **Editor: Font Family** を探します。

あとは、入力欄の先頭へ以下のように入力して、Bizin Gothic を指定するだけです。

```
'Bizin Gothic',
```

![$1](/240606.png)

僕の場合、最後にVS Codeの再起動が必要でした。

---

**参考**

* [日本人プログラマー向けコーディングフォント「Bizin Gothic」が無償公開 - 窓の杜](https://forest.watch.impress.co.jp/docs/news/1596755.html)
* [GitHub - edihbrandon/RictyDiminished: Ricty Diminished --- fonts for programming](https://github.com/edihbrandon/RictyDiminished?tab=readme-ov-file)
* [GitHub - yuru7/bizin-gothic: Bizin Gothic は、ユニバーサルデザインフォントの BIZ UDゴシック と英文フォント Inconsolata を合成したプログラミング向けフォントです。](https://github.com/yuru7/bizin-gothic)