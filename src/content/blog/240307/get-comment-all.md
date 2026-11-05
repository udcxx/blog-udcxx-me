---
title: 同期/非同期処理で悩んだログ
date: 2024-03-07
tags: kintone IT
eyecatch: 
eyecatchEmoji: 🧲
description: kintoneで全レコード総当りでコメント数をチェックするスクリプトがうまく行かないことがあったのでメモ。
---

こんにちは。だいちゃんです。

kintoneに書き込まれたコメントの数をチェックしないといけない用事があり、全レコード総当たりでコメントを取得するAPIを叩いてみたのですが、同期処理/非同期処理の絡みでうまくいかないこととか、めっちゃ処理速度が遅いこととかがあったので、メモ。

ちなみに、**レコード数以上にAPIリクエストが飛びます** ので、 **リクエスト数の上限値超過** にご注意ください。僕はちゃっかり超過のお知らせメールもらいました。


## 処理のおおまかな流れ

1. レコード取得APIで `allRecords` にレコードを格納する
2. `allRecords` に総当りでコメント取得APIを叩いて、コメント数を取得する **⇐ 今日の本題**    
    （取得したコメント数は `allRecords` に入れておく）
3. 画面上に結果を表示する


## 最終形態：Promise.all・array.map

`allRecords` を map で処理させて、それを並列で動かすために Promise.all の引数にして、しかもそれが全部終わるまで待ちたいので await つけてる... と思います。

```javascript
kintone.events.on(['app.record.index.show'], async (e) => {
    // allRecords にレコードを格納する処理は省略

    // コメント取得にかかる時間を計ります
    console.time("commentGet");

    // 総当たりでコメント取得API叩いて、コメント数を調べる
    await Promise.all(allRecords.map(async(r, index) => {
        const firstCommentGetBody = {
            "app": e.appId,
            "record": allRecords[index]["$id"].value,
            "order": "desc"
        }
        const firstCommentGetResp = await kintone.api('/k/v1/record/comments', 'GET', firstCommentGetBody);

        // コメント数（この段階では最大10）
        let comment = firstCommentGetResp.comments.length;

        // 10件以上コメントがあるかで分岐
        if (firstCommentGetResp.older) {
            let olderComment = true;

            // 古いコメントがある限りループ
            for (let i = 1; olderComment; i++) {
                const moreCommentGetBody = {
                    "app": e.appId,
                    "record": allRecords[index]["$id"].value,
                    "order": "desc",
                    "offset": i * 10
                }
                const moreCommentGetResp = await kintone.api('/k/v1/record/comments', 'GET', moreCommentGetBody);
                comment = comment + moreCommentGetResp.comments.length;
                olderComment = moreCommentGetResp.older;
            }
        }

        // 最終的なコメント数がわかったら、
        // allRecords[i].comment,value に保存
        allRecords[index]["comment"] = {
            "value": comment
        };
    }));

    console.timeEnd("commentGet");

    // 本来なら画面上に表示する処理
    console.log(allRecords);
});
```

> commentGet: 17036ms - タイマー終了



## 動くけどめっちゃ遅い：For

For文でぶん回す例です。

直列処理になる分、遅くなってる感じがします。

