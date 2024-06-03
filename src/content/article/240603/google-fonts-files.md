---
title: GoogleFontはデバイスごとに出し分けてるっぽい
date: 2024-06-03
tags: IT
eyecatch: 
eyecatchEmoji: ❓
description: 【未解決】Google Fontはデバイスごとにフォントファイル（.woff2）を出し分けてるようです。
---

こんにちは。だいちゃんです。

先日から、ブログの絵文字が表示されない問題に直面しています。

Google Fonts の `Noto Color Emoji` を使う際、 `@font-face` を自前で用意したことが原因なのはわかっているのですが、どうも納得がいかず調査してみました。

まだ納得してないですが、一応中途報告ということで。

## デバイスによって、呼び出すフォントファイルを出し分けてる

まず、前提として、GoogleFontsを使うときは、[ここ](https://fonts.google.com/) から `https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap` みたいなCSSファイルのパスをもらって、ページの `<head>` 内から呼び出すフローになってます。

そして、このCSSファイルの中身はというと、以下のように、`unicode-range` ごとに細かく分割された `@font-face` がズラーッと記載されています。

```css
/* [0] */
@font-face {
  font-family: 'Noto Color Emoji';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notocoloremoji/v30/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFabsE4tq3luCC7p-aXxcn.0.woff2) format('woff2');
  unicode-range: U+1f1e6-1f1ff;
}
```

`unicode-range` ごとにフォントファイルを分割しているのは、ページ内に存在しない文字の分のフォントをダウンロードすることを避けて、パフォーマンスを維持することが目的っぽいです。

それはいいとして、Google Fontsでは、デバイスのUserAgentを見て、このCSSファイルを出し分けてるようです。差は `src:` の部分。 `WOFF2` 形式のフォントファイルがデバイスごとに異なるものを指定していました。謎。


## デバイスごとの呼び出されるファイルパス

正確には、UserAgentごとに異なるよう。つまり、DevToolでUA書き換えれば検証できそうだったのでしました。

各デバイスで検証していないので、正しくないかも。

### Windows / Chrome

![](/images/240603-1.png)

指定したUA：

```
Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
```

返されたCSSに記載のフォントファイルパス：

```
https://fonts.gstatic.com/s/notocoloremoji/v30/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFabsE4tq3luCC7p-aXxcn.0.woff2
```

フォントファイルのサイズ：687.12 KB


### iOS (iPhone) / Chrome

![](/images/240603-2.png)

指定したUA：

```
Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.0.0 Mobile/15E148 Safari/604.1
```

返されたCSSに記載のフォントファイルパス：

```
https://fonts.gstatic.com/s/notocoloremoji/v30/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFabts6diysYTngZPnMC1MfLd4hQ.0.woff2
```

フォントファイルのサイズ：1.11 MB


### MacOS / Chrome

![](/images/240603-3.png)

指定したUA：

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
```

返されたCSSに記載のフォントファイルパス：

```
https://fonts.gstatic.com/s/notocoloremoji/v30/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFabts6diysYTngZPnMC1MfLd4gw.0.woff2
```

フォントファイルのサイズ：687.12 KB


### iOS (iPhone) Safari

![](/images/240603-4.png)


指定したUA：

```
Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1
```

返されたCSSに記載のフォントファイルパス：

```
https://fonts.gstatic.com/s/notocoloremoji/v30/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFabts6diysYTngZPnMC1MfLc.0.woff2
```

フォントファイルのサイズ：1.79 MB


## わからなかったこと

* 拡張子はみな `woff2` なのに、Windows/Chrome用のファイルをiOS/Safariで読み込むと、ダウンロードされるものの、表示に失敗して、真っ白になる理由
* iOS 向けのファイルサイズのほうがデカい
* `woff2` の中身をサクッと見れるツールが見当たらない

---

素直にGoogleが提供するCSSを読み込めばいい気がしてきた。ただ、なにかで詰んでこの方法にしようと思ったと思うんだよなぁ。

**参考**

* [「Google Fonts」にWOFF2以外のフォントをリクエストする方法 | 株式会社LIG(リグ)｜DX支援・システム開発・Web制作](https://liginc.co.jp/426707)
* [検証用に作ったページ](https://play.udcxx.me/24-blog-emoji/240603.html)