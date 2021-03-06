---
title: ローカルでGASを書く環境を整えました
date: 2020-08-04
tags: GAS
eyecatch: 200804.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

最近やっとローカルでGAS【Google Apps Script】を書く環境を整えましたw

やってみると意外とすんなり出来たので、これからGASを書く予定のある方は30分くらい投資しても損はないと思います。

## GASをローカルで書くメリット

そもそも、なぜローカルで書く必要があるのでしょうか。ブラウザ上でも書けるのに。

* 好きなエディタが使える
* 補完が効く
* Gitなどのバージョン管理ツールを利用できる

みたいなメリットがあると思います。

ちなみに愛用のエディターは **Atom** ですw

## google/clasp をPCにインストールする

npmでインストール出来ます。大好き。

グローバルインストールなので、この作業はPCに対して1回のみでOKで、プロジェクトごとにインストールする手間はありません。

```
$ npm install clasp -g
```

## ローカルのclaspとGoogleアカウントの紐付けを行う

```
$ clasp login
```

上記コマンドを叩くと、自動的にブラウザが立ち上がります。（立ち上がらない場合はターミナル上に表示されたURLを開く）

開いた画面で「許可」をクリックすると、紐付けが完了します。

ログイン情報を `~/.clasprc.json` に保存したよ、的なメッセージが出るのですが、複数アカウント使い分けたいときどうするんだろう？

## 既にあるプロジェクトをクローンする

Git使い慣れてる方ならおなじみの言葉ですが、GASも既にリモート（クラウド？）上にあるプロジェクトを持ってくることをクローンと言うらしいです。かんたんだね！

これはもちろんプロジェクトごとに必要なので、ちゃんとプロジェクトのディレクトリまで移動してから行いましょう。

```
$ cd プロジェクトディレクトリまで移動
$ clasp clone スクリプトID
```

スクリプトIDは、スクリプトエディタ（Web）の `ファイル ＞ プロジェクトのプロパティ` で確認できます。確認できない時は、ちゃんとプロジェクトを保存したか再チェックしましょう。

これでコードを書き始められるのですが、僕はここで一旦ディレクトリを整理します。

ソースファイルを `src/gas` の中に入れたいので、一旦 `.clasp.json` 以外を削除します。そして `.clasp.json` を下記のように書き換えます。

```
{
    "scriptId":"xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "rootDir":"src/gas"
}
```

`rootDir` の1行を追加しました。この部分にソースを保存したいディレクトリを指定してあげるだけです。

その後 `clasp pull` してあげれば、指定したディレクトリにソースが保存されています！

## リモート？クラウド？Web？サーバー？にpushする

GASの場合、何というのが正解なんでしょうか？

それはさておき、コードを書いたあとは `push` が必要なのですが、その前にブラウザ側でGAS APIを利用できるように設定しておく必要があります。

https://script.google.com/home/usersettings

にアクセスして、 `Google Apps Script API` をオンに切り替えておきましょう。

あとはpushして、Web側で見れるソースを最新にしておけば完了です。

```
$ clasp push
```

---

ここまで、慣れていれば30分掛からずに出来ちゃう内容だったのではないでしょうか。

結構あっさり導入出来る割に、利便性は高いのでGASを書く機会がそれほど無くても入れておくことをオススメします！
