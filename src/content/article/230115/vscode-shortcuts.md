---
title: VSCodeのショートカットを変更した
date: 2023-01-15
tags: IT VSCode
eyecatch: 230115.jpg
eyecatchEmoji:
description: VSCodeをメインで使うにあたって、キーボードショートカットの変更を行いました。
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

昨年12月のAtomの開発終了にともなって、いままでサブで利用していた VSCode が、メインエディターとして昇格しました。

VSCodeはAtomよりサクサクで基本的には快適なんだけど、VSCode 側で設定されているショートカットが強制され、PowerToys で設定したショートカットが反映されないようです。

ぼくはMacで慣れてしまったので、Windowsを使うときには PowerToys を利用してショートカットをMacっぽく変更しています。ただ、VSCodeではそれが反映されないようなので、二度手間ではありますが、VSCode側のショートカットも以下の通り、Macっぽく変更しました。

## 変更したショートカット

- **cursorTop** `ctrl` + `Home` ▶ `ctrl` + `UpArrow`
- **cursorTopSelect** `ctrl` + `shift` + `Home` ▶ `ctrl` + `shift` + `UpArrow`
- **cursorBottom** `ctrl` + `end` ▶ `ctrl` + `DownArrow`
- **cursorBottomSelect** `ctrl` + `shift` + `end` ▶ `ctrl` + `shift` + `DownArrow`
- **cursorEnd** `end` ▶ `ctrl` + `rightArrow`
- **cursorEndSelect** `shift` + `end` ▶ `shift` + `ctrl` + `rightArrow`
- **cursorWordEndRight** `ctrl` + `rightArrow` ▶ `alt` + `rightArrow`
- **cursorWordEndRightSelect** `ctrl` + `shift` + `rightArrow` ▶ `shift` + `alt` + `rightArrow`
- **cursorHome** `Home` ▶ `ctrl` + `LeftArrow`
- **cursorHomeSelect** `shift` + `Home` ▶ `ctrl` + `shift` + `LeftArrow`
- **cursorWordRight** `ctrl` + `LeftArrow` ▶ `alt` + `LetfArrow`
- **cursorWordRightSelect** `ctrl` + `shift` + `LeftArrow` ▶ `shift` + `alt` + `LeftArrow`
- **Change Language Mode** `ctrl` + `shift` + `L` ▶ `(なし)`

やり方としては、VSCodeを開いて、`shift` + `ctrl` + `P` を同時押しして、コマンドパレットを開き、`Preferences: Open Keyboard Shortcuts` と入力すると、キーボードショートカットの設定画面を開くことができます。

Windowsを使うにあたって、特にカーソルの移動に関する部分で不便に感じることが多かったので、今回はそのあたりを中心に設定をしました。

あと、最後の Change Language Mode は、利用しているファイルをどの言語として認識するかの設定を変更するショートカットなのですが、選択した単語の全選択とデフォルトでコンフリクトしているようだったので、ショートカットをなしにしました。    
※ 右クリックから Remove Keybinding で削除できます。

---

これは絶対慣れの問題ですが、 `Home` / `End` キーって打ちづらくないですか？矢印キーを使う方が方向と一致してて認識しやすいような気がするんですよね...。