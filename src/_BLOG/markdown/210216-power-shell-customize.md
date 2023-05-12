---
title: PowerShellのフォントとか色をカスタマイズしてみた
date: 2021-02-16
tags: IT
eyecatch: 210216.png
eyecatchEmoji:
description: RictyDiminishedというテンションの上がるおすすめフォントに変えて、色も見やすさとかっこよさのハイブリッドを目指しました
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

Gitはコマンドで操作する派です。何事も「好奇心がくすぐられるか？」は大事な指標だと思っていて、Gitに関しても、今の職場に入った当時、Git初心者だった僕に教えてくれた先輩が、カタカタとコマンドで操作しているのを見てかっけー ってなったのをきっかけに、その憧れからぼくも基本的な操作はコマンドでやるようになりました。

コマンドを使う際、Macでは「ターミナル」を使っていますが、先日買ったおもちゃWindowsでは、昔ながらの有名な「コマンドプロンプト」ではなく「PowerShell」を使ってみようと思います。

ちなみに先日、bashからzshに乗り換えたので、その辺りも後日記事にする予定です…。


## コマンドプロンプトとPowerShell

Windowsでコマンド操作を行うアプリケーションといえば「コマンドプロンプト」を思い浮かべると思います。僕も数年前までWindowsを使っていた頃はコマンドプロンプトで `ipconfig` くらいは触っていた気がします。

それから時は流れ、最近はより強化されたPowerShellを使おうぜ！みたいな流れを感じています。PowerShellはコマンドプロンプトの完全上位互換ではなく、ほとんどのコマンドを踏襲しているものの、新しい考え方の上に成り立ってるイメージで、今後もコマンドプロンプトと共存する方針のようです。

共存するとはいえ、このままコマンドプロンプトを使い続ける理由もないので、久しぶりにWindowsに戻ってきたこのタイミングでPowerShellを使い始めようと思います。といってもガンガン使うわけではなく、Gitをちょこっと操作するくらいですが。。。


## PowerShellの見た目をカスタマイズ

ここからが本題。

WindowsではPowerShellを使う方針は確定しましたが、なんといってもフォントがダサいとやる気が出ないので、そのあたりを設定してみました。

![](/images/210216.png)

フォントは [RictyDiminished](https://github.com/edihbrandon/RictyDiminished) というフリーフォントを使用しています。とにかく大好きなフォントです。

このフォントは、 `Inconsolata` （欧文）と `Circle M+ 1m` （日本語）を合成したフォントで、Rictyの姉妹フォントになります。Rictyは日本語フォントとして `Migu 1M` を使用していますが、ライセンスの関係から合成した状態で配布できない為、生成スクリプトが配布されているので、それを使って自分でフォントの合成を行う必要があります。一方のRictyDiminishedは既に2つのフォントが合成された状態で配布されているので、合成の手間は省けますが、IPAゴシックが含まれていない分、漢字数が少なくなってしまうという欠点があります。

JIS第2水準以降の漢字の中には足りないものがあったりするようですが、PowerShell上で旧漢字を使ったりすることは無いと思うので、支障ありません。

M+のかわいらしく美しい日本語フォントと、視認性の高い英語フォントが合わさっているだけでプログラミングに最適でめちゃくちゃ価値があるのに、それが無料で利用できるのはありがたい限りです。お気に入りすぎて、ATOMやTeraPadもフォントをRictyDiminishedにしています。Macでもターミナル・ATOM・CotEditorなどに使用しています。Rictyを生成してWindowsのUIフォントにしちゃおうかな。

配色に関しては、黒をベースに、ターミナルのSilver Aerogelというプロファイルを少しだけ意識して設定してみました。

---

ひとまず、これで運用してみようと思います。

RictyDiminishedがとにかく推しなので見やすいコーディング用のフォントを探している方は是非使ってみてください！