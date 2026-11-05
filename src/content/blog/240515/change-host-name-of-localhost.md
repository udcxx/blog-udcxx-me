---
title: localhost はかわいくない
date: 2024-05-15
tags: Windows IT
eyecatch: 
eyecatchEmoji: ❤
description: localhost 以外のホスト名でも 127.0.0.1 にアクセスできるようにする方法を紹介します。
---

こんにちは。だいちゃんです。

開発してると、ローカルサーバー立てたりなんなりで `localhost` にはなにかとお世話になると思います。

ただ、localhost ってかわいくない。

~~ということで~~ localhost 以外のホスト名でも同じことができるように（正確には、名前解決で 127.0.0.1 を返すように）設定してみました。

## hostsファイルを編集する

`hosts` ファイルは、ローカル版DNSみたいな感じで、ホスト名とIPアドレスの対応付けを管理しているファイルで、次の場所に保存されています：

`C:\Windows\System32\drivers\etc\hosts` 

メモ帳なり何なりで上記ファイルを開いて（Windowsディレクトリ配下なので管理者権限で開く必要あり）、次の文字列を追記します：

```
127.0.0.1 example.com
```

`example.com` の部分は、何でもOKです。ただ、設定した端末内のすべてのアプリケーションに影響するので、絶対にアクセスすることのないものがいいと思います。

ちなみに、`example.com` は予約されてるので、それこそ絶対にアクセスすることのないホスト名ですね。

example.com 以外なら、自分が所有しているドメインを使って `local.udcxx.me` のようにローカル検証用環境を用意したり、proxy を設定することで `*.localhost` のようにワイルドカードを使った指定をしてる人 [(参考)](https://blog.osakana.net/archives/8894) もいるようです。


## PCのDNSキャッシュをリセットする

最後に、PCがキャッシュしているDNSをリセットしたら完了です。

```bash
ipconfig /flushdns
```

---

example.com もかわいくない。

**参考：**

* [example.com - Wikipedia](https://ja.wikipedia.org/wiki/Example.com)
* [RFC 2606 - Reserved Top Level DNS Names](https://datatracker.ietf.org/doc/html/rfc2606)
* [Windowsのhostsにワイルドカードを使いたい(proxy.pacの活用) – OSAKANA TAROのメモ帳](https://blog.osakana.net/archives/8894)