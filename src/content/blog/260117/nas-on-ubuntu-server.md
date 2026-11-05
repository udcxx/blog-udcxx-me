---
title: Ubuntu で外付け HDD を NAS にする
date: 2026-01-17
tags: Linux IT
eyecatch: 
eyecatchEmoji: 🍆
description: Linux（Ubuntu Server）の勉強がてら、自宅内 NAS を構築してみました。
---

こんにちは。だいちゃんです。

冬休みの自由研究第3弾(？)として、用意した Ubuntu Server に外付け HDD を繋いで、それを自宅内 NAS として利用できるように準備してみました。

ちなみに、冬休みの自由研究過去回はこちら。

* 第1弾： [Ubuntu Server 入れてみた](https://blog.udcxx.me/article/260102/ubuntu-server/)
* 第2弾： [NVR500 導入](https://blog.udcxx.me/article/260116/nvr500/)

今回の年末年始、充実してるぅ〜

## NAS の必要性

次のような理由から、自宅内に NAS を置きたいな〜と常々思っていました。

* （特に妻の）iPhone が容量不足気味。写真が大量にある。
* （特に僕の）ドキュメント類を Google Drive で管理していたけど、そろそろ容量の限界を感じている
* 両方とも、iCloud+ や Google One を契約すれば月数百円で解消するけど、一生払い続けることになる
	* iCloud+ 200GB = 450円/月 → 年間 5,400円。二人で 10,800円。
* 今後は写真なんかも1つあたりのデータサイズがどんどんデカくなっていく可能性が高いので、↑の金額で収まらなくなりそう。
* 外付けHDDなら [1TB で 1万円以内](https://amzn.to/3Ni6vQh) で済みそう。毎年壊れることもないだろうし。

とはいえ理由は後付けで、自分で作ってみたかっただけです。管理コストとか考えると、普通に契約したほうがお得かと。それでも僕はコマンドぽちぽちしてNASを作りたかったんだ。


## 構成

僕と妻の個人フォルダ、それから共有フォルダの 3つを作成します。それぞれの個人フォルダは、本人しか見れないようにしておきます（とはいえ root ユーザーで入れば両方見れるけど）。

以下では、僕のフォルダ名＆ユーザー名を `papa` ・妻のフォルダ名＆ユーザー名を `mama` ・共有フォルダ名を `public` としますが、実際には個人フォルダ・ユーザーは個人名にしました。

また、各デバイスからはIPアドレスで接続するので、NAS として稼働する Linux マシンのIPアドレスは固定にしておく必要があります。


## 作り方

### マウント〜フォーマット

外付けHDD 接続後に以下のコマンドでデバイス名を確認する。

```
$ lsblk
NAME                      MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda                         8:0    0 465.8G  0 disk 
├─sda1                      8:1    0     1M  0 part 
├─sda2                      8:2    0     2G  0 part /boot
└─sda3                      8:3    0 463.8G  0 part 
  └─ubuntu--vg-ubuntu--lv 252:0    0   100G  0 lvm  /
sdc                         8:32   0 465.8G  0 disk 
└─sdc1                      8:33   0 465.8G  0 part 
```

↑ `sdc` として認識されてるので、以降 sdc を例に進めます。他のデバイス名になっていたら、適宜読み替えてください。

以下のコマンドでパーティションを作成する。

```
$ sudo fdisk /dev/sdc
```

fdisk が対話式でパーティション作成するので、以下の順で回答します。

* g ・・・新しいGPTパーティションテーブルを作成
* n ・・・新しいパーティションを作成
* 1 ・・・パーティション番号: 1
* Enter ・・・開始位置: デフォルト（Enter）
* Enter ・・・終了位置: デフォルト（Enter = ディスク全体を使用）
* w ・・・書き込んで終了

次に、フォーマットしつつラベルを付与します。

ラベルを付与しておくことで、別の UUID の HDD でもラベルが一致していれば同じ動きをしてくれるようになるので、将来的に HDD を交換することになった際に少し楽になるはず。

```
$ sudo mkfs.ext4 -L NASHDD /dev/sdc1
```

`blkid /dev/sdc1` で状態を確認できます。フォーマットタイプと、ラベルをチェック。

```
$ sudo blkid /dev/sdc1
/dev/sdc1: LABEL="NASHDD" UUID="***-***-***-***-***" BLOCK_SIZE="4096" TYPE="ext4"
```


### Samba のインストール〜ユーザーの設定

まずはフォルダ共有に必要な「Samba」を入れます。

```
$ sudo apt update
$ sudo apt install samba samba-common-bin
```

次に、ユーザーグループを作っておきます。

```
$ sudo groupadd nasusers
```

各ユーザーも作ります。パスワードだけは Linux 用と Samba 用をそれぞれ設定する必要があります。

```
# ユーザー作成
$ sudo useradd -m -G nasusers papa
$ sudo useradd -m -G nasusers mama

# 各ユーザーのLinuxパスワード設定
$ sudo passwd papa
$ sudo passwd mama

# Samba用のパスワード設定
$ sudo smbpasswd -a papa
$ sudo smbpasswd -a mama
```


### ディレクトリ作成〜パーミッション設定

前提通り、個人名のフォルダと `public` フォルダを作成します。念の為(？) `share` というフォルダを作って、その中に各フォルダを作るようにしました。別にルートに作っても問題ないと思うけど。

1つの mkdir コマンドで複数フォルダ作れるの知らなかった。

```
$ sudo mkdir -p /mnt/nashdd/share/{papa,mama,public}
```

各ユーザーに所有権を持たせつつ、パーミッションも設定しておきます。

```
# 所有権設定
sudo chown papa:nasusers /mnt/nashdd/share/papa
sudo chown mama:nasusers /mnt/nashdd/share/mama
sudo chown root:nasusers /mnt/nashdd/share/public

# パーミッション設定
sudo chmod 770 /mnt/nashdd/share/papa
sudo chmod 770 /mnt/nashdd/share/mama
sudo chmod 770 /mnt/nashdd/share/public
```


### Samba の設定

ますは、Samba の設定ファイルをバックアップしておきます。

```
$ sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.backup
```

vim で編集

```
$ sudo vi /etc/samba/smb.conf
```

以下の内容を、smb.conf の末尾に追記。

```
[papa]
   path = /mnt/nashdd/share/papa
   valid users = papa, root
   read only = no
   browseable = yes
   create mask = 0660
   directory mask = 0770

[mama]
   path = /mnt/nashdd/share/mama
   valid users = mama, root
   read only = no
   browseable = yes
   create mask = 0660
   directory mask = 0770

[public]
   path = /mnt/nashdd/share/public
   valid users = papa, mama, root
   read only = no
   browseable = yes
   create mask = 0660
   directory mask = 0770
```

💡 vim は `A` で挿入モードに入って入力ができるようになり、 `esc` → `:wq` → `Enter` で保存して終了できます。もっといろいろできるんだけど、これくらいしか覚えてない...。

保存できたら、構文チェックしてみます。

```
$ testparm
```

エラーが出なければ、諸々再読み込みさせて適用していきます。

```
# Sambaサービスの再起動
$ sudo systemctl restart smbd
$ sudo systemctl restart nmbd

# 自動起動の有効化
$ sudo systemctl enable smbd
$ sudo systemctl enable nmbd

# サービスの状態確認
$ sudo systemctl status smbd
$ sudo systemctl status nmbd
```


## 利用方法

Mac の場合、Finder を開いて、`⌘` + `K` でサーバーに接続できます。Windows ならエクスプローラーのアドレスバーに Linux マシンの IPアドレスを入力するだけでアクセス可能です。

また、iPhone では、「ファイル」アプリの右上の三点リーダーから「サーバーに接続」でアクセスできます。

自分のユーザー名と Samba 用のパスワードを入力して、自分のフォルダ＋public の内容が表示できればOKです。他人のフォルダに入れちゃう場合 smb.conf の内容に誤りがあるかもしれません。

---

1時間も掛からずに用意できました。

今後は、もう1つHDDを繋いで、週に1回バックアップを取るようにしてみたり、容量が逼迫してきたらアラートを出せるようにしたいです。
