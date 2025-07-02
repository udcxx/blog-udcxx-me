---
title: MacからWinへのリモート時の日本語入力を快適にする【Parsec】
date: 2025-07-02
tags: IT Mac
eyecatch: 
eyecatchEmoji: 🛜
description: Parsecを使ってMac → Windows へリモート接続をする際、日本語入力（IME）のON/OFFがめんどくさかったので解消しました。
---

こんにちは。だいちゃんです。

手元のMacbook Airを使い、遠く離れたオフィスにあるWindowsを操作しなきゃいけない仕事が多々あります。

Macには「全角/半角」キーが無いので、日本語入力（IME）のON/OFF（いわゆる全角/半角の切り替え）が一発でできず、プチストレスでした。マウスをポチポチするだけの仕事だったり、ちょっと入力する程度なら大丈夫なのですが、ガッツリドキュメント直さなきゃ...って時には結構なタイムロスになっちゃってました。

そこで、Parsec利用時だけMacの英数キー/かなキーをF18キー/F19キーにしちゃって、Windows側でそれをIMEのトグルとして認識するように設定することで解決できたので設定方法をメモします。

## 環境

手元のMac：
* 日本語キーボード
* Karabiner-Elements（無料）をインストール
* ParsecでWindowsをリモート操作

リモート接続先：
* IMEはGoogle IMEを利用
* Windows11

## Mac側の設定

まずは、[Karabiner-elements](https://karabiner-elements.pqrs.org/) をインストールする必要があります。無料なのに結構高機能で、すでに使ってる人も多いのでは。

Macのセキュリティが厳しいせいもあり、初期設定はちょっと厄介です。画像多めの [ドキュメント](https://karabiner-elements.pqrs.org/docs/getting-started/installation/) を諦めずに読むことをおすすめします。

そして、次のようなJSON形式の設定ファイルを用意します：

```json
{
    "title": "Parsec日本語入力",
    "rules": [
        {
            "description": "英数/かなキーをF15/F16に変換する",
            "manipulators": [
                {
                    "type": "basic",
                    "from": {
                        "key_code": "japanese_eisuu"
                    },
                    "to": [
                        {
                            "key_code": "f15"
                        }
                    ],
                    "conditions": [
                        {
                            "type": "frontmost_application_if",
                            "bundle_identifiers": [
                                "^tv\\.parsec\\.www$"
                            ]
                        }
                    ],
                    "description": "英数 -> F15"
                },
                {
                    "type": "basic",
                    "from": {
                        "key_code": "japanese_kana"
                    },
                    "to": [
                        {
                            "key_code": "f16"
                        }
                    ],
                    "conditions": [
                        {
                            "type": "frontmost_application_if",
                            "bundle_identifiers": [
                                "^tv\\.parsec\\.www$"
                            ]
                        }
                    ],
                    "description": "かな -> F16"
                }
            ]
        }
    ]
}
```

設定内容は環境や好みにあわせて変更してください。

`conditions` では、Parsecでのみ実行されるように指定しています。 `bundle_identifiers` に何を指定したらいいか分からないときは、Karabiner-Elements に付属している Karabiner-EventViewer で調べることができます。（ **Frontmost Application** で、一番フロントに出てるアプリケーションのBundle Identifiersが確認できます。）

![](/images/250702_1.png)

このJSONファイルを任意の名前で `/Users/{UserName}/.config/karabiner/assets/complex_modifications/` に保存します。

次に、Karabiner-elements を開いて **Complex Modifications** > **Add predefined rule** をクリックします。

![](/images/250702_2.png)

開く画面で、保存した設定が表示されるはずなので **Enable** をクリック。

![](/images/250702_3.png)

動作確認は、Karabiner-EventViewer を開いて **Main** 画面を開いた状態で、Parsecに移って英数/かなキーを押したときに `"key_code"` が F18 / F19 になって、Parsec以外で japanese_eisuu / japanese_kana になってればOKです。 

## Windows側の設定

まず、[Google日本語入力](https://www.google.co.jp/ime/) をインストールします。

次に、タスクトレイに居る「あ」とか「A」とかを右クリック → **プロパティ** を開きます。

**一般** タブのキー設定の項目から、キー設定の選択 → **編集** をクリックして、以下の画面を開きます。

![](/images/250702_4.png)

右下の **編集** から **エントリーを追加** をクリックして、赤枠のようにF18・F19キーにIME ON/OFFのコマンドを割り当てます。

適用して閉じれば、次に開くアプリケーションから設定が有効になります。念の為PCを再起動したほうが安全かも。

---

これでMacからParsec経由でWindowsを操作するのがめっちゃ快適になりました。ドキュメント書いたりするのはわざわざMac側でやってたのですが、これからはWindowsでそのまま作業ができて効率的です。

ちなみに、F13キーだとWindows側でPauseキーとして認識されたり、F20キーは認識されなかったりしたので、中途半端なF18/F19にしてますw


参考：

* [Karabiner-Elementsで特定アプリの使用時のみキーバインドを変更する | 870 Laboratory](https://www.870labo.com/posts/change-key-bind-with-karabiner-elements/)