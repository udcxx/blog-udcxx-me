---
title: コマンドプロンプトとPowerShellのコマンド差異
date: 2023-03-04
tags: Windows IT
eyecatch: 230304.png
eyecatchEmoji:
description: コマンドプロンプト用のコマンドをPowerShellで実行させるときに気をつけることをメモします。
---

こんにちは、だいちゃんです。

本業も副業も捗ってしまい、久しぶりの更新になってしまいました...。

今回は、本業でコマンドプロンプト使ったりPowerShell使ったり行ったり来たりしているうちに、コマンドプロンプト用のコマンドをPowerShellで実行させるときにハマったので、備忘録のためにメモしておきます。

Mac使ってるときにはブチ当たらない悩みですね。

## 文字列

コマンドプロンプトとPowerShellでは、引数などで文字列を渡すときに使う記号が違います。

コマンドプロンプトでは `'` (シングルクォーテーション) が利用できないので、文字列は `"` (ダブルクォーテーション) で囲う必要があります。

一方、PowerShell では、文字列を `'` で囲って渡す必要があるという。ややこしや。

## エスケープ文字

コマンドプロンプトでは、エスケープ文字として `^` (キャレット) を利用します。コマンドが複数行になるときとかに、各行の最後に `^` を置いてから改行することで、1つのコマンドとして認識されるやつですね。

PowerShellでのエスケープ文字はというと、 `\`` (バッククォート) になります。

---

すごいニッチですが、某コマンドラインツールなど、コマンドプロンプト用のドキュメントしか用意されてない時などにご利用ください...w