```javascript
kintone.events.on(['app.record.index.show'], async (e) => {
    // allRecords にレコードを格納する処理は省略

    // コメント取得にかかる時間を計ります
    console.time("commentGet");

    // 総当たりでコメント取得API叩いて、コメント数を調べる
    for (let index = 0; index < allRecords.length; index++) {
        const firstCommentGetBody = {
            "app": e.appId,
            "record": allRecords[index]["$id"].value,
            "order": "desc"
        }
        const firstCommentGetResp = await kintone.api('/k/v1/record/comments', 'GET', firstCommentGetBody);

        // コメント数（この段階では最大10）
        let comment = firstCommentGetResp.comments.length;

        // 10件以上コメントがあるかで分岐
        if (firstCommentGetResp.older) {
            let olderComment = true;

            // 古いコメントがある限りループ
            for (let i = 1; olderComment; i++) {
                const moreCommentGetBody = {
                    "app": e.appId,
                    "record": allRecords[index]["$id"].value,
                    "order": "desc",
                    "offset": i * 10
                }
                const moreCommentGetResp = await kintone.api('/k/v1/record/comments', 'GET', moreCommentGetBody);
                comment = comment + moreCommentGetResp.comments.length;
                olderComment = moreCommentGetResp.older;
            }
        }

        // 最終的なコメント数がわかったら、
        // allRecords[i].comment,value に保存
        allRecords[index]["comment"] = {
            "value": comment
        };
    };

    console.timeEnd("commentGet");

    // 本来なら画面上に表示する処理
    console.log(allRecords);
});
```

> commentGet: 88077ms - タイマー終了



## 動いてるように見えて結果が格納されてない：forEach

forEach文の引数で同期関数を指定したとしても、その中では同期処理をするけど、forEach自体は非同期なので、「コメント取得処理（同期）を非同期に呼び出す」現象が起こるみたい。

しかも、呼び出し側が非同期なので、結果を待たずに、全レコード分呼び出しが終わったら取得結果に関わらず、次の画面描画の処理に移っちゃう。よって、コメント数が空のレコードが残ったまま描画が始まって、コケる。

...と思う。

```javascript
kintone.events.on(['app.record.index.show'], async (e) => {
    // allRecords にレコードを格納する処理は省略

    // コメント取得にかかる時間を計ります
    console.time("commentGet");

    // 総当たりでコメント取得API叩いて、コメント数を調べる
    allRecords.forEach(async (record, index) => {
        const firstCommentGetBody = {
            "app": e.appId,
            "record": record["$id"].value,
            "order": "desc"
        }
        const firstCommentGetResp = await kintone.api('/k/v1/record/comments', 'GET', firstCommentGetBody);

        // コメント数（この段階では最大10）
        let comment = firstCommentGetResp.comments.length;

        // 10件以上コメントがあるかで分岐
        if (firstCommentGetResp.older) {
            let olderComment = true;

            // 古いコメントがある限りループ
            for (let i = 1; olderComment; i++) {
                const moreCommentGetBody = {
                    "app": e.appId,
                    "record": allRecords[index]["$id"].value,
                    "order": "desc",
                    "offset": i * 10
                }
                const moreCommentGetResp = await kintone.api('/k/v1/record/comments', 'GET', moreCommentGetBody);
                comment = comment + moreCommentGetResp.comments.length;
                olderComment = moreCommentGetResp.older;
            }
        }

        // 最終的なコメント数がわかったら、
        // allRecords[i].comment,value に保存
        allRecords[index]["comment"] = {
            "value": comment
        };  
    });

    console.timeEnd("commentGet");

    // 本来なら画面上に表示する処理
    console.log(allRecords);
});
```

> commentGet: 3842ms - タイマー終了

最速。ただし、データは取れてない。

---

ということで、また同期/非同期の話でつっかかったってお話。

「Promiseを返す」とかがまだ今いちピンと来てない。

参考：

* [誤用しがちな Promise.all](https://zenn.dev/lollipop_onl/articles/mistake-promise-all)
* [Array.prototype.map() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* [JavaScriptのforEachで非同期処理を逐次実行する方法](https://zenn.dev/sora_kumo/articles/612ca66c68ff52)
* [【初心者向け】【JS・TS】forEachのコールバック関数内の非同期処理は、async/awaitで同期処理化できない #JavaScript - Qiita](https://qiita.com/Naoumi1214/items/5864b93340dbba561f12)
* [プロミス ‑ 曲・歌詞：ClariS | Spotify](https://open.spotify.com/intl-ja/track/1Gf5pWyB95BoHLBjCztzD9)