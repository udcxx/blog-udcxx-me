---
title: Windowsでエイリアスを設定する
date: 2022-06-30
tags: Windows IT
eyecatch: 220630.jpg
eyecatchEmoji:
description: PoweShellを楽にかっこよく使えるようにエイリアスを設定する方法を調べました。
---

こんにちは、だいちゃんです。

ターミナルとか使ってるときって、パソコンと対話ができてる気がしてワクワクしませんか？

そんなターミナルやらPoweShellやらをより快適にかっこよく使うために、エイリアスを登録しよう！の巻です。

業務でよく使うツールがあるのですが、そのツールを動かすたびに、毎回メモ帳からコピペしているので、もっと簡単にかっこよく使えるように、登録しようと思い立ちました。単語1つで代替できるなら登録してて損はないかなーと思う僕です。

## エイリアスとは

IMEでいう単語登録みたいなもので、よく使うコマンドや exe ファイルなどを短い単語で呼び出せるようにしてくれるものです。

`Set-Alias` コマンドを使って、PoweShell上から1つずつ登録する方法もあるのですが、今回はプロファイルに記述して、PoweShell起動時にまとめて読み込んでもらう方向性でいこうと思います。そのほうがバックアップなど、移行が楽なので。

Macなら `.bash_profile` に書けばいいことは分かるのですが、Windowsだとやり方が分からなかったので調べながら設定したので、その備忘録です。

ちなみに [マイクロソフトの公式ドキュメント](https://docs.microsoft.com/ja-jp/powershell/module/microsoft.powershell.core/about/about_aliases?view=powershell-7.2) には `Set-Alias` の方法が載ってます。ってか翻訳がんばって。（About Aliasesが「約Aliases」になってた）

## 設定方法

### プロファイルの実行権限を与えよう

デフォルトだとプロファイルを読み込めないらしいので、その設定から変更します。

```
> Get-ExecutionPolicy
```

`RemoteSigned` が返ってきたらOK。それ以外なら、管理者としてPowerShellを実行して、次のコマンドをたたく。このあたりで既に勉強不足ですね。

```
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

怒られたら、下記でもいいみたい。

```
> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

これでPowerShellが `.ps1` ファイルを実行できるようになったはず。めでたしめでたし（準備が終わっただけ）


### プロファイルを作ろう

一応念のため既にプロファイルが存在していないかを、次のコマンドで確認。

```
> Test-Path $profile
```

`true` って言われたら既に存在します。僕は作った記憶ないけど既に存在してましたw

どこにあんねんって方は `> $profile` で居場所のパスを返してくれます。

そもそも存在確認したときに `false` って言われた方は、次のコマンドを実行して、作成します。

```
> New-Item -path $profile -type file –force
```


### プロファイルにエイリアスを定義しよう

無事プロファイルを作成できたので、そいつにエイリアスを記述していきます。

`> $profile` で居場所を教えてもらって直接開くか、 `> notepad $profile` するとちょっとかっこよくメモ帳で開けます。

プロファイルを開いたら、下記のように記述していきます。

```
 Set-Alias atom "C:\Users\xxx\AppData\Local\atom\atom.exe"
 Set-Alias terapad "C:\Program Files (x86)\TeraPad\TeraPad.exe"
```

これで、上書き保存して、PoweShellも再起動するとエイリアスが有効になっています。

下記のように `Get-Alias` + `エイリアス名` を叩くことで、設定の内容を確認することができます。

```
> Get-Alias atom

CommandType     Name
-----------     ----
Alias           atom -> atom.exe
```

※ ↑一部省いてます（ホントはVersionとSourceも書かれてる）

よく使うコマンドなどは、是非是非登録しておくと捗ると思います！

例えば、僕みたいに Atom をギリギリまで使い倒す予定のない人は、 `code` でVS Codeが立ち上がるようにエイリアスを設定しておくと、 `code $profile` と叩いたときにプロファイルを VS Code 上で編集できたりします。

ちなみに僕は、上記に加えて、仕事で使うツールも登録しました。

多分エイリアスのおかげで削れる時間は1回あたり1秒以下だと思いますが、よく使うコマンドほど、塵も積もればなんとやらで、トータルで結構な時間削減になるかと。

なにより使いこなしてる感あってかっこいいよね。

---

下記のサイトを参考にさせていただきました🎉

* [PowerShell に Alias を登録する](http://www.vwnet.jp/windows/PowerShell/2020100601/PsAlias.htm)
* [PowerShellでプロファイルを作成する方法 | クソざこCoding](https://www.zacoding.com/post/powershell-profile/)
