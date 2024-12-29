---
title: PHPで禁則処理を強引にやる
date: 2024-12-30
tags: Web IT
eyecatch: 
eyecatchEmoji: 🖼️
description: PHPを使って、元画像に任意の文字を埋め込んで、新たな画像を生成するツールを作ってみました。の続き。
---

こんにちは。だいちゃんです。

[昨日](https://blog.udcxx.me/article/241229/text-on-image/) の続きです。

* [文字を埋め込んだ画像を生成するツール作った](https://blog.udcxx.me/article/241229/text-on-image/)

長過ぎる文字がはみ出ちゃう問題を修正してみよう。

## 結果

![](https://play.udcxx.me/24-text-on-image/images/E38193E3828CE381A7E3818AE3819DE38289E3818FE995B7E38184E995B7E38184E382BFE382A4E38388E383ABE3818CE585A5E381A3E381A6E3818DE381A6E38282E381A1E38283E38293E381A8E381AFE381BFE587BAE3819AE381ABE8A1A8E7A4BAE381A7E3818DE3828B.jpg)

[https://play.udcxx.me/24-text-on-image/?title=これでおそらく長い長いタイトルが入ってきてもちゃんとはみ出ずに表示できる](https://play.udcxx.me/24-text-on-image/?title=%E3%81%93%E3%82%8C%E3%81%A7%E3%81%8A%E3%81%9D%E3%82%89%E3%81%8F%E9%95%B7%E3%81%84%E9%95%B7%E3%81%84%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%81%8C%E5%85%A5%E3%81%A3%E3%81%A6%E3%81%8D%E3%81%A6%E3%82%82%E3%81%A1%E3%82%83%E3%82%93%E3%81%A8%E3%81%AF%E3%81%BF%E5%87%BA%E3%81%9A%E3%81%AB%E8%A1%A8%E7%A4%BA%E3%81%A7%E3%81%8D%E3%82%8B)

## やったこと

指定文字数で改行するようにしました。

全体が60文字以内なら20文字ごとに、それ以上ならフォントサイズを20pxにしたうえで35文字ごとに改行するようにしています。

ついでに、禁則処理を入れて、英単語の途中とか、ひらがな・カタカナの小さい文字（「っ」とか）で改行されないようにしました。

```php
$fontsize = 36;
$breakpoint = 20;

if (mb_strwidth($title, 'UTF-8') > 120) {
    // 全体が60文字（= 20文字 * 3行）以上ならフォントサイズ変更 + 改行位置も変更
    $fontsize = 20;
    $breakpoint = 35;
}

if (mb_strwidth($title, 'UTF-8') > $breakpoint * 2) {
    $max_count = mb_strwidth($title, 'UTF-8') / $breakpoint * 2;

    // 禁則処理に該当する文字
    $specialChars = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'ー', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ッ', 'ャ', 'ュ', 'ョ', 'ヮ', '、', '。', '（', '）', '「', '」', '【', '】', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'っ', 'ゃ', 'ゅ', 'ょ', 'ゎ'];

    $last_pos = 0;
    for ($count = 0; $count < $max_count; $count++) {
        for ($pos = $breakpoint + $last_pos; $pos > $last_pos; $pos--) {
            $char = mb_substr($title, $pos + 1, 1, 'UTF-8');

            if (!in_array($char, $specialChars)) {
                // 禁則処理に触れない = 改行OK
                $title = mb_substr($title, 0, $pos + 1)."\n".mb_substr($title, $pos + 1);
                $last_pos = $pos - 1;
                break;

            } else if ($pos === $last_pos) {
                // 禁則処理だらけなら強制改行しちゃお！
                $title = mb_substr($title, $last_pos, $last_pos + $breakpoint)."\n".mb_substr($title, $last_pos + 1);
                $last_pos = $pos;
                break;
            }
        }
    }
}

$angle = 0;
```

いろいろ試したわけではないけど、ある程度耐えられそうなところまできました。

ハマりポイントとしては、`mb_strwidth()` は全角文字を2としてカウントするけど、`mb_substr()` は全角文字も1でカウントしちゃう点ですかね。`$breakpoint` をいい感じに使いまわしたかったのに...

`mb_strwidth()` は文字の **幅** を返してるから仕方ないんだけど。

---

PHP苦手だけど、ドキュメントはしっかりしてるのがいいね。結構助けられてる。

* [PHP: mb_substr - Manual](https://www.php.net/manual/ja/function.mb-substr.php)
* [PHP: mb_strwidth - Manual](https://www.php.net/manual/ja/function.mb-strwidth.php)