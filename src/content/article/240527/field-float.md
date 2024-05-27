---
title: グループフィールドを横並びにする
date: 2024-05-27
tags: kintone IT
eyecatch: 240527.png
eyecatchEmoji: ↩
description: kintoneのグループフィールドを、ほかのフィールドの横に並ぶように配置するカスタマイズを作成しました
---

こんにちは。だいちゃんです。

kintoneのグループフィールドって、ほかのフィールドの横に並べることができないので、それをできるようにするカスタマイズを作成しました。

対象のフィールドコードに書き換えて、アプリに適用するだけで、こんな感じでフィールドを横並びにすることができます。

![](/images/240527.png)

## グループフィールドを横並びに配置するカスタマイズ

```javascript
kintone.events.on(['app.record.create.show', 'app.record.edit.show', 'app.record.detail.show'], () => {

    // 横並びにするフィールドのフィールドコードを指定
    const targetLeft = '文字列__1行_';
    const targetRight = 'グループ';

    // Element 取得
    const leftEl = getFieldElement(targetLeft);
    const rightEl = getFieldElement(targetRight);

    if (leftEl && rightEl) {
        // left が属する行を取得
        const row = leftEl.parentElement;

        // div つくってフィールドを入れる
        let div = document.createElement('div');
        div.appendChild(leftEl);
        div.appendChild(rightEl);

        // フィールドが縮まないように
        leftEl.style.flexShrink = 0;
        rightEl.style.flexShrink = 0;

        // div の設定
        div.style.display = 'flex';
        div.style.flexWrap = 'nowrap';
        div.style.justifyContent = 'flex-start';
        div.style.alignContent = 'flex-start';

        // フィールドが属する行に div を置く
        row.appendChild(div);
    } else {
        console.error('フィールド要素の取得に失敗しました。');
    }
});


/**
 * フィールドコードからElementを取得します
 * 
 * @param {String} fieldCode Elementを取得したいフィールドのフィールドコード
 * @returns Element
 */
function getFieldElement(fieldCode) {
    const fieldList = cybozu.data.page.FORM_DATA.schema.table.fieldList;

    for (const fieldId in fieldList) {
        if (fieldList[fieldId].var === fieldCode) {
            return document.querySelector(`.field-${fieldId}`)
        }
    }
}
```


## 制限事項など

* グループフィールド同士を横並びにすることもできます
* テーブルフィールドは **非対応** です
  * getFieldElement 関数で cybozu.data.page.FORM_DATA.schema.subTable の中も探索すると...
* それ以外のフィールドは **未検証** です
* そもそも、 `cybozu.～` オブジェクトからフィールドIDを取得する方法が非公式なので、将来的に動作しなくなる可能性があります