---
title: 特定の予定のみを別カレンダーにコピーするスクリプト
date: 2018-12-08
tags: IT GAS
eyecatch: 181208.jpg
---

こんにちは、だいちゃんです。

今回は、GoogleAppsScript【GAS】で遊んでみました(^O^)

カレンダーに登録された特定の予定だけを自動で別のカレンダーに転記させてあげるスクリプトを書いてみました。 **書いたというよりコピペして組み合わせました←**

## したいこと

僕自身、ほぼ全ての予定をGoogleカレンダーで管理しています。 ~~暇なので予定が少ないから管理するまでもないんですけど。~~

Googleカレンダーは共有機能も便利なので、家族や会社などの人たちと共有して利用している人も多いかと思います。

僕も「家族共有カレンダー」を作成してそこに家族が各々のスケジュールを登録するような運用をしています。

しかし、共有したい予定もあれば、 **デートの日♡（ないけど）** とか、 **何かの締め切り日** のように僕の中だけに留めておきたい予定もあるので、 **全てのスケジュールを公開するのは得策ではありません** 。

かといって、共有OKな予定は「家族共有カレンダー」に登録、プライベートな予定は今までどおり「個人用カレンダー」に登録... みたいな運用だと、常にプライベートと家族共有カレンダーの両方を表示することになり、若干ごちゃついてしまいます。もちろん、一方を非表示にすると、そちら側に登録した自分のスケジュールまで非表示になってしまいます。

なので、わざわざ自分のカレンダーと、家族用カレンダーに2度登録するのは手間... なので、 **面倒なことは機械に任せよう！** ということでGAS（GoogleAppsScript）で作ることにしました。

## 仕組み

仕組みとしては、

1. 個人カレンダーから「来月の月末」までの予定を取得する
1. そのなかでタイトルに特定の文字（今回は「＊」）が入っている予定だけスプレットシートに吐き出す
1. 家族共有カレンダーからタイトルに特定の文字（今回は「【だいちゃん】」）がついてる予定を削除する
1. スプレットシートに吐き出されている予定を登録する（その際、タイトルに【だいちゃん】を入れる）

という形です。

そのまま **家族に共有OKな予定を追加するときは、予定のタイトルに「＊」を入れる** ようにするだけで勝手に拾って家族共有カレンダーに追加してくれます。

スプレットシートに吐き出した段階で過去に登録した予定は消すなり重複チェックをすれば、一度予定を全部消してもう一度全部再登録、みたいな面倒なことにならないのですが、暇な僕は予定が少ないので良しとします。

## スクリプト

```
function myFunction() {
  // カレンダーID
  var fromCalendarID = '*****カレンダーID*****'; // 個人カレンダー（元）
  var toCalendarID = '*****カレンダーID*****'; // 共有カレンダー（先）

  // スプレッドシート：シート名
  var SHEET_NAME = 'EventList';
  // スプレッドシート：開始位置
  var RANGE = 1;

  // シート情報を取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  // シートを初期化
  sheet.clear();
  // 登録元のカレンダー情報を取得
  var calendar = CalendarApp.getCalendarById(fromCalendarID);
  // 登録元カレンダーから翌月末日までの予定を取得
  var today = new Date();
  var schedules = calendar.getEvents(today, new Date(today.getFullYear(), today.getMonth() + 2, 0));

  // 登録元の予定の中で「＊」の付いてる予定だけを出力する
  for(var index = 0; index < schedules.length; index++) {
    var range = RANGE + index;
    if(schedules[index].getTitle().indexOf("＊") != -1) {
      // 開始時間を出力
      sheet.getRange(range, 3).setValue(schedules[index].getStartTime());
      // 終了時間を出力
      sheet.getRange(range, 4).setValue(schedules[index].getEndTime());
      // 予定名を出力→＊を削除
      sheet.getRange(range, 5).setValue(schedules[index].getTitle().replace("＊",""));
    }
  }

  // 登録先のカレンダー情報を取得
  var tocalendar = CalendarApp.getCalendarById(toCalendarID);
  // 登録先カレンダーから翌月末日までの予定を取得
  var toschedules = tocalendar.getEvents(today, new Date(today.getFullYear(), today.getMonth() + 2, 0));

  // 既に登録されている予定の中で「【だいちゃん】」が付いてるやつを削除
  for(var i = 0; i < toschedules.length; i++) {
    var eventname = toschedules[i].getTitle();
    if(eventname.indexOf("【だいちゃん】") != -1){
      toschedules[i].deleteEvent();
    }
  }

  // 予定を再登録（タイトルに【だいちゃん】を付ける）
  for(var i = 1; i <= sheet.getLastRow(); i++) {
    var cleateTitle = "【だいちゃん】" + sheet.getRange(i, 5).getValue();
    var cleateStart = sheet.getRange(i, 3).getValue();
    var cleateEnd = sheet.getRange(i, 4).getValue();

    var newevent = tocalendar.createEvent(cleateTitle, cleateStart, cleateEnd);
  }
}
```

これを時間指定型のトリガー設定して毎晩発動するようにしておけば、寝てる間に共有できちゃいます！

## 注意点とか疑問点とか

* カレンダーIDは、デフォルトカレンダーならGmailのメアドでいいみたいです。それ以外はカレンダーの設定画面から見れます。
* 翌月末日までの予定を取得する設定なのは仕様です。調べてたら使ってみたくなったの。`getEvents` の中を `(today, new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())` にすれば1ヶ月分でいけます。31日に実行して翌月に31日がなかったらどうなるんだろ。
* カウント用に i をいろんなとこでたくさん使ってるけどこれってアリなのかな。
* 気持ち悪いとこ多々あるかもしれませんが **ご愛嬌...**

## 参考にしたサイト

というかほぼこの方々のものです…。

* カレンダー→スプレットシートのやり方
[https://qiita.com/n_sekiya/items/903114a3f7c808702c8e](https://qiita.com/n_sekiya/items/903114a3f7c808702c8e)
* 複数日数分の予定取得のやり方
[http://www.bmoo.net/archives/2012/03/313319.html](http://www.bmoo.net/archives/2012/03/313319.html)
* 翌月末日の取得のやり方
[https://qiita.com/akase244/items/f558b9b3c51804103d16](https://qiita.com/akase244/items/f558b9b3c51804103d16)
* 予定タイトルから指定の文字を探すやり方
[https://qiita.com/kazu56/items/557740f398e82fc881df](https://qiita.com/kazu56/items/557740f398e82fc881df)
* スプレットシート→カレンダーのやり方
[http://stabucky.com/wp/archives/7247](http://stabucky.com/wp/archives/7247)
