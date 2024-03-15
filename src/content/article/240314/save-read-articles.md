---
title: 読んだ記事をとにかくログる運用
date: 2024-03-14
tags: kintone IT
eyecatch: 240314.jpg
eyecatchEmoji: 📚
description: 調べ物や暇つぶしとして何気なく読んでるネットの記事を全部記録として残してみようと思い、その土壌を整備しました。
---

こんにちは。だいちゃんです。

[君たちはどう記事を管理しているか](https://zenn.dev/yokoo_an209/articles/c0ccd3bd241ad6)

👆この記事に感化されて、僕も読んだ記事をとりあえず全部記録する活動を初めてみようと思い、kintoneアプリとブックマークレットで記録する環境を作りました。

## ブックマークレットでkintoneに記事を保存する

この手のツールは、いかに負担なく使い続けられるか、が重要になってくるので、ワンクリックで記事のタイトルとURLをkintoneに飛ばすためのブックマークレットと、kintone側でのカスタマイズを作成しました。

![](/images/240314.jpg)

記事を保存する際の操作手順は次のとおりです：

1. 記事を開いた状態で、ブックマークの「記事保存」をクリックする（画像の赤枠のやつ）
2. kintoneのレコード追加画面が立ち上がり、タイトルとURLが自動挿入される
3. 記事に関連するタグを選択して、レコードを保存する
4. 2. で開いた画面が閉じる


## ハードルを低くするためのこだわり

### タイトルとURLの自動入力

わざわざコピペするなんてやってられないので。


### レコード保存時にタブを閉じる

本来ならレコード一覧画面に移動するところを、タブを閉じるようにカスタマイズしました。

保存後、閲覧していた記事に戻る手間を減らします。


### 保存したかどうかがわかるように

ブックマークレットをクリックした時点で、閲覧していた記事のタブが ✅ に変わるので、二重登録を防ぐことができます。

保存したっ...け？？って悩むことすらめんどくさい。


## コード

▼ ブックマークレット

```javascript
javascript:(function(){t=window.getSelection().toString() ? window.getSelection().toString() : document.title;u=document.URL;window.open('https://udcxx.cybozu.com/k/guest/4/20/edit?title=' + t.replaceAll(' ','_space_').replaceAll('#','_hash_').replaceAll('?','_question_').replaceAll('%','_par_') + '&url=' + u); document.title = '✅'})();
```

▼ kintoneカスタマイズ

```javascript
const spaceId = 'tags';
const ignoreField = ['Read']

kintone.events.on('app.record.create.show', (event) => {
    const searchParams = new URLSearchParams(window.location.search);
    event.record.Title.value = searchParams.has('title') ? searchParams.get('title').replaceAll('_space_',' ').replaceAll('_hash_','#').replaceAll('_question_','?').replaceAll('_par_','%') : '';
    event.record.URL.value = searchParams.has('url') ? searchParams.get('url') : '';
    event = createSelector(event);
    return event;
});

kintone.events.on(['app.record.edit.show', 'app.record.detail.show'], (event) => {
    return createSelector(event);
});

kintone.events.on('app.record.create.submit.success', () => {
    window.close();
});



/**
 * タグを選択する画面を生成します
 * 
 * @param {Object} event イベントオブジェクト
 * @returns イベントオブジェクト
 */
async function createSelector(event) {

    const appId = kintone.app.getId();

    const fieldInfo = await kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', {app: appId});
    const fieldLayout = await kintone.api(kintone.api.url('/k/v1/app/form/layout', true), 'GET', {app: appId});

    await Promise.all(
        fieldLayout.layout.map((row) => {
            if (row.type === 'ROW') {
                const type = row.fields[0].type;
                const field = row.fields[0].code;
                if (type === 'CHECK_BOX' && !ignoreField.includes(field)) {
                    // チェックボックス かつ ignoreに含まれない

                    let ul = document.createElement('ul');
                    ul.classList.add('udcxx-tags');

                    const options = Object.keys(fieldInfo.properties[field].options);
                    options.forEach((option) => {
                        const label = fieldInfo.properties[field].options[option].label;
                        let li = document.createElement('li');
                        li.classList.add('udcxx-tag');
                        li.innerHTML = replaceIcon(label);

                        if (event.type === 'app.record.detail.show') {
                            li.style.display = 'none';
                        }

                        if (event.record[field].value.includes(label)) {
                            li.classList.add('--selected');

                            if (event.type === 'app.record.detail.show') {
                                li.style.display = 'block';
                            }
                        }

                        if (event.type === 'app.record.create.show' || event.type === 'app.record.edit.show') {
                            li.style.cursor = 'pointer';

                            li.addEventListener('click', () => {
                                li.classList.toggle('--selected');
                                changeValue(field, option, li.classList.contains('--selected'));
                            });
                        }
                        ul.appendChild(li);
                    });

                    kintone.app.record.getSpaceElement(spaceId).appendChild(ul);

                    kintone.app.record.setFieldShown(field, false)
                }
            }
        })
    )

    return event;
}

/**
 * タグ選択時に、フィールドの値を変更します
 * 
 * @param {String} fieldCode 変更するフィールドのフィールドコード
 * @param {String} value 変更する値
 * @param {Boolean} isSelect 選択状態にする場合、true
 */
function changeValue(fieldCode, value, isSelect) {
    const recordObject = kintone.app.record.get();
    const targetArray = recordObject.record[fieldCode].value;

    if (targetArray.includes(value) && !isSelect) {
        // 選択済み && 選択解除したい
        recordObject.record[fieldCode].value = targetArray.filter(v => v !== value);
    } else if (!targetArray.includes(value) && isSelect) {
        // 未選択の場合 && 選択したい
        recordObject.record[fieldCode].value.push(value);
    }

    kintone.app.record.set(recordObject);
}

/**
 * :iconName: を画像要素に変換
 * 
 * @param {String} valueText :iconName: ItemValue
 * @returns :iconName: に対応した画像要素が含まれるアイテム
 */
function replaceIcon(valueText) {
    if (valueText.includes(':')) {
        const iconName = valueText.match(/:.*:/g)[0].replaceAll(':','');
        const iconDom = `<img src="https://xxxx/icon/${iconName}.svg" class="udcxx-icon">`;
    
        return valueText.replace(':'+ iconName + ':', iconDom);
    }

    return valueText;
}
```

```css
.udcxx-icon {
    width: 1.5em; height: 1.5em;
    padding-right: 3px;
    top: -0.1em;
    position: relative;
    vertical-align: middle;
}

.udcxx-tags {
    max-width: 80vw;
    margin-bottom: 20px;
    padding-inline-start: 0; padding-left: 8px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style: none;
}

.udcxx-tag {
    margin: 5px;
    padding: 5px 10px;
    color: #333;
    border-radius: 5px;
    border: 1px solid #999;
    background-color: #ededed;
}

.udcxx-tag.--selected {
    color: #fff;
    border: 1px solid #999;
    background-color: #3498db;
}
```

---

ここに蓄積したデータをどっか（ポートフォリオとか）で活用したいなぁ...