---
title: Python逃亡者がファインチューニングするまで
date: 2023-10-24
tags: IT
eyecatch:
eyecatchEmoji: 🔰
description: ChatGPTのファインチューニングを試すべく、Python初心者がPythonと戦った戦記です。
---

こんにちは、だいちゃんです。

巷で話題(？)のPythonですが、僕はこれまでPythonから逃げ続けていてたので、環境もなにも用意していない状態でした。

そんな僕のことを、Pythonを触る気にさせたのは、こちらも巷で話題のChatGPTでした。最近、OpenAI APIを使ったChatGPT絡みのツールをいくつか作っている中で、プロンプトの改善ではどうにもならず、ファインチューニングしないとこれ以上の精度が出ないだろうなと思うことが増えてきました。

AIはPythonと相性が良いようで、ファインチューニングをするには、~~Node.jsでもできるっぽいけど~~ Pythonが使えたほうが情報も多く、あとあと便利そうだったので、重い腰を上げて、Pythonが実行できるように環境を整えてみたので、その備忘録として記事に残しておこうと思います。

[OpenAIのドキュメント](https://platform.openai.com/docs/guides/fine-tuning/create-a-fine-tuned-model) に従って書かれてるコードを実行するだけなはずなのにいろいろハマりました🕳


## 結論

* モジュール使うときはNode.jsのnpmみたいな役割の **pip** のインストールが必要
* Pythonのコードはターミナル上から実行できる
* ファインチューニング済みのmodelは [Playground](https://platform.openai.com/playground) で試せる


## なぜかインストール済みのPython

MacってデフォルトでPython入ってない...よ...ね...？

何気なく下のコマンドを実行したら返ってきちゃいました。

```zsh
python --version
```

**え、使えるんかーい！**

たぶん何かのセットアップの際に、自分でインストールしたんだと思うのですが、記憶にございませんでした。確実なのは、今年買った僕のMacにはPythonが既にインストールされていたということです。

ということで早速、以下のコードの `YOUR_API_KEY` 部分をAPIキーに書き換えて、`"dataset.jsonl"` をデータセットのファイル名に変えて、 `create.py` として保存しておきます。**あとで不要になります。**

```py
import openai
openai.api_key = "YOUR_API_KEY"

openai.File.create(
    file = open("dataset.jsonl","rb"),
    purpose = "fine_tune"
)
```

ターミナルで `create.py` を保存したディレクトリまで移動し、 `python create.py` を実行します。**失敗します。**


## pip

Node.jsでいうところの npm とか yarn とかのパッケージマネージャーが、Pythonでは **pip** というらしいです。と理解しました。

pipはインストールされていなかったようで、モジュールのimportがうまく行かずエラーで失敗しました。

ということで、pipをインストールしていきます。pipはcurlコマンドでインストーラーを取得して、保存されたファイルを実行することでインストールできました。

```zsh
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```

pipがインストールできたら、必要なモジュールをインストールしていきます。

今回は `openai` が必要なので、ターミナルで `pip install openai` と叩くだけです。~~なんか言われてる気もしますがあとでにします。~~


## データセットのアップロードと実行

気を取り直して、再度 `python create.py` を実行します。**息してません。**

レスポンス中の `"id": "file-abc123"` の部分をあとで使うのでメモっておきたいのですが、レスポンスが返ってきません。泣きそう。

**結論、Pythonファイルを作成せずに、ターミナル上でコードを実行する必要があるみたいです。**

ターミナル上で `python` とだけ入力すると、入力待ちの状態になるので、そこにドキュメントからコピペしたコードをペーストすることで、無事、実行することができました🎉

レスポンスを受け取ったら、続いてファインチューニングの実行をします。

OpenAIのファインチューニングは、アップロードするだけでは開始されず、別途開始コマンド（FineTuningJobのcreate）を叩いてあげる必要があります。

データセットのファイルのアップロードが完了し、レスポンスを受け取ったら、同様の方法で、以下のコードを実行します。（`file-abc123` の部分は、レスポンスに記載されている `id` の値に変更します）

```python
import openai
openai.api_key = "YOUR_API_KEY"
openai.FineTuningJob.create(training_file="file-abc123", model="gpt-3.5-turbo")
```

ファインチューニングが完了したかどうかは、次のコードを実行し、`status` の値で確認できます。

```python
import openai
openai.api_key = "YOUR_API_KEY"
openai.FineTuningJob.list(limit=10)
```

ちなみに完了したらメールでも教えてくれます。


## ファインチューニング済みのモデルを試す

[Playground](https://platform.openai.com/playground) で、Web上で気軽にファインチューニング済みのモデルを試すことができます。

今回は試しに20件のデータでファインチューニングを試してみましたが、結構結果に反映されてて、ほしい答えに確実に近づいた感じがありました。ただ、ほしい答えには一歩及ばず、さらなるファインチューニングやプロンプトの改良が必要そうです。

---

思いがけず長い記事になってしまったけど、こういう失敗記が一番自分の役に立つんだよなぁ。

**参考**

* [Fine-tuning - OpenAI API](https://platform.openai.com/docs/guides/fine-tuning?lang=python)
* [chatGPT(gpt3.5-turbo)をファインチューニングする (functions対応)](https://zenn.dev/nano_sudo/articles/eaf0d77646d7b8)
* [【Python】macOSでpipを使えるようにする #Python - Qiita](https://qiita.com/ohbashunsuke/items/e7c673db606a6dced8a6)
* [OpenAIのAPIを使う](https://okumuralab.org/~okumura/python/openai_api.html)