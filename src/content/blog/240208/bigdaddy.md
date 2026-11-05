---
title: アプリを作るアプリを作ってみた
date: 2024-02-08
tags: kintone IT
eyecatch: 
eyecatchEmoji: 👶
description: kintoneで、あらかじめダミーのレコードが入ってるアプリを作るためのアプリを作ってみました
---

こんにちは。だいちゃんです。

kintoneのカスタマイズの勉強がてら、**アプリを作ってくれるアプリ**を作ってみました。その名も **BIG DADDY** ！

アプリ自体需要はないと思いますが、ランダムな値でダミーのデータも一緒に作るようにしてます。さくっとレコード付きのアプリがほしいなっていう存在しない状況に活躍すること間違いなし🙃

## 仕様

kintoneにBIG DADDYを用意したら、次のステップで、ダミーデータ付きのアプリが作れちゃいます。

1. アプリを開いてレコード追加を行います
2. アプリ名とか、配置したいフィールドを入力して、保存します    
    ![$1](/240208_1.jpg)
3. 指定したスペースにアプリが出来上がってます    
    ![$1](/240208_2.jpg)

編集して保存するたびにアプリを作ってたら大変なことになりそうだったので、レコードの新規登録時のみ、アプリを作る動きにしました。レコードの再利用を行うことで、同じアプリや似たアプリを作ることはできるので、問題ないかなと。

自分がスペース外にアプリを作らない主義なので、スペース内アプリしか作れない仕様です。スペースはスペースでも、ゲストスペースは非対応です。普通の公開スペースor非公開スペース限定。

レコードを作成したユーザーの認証情報で動いているので、アプリ作成権限がない人がレコードを作ってもアプリは作成されません。

エラー処理ちゃんとしてないので、権限がないときとか、指定したスペースが存在しないときにどんな動きになるのかわかりません。何かが消えることはないと思いますが、自己責任でお願いします。あと、みんなで使うならエラー処理書いてあげたほうがいいと思われます（自戒）


## アプリの構成

実際にBIG DADDYを作ってみたくなりましたか？なりましたよね？

ちなみにこっから長いです。作る予定のない方は[別の記事](https://blog.udcxx.me/tags/kintone/1/)へお進みくださいw

### フォームの設定

↓の画像を参考に、フィールドを配置＆設定します。

![$1](/240208_3.png)

ちなみにこの画像は、僕が作った [フィールド一覧](https://app.udcxx.me/field-info/) というツールを使って表示されたページをスクショしたものです。カスタマイズ作るときに結構役立ってます。

### JavaScript

できる限りコメントに説明を書くようにしたつもりです。

余談ですが、アプリに適用する前に、VSCodeの拡張機能でMinifyする運用にしてから、遠慮なくコメントに残そうと思えるようになりました。

* [VSCodeにMinifyAllを導入してみた | 無趣味の戯言](https://blog.udcxx.me/article/240129/minifyall-in-vscode/)

```javascript
// ダミー用の選択肢
const selectItem = ['sample1', 'sample2', 'sample3', 'sample4', 'sample5'];
// ダミー用の文字
const stringList = ['あ', 'い', 'う', 'え', 'お', 'か', 'が', 'き', 'ぎ', 'く', 'ぐ', 'け', 'げ', 'こ', 'ご', 'さ', 'ざ', 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ', 'ぞ', 'た', 'だ', 'ち', 'ぢ', 'っ', 'つ', 'づ', 'て', 'で', 'と', 'ど', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ば', 'ぱ', 'ひ', 'び', 'ぴ', 'ふ', 'ぶ', 'ぷ', 'へ', 'べ', 'ぺ', 'ほ', 'ぼ', 'ぽ', 'ま', 'み', 'む', 'め', 'も', 'ゃ', 'や', 'ゅ', 'ゆ', 'ょ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'ゎ', 'わ', 'ゐ', 'ゑ', 'を', 'ん', 'ア', 'ィ', 'イ', 'ゥ', 'ウ', 'ェ', 'エ', 'ォ', 'オ', 'カ', 'ガ', 'キ', 'ギ', 'ク', 'グ', 'ケ', 'ゲ', 'コ', 'ゴ', 'サ', 'ザ', 'シ', 'ジ', 'ス', 'ズ', 'セ', 'ゼ', 'ソ', 'ゾ', 'タ', 'ダ', 'チ', 'ヂ', 'ッ', 'ツ', 'ヅ', 'テ', 'デ', 'ト', 'ド', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'バ', 'パ', 'ヒ', 'ビ', 'ピ', 'フ', 'ブ', 'プ', 'ヘ', 'ベ', 'ペ', 'ホ', 'ボ', 'ポ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']



kintone.events.on('app.record.create.show', (event) => {
    const loadingWrap = document.createElement('div');
    loadingWrap.innerHTML = `<div class="top--loadanimation">
    <div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>
    <p>アプリを作成しています...</p>
    </div>`;
    loadingWrap.classList.add('loading--wrap');
    document.querySelector('body').appendChild(loadingWrap);

    if (!event.record.appName.value) {
        const today = new Date;
        const month = today.getMonth() >= 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
        const day = today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`;
        event.record.appName.value = `${month}${day}-testapp`
    }

    return event;
});



