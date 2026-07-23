---
title: 自宅NASのバックアップ体制を整えた
date: 2026-07-23
tags: Linux IT
eyecatch: 
eyecatchEmoji: 🍆
description: Ubuntu Server + 外付けHDD で構築した自宅 NAS に、外付けHDD を追加して cron でのバックアップ体制を構築しました。 
---

こんにちは、だいちゃんです。

今年の始めに Ubuntu Server を導入して簡易 NAS 環境を構築し、順調に運用できています。

* [Ubuntu Server 入れてみた | 無趣味の戯言](https://blog.udcxx.me/article/260102/ubuntu-server/)
* [Ubuntu で外付け HDD を NAS にする | 無趣味の戯言](https://blog.udcxx.me/article/260117/nas-on-ubuntu-server/)

Google ドライブの (無料の) 15GB の枠を空けるべく退避先に使ったりしていると、この　NAS に保存されたデータがオリジナルになっていて、ちょっと運用責任を感じるようになってきましたw 妻も iPhone のバックアップに使ったりしてるので、消失はなんとしても避けたい。

ということで真剣にバックアップについて考え始め、AWS の Deep Archive とかも検討したのですが、今後容量が増え続けることを考えると HDD を買ったほうがいいのでは？と思い、外付けHDD 2台体制で構築することにしました。ちょうど [プライムセールで買えた](https://amzn.to/4baAJ0t) しね。

## 前提とやること

* OS: Ubuntu 24.04.4
* 外付け HDD を samba でネットワーク内に公開して NAS として利用中 → [構築したときの記事](https://blog.udcxx.me/article/260117/nas-on-ubuntu-server/)

* 外付け HDD を追加する
* cron で毎日早朝に差分コピーする設定をする

## まずは接続〜ストレージとして使えるようにする

### 1. 接続して確認

USB ポートに新たに購入した HDD を接続して、 `lsblk` コマンドで接続状況を確認します。

```
$ lsblk
NAME                      MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda                         8:0    0 465.8G  0 disk
├─sda1                      8:1    0     1M  0 part
├─sda2                      8:2    0     2G  0 part /boot
└─sda3                      8:3    0 463.8G  0 part
└─ubuntu--vg-ubuntu--lv 252:0    0   100G  0 lvm  /
sdb                         8:16   0 465.8G  0 disk /mnt/nashdd
sdc                         8:32   0 465.8G  0 disk
└─sdc1                      8:33   0 465.8G  0 part
```

`sdc` として認識されました。

環境とかタイミングによってマウントポイントは変化するので、以降の説明を真似する際は適宜読み替えてください。

### 2. パーティションの作成

前回同様 `fdisk` コマンドでパーティションを作成していきます。対話形式で進むので、以下の順で回答すればOK。

* g ・・・新しいGPTパーティションテーブルを作成
* n ・・・新しいパーティションを作成
* 1 ・・・パーティション番号: 1
* Enter ・・・開始位置: デフォルト（Enter）
* Enter ・・・終了位置: デフォルト（Enter = ディスク全体を使用）
* w ・・・書き込んで終了

```
$ sudo fdisk /dev/sdc
Welcome to fdisk (util-linux 2.39.3).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): g
Created a new GPT disklabel (GUID: XXXX-XXXX-XXXX-XXXX-XXXX).
The device contains 'dos' signature and it will be removed by a write command. See fdisk(8) man page and --wipe option for more details.

Command (m for help): n
Partition number (1-128, default 1): 1
First sector (2048-976773134, default 2048):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-976773134, default 976773119):

Created a new partition 1 of type 'Linux filesystem' and of size 465.8 GiB.
Partition #1 contains a exfat signature.

Do you want to remove the signature? [Y]es/[N]o: Y

The signature will be removed by a write command.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

### 3. ファイルシステムの作成とラベル付与

今後の拡張性や、将来 HDD を交換して UUID が変わってしまう時のために、ラベル付きでファイルシステムを作成します。

メインのストレージを「NASHDD」にしていたので、今回のラベル名は「NASHDD_BACKUP」とします。

⚠️ この操作でパーティション内のデータが削除されます

```
$ sudo mkfs.ext4 -L NASHDD_BACKUP /dev/sdc1
mke2fs 1.47.0 (5-Feb-2023)
Creating filesystem with 122096384 4k blocks and 30531584 inodes
Filesystem UUID: XXXX-XXXX-XXXX-XXXX-XXXX
Superblock backups stored on blocks:
32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968,
102400000

Allocating group tables: done
Writing inode tables: done
Creating journal (262144 blocks): done
Writing superblocks and filesystem accounting information:    0/3727
done
```

### 4. ラベル名でマウントできるように設定

`/etc/fstab` の最終行に 1 行追記します

```
$ sudo vi /etc/fstab
```

```
LABEL=NASHDD_BACKUP /mnt/nashdd_backup ext4 defaults,nofail 0 2
```

### 5. マウント先を作って、マウントする

```
$ sudo mkdir -p /mnt/nashdd_backup

$ sudo mount -a
```

再度 `lsblk` コマンドを実行して、できているかの確認までします。

```
$ lsblk
NAME                      MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda                         8:0    0 465.8G  0 disk
├─sda1                      8:1    0     1M  0 part
├─sda2                      8:2    0     2G  0 part /boot
└─sda3                      8:3    0 463.8G  0 part
└─ubuntu--vg-ubuntu--lv 252:0    0   100G  0 lvm  /
sdb                         8:16   0 465.8G  0 disk /mnt/nashdd
sdc                         8:32   0 465.8G  0 disk
└─sdc1                      8:33   0 465.8G  0 part /mnt/nashdd_backup
```

☝️ sdc が、作成したマウントポイント `/mnt/nashdd_backup` にマウントできているので成功！

### 6. cron で自動バックアップの設定

```
$ sudo crontab -e
```

最終行に以下を追記します。

```
0 5 * * * ionice -c 3 rsync -av --delete /mnt/nashdd/ /mnt/nashdd_backup/
```

各項目は、次のような意味があるらしい...

- `0 5 * *`: 毎日 5 時 0 分に実行する
- `ionice -c 3`: この処理のディスクI/O（読み書き）の優先度を最低にする
- `-a` (archive): タイムスタンプや権限をそのまま保持する
  - これがないと、毎回「新しいファイル」と判定されてフルコピーになってしまうみたい。
- `-v` (verbose): 進行状況を表示します（ログ保存用）
- `--delete`: メイン側で消したファイルを、バックアップ側からも消去する
  - これを入れないとバックアップHDDがいずれ満杯になります。

---

翌朝 `/mnt/nashdd_backup/` のディスク使用量が増えててちょっとうれしくなりました☺️

AI と相談しながらだと GUI のない OS でも実行するハードルがぐんと低くなって良いですね。いまのところ NAS としてしか活用できていないので、cron とか活用していきたいなーと思ってます。
