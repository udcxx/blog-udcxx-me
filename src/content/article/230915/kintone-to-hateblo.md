---
title: kintoneからはてブロに投稿する
date: 2023-09-15
tags: kintone IT
eyecatch: 
eyecatchEmoji: 🎈
description: はてなブログAtomPubとkintone APIを活用して、kintoneのレコード上からはてなブログに投稿するカスタマイズを行いました。
---

こんにちは、だいちゃんです。

[昨日の宣言](https://blog.udcxx.me/article/230914/weekly-report/) の通り、週報を2年ぶりに復活させるにあたって、もっとブログを書きやすい環境を整えたくていろいろと探っていると、はてブロだと、専用のページから書く方法に加えて、APIを使って外部から投稿することもできることを知り、普段から使ってるkintoneと連携して、日々思いついたタイミングで追記し、週末にボタン1つで投稿できるように組んでみることにしました。


## JavaScript側

```javascript
// 新規作成画面表示イベント
kintone.events.on(['app.record.create.show'], (e) => {
    const date = new Date();
    const todayDate = date.getDate();
    const todayDay = date.getDay();
    const mondayDate = todayDate - todayDay + 1; // 今日の日にち - 曜日番号 で月曜日の日にちを取得

    //　開始日と終了日を設定
    e.record.StartDay.value = `${date.getFullYear()}-${date.getMonth() + 1}-${mondayDate}`;
    e.record.EndDay.value = `${date.getFullYear()}-${date.getMonth() + 1}-${mondayDate + 6}`;

    // 開始日と終了日を操作できないように
    e = disable(e);

    return e;
});

// 編集画面表示イベント
kintone.events.on(['app.record.edit.show'], (e) => {
    // 開始日と終了日を操作できないように
    e = disable(e);
    return e;
});

// 詳細画面表示イベント
kintone.events.on(['app.record.detail.show'], (e) => {
    // 投稿済みか判定
    const buttonState = e.record.PostStatus.value === "201" ? true : false;

    // 投稿ボタン表示
    const header = kintone.app.record.getHeaderMenuSpaceElement();
    const button = new Kuc.Button({
        text: '投稿する',
        type: 'submit',
        className: 'post--button',
        visible: true,
        disabled: buttonState
    });
    header.appendChild(button);

    // 投稿ボタンクリック時のイベント
    button.addEventListener('click', () => {
        const thisRecord = kintone.app.record.get().record;
        const hatebloBody = getBlogBody(thisRecord);

        const hatebloUrl = 'https://blog.hatena.ne.jp/{はてなID}/{ブログID}/atom/entry';
        const hatebloHead = {
            'Authorization': 'Basic {はてなID:APIキーをbase64変換}',
            'Content-Type': 'application/atomsvc+xml'
        };

        // はてブロAPIを叩いて、成功したら「投稿状況」フィールドにステータスコードを入れる
        kintone.proxy(hatebloUrl, 'POST', hatebloHead, hatebloBody, (resp, code) => {
            body = {
                'app': kintone.app.getId(),
                'id': kintone.app.record.getId(),
                'record': {
                    'PostStatus': {
                        'value': code
                    }
                }
            };
            kintone.api(kintone.api.url('/k/v1/record.json'), 'PUT', body);           
            location.reload();
        });        
    });

    return e;
});


// 日付フィールドの編集をできないようにする関数
const disable = (e) => {
    e.record.StartDay.disabled = true;
    e.record.EndDay.disabled = true;
    return e;
};


// POSTの内容を生成する関数
const getBlogBody = (thisRecord) => {
    const conetnt =`<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app">
<title>週報 ${thisRecord.StartDay.value.replace(/-/g, '/')} - ${thisRecord.EndDay.value.replace(/-/g, '/')}</title>
<author><name>{投稿者のはてなID}</name></author>
<content type="text/plain">
${thisRecord.Text.value}
</content>
<updated>${thisRecord.EndDay.value}T09:00:00</updated>
<category term="{カテゴリ名}" />
<app:control>
<app:draft>no</app:draft>
</app:control>
</entry>`;
    return conetnt;
}
```

`{はてなID}` `{ブログID}` `{はてなID:APIキーをbase64変換}` `{投稿者のはてなID}` `{カテゴリ名}` の5ヶ所を書き換えて、あと、フィールドコードさえ合わせていただければ、多分どの環境でも動くと思います。


## kintoneアプリ側

まずは、[RECITONE](https://app.udcxx.me/recitone/) に週報を作るにあたって必要なフィールドとそのフィールドタイプを考えてもらいます。（宣伝）

それを参考にしつつ、必要なフィールドを配置します。JavaScriptから操作するときに必要になる **フィールドコードの指定も忘れずに**。

* 開始日
  * フィールドタイプ：日付
  * フィールドコード： `StartDay`
* 終了日
  * フィールドタイプ：日付
  * フィールドコード： `EndDay`
* 本文
  * フィールドタイプ：文字列（複数行）
  * フィールドコード：`Text`
* 投稿状況
  * フィールドタイプ：文字列（1行）
  * フィールドコード：`PostStatus`


## 概要

**レコード作成**

週に1度、任意のタイミングでレコードを作成すると、自動でその週の月曜日と、次に来る日曜日の日付が「日付」フィールドに入力されます。

「日付」フィールドは編集できなくなるので、処理がコケたら `kintone.app.record.set()` とかをコンソール画面から叩いて無理やり値を突っ込む必要があります。

**レコード編集**

その週の間に、思いついたことを、思いついたタイミングで入力します。

kintoneなので、通勤中も ~~仕事中も~~ 触りやすくていいね。

**ブログ投稿**

金曜日の終わりに、レコード詳細画面上に表示される「投稿する」ボタンをクリックします。1度クリックすると「投稿する」ボタンが押せなくなるので、重複した投稿を防げます。

ただ、投稿に失敗したときの処理を書いてないので、そこは適宜どうぞ...

---

base64変換してるとはいえ、APIキーをJavaScript側で持ってるのでセキュアではないですが、アプリのアクセス権とか、カスタマイズを管理者のみにしたりしてカバーしていただければ。

kintoneからはてなブログに投稿することに需要はなさそうですが、処理中の部分部分は拾って使えるんでは...？

**参考**

* [はてなブログAtomPub | Hatena Developer Center](https://developer.hatena.ne.jp/ja/documents/blog/apis/atom/)
* [kintone API ドキュメント - cybozu developer network](https://cybozu.dev/ja/kintone/docs/)