kintone.events.on('app.record.create.submit', async (event) => {
    const input = event.record;

    document.querySelector('.loading--wrap').style.display = 'block';

    let appForm = {};
    input.details.value.forEach((detail, index) => {

        // フィールド名に ${type} や ${index} があれば置き換え
        if (detail.value.fieldName.value.indexOf('${type}') >= 0) {
            detail.value.fieldName.value = detail.value.fieldName.value.replace('${type}', detail.value.fieldtype.value);
        }
        if (detail.value.fieldName.value.indexOf('${index}') >= 0) {
            detail.value.fieldName.value = detail.value.fieldName.value.replace('${index}', index);
        }

        // フィールドの基本情報だけセット
        let field = {
            'type': fieldTypeConv(detail.value.fieldtype.value),
            'code': detail.value.fieldName.value,
            'label': detail.value.fieldName.value,
        };

        // 計算式が指定されてた場合
        if (detail.value.fieldDefault.value) {
            field['expression'] = detail.value.fieldDefault.value;
        };

        // チェックボックスの場合
        if (detail.value.fieldtype.value === 'チェックボックス') {
            field['options'] = {};
            selectItem.forEach((value, index) => {
                field['options'][value] = {
                    'label': value,
                    'index': index + 1
                };
            });
        };

        appForm[detail.value.fieldName.value] = field;
    });

    // スペース情報を取得
    // （スレッドIDがほしいので）
    const spaceInfo = await kintone.api('/k/v1/space.json', 'GET', {'id': input.spaceId.value})

    // アプリを作成
    const newApp = await kintone.api('/k/v1/preview/app.json', 'POST', {
        'name': input.appName.value,
        'space': input.spaceId.value,
        'thread': spaceInfo.defaultThread
    });

    // フィールドを配置
    await kintone.api('/k/v1/preview/app/form/fields.json', 'POST', {
        'app': newApp.app,
        'properties': appForm,
    });

    // デプロイ
    await kintone.api('/k/v1/preview/app/deploy.json', 'POST', {
        'apps': [{'app': newApp.app}]
    });

    // ダミーデータ生成・登録
    await makeDummy(newApp.app, appForm);

    // 完成したアプリのURLをレコードに戻す
    // subdomain 部分をサブドメインに置き換える
    event.record.appUrl.value = 'https://subdomain.cybozu.com/k/' + newApp.app + '/';
    
    return event;
});



/**
 * フィールドタイプを日本語から英語に変換します
 * 
 * @param {String} inputType 日本語のフィールドタイプです
 * @returns 英語に変換後のフィールドタイプです
 */
function fieldTypeConv(inputType) {
    let type = '';

    switch (inputType) {
        case '日時':
            type = 'DATETIME';
            break;

        case '時刻':
            type = 'TIME';
            break;

        case '文字列_1行':
            type = 'SINGLE_LINE_TEXT';
            break;

        case '文字列_複数':
            type = 'MULTI_LINE_TEXT';
            break;

        case 'チェックボックス':
            type = 'CHECK_BOX';
            break;

        case '数値':
            type = 'NUMBER';
            break;

        case '計算':
            type = 'CALC';
            break;

        case '日付':
            type = 'DATE';
            break;

        default:
            type = 'SINGLE_LINE_TEXT';
            break;
    }

    return type
}



/**
 * 新しく作ったアプリにダミーデータを挿入します
 * 
 * @param {Number} appId 新しく作ったアプリのアプリID
 * @param {Object} fieldsObj 新しく作ったアプリのフィールド情報
 */
