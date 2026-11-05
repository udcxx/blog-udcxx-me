---
title: kintoneアプリにAIを搭載する
date: 2023-11-08
tags: IT kintone
eyecatch:
eyecatchEmoji: 👷‍♂️
description: kintone上のボタン一つで、AIの考えをもらえるようにしてみました。
---

こんにちは、だいちゃんです。

[RECITONE](https://app.udcxx.me/recitone/) や [WebSiteAssistant](https://app.udcxx.me/websiteassistant/) など、AIを使ったWebツールをいくつか公開していますが、今回は業務で使うkintoneからAIに相談できるようにカスタマイズを行いました！

AIには、毎度おなじみ OpenAI API を利用しています。

## サンプルコード

### JavaScript

```javascript
kintone.events.on('app.record.detail.show', (event) =>{

    const record = event.record;
    const HeaderSpace = kintone.app.record.getHeaderMenuSpaceElement();
    const Kuc = Kucs['1.13.0'];

    let button = new Kuc.Button({
        text: '◯◯◯をAIに考えてもらう',
        type: 'submit',
        className: 'callaibutton'
    });

    button.addEventListener('click', () => {
        showLoading();
        main(event);
    });

    HeaderSpace.appendChild(button);

    return event;
});


/**
 * Show loading window
 */
function showLoading () {
    let body = document.querySelector('body');
    let wrap = document.createElement('div');
    let inner = document.createElement('div');

    wrap.classList.add('loading--wrap');
    inner.classList.add('loading--inner');
    inner.innerText = 'AIが考えています...';

    wrap.appendChild(inner);
    body.appendChild(wrap);
}


/**
 * Call OpenAI API and Update record data
 * 
 * @param {string} calltype AI call type
 * @param {object} event kintone event object
 */
function main(calltype, event) {
    const apiKey = '****'; // OpenAI API の API Key
    const model = 'gpt-3.5-turbo';
    const maxTokens = 3600;
    const temperature = 0;
    const url = 'https://api.openai.com/v1/chat/completions';

    // プロンプト（AIに投げかける文章）
    let callMessage = `◯◯◯を教えてください。△△は、${event.record.fieldcodeA.value}です。`;

    // AIからの回答を入力するフィールドのフィールドコード
    let fieldcode = 'fieldcodeB'; 
  
    const requestBody = {
        "model": model,
        "messages": [
          {'role': 'user', 'content': callMessage}
        ],
        "temperature": temperature,
        "max_tokens": maxTokens,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey,
        },
        payload: JSON.stringify(requestBody),
        muteHttpExceptions: true
    }

    kintone.proxy(url, 
        requestOptions.method,
        requestOptions.headers, 
        requestOptions.payload, 
        (response) => {
            const resultJson = JSON.parse(response);
            const result = resultJson.choices[0].message.content.toString();
            const params = {
                "app": event.appId,
                "id": event.recordId,
                "record": {
                    [fieldcode]: {
                        "value": result
                    }
                }
            };
            kintone.api(kintone.api.url('/k/v1/record.json', false), 'PUT', params, () => {
                location.reload();
            });
        });
}
```

別途、[kintone UI Component](https://kintone-ui-component.netlify.app/ja/)の導入も必要です。

チョットヨクワカンナイって方は、kintoneアプリの 設定 > JavaScript / CSSでカスタマイズ で、JavaScriptファイルの URL指定で追加 から、次のURLを指定してください。順番も大事なので、上記のJavaScriptファイルよりも上になるように。

```
https://unpkg.com/kintone-ui-component@1.13.0/umd/kuc.min.js
```

### CSS

```css
.callaibutton {
    margin: 15px 0 0 15px;
}

.loading--wrap {
    width: 100vw; height: 100vh;
    position: fixed;
    top: 0; left: 0; right: 0; z-index: 10;
    background-color: rgba(0, 0, 0, 0.85);
}
.loading--inner {
    width: 80%; max-width: 900px;
    margin: 0 auto;
    position: absolute;
    top: 50%; left: 0; right: 0;
    transform: translateY(-50%);
    color: #c0c0c0;
    font-size: 20px; font-weight: 700;
    text-align: center;
}
```

## しくみ

kintone UI Componentを使って作ったボタンをクリックすると、レコードの内容を引っ張ってプロンプトを作成し、kintone.proxy()を使ってOpenAI APIを叩き、AIに投げかけます。

※ `callMessage` の部分で、AIへのプロンプトを生成してます。

返ってきた答えを成形して、kintone.api()でkintone REST APIを叩き、指定したフィールドに、回答を入力後、画面の再読み込みを行っています。


## 注意点

回答が得られなかったなど、エラーが起きた場合、一生「AIが考えています...」の画面のまま固まります。kintone.proxy()では、エラー発生時の処理も書けるので、実運用の際にはがんばってください（他人事）

あと、JavaScriptで動いてるので、AIからの回答がレコードに書き込まれるまでは、画面遷移や再読み込みなどはせず、大人しく待っててください。そんなに長くないと思います。

---

最初は、AIへの投げかけとレコードの更新を別関数で書いてたんだけど、同期処理がうまくかけなくてこんな感じになりました。同期・非同期むずい。

---

GPT-4 Turbo来ましたね。JSONモードも気になる。

* [今日発表された｢ChatGPTのアップデート内容｣まとめ | ギズモード・ジャパン](https://www.gizmodo.jp/2023/11/openai-devday-keynote.html)

ただ僕はOpenAIへのお布施が足りてなくてまだGPT-4すらアンロックされていない状況です。

[RECITONE](https://app.udcxx.me/recitone/) とか [WebSiteAssistant](https://app.udcxx.me/websiteassistant/) をたくさん使ってもらって、API利用料払って、GPT-4を使わせてもらえるようになりたいですね()