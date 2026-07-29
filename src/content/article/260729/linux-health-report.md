---
title: 自宅鯖の月1健康診断をSlackに投稿する
date: 2026-07-29
tags: Linux IT
eyecatch: 
eyecatchEmoji: 🩺
description: Ubuntu Server って頻繁にログインしないですよねぇ... ってことで、自分で健康診断してSlackに通知させる仕組みを作りました。
---

こんにちは、だいちゃんです。

今年の始めに Ubuntu Server を導入して簡易 NAS 環境を構築し、順調に運用できています。

* [Ubuntu Server 入れてみた | 無趣味の戯言](https://blog.udcxx.me/article/260102/ubuntu-server/)
* [Ubuntu で外付け HDD を NAS にする | 無趣味の戯言](https://blog.udcxx.me/article/260117/nas-on-ubuntu-server/)

今月は NAS のバックアップ環境を整えたりしました。

* [自宅NASのバックアップ体制を整えた | 無趣味の戯言](https://blog.udcxx.me/article/260723/nas-backup/)

↑の設定をしようと半年ぶりに　SSH でログインしてみたらアップデートが溜まっちゃってました...

こまめにログインしてメンテナンスするべきなんですが、自宅サーバーだしモチベーションもないので、自分でチェックして報告してもらうことにしました。

## 概要

現在の我が家のサーバーはこんな感じ。

* OS: Ubuntu 24.04.4
* 主な用途: NAS

主な用途が NAS なので、Linux 側のアップデートが溜まっていないか？と、NAS 用の HDD の S.M.A.R.T. 情報を拾ってレポートを作って、Slack に投げてもらうようにしました。

![](/images/260729.png)

## ソースコード

以下を `/usr/local/bin/health_check_to_slack.sh` として保存しました。

```
#!/bin/bash

# SlackのWebhook URL
WEBHOOK_URL="https://hooks.slack.com/services/xxx"

# 日付を取得
TODAY=$(date "+%Y/%m/%d")

# アップデート件数の取得
sudo apt update > /dev/null 2>&1
UPGRADES_COUNT=$(apt list --upgradable 2>/dev/null | grep -c "\[upgradable from:\]")

# 外付けHDDの使用率と空き容量を取得
HDD_USAGE=$(df -h | grep -E "/mnt/nashdd/?$" | awk '{for(i=1;i<=NF;i++) if($i ~ /%$/) print $i}' | tr -d '%' | head -n 1)
HDD_AVAIL=$(df -h | grep -E "/mnt/nashdd/?$" | awk '{for(i=1;i<=NF;i++) if($i ~ /%$/) print $(i-1)}' | tr -d 'G' | head -n 1)
HDD_BK_USAGE=$(df -h | grep -E "/mnt/nashdd_backup/?$" | awk '{for(i=1;i<=NF;i++) if($i ~ /%$/) print $i}' | tr -d '%' | head -n 1)
HDD_BK_AVAIL=$(df -h | grep -E "/mnt/nashdd_backup/?$" | awk '{for(i=1;i<=NF;i++) if($i ~ /%$/) print $(i-1)}' | tr -d 'G' | head -n 1)

# ラベルからデバイス名を取得
MAIN_DEV=$(blkid -L NASHDD 2>/dev/null | sed -E 's/[0-9]+$//')
BAK_DEV=$(blkid -L NASHDD_BACKUP 2>/dev/null | sed -E 's/[0-9]+$//')

# ====================
# メインHDDの処理
# ====================
# HDDの詳細情報をまとめて取得
SMART_ALL=$(sudo smartctl -a "$MAIN_DEV" 2>/dev/null)

# 総合健康状態の取得
HDD_HEALTH=$(echo "$SMART_ALL" | grep "overall-health" | awk -F: '{print $2}' | xargs)
if [ -z "$HDD_HEALTH" ]; then
    HDD_HEALTH=$(sudo smartctl -H "$MAIN_DEV" 2>/dev/null | grep "test result" | awk -F: '{print $2}' | xargs)
fi
[ -z "$HDD_HEALTH" ] && HDD_HEALTH="Unknown"

# 各種重要セクタ数の抽出
SEC_5=$(echo "$SMART_ALL" | grep "Reallocated_Sector_Count" | awk '{print $NF}')
SEC_196=$(echo "$SMART_ALL" | grep "Reallocation_Event_Count" | awk '{print $NF}')
SEC_197=$(echo "$SMART_ALL" | grep "Current_Pending_Sector_Count" | awk '{print $NF}')

[ -z "$SEC_5" ] && SEC_5="0"
[ -z "$SEC_196" ] && SEC_196="0"
[ -z "$SEC_197" ] && SEC_197="0"

# ====================
# バックアップHDDの処理
# ====================
# HDDの詳細情報をまとめて取得
SMART_BK_ALL=$(sudo smartctl -a "$BAK_DEV" 2>/dev/null)

# 総合健康状態の取得
HDD_BK_HEALTH=$(echo "$SMART_ALL" | grep "overall-health" | awk -F: '{print $2}' | xargs)
if [ -z "$HDD_BK_HEALTH" ]; then
    HDD_BK_HEALTH=$(sudo smartctl -H "$BAK_DEV" 2>/dev/null | grep "test result" | awk -F: '{print $2}' | xargs)
fi
[ -z "$HDD_BK_HEALTH" ] && HDD_BK_HEALTH="Unknown"

# 各種重要セクタ数の抽出
SEC_BK_5=$(echo "$SMART_ALL" | grep "Reallocated_Sector_Count" | awk '{print $NF}')
SEC_BK_196=$(echo "$SMART_ALL" | grep "Reallocation_Event_Count" | awk '{print $NF}')
SEC_BK_197=$(echo "$SMART_ALL" | grep "Current_Pending_Sector_Count" | awk '{print $NF}')

[ -z "$SEC_BK_5" ] && SEC_BK_5="0"
[ -z "$SEC_BK_196" ] && SEC_BK_196="0"
[ -z "$SEC_BK_197" ] && SEC_BK_197="0"


# メッセージを組み立て
MESSAGE="*自宅サーバー 定期レポート* ${TODAY}\n"
MESSAGE+="━━━━━━━━━━━━━━━━━━\n"
MESSAGE+="📦 利用可能な更新が *${UPGRADES_COUNT}* 件 あります。\n"
MESSAGE+="📂 NASの現在の使用率は *${HDD_USAGE}* %・空き *${HDD_AVAIL}* GB です。\n"
MESSAGE+="🗄️ バックアップストレージは *${HDD_BK_USAGE}* %・空き *${HDD_BK_AVAIL}* GB です。\n"
MESSAGE+="💙 メインストレージの診断結果は *${HDD_HEALTH}* でした。\n"
MESSAGE+="　・代替セクタ数 ⋯ ${SEC_5}\n"
MESSAGE+="　・代替イベント ⋯ ${SEC_196}\n"
MESSAGE+="　・保留中セクタ ⋯ ${SEC_197}\n"
MESSAGE+="💟 バックアップストレージの診断結果は *${HDD_BK_HEALTH}* でした。\n"
MESSAGE+="　・代替セクタ数 ⋯ ${SEC_BK_5}\n"
MESSAGE+="　・代替イベント ⋯ ${SEC_BK_196}\n"
MESSAGE+="　・保留中セクタ ⋯ ${SEC_BK_197}"


# JSONデータを組み立ててSlackへ送信
PAYLOAD=$(cat <<EOF
{
  "username": "Ubuntu Server Health Report",
  "icon_emoji": ":ubuntu:",
  "text": "${MESSAGE}"
}
EOF
)

curl -X POST -H 'Content-type: application/json' --data "$PAYLOAD" $WEBHOOK_URL > /dev/null 2>&1
```

## cron の設定

`$ sudo crontab -e` で cron の編集画面に入って、以下を追記します。

```
# アップデート・HDDの診断結果を Slack に通知するスクリプト
0 9 1 * * /usr/local/bin/health_check_to_slack.sh
```

これで、毎月1日の9時にヘルスレポートがSlackに投稿されるようになります。

## こだわった(？) 点

デバイス名（ `sdb` とか）は接続順などによって（＝再起動や抜き差しのタイミングで）変わってしまうので、ラベル名（ `NASHDD` とか）で判断するようにしています。

```
MAIN_DEV=$(blkid -L NASHDD 2>/dev/null | sed -E 's/[0-9]+$//')
BAK_DEV=$(blkid -L NASHDD_BACKUP 2>/dev/null | sed -E 's/[0-9]+$//')
```

また、Incoming Webhook アプリをインテグレーションして使うことで、 `username` ・ `icon_emoji` を設定してアプリっぽく見せています。

現行の正攻法では、いちいち Slack App を作って、そのアプリの Webhook を利用するのがいいらしいけど、気軽に通知するだけなら古い方法で良いような...

---

これで、アップデート漏れも防ぎつつ、HDDの故障も未然に把握できるようになる... はず！
