---
title: オリジナルのメールフォームにreCAPTCHA認証を導入する
date: 2021-01-15
tags: Web IT
eyecatch: 210115.png
eyecatchEmoji:
description: phpでメールフォームを自作して公開していたところ、スパム・営業メールがたくさん来たのでreCAPTCHA認証を導入してみました。
---

こんにちは、だいちゃんです。

2020年内には間に合いませんでしたが、ただいま絶賛2020verの [ポートフォリオサイト](https://udcxx.me/) を製作中です（週末には公開できるんじゃないかな）！

実は [2018ver](https://udcxx.github.io/portfolio/old/2018/) から導入しているメールフォームですが、ほぼ毎日何通も迷惑メールが送られて来ているので、今回からは **reCAPTCHA認証** を導入して簡易的な対策を講じてみようと思います。意外とすんなり（30分くらいで）実装できたので、さくっと導入してしまったほうがいいかもしれません。

手順は、以下の通りです。

## 1. 登録して、キーを取得する

Google reCAPTCHAの新規発行を [専用のページ](https://www.google.com/recaptcha/admin/create) から行います。Googleアカウントが必要になります。

登録時に「reCAPTCHA タイプ」という選択肢があるのですが、ぼくは今回 v2 を選びました。v3にすると、フォームの内容も精査してスパムかどうかを判断してくれるようなのですが、 ~~実装がめんどくさそうだったので~~ お手軽な方にした次第です。

あとは対象のドメインとかを指定して送信すると、「サイトキー」と「シークレットキー」という2種類のキーが発行されます。

**サイトキー** はHTML側に組み込んで、実際に認証を受ける際に使用するもので、 **シークレットキー** はPHP側に組み込んで、フォームから飛んできた内容が正式に認証を受けたものであるかをチェックするために利用します。


## 2. HTML（フォーム）側の実装

```
<form action="sendMail.php" method="post">
	<label for="name">お名前</label>
	<input type="text" id="name" name="user_name">
	<label for="mail">メールアドレス</label>
	<input type="email" id="mail" name="user_mail">
	<label for="msg">お問い合わせ内容</label>
	<textarea id="msg" name="user_message"></textarea>

	<div class="g-recaptcha" data-sitekey="{先程取得したサイトキー}" data-callback="verify"></div>

	<button type="submit" id="contactform-submit">送信</button>
</form>
<script>
function verify() {
	// コールバック... 送信ボタンを有効化
	document.getElementById("contactform-submit").disabled = false;
}
document.addEventListener("DOMContentLoaded", () => {
	// 初期状態... 送信ボタンを無効化
	document.getElementById("contactform-submit").disabled = true;
})
</script>
<script defer src="https://www.google.com/recaptcha/api.js"></script>
```

9行目の `class="g-recaptcha"` が付いてるdivが重要ですね。data属性のsitekeyに先程取得したサイトキーを入れて、callbackに認証後に実行する関数を指定します。今回は、デフォルトで押せないようになっていた送信ボタンを押せるようにする処理になっています。

コールバック関数の定義を、api.jsの読み込みより先に書かないといけないらしいです。

その他にもいくつかカスタマイズが出来るので、詳しくは [公式のドキュメント](https://developers.google.com/recaptcha/docs/display#render_param) をご参照ください。ぼくは `data-theme="dark"` を使ってます。


## 3. PHP（サーバー）側の実装

```
<?php
$secretKey = {シークレットキー};

$result_status = '';

if ( isset( $_POST[ 'g-recaptcha-response' ] ) ) {
	$url = 'https://www.google.com/recaptcha/api/siteverify';
	$data = array(
		'secret' => $secretKey,
		'response' =>  $_POST[ 'g-recaptcha-response' ]
	);

	$context = array(
		'http' => array(
			'method'  => 'POST',
			'header'  => implode("\r\n", array('Content-Type: application/x-www-form-urlencoded',)),
			'content' => http_build_query($data)
		)
	);

	$api_response = file_get_contents($url, false, stream_context_create($context));

	$result = json_decode( $api_response );
	if ( $result->success ) {
		$result_status = '成功';
		// トークンが有効 -> メール送信の処理をここに書く（省略）

	} else {
		$result_status = '失敗';
	}
}
?>
```

上記の例ではシークレットキーを直書きしてますが、キーだけ別ファイルにしてrequireさせる方が安全かもしれませんね。間違えてGitにあげちゃっても嫌ですし。

シークレットキーと、フォームと一緒に飛んできた `g-recaptcha-response` を一緒にしてリクエストを出すと [こんな感じ](https://developers.google.com/recaptcha/docs/verify#api-response) のレスポンスが返って来るので、 `"success": true` なら処理実行する、みたいな感じです。

-----

これだけの実装でreCAPTCHA認証が有効になりました。

まだリリースしていないので、どれくらいの効果があるかは分かりませんが、Botで自動送信させてるものに関しては防げるのではないでしょうか。あと、reCAPTCHAのコンソール画面からは、セキュリティの強度を3段階で調整出来るので、それを利用して様子を見るのもアリかもしれません。

それでも送られてくるスパムメールは... 最終的にメーラー側でどうにかしようかと思っています。


### 参考

* [reCAPTCHA v2 | Google Developers](https://developers.google.com/recaptcha/docs/display)
* [Google reCAPTCHA の使い方（v2/v3） / Web Design Leaves](https://www.webdesignleaves.com/pr/plugins/google_recaptcha.php)