async function makeDummy(appId, fieldsObj) {
    let dummyData = {
        'app': appId,
        'records': []
    }

    // 100レコード分ループ
    for (let index = 1; index <= 100; index++) {
        let record = {};
        for (const fieldCode in fieldsObj) {
            let item = {
                'value': undefined
            }

            // フィールドタイプに合ったデータを生成
            if (fieldsObj[fieldCode]['type'] === 'SINGLE_LINE_TEXT' && !fieldsObj[fieldCode]['expression']) {
                const count = random(10, 50);
                let valueText = '';
                for (let index = 0; index < count; index++) {
                    valueText += stringList[random(0, stringList.length)]
                }
                item.value = valueText;

            } else if (fieldsObj[fieldCode]['type'] === 'MULTI_LINE_TEXT') {
                const count = random(10, 50);
                let valueTextL1 = '';
                let valueTextL2 = '';
                let valueTextL3 = '';
                for (let index = 0; index < count; index++) {
                    valueTextL1 += stringList[random(0, stringList.length)];
                    valueTextL2 += stringList[random(0, stringList.length)];
                    valueTextL3 += stringList[random(0, stringList.length)];
                }
                item.value = valueTextL1 + '\n' + valueTextL2 + '\n' + valueTextL3;

            } else if (fieldsObj[fieldCode]['type'] === 'CHECK_BOX') {
                const count = random(1, selectItem.length);
                let valueArr = [];
                let selected = [];
                for (let index = 0; index < count; index++) {
                    const randomNum = random(0, selectItem.length);
                    if(!selected.includes(randomNum)) {
                        valueArr.push(selectItem[randomNum]);
                        selected.push(randomNum);
                    }
                }
                item.value = valueArr;

            } else if (fieldsObj[fieldCode]['type'] === 'NUMBER') {
                item.value = random(1, 999999);

            } else if (fieldsObj[fieldCode]['type'] === 'DATE') {
                item.value = `${random(1970, 2099)}-${random(1, 12)}-${random(1, 28)}`;

            } else if (fieldsObj[fieldCode]['type'] === 'TIME') {
                item.value = `${random(0, 23)}:${random(0, 59)}`

            } else if (fieldsObj[fieldCode]['type'] === 'DATETIME') {
                item.value = `${random(1970, 2099)}-${random(1, 12)}-${random(1, 28)}T${random(0, 23)}:${random(0, 59)}:00Z`;
            }

            record[fieldCode] = item;
        }
        dummyData.records.push(record);
    }

    // デプロイが完了するまでwhileでループ
    let isProcessing = true;
    while (isProcessing) {
        const status = await kintone.api('/k/v1/preview/app/deploy', 'GET', {'apps': [appId]})
        if (status.apps[0]['status'] === 'SUCCESS') {
            // デプロイ完了したらループ抜けつつレコード追加
            isProcessing = false;
            await kintone.api('/k/v1/records.json', 'POST', dummyData);
        }
        // デプロイがまだなら少し待つ
        sleep(500);
    }
}



/**
 * ランダムな数値を生成します
 * 
 * @param {Number} min 乱数の最小値
 * @param {Number} max 乱数の最大値
 * @returns 乱数
 */
function random(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min) + min);
}



/**
 * アプリの存在を確認します
 * 
 * @param {Number} appId 新しいアプリのID
 * @returns 存在するかどうか（Boolean）
 */
async function getAppStatus(appId) {
    const response = await kintone.api('/k/v1/app.json', 'GET', {'id': appId});
    return response.appId ? true : false
}



/**
 * 指定した時間待機します
 * 
 * @param {Number} msec 待機する秒数[ms]
 */
function sleep(msec) {
    new Promise(resolve => setTimeout(resolve, msec))
}
```

### CSS

```css
/* Loading */
.loading--wrap {
    width: 100vw; height: 100vh;
    display: block;
    position: fixed;
    top: 0; left: 0; right: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: none;
}
.top--loadanimation {
    margin: 0 auto;
    position: absolute;
    top: 50%; left: 0; right: 0;
    transform: translateY(-50%);
}
.top--loadanimation p {
    color: #999;
    text-align: center;
    line-height: 3em;
}
.loading--wrap .sk-cube-grid {
    width: 50px; height: 50px;
    margin: 0 auto;
}
.loading--wrap .sk-cube-grid .sk-cube {
    width: 33%; height: 33%;
    background-color: #999;
    float: left;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
}
.loading--wrap .sk-cube-grid .sk-cube1 {
    animation-delay: 0.2s; 
}
.loading--wrap .sk-cube-grid .sk-cube2 {
    animation-delay: 0.3s; 
}
.loading--wrap .sk-cube-grid .sk-cube3 {
    animation-delay: 0.4s; 
}
.loading--wrap .sk-cube-grid .sk-cube4 {
    animation-delay: 0.1s; 
}
.loading--wrap .sk-cube-grid .sk-cube5 {
    animation-delay: 0.2s; 
}
.loading--wrap .sk-cube-grid .sk-cube6 {
    animation-delay: 0.3s; 
}
.loading--wrap .sk-cube-grid .sk-cube7 {
    animation-delay: 0s; 
}
.loading--wrap .sk-cube-grid .sk-cube8 {
    animation-delay: 0.1s; 
}
.loading--wrap .sk-cube-grid .sk-cube9 {
    animation-delay: 0.2s; 
}

@keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    transform: scale3D(1, 1, 1);
  } 
  35% {
    transform: scale3D(0, 0, 1);
  } 
}
```


## 作った感想とか

使わないだろうなぁ。

ただ、苦手意識のある同期/非同期処理に向き合うことができたので、勉強になりました。理解はしてないけど。

---

アプリ名、いろいろダメな気がしてきた...