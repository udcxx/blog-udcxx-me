---
title: Macのゴミデータを削除する
date: 2020-01-29
tags: Mac IT
eyecatch: 200129.jpg
eyecatchEmoji: 🗑
description: .DS_Store / .Trashes / .spotlight-v100 / .fseventsd とは一体何なのかや、一括で削除する方法を紹介します。
---

こんにちは、だいちゃんです。

MacからSDカードへ音楽をぶち込む際、ゴミデータ（システムファイル）まで保存されてしまい、再生機器によってはゴミデータごと画面上に表示されてしまう（もちろん再生はできない）のが美しくなかったので、ゴミデータをキレイにするコマンドをまとめてみました。

最近使わなくなりましたが、USBメモリーとかでも同様の現象が起こるので、Windowsの方に渡す時や、中身を消しても空き容量が増えないなーってときに試してみてください。

## ゴミデータを排除するコマンド

`ls` コマンドで、該当のディレクトリまで移動して、以下のコマンドを1行ずつ実行するだけで、ゴミデータのお掃除ができます。

⚠ ~~当たり前だけど~~ 実際にデータが消えます ⚠

```bash
find . \( -name '.DS_Store' -o -name '._*' -o -name '.apdisk' -o -name 'Thumbs.db' -o -name ‘Desktop.ini’ \) -delete -print    
find .Trashes -delete -print    
find .Spotlight-V100 -delete -print    
find .fseventsd -delete -print 
```


## ゴミクズの正体を知る

ゴミでクズなデータには下記のようなものがあります。

* `.DS_Store`
* `.Trashes` 
* `.spotlight-v100` 
* `.fseventsd` 

そして、それぞれ、以下のような意味のファイルらしいです。

### .DS_Store

Macのゴミファイルの王道ですね。Windowsの方にデータを渡す際に怒られがち。

内容は、メタデータが入っているらしい。


### .Trashes

リムーバブル内のファイルを削除したときに作成される、いわゆるゴミ箱扱いらしい。

ゴミ箱から復元できるのは便利だけど、消しても容量は増えないという地獄。


### .spotlight-v100

スポットライト検索用のインデックスらしい。

便利で高速な検索はこのファイルのおかげでもあるんですね。（僕は [Alfredを使ってる](https://blog.udcxx.me/article/201114/alfred-powerpack/) ので、恩恵を受けてない←）


### .fseventsd

イベントログのデータが含まれたファイルらしい。

---

もちろんそれぞれ意味があって、Macユーザーの利便性のために存在してくれているのですが、、、作りすぎやろ。

ちなみに、Finder上で隠しファイルを確認したいときは、 ［Shift］ + ［⌘］ + ［.］ の3つのキーを同時押しで隠しファイルの表示/非表示を切り替えできます。

## 削除用コマンド

早速、削除

まず、ターミナルでSDカードのディレクトリまで移動します

```
cd /Volumes/SDカードなどの名前
```

`ls` コマンドでディレクトリ内の一覧を表示できます。

無事移動できたら、下記を1行ずつ実行します。 **※ 実際にファイルが削除されるので自己責任でお願いします**

```
find . \( -name '.DS_Store' -o -name '._*' -o -name '.apdisk' -o -name 'Thumbs.db' -o -name ‘Desktop.ini’ \) -delete -print    
find .Trashes -delete -print    
find .Spotlight-V100 -delete -print    
find .fseventsd -delete -print    
```

以上で削除が完了です。

-----

難しいことではないですが、SDカードに音楽を移したり削除したりする度に実行するのも面倒ですねぇ。

どうにかこのSDにはシステムファイル生成しないように設定出来ないのかな？