---
title: Safariで絵文字が表示されない問題
date: 2024-12-11
tags: IT
eyecatch: 
eyecatchEmoji: 😱
description: 長い間、Safariで絵文字が続いていたのでやっと対処しました
---

こんにちは。だいちゃんです。

ブログのデザインをリニューアルしたタイミングから、アイキャッチ画像の代わりに絵文字を使うようになり、さらに、OSごとの差異をなくしたくて（特にWindowsの絵文字がダサい）Noto Color EmojiというWEBフォントを利用しています。

しかし、このNoto Color Emoji自体にバグがあるっぽくて、Safariでうまく表示できない現象がずっと続いています。

一度は [対処っぽいっことをしてみた](https://blog.udcxx.me/article/240603/google-fonts-files/) ものの改善せずでした。

でもよく考えてみると、現象が発生しているSafariが使えるMac/iOSでは、デフォルトの絵文字が結構きれいなので、今回は思い切って **SafariではNoto Color Emojiを使わない** 方向で対処してみました。

## Webkit系だけ標準のフォントを利用する

Noto Color Emojiを使っている箇所に、以下のCSSを当てました：

```css
::-webkit-full-page-media, :future, :root .postitem--eyecatchemoji {
    font-family: -apple-system, serif;
}
```

`::-webkit-full-page-media, :future, :root` のあとにClass名などを指定することで、webkit系（Safariなど）にだけCSSを適用することができるようです。

---

もう一回ちゃんとGoogle Fontsから読み込めるようにしたいな...