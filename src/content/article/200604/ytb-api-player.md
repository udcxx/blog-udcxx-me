---
title: Youtube IFrame Player APIでの埋め込み実装メモ
date: 2020-06-04jpg
tags: Web IT
eyecatch: 200604.jpg
---

こんにちは、だいちゃんです。

Youtubeの動画を埋め込む案件があり、久しぶりに触ったのでメモ。普通にiframeで貼っ付けるだけでも埋め込み自体は可能ですが、ちょっと込み入ったことしたかったので。

## したいこと

* レスポンシブ対応
* PC・SPで動画を変える
* 自動再生
* ループ再生
* ユーザーに一時停止など操作させない

ただ、下記に関しては、したかったことなのですが結果的にできませんでした。

* Youtubeのロゴ・動画のタイトルを非表示にする

以前のAPIには `showinfo` というパラメーターがあったそうなんですが、2018年9月25日以降は利用できなくなったそうです。

## 【HTML】まずは箱を作る

早速実装の仕方を解説していきます。

まずはHTML側に、空の `div` 要素を2つと、それを括る 'div' の計3つを用意します。子要素の1つ目は `id` 降っておきましょう。

idを降った方は、あとでAPIによってiframeに書き換えられます。 `.yt-cover` の方は、動画の上にかぶせるために設置します。

```
<div class="movie_area">
	<div id="yt"></div>
	<div class="yt-cover"></div>
</div>
```

## 【css】ユーザーに動画の操作をさせない

次にcssの実装です。ここでは「ユーザーに一時停止など操作させない」部分を作っていきます。

といっても理論的には簡単で、 `.yt-cover` という透明なdiv要素を動画の上に重ねてあげることで、マウスやタッチでの操作が届かないようになるという仕組みです。

サイズなどはお好みで。メディアクエリーも省略していますが、レスポンシブ対応なのでそれぞれの画面幅に合わせて適宜記載してください。

```
.movie_area {
	position: relative;
}
#yt {
	width: 100%; height: 506px;
}
.yt-cover {
	width: 100%; height: 506px;
	position: absolute;
	top: 0; left: 0;
}
```

## 【JS】動画出し分けの準備

画面幅に応じて、動画の出し分けをします。（SPならこの動画、PCならこの動画、という形で）

```
var videoSP = "xxxxxxxxxx"; // Youtubeの動画IDを記載
var videoPC = "xxxxxxxxxx"; // Youtubeの動画IDを記載
var replaceWidth = 750; 	// 出し分けのブレークポイントとなる画面幅を指定
var videoId;
var windowWidth = parseInt(window.innerWidth);
if(windowWidth >= replaceWidth) {
    videoId = videoPC;
} else {
    videoId = videoSP;
}
```

（未だに `var` を使ってしまいます。。。）

動画IDは、URLの後ろの方にあるやつです。動画IDとブレークポイントを変えてあげれば、様々なページに使い回せると思います！

## 【JS】自動再生とループ再生の実装

いよいよ(？)、Youtube IFrame Player API を使っていきます。

まずはAPIの読み込みから。下記コードは、書き換える必要なくそのままコピペで利用できます。

```
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
```

次に、APIを呼び出す部分を記述していきます。

```
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt', {
        videoId: videoId,
        playerVars:{
            'playsinline': 1,
            'controls': 1,
            'modestbranding': 1,
            'iv_load_policy': 3,
            'disablekb': 1,
            'autohide': 1,
            'rel': 0
        },
        events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute();
};

function onPlayerStateChange(event) {
    var playerStatus = event.target.getPlayerState();
    if (playerStatus == YT.PlayerState.PLAYING) {}
    if (playerStatus == YT.PlayerState.ENDED) {
        player.mute();
        player.playVideo();
    }
};
```

まず、3行目の部分にはhtmlに作っておいたdiv要素のidを指定します。上記の例では、 `#yt` のdivが動画が読み込まれるiframeに書き換わります。

`playerVars` に指定できる設定は [公式の日本語リファレンス](https://developers.google.com/youtube/player_parameters?hl=ja) が参考になります。

そして `events` にはそれぞれ、準備が整ったとき・スタータスに変更があったときに対応する関数を当てています。

1つ目の `onPlayerReady` という関数では、動画の再生をさせています。自動再生をさせる際には動画をミュートにする必要があるので、同時にミュートの設定も行っています。

2つ目の `onPlayerStateChange` という関数では、ループ再生を実現させています。    
先程のパラメーター一覧のloopの欄には、

> 注: このパラメータは AS3 プレーヤーと埋め込み IFrame でのみサポートされており

という記載があり、 `playerVars` に記載してもループ再生させることができません。その代わり、動画終了時のイベントと組み合わせることでループ再生と同じ挙動を実現できます。    
動画のステータスが `YT.PlayerState.ENDED` になったとき、つまり動画再生の終了をフックにして、再度、ミュート＆再生を実行することで、繰り返し動画を再生させることができます。

-----

Youtubeをサイト内に埋め込む際、ただ埋め込むだけならiframeでも十分ですが、動画を出し分けたり、動画終了後になにかアクションを起こしたいときなどにはYoutube IFrame Player APIを利用してみてはいかがでしょうか？

**Youtubeのロゴが消せない** などのデメリットもありますが、動画を直接サーバーに置くよりもアクセス時の **負荷を減らせる** メリットもあるので、どちらを採るべきかは案件ごとに考える必要がありそうです。

また、空のdivを上にかぶせて操作を抑制したり、ループ機能は無いものの動画終了をフックにしてループ的な動作を再現したりする部分は知恵の出しようだと思いますw 与えられた機能でやりたいことを最大限実現させるのはワクワクします！
