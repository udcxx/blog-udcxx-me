---
title: 月曜日と次の日曜日の日付を取得する
date: 2023-09-29
tags: IT
eyecatch: 
eyecatchEmoji: 📆
description: JavaScriptで、今週の月曜日と、次の日曜日の日付を取得する
---

こんにちは、だいちゃんです。

2週間前に投稿した、週報を復活＆kintoneから公開できるようにしたことを紹介した記事で、kintoneの日付フィールドに、レコード作成時点から見た **直前の月曜日** と **直後の日曜日** の日付を自動で入力するスクリプトを公開していました。

[kintoneからはてブロに投稿する | 無趣味の戯言](https://blog.udcxx.me/article/230915/kintone-to-hateblo/)

ただ、今週（9/25）に実行してみると、**次に来る日曜日** が **10月1日** になり月をまたいじゃうのに、そこを考慮できていなかったので、2023-09-31 を日付フィールドに入れようとして、kintone側でエラーになってしまいました。

ということで、改修っ！

## サンプルスクリプト

```javascript

kintone.events.on(['app.record.create.show'], (e) => {
    const date = new Date();
    const todayDate = date.getDate();
    const todayDay = date.getDay();    
    const mondayDate = todayDate - todayDay + 1;

    // 今月の月末
    let date2 = new Date();
    date2.setMonth(date.getMonth() + 1, 0);
    const thisMonthlastDate = date2.getDate();

    // 前月の月末
    let date3 = new Date();
    date3.setMonth(date.getMonth(), 0);
    const lastMonthlastDate = date3.getDate();

    // 今週の月曜日
    let mondayFullDate = "";
    if (mondayDate < 1) {
        // 月をまたぐ場合
        mondayFullDate = `${date.getFullYear()}-${date.getMonth()}-${lastMonthlastDate + mondayDate - 1}`; 
    } else {
        // 月をまたがない場合
        mondayFullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${mondayDate}`; 
    }

    // 次に来る日曜日
    let sundayFullDate = "";    
    const sundayDate = mondayDate + 6;
    if (thisMonthlastDate <= sundayDate) {
        // 月をまたぐ場合
        sundayFullDate = `${date.getFullYear()}-${date.getMonth() + 2}-${sundayDate - thisMonthlastDate}`;
    } else {
        // 月をまたがない場合
        sundayFullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${sundayDate}`
    }

    // 日付フィールドの値を更新
    e.record.StartDay.value = mondayFullDate;
    e.record.EndDay.value = sundayFullDate;

    e = disable(e);

    return e;
});

```

日付フィールドのフィールドコードは、前回と変わらず、`StartDay` と `EndDay` のままです。

`disable()` 関数は、省略してます。[前回の記事](https://blog.udcxx.me/article/230915/kintone-to-hateblo/)を参考にどうぞ。

---

テストしてないことがバレバレですね...w

`let date2` とかダサいからやめたいな。というか全体的にもっとキレイに書く方法ないのかな。