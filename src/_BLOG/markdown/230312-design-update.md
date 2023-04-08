---
title: ブログのデザインアップデート
date: 2023-03-12
tags: Blog Vue IT
eyecatch:
eyecatchEmoji: 🎊
description: 久しぶりにデザインのアップデートを行いました！
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

ブログをNuxt.jsで作り変えた2019年10月から約3年半が経過しましたが、ようやくデザインのアップデートを行いました！

あまり印象は変えない程度に、特にPCでの見た目の変更しました。

## 変更点

主な変更点は、以下の通りです。

* フォントを **Noto Sans** から **BIZ UD Gothic** に変更
* アイキャッチの代わりに、絵文字を設定できるように変更
* PCで見たときの記事ページの構成を2カラムに変更
* TOPページ・記事下に表示される記事一覧の記事数を変更

### フォント変更

個人的な感覚ですが、NotoSansに飽きたというか、あまり気にくわなかったので、M+と迷った上で、 [BIZ UDGothic](https://fonts.google.com/specimen/BIZ+UDGothic) を採用しました。

### アイキャッチの代わりに、絵文字を設定できるように

1記事1枚ずつ画像が増えていくのが後々ネックになっていきそうだと感じていたので、 [Zenn](https://zenn.dev/) の記事ページからインスピレーションを受けて（パクって）、このタイミングで思い切ってアイキャッチを絵文字に切り替えました。

ただ、これまでの過去記事すべてに画像のアイキャッチを用意しているので、一覧画面などでは、しばらく画像のアイキャッチも残していきます。追々、一覧画面も絵文字のアイキャッチに合わせた構成に変更していく予定です。

## 2カラムに変更

スマホファースト、というか、Nuxt.jsでブログを動かすことに精一杯で、レスポンシブまで手が回ってなかったので、PCビューは放置してしまっていたところ、ようやく手をいれることができました。

こちらも [Zenn](https://zenn.dev/) のインスピレーションで、左に本文、右に記事情報を表示するような構成にしました。

## 一覧の記事数を変更

いままで1画面に9記事しか表示されていなかったところを、16記事まで増やしました。

記事下に表示している新着記事も、3記事から5記事に増やしています。

---

3年前に自分で書いたCSSを書き換えるのは結構骨が折れる作業でした... 3年で自分も知識や考え方に変化があるんだと認識させられます。

サイズ感とかがまだ気になるので、まだ調整を続けていくつもりですので、フィードバックあれば [Twitter](https://twitter.com/udc_xx) などでお知らせください！