---
title: APIで郵便番号から住所を取得する
date: 2023-
tags: IT kintone
eyecatch:
eyecatchEmoji: 📬
description: よくWebフォームにあるような、郵便番号を入力したら住所が自動で入力されるアレを、kintoneレコード追加/編集画面でも利用できるカスタマイズを作成しました。
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

よくWebフォームにあるような、郵便番号を入力したら住所が自動で入力されるアレを、kintoneレコード追加/編集画面でも利用できるカスタマイズを作成しました。

実際のJavaScriptも、最後の方に掲載しているので、kintoneで住所を管理しているのであれば、カスタマイズ適用してみてください。

## Postal Code API

今回使用したAPIはこちらのPostal Code APIです。

[madefor/postal-code-api: Postal Code API](https://github.com/madefor/postal-code-api)

シンプルな設計で使いやすいうえ、無料で使えるため、こちらのAPIを利用することにしました。

ちなみに、このAPIは、Github Pages上に郵便番号ごとの静的なファイルを配置することで、信頼度の高いAPIを提供していて、利便性に加え、運用のアイディアもすごいなと思っています（語彙力）


## イベント

kintoneで用意している、レコード追加/編集画面でフィールドの値を変更したときのイベントを利用しています。

郵便番号を入力する数値フィールドの値が変更されたことをトリガーに、 Postal Code APIにリクエストを投げて、返ってきた値を住所用のフィールドに入力する、といった処理になっています。

kintoneの数値フィールドの仕様上、レコードを保存するまでは、全角文字や記号も入力できちゃうのですが、そのままAPIにリクエストを投げると怒られちゃうので、値を変更したときのイベントが発火したタイミングでバリデーションチェックも行うようにしています。

特にハイフンの誤入力が多くなることが想定されるので、ハイフンの除去は自動で行うようにしました。

```
const postcode = e.record.postcode.value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
   return String.fromCharCode(s.charCodeAt(0) - 65248);
}).replace(/\u3001|\uff0c|-|ー|－|,/g, "");
```

全角文字を半角に変換する処理は、以前 [半角自動変換カスタマイズ](https://udcxx.stores.jp/items/63c21d5943341060dd677829) を作成する際にまとめた記事を参考にしてます。ちょっと抽象的だから分かりづらいかもしれませんが...

* [kintoneのカスタマイズを作成した](https://blog.udcxx.me/article/230121/kintone-auto-half-width/)


## 最終的なコード

上記を踏まえ、最終的に以下のコードになりました。

流用する際には、フィールドコードの部分はアプリの設定にあわせてくださいませ。

```
kintone.events.on(['app.record.create.change.postcode', 'app.record.edit.change.postcode'], (e) => {

    const postcode = e.record.postcode.value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    }).replace(/\u3001|\uff0c|-|ー|－|,/g, "");
    
    const getUrl = `https://madefor.github.io/postal-code-api/api/v1/${postcode.slice(0, 3)}/${postcode.slice(3, 7)}.json`;

    kintone.proxy(getUrl, 'GET', { 'Content-Type': 'application/json' }, {}).then((result) => {
        const records = kintone.app.record.get();

        try {
            const resultJSON = JSON.parse(result[0]);

            records.record['prefecture'].value = resultJSON.data[0].ja.prefecture;
            records.record['address1'].value = resultJSON.data[0].ja.address1 + " " + resultJSON.data[0].ja.address2;
            records.record['address2'].value = resultJSON.data[0].ja.address3 + " " + resultJSON.data[0].ja.address4;
            records.record['postcode'].value = postcode;
            kintone.app.record.set(records);
        } catch (e) {
            alert(`住所の取得に失敗しました。\r入力内容に問題がいないかご確認ください。`);
            console.log(`住所の取得に失敗しました。：${e}`);
        }

    }, (e) => {
        alert(`住所の取得に失敗しました。\r入力内容に問題がいないかご確認ください。`);
        console.log(`住所の取得に失敗しました。：${e}`);
    });

});
```

---

こんな感じで、暇なときにkintoneのカスタマイズやアプリテンプレートを作って、[自分のショップ](https://udcxx.stores.jp/) で販売したりしてますが、まっっっったく売れない ~~売る気がない~~ ので、よかったら覗いていってください🙂

[udcstore](https://udcxx.stores.jp/)