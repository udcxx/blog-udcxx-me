---
title: Markdown用のリンクを生成するブックマークレット
date: 2022-07-26
tags: IT
eyecatch: 220726.png
description: ワンクリックでMarkdown用のリンクを生成するブックマークレットを作成しました。文字選択したらそこをタイトルに使うこともできます！
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

本業で参考情報をかき集める作業があり、そのとき指定のフォーマットでサイト名とURLを記載するのですが、そこをワンクリックで済むように効率化するべく、簡単なブックマークレットを作成しました。

仕事で使ってるものをそのまま公開しても汎用性がないので、この記事では吐き出すフォーマットをいじって、Markdown形式でさくっとクリップボードに保存できるようにしたものを紹介します。

ちなみに、このブログの記事自体もMarkdownで書いているので、参考リンクの生成がめっちゃ楽になりました。ちょっといじれば、Amazon用のリンクにしたりと応用も効くと思います。

## ソース

ほい。

```
javascript:(function(){t = window.getSelection().toString() ? window.getSelection().toString() : document.title;e = document.createElement('textarea');e.textContent = '[' + t + '](' + document.URL + ')';document.body.appendChild(e);e.select();document.execCommand('copy');e.remove();})();
```

一瞬だけテキストエリアを作成して、そのtextContent内でURLとタイトルをフォーマットし、それをコピーして、作成したテキストエリアを削除する、といった処理になってます。


## 使い方

ブックマークを新規追加するか、どこか適当なページをブックマークして、そのブックマークを編集する画面で、URLを入力する欄に、上記のソースをコピペします。

あとは、リンクを生成したいページを開いて、保存したブックマークをクリックするだけです。ページのtitleとURLを使って、Markdownのリンク形式でクリップボードに保存されるので、利用したい場所へ貼り付けを行うと、リンクがペーストされます。

```
[無趣味の戯言で今後やっていきたいこと](https://blog.udcxx.me/article/220605/future-blog-udcxx-me/)
```

![](/images/220726_1.jpg)

さらに、ページ内の文字が選択されてる状態でブックマークをクリックすると、選択されている文字列をtitleの代わりに利用して、保存する仕様です。なので、ちょっとtitleが思わしくない設定になっているときには、見出しとかを選択した状態で利用するといい感じになると思います。

```
[やっていきたい](https://blog.udcxx.me/article/220605/future-blog-udcxx-me/)
```

![](/images/220726_2.jpg)


---

こういう小さい効率化ができたときって、生きがいを感じて小さくガッツポーズしちゃうよね💪

* [window.getSelection - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Window/getSelection)
* [開いているWebページのタイトルとURLをクリップボードにコピーするブックマークレット（＋ダイアログ版） - 晴歩雨描](https://2ndart.hatenablog.com/entry/2019/07/19/121348)
