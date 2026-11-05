---
title: レコード未作成のユーザーをリストアップする
date: 2024-07-10
tags: kintone IT
eyecatch: 
eyecatchEmoji: ✔
description: kintoneで、レコードを登録していないユーザーをリストアップするJavaScriptカスタマイズを作成しました。
---

こんにちは。だいちゃんです。

kintoneを使っていると、**レコードが未登録のユーザー** を確認したいケースが多々あるかと思います。

ということで、社員マスタなどのアプリと比較して、レコードを登録していないユーザーをリストアップするカスタマイズを作成しました！

## ユースケース

アンケートアプリで未回答のユーザーを抽出する、などのユースケースを想定しています。

queryを指定すれば、**先月未登録のユーザー** を抽出することも可能です。例えば、先月の月報をまだ登録してないユーザーを抽出する、みたいに活用できるはず。


## カスタマイズの仕様

このカスタマイズでは、次のような動作をします：

* **マスタアプリ** と **チェックするアプリ** を用意する
* マスタアプリのユーザー選択フィールドと、チェックするアプリのユーザー選択フィールドを比較する
* マスタアプリに登録されてるけど、チェックするアプリに登録のないユーザーをリストアップする


## 未登録者をリストアップするカスタマイズ

実際に作成したスクリプトです。次のようなスクリプトをJavaScriptファイルとして保存します。

冒頭の14行は環境に合わせて修正してくださいね😉

```javascript
/** マスタアプリのアプリID @type {Number} */
const masterAppId = 905;

/** マスタアプリ側の比較対象のフィールドのフィールドコード @type {String} */
const masterUserNameField = 'ユーザー選択';

/** チェックするアプリのアプリID @type {Number} */
const reportAppId = 906;

/** チェックするアプリ側の比較対象のフィールドのフィールドコード @type {String} */
const reportUserNameField = 'ユーザー選択';

/** 確認ボタンを表示するユーザーのログイン名 @type {Array<String>} */
const shownUser = ['loginName', 'user01'];



/**
 * レコード一覧画面表示イベント
 */
kintone.events.on(['app.record.index.show'], (e) => {
    const header = kintone.app.getHeaderMenuSpaceElement();
    const button = new Kuc.Button({
        text: '未登録者を確認する',
        type: 'nomal',
        className: 'not-executed-checker',
        visible: true,
    });

    button.addEventListener('click', () => {
        check();
    });

    const btnNum = document.querySelectorAll('.not-executed-checker').length;
    if (shownUser.includes(kintone.getLoginUser().code) && btnNum === 0) {
        // ログインユーザーが shownUser に含まれている かつ
        // すでにボタンが設置されていない
        header.appendChild(button);
    };
});



/**
 * 未登録者をリストアップして表示する関数
 */
async function check() {

    Swal.showLoading();

    const master = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {
        "app": masterAppId,
        "fields": masterUserNameField
    });
    const masterList = master.records.map((m) => m[masterUserNameField].value[0].name);
    
    const report = await kintone.api(kintone.api.url('/k/v1/records', true), 'GET',  {
        "app": reportAppId,
        "fields": reportUserNameField
    });
    const reportList = report.records.map((m) => m[reportUserNameField].value[0].name);
    
    const notExecuted = masterList.filter((user) => {
        if (!reportList.includes(user)) {
            return user;
        }
    });

    let result = '未登録の方はいませんでした。';
    if (notExecuted.length > 0) {
        result = '<div style="width: 95%; margin: 0 auto; display: grid; grid-template-columns: 33% 33% 33%;">'
        notExecuted.forEach((user) => {
            result += `<div style="padding: 0.5em 1em;">${user}</div>`;
        });
        result += '<div>'
    }

    Swal.hideLoading();

    Swal.fire({
        title: '未登録者',
        width: '40em',
        html: result,
        allowOutsideClick: false
    });
};
```


## セットアップ方法

確認ボタンを設置したいアプリに、次のJavaScript・CSSを、上から順番通りに指定してください：

**JavaScript**

* https://js.cybozu.com/sweetalert2/v11.7.31/sweetalert2.min.js
* https://unpkg.com/kintone-ui-component/umd/kuc.min.js
* （上で作成したJavaScriptファイル）

**CSS**

* https://js.cybozu.com/sweetalert2/v11.7.31/sweetalert2.min.css


## 制限事項

* ユーザー選択フィールドのみに対応しています。
  * `m[masterUserNameField].value[0].name` や `m[reportUserNameField].value[0].name` あたりをゴニョゴニョしたら作成者フィールドとかでも使えるはず。
* ゲストスペース非対応です。
* 500レコード以上は動作保証していません。~~というかチェックされないと思います~~
* 不用意に実行されることを防ぐため、`shownUser` で指定したユーザーにしかボタン表示していません。
  * `shownUser.includes(kintone.getLoginUser().code) && ` を消せば全ユーザーに表示されます。
* 表示名でチェックしているので、同じ表示名のユーザーがいたらパスしてしまう可能性があります。
* 比較用のフィールドが空になってるレコードがあったらバグります。**初期値を入れておくことを強くおすすめします**
* ほかにも考慮漏れがあるかもしれません。

### 💁‍♂️ 初期値についての補足

ユーザー選択フィールドの1番目に指定されたユーザーだけで比較しているので、複数のユーザーを選択したユーザー選択フィールドは利用できません。

そして、ユーザー選択以外のフィールドにも対応していません（レコードデータの持ち方の問題が...ｺﾞﾆｮｺﾞﾆｮ）

ユーザー選択フィールドの初期値に「ログインユーザー」を指定しておくと、作成者と似たような動作になるので、チェックするアプリ側のユーザー選択フィールドに設定しておくのがオススメです。

---

`map` の便利な使いどころがイマイチわかってない...

[こちら](https://udcxx.me/contact/?sub=Other) からお問い合わせいただければ、上記以外にもkintoneカスタマイズ制作のお手伝いができるかもしれません。ご相談だけでもお気軽にどうぞー