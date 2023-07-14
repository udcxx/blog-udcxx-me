---
title: レコード一覧画面で値をコピーするカスタマイズ
date: 2023-07-14
tags: kintone IT
eyecatch:
eyecatchEmoji: 📋
description: レコード一覧画面からレコードの値をコピーできるカスタマイズを作成しました。
---

kintoneで文字列フィールドに入力されている文章を、レコード一覧画面でコピーできるカスタマイズを作りました。

kintoneに登録したデータを頻繁にコピーして別のところにペッする簡単なお仕事が結構な頻度であるのですが、短い文章であれば、レコード一覧画面からコピーできるものの、ある程度長い文章になると、インライン編集モードにするか、レコード詳細画面を開かないと文章全体をコピーすることができなくて、少々手間でした。

そこで、ワンクリックでコピーできるようなカスタマイズを作成しました。

## 仕様

レコード一覧画面で次の処理を実行します。

* 指定した文字列フィールドの列に「コピー」ボタンを表示する
* 「コピー」ボタンをクリックすると、その行のレコード番号を使ってレコード取得APIを叩いて、文字列フィールドの値をクリップボードへ保存する

ちょっと雑に作った部分があって、例えばレコード一覧画面上にレコード番号フィールドが表示されてないとエラーになります。ほかにも穴があるかも。ご注意を...。


## コード

どこでなにをしてるかは、コメントで簡単に説明してます。

`textFieldCode` は、コピーしたい文字列フィールドのフィールドコードを指定してあげてください。レコード番号フィールドのフィールドコードは、デフォルトのレコード番号である必要があります。

### JavaScript

```javascript
kintone.events.on(['app.record.index.show'], () => {
    const fieldsList = cybozu.data.page.FORM_DATA.schema.table.fieldList;

    // 文字列のフィールドコードを指定
    const textFieldCode = "TEXT";

    let recordField = "";
    let textField = "";

    // フィールドに対応するClass名を探し出す
    for (let fieldList in fieldsList) {
        if (fieldsList[fieldList].var === 'レコード番号') {
            recordField = fieldsList[fieldList].id;

        } else if (fieldsList[fieldList].var === textFieldCode) {
            textField = fieldsList[fieldList].id;

        }
    }

    // 成功時に表示するトースト
    let toastEl = document.createElement('div');
    toastEl.innerHTML = '✅ コピーしました';
    toastEl.classList.add('copy_toast');
    toastEl.classList.add('sccess');
    toastEl.classList.add('hidden');
    document.querySelector('body').appendChild(toastEl);

    // 失敗時に表示するトースト
    let toastErrEl = document.createElement('div');
    toastErrEl.innerHTML = '😭 失敗しました';
    toastErrEl.classList.add('copy_toast');
    toastErrEl.classList.add('err');
    toastErrEl.classList.add('hidden');
    document.querySelector('body').appendChild(toastErrEl);

    const textFieldAreas = document.querySelectorAll(`.value-${textField}`);

    // 一覧画面上の文字列すべてにコピーボタンを設置
    textFieldAreas.forEach(textFieldArea => {
        textFieldArea.classList.add('relative');

        // コピーボタン
        let btnEl = document.createElement('div');
        btnEl.innerHTML = '📋 コピー';
        btnEl.classList.add('copy_button');
        textFieldArea.appendChild(btnEl);

        // 該当行のレコード番号取得
        const span = textFieldArea.parentNode.querySelector(`.value-${recordField} > div > span`);
        const recordId = span ? span.innerHTML : 0;

        // ボタンクリック時の動作
        btnEl.addEventListener('click', () => {
            const body = {
                app: kintone.app.getId(),
                id: recordId
            };

            // 文字列の値を取得
            kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', body, (resp) => {
                // 取得成功
                // クリップボードへ文字列の値を保存
                navigator.clipboard.writeText(resp.record[textFieldCode].value);

                // 成功用トースト表示
                const toast = document.querySelector('.copy_toast.sccess');
                toast.classList.remove('hidden');
                toast.classList.add('view');
                setTimeout(function() {
                    toast.classList.remove('view');
                    toast.classList.add('hidden');
                }, 3000);

            }, (error) => {
                // 取得失敗
                // コンソールへエラー詳細表示
                console.log(error);

                // 失敗用トースト表示
                const toast = document.querySelector('.copy_toast.err');
                toast.classList.remove('hidden');
                toast.classList.add('view');
                setTimeout(function() {
                    toast.classList.remove('view');
                    toast.classList.add('hidden');
                }, 3000);

            });
        })
    });

});
```


### CSS

```css
@charset 'UTF-8';

.relative {
    position: relative;
}

div.copy_button {
    padding: 3px 8px;
    position: absolute;
    top: 50%; right: 20px;
    transform: translateY(-50%);
    border-radius: 5px;
    opacity: 1;
    transition: background-color 0.5s;
    background-color: #3497DB;
    border: 1px solid #4D49A6;
    color: #fff;
    cursor: pointer;
}

div.copy_button:hover {
    background-color: #007399;
}

div.copy_toast {
    width: 200px;
    padding: 3px 8px;
    margin: 0 auto;
    position: fixed;
    top: 50px; left: 0; right: 0; z-index: 100;
    text-align: center;
    color: #fff;
    visibility: visible;
    border-radius: 5px;
    background-color: #3497DB;
    border: 1px solid #4D49A6;
}

div.copy_toast.err {
    background-color: #E74C3C;
    border: 1px solid #9B1305;
}

div.copy_toast.hidden {
    visibility: hidden;
    opacity: 0;
}

div.copy_toast.view {
    animation: fadeInOut 3s 0s forwards;
}


@keyframes fadeInOut {
    0% {
        opacity: 0;
    }

    10%, 90% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
```

---

対象の文字列フィールドを選択して使えるようなプラグイン化して [ここ](https://udcxx.stores.jp/) で販売しようかと思いましたが腰が重かったのでブログに載せることにしました。気が向いたらやろうかな。