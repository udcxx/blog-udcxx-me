---
title: Atomのstylelintをカスタマイズする
date: 2019-12-28
tags: IT
eyecatch: 191228.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

先日紹介しましたが、愛用してるエディタ Atom に構文チェック用のプラグイン linter を入れて、htmlとcssを書きながらチェックしてくれるようにしています。

ただ、stylelintの判定が少し僕には合わなかったので、ちょっとカスタマイズしてみることにしてみました。

## 400箇所に指摘が入った

案件で1,000行ちょいのcssを書いてたのですが、stylelintを導入した後に再度そのファイルを開いてみると400箇所に指摘が入ってしまいました。

エラーではなくワーニングだったのでクリティカルなミスではありませんが、ここまで大量の指摘をされると見過ごすわけには行きませんw なかでも9割ほどは、1行に複数のプロパティを指定したことを指摘していました。

こんな感じ

```
.hoge {
  background-image: url("hogehogehoge");
  background-size: cover; background-position: center center; background-repeat: no-repeat;
}
```

このような感じで、似たプロパティはまとめて書いてしまう癖があり（font系・border系など）、それが全て指摘されてしまうという事態になっていました。

ショートハンドに慣れれば良いかとも思いましたが、メディアクエリで書き換える時とかは注意しないと [他のプロパティがリセットされちゃうことがある](https://developer.mozilla.org/ja/docs/Web/CSS/Shorthand_properties) ので（それくらい考えろよ）

上の例の後でもし背景画像だけ変えたい！ってときに間違って（？）ショートハンドを使う場合、size・position・repeatの指定を忘れると全てがリセットされちゃうので、ハナっから個別で指定する癖がついてしまってます。

あと単純に、似たプロパティはまとめてたほうが個人的に読みやすいし、ただでさえcssは縦に長いので横の余白の有効活用の一面もあります（？）

## 判定基準をカスタマイズする

でもそこまで問題になることも無いと思うのでスルーしたいところですが、大量のワーニングは見てるとさすがに心が折れるし、少なからずある別件の指摘を見逃す可能性もあるので、一旦この件は判定基準から外すことにしました。

判定基準をカスタマイズするには、PCのなるべく上の階層に `.stylelintrc` ファイルを作ってそこにルールを指定するだけ。ちなみに、何も指定しなかったら [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) が適用されるようです。

今回僕が作った `.stylelintrc` の中身はこちら

```
{
  "rules": {
    "declaration-block-single-line-max-declarations": 0,
  }
}
```

**これだけw**

「一行ブロック内でのプロパティの数を制限するか？」という項目に `0` （＝設定しない）を指定しています。

**（2020.01.21 追記）**

以前の記事では、 `"declaration-block-semicolon-newline-after": 0` も記載していましたが、これだとエラーが出てしまします。このプロパティはそもそも設定値が `always` `always-multi-line` `never-multi-line` のいずれかしか取れないらしいです。

**（追記終わり）**

その他に指定出来る設定や、指定の仕方は [こちら](https://qiita.com/makotot/items/c266ed11ada1423cb96e) などを参考にどぞ。

-----

まだ使い始めて日が浅いので、気になった点も少ないのですが、これからガシガシ自分好みに・作業しやすいようにカスタマイズしていこうと思います！
