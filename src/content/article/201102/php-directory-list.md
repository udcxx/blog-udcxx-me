---
title: PHPでディレクトリ一覧と簡易的な認証機能を実装した
date: 2020-11-02
tags: IT
eyecatch: 201102.jpg
---

こんにちは、だいちゃん [@udcxx](https://twitter.com/udc_xx) です。

もう11月ですね... 沖縄の冬が好きなのでテンション上がり気味です。

今日は珍しくphpを書いたのでメモしておきます。といってもネットに落ちてるソースをコピペしただけなんだけどね。

## なにをつくったか

ぼく個人で利用しているドメインで、playというサブドメを切って [https://play.udcxx.me/](https://play.udcxx.me/) という場所を用意しているのですが、その配下のディレクトリの一覧を表示してくれるページを作成しました。

この play は `playground` （遊び場）から取っていて、わざわざドメイン切って公開するまでもないような実験的なものをぶちこむ場所にしています。例えば下記のようなものとかです。

* [ランダムに文字が飛び散るCSS Animationを作って遊びました](https://blog.udcxx.me/article/200618/css-animation-move-random/)
* [アルファベットをマウスホバーすると何かが起こるよ！](https://play.udcxx.me/20-css-ani-hover/) ←これは記事にすらしてないw

ほかには、 ~~最近は無いですが~~ 依頼されてWebサイトを作成するとき、確認用のステージングサーバー的な使い方をしたり、デザインレビューをしてもらうときに一本画像を上げたり（実機ブラウザで簡単にjpg確認できて便利！）して使っています。

ただ、手軽に何にでも使える場所な反面、管理が行き届いてなく、アドレスも覚えてないので、毎回FTPクライアントを立ち上げてアドレスを確認したりするのが面倒に感じていました。。。

そこで、 **play ドメインの配下になにがあるかを一覧で確認でき、一発でアクセスできるページ** を作成してみました。

実際に作成したページは、ID・PASSWORDがないと見れないようにしているので [こちら](https://play.udcxx.me/20-php-dir-list/) でサンプルページを公開しています！

## ついでに認証も入れた

認証は別にいいっかなぁって思ったのですが、依頼されてWebサイトを作る機会が今後もあるかもしれないので、念の為に簡易的な認証の仕組みは入れています。 ~~なので実際のページを見て頂けないという...~~ → [サンプルページ作りました](https://play.udcxx.me/20-php-dir-list/)

認証も php で実装しています！BASIC認証にしなかった理由としては、配下に公開したいページ・したくないページが混在するため、BASIC認証だと配下にも認証情報を引っ張ってしまうので使い勝手が悪かったからです。細かく影響範囲を指定すれば問題ないのですが、 php でも同等のことが実装できそうだったので今回は php で行いました。

公開したくないページは個別で（そのディレクトリだけに）BASIC認証をかけるイメージです。

-----

これで、ディレクトリ名さえ気をつければ play.udcxx.me 配下になにがあったっけ？と悩む必要もなくなりました！

気軽に試せるのがフロントエンドの好きな所なので、「作って壊そう！」を合言葉に、この遊び場でもっと色々なことに挑戦して勉強していきます！

今回は下記の記事を参考にさせていただきました。

* [【PHP】指定したパス以下にあるディレクトリ一覧を取得する方法](https://nodoame.net/archives/6603)
* [PHPによる簡単なログイン認証いろいろ](https://qiita.com/mpyw/items/bb8305ba196f5105be15#%E3%82%BB%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%E8%AA%8D%E8%A8%BC)


-----

## ソースコード

おまけ程度にソースコードも公開しておきます。（参考サイトからほぼ変わりなしです...）

`index.php`

```<?php
require_once __DIR__ . '/functions.php';
require_logined_session();

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<title>ディレクトリ一覧</title>
<body>

<?php
    // 現在の相対パスを取得
    $path = dirname(__FILE__) .'/';

    // ディレクトリ一覧の取得
    $dirs = scandir($path);

    // 表示させないディレクトリ配列
    $ignore = array(
        '.',
        '..',
    );

    // リンク表示
    echo '<ul>',"\n";
    foreach ($dirs as $dir) {
        // 特定のディレクトリの場合は表示させない
        if (in_array($dir, $ignore)) {
            continue;
        }
        if ((is_dir($dir) === true)) {
            echo '<li>';
            echo '<a href="./' . $dir . '">';
            echo $dir;
            echo '</a></li>'."\n";
        }
    }
    echo '</ul>',"\n";
?>
</body>
```

`functions.php`

```<?php
function require_unlogined_session()
{
    // セッション開始
    @session_start();
    // ログインしていれば / に遷移
    if (isset($_SESSION['username'])) {
        header('Location: /');
        exit;
    }
}
function require_logined_session()
{
    // セッション開始
    @session_start();
    // ログインしていなければ /login.php に遷移
    if (!isset($_SESSION['username'])) {
        header('Location: /login.php');
        exit;
    }
}

/**
 * CSRFトークンの生成
 */
function generate_token()
{
    // セッションIDからハッシュを生成
    return hash('sha256', session_id());
}

/**
 * CSRFトークンの検証
 */
function validate_token($token)
{
    // 送信されてきた$tokenがこちらで生成したハッシュと一致するか検証
    return $token === generate_token();
}
```

`login.php`

```<?php

require_once __DIR__ . '/functions.php';
require_unlogined_session();

// 事前に生成したユーザごとのパスワードハッシュの配列
$hashes = [
    'ユーザ名' => 'パスワード（要ハッシュ化）',
];

// ユーザから受け取ったユーザ名とパスワード
$username = filter_input(INPUT_POST, 'username');
$password = filter_input(INPUT_POST, 'password');

// POSTメソッドのときのみ実行
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        validate_token(filter_input(INPUT_POST, 'token')) &&
        password_verify(
            $password,
            isset($hashes[$username])
                ? $hashes[$username]
                : '$2y$10$abcdefghijklmnopqrstuv' // ユーザ名が存在しないときだけ極端に速くなるのを防ぐ
        )
    ) {
        // 認証が成功したとき
        // セッションIDの追跡を防ぐ
        session_regenerate_id(true);
        // ユーザ名をセット
        $_SESSION['username'] = $username;
        // ログイン完了後に / に遷移
        header('Location: /');
        exit;
    }
    // 認証が失敗したとき
    // 「403 Forbidden」
    http_response_code(403);
}

header('Content-Type: text/html; charset=UTF-8');

?>
<!DOCTYPE html>
<title>ログインページ</title>
<h1>ログインしてください</h1>
<form method="post" action="">
    ユーザ名: <input type="text" name="username" value="">
    パスワード: <input type="password" name="password" value="">
    <input type="hidden" name="token" value="<?=h(generate_token())?>">
    <input type="submit" value="ログイン">
</form>
<?php if (http_response_code() === 403): ?>
<p style="color: red;">ユーザ名またはパスワードが違います</p>
<?php endif; ?>
```

パスワードは予めハッシュ化しておく必要があります。Macならターミナルで下記のコマンドを実行することでハッシュ化ができます。

```
$ php -r 'echo password_hash("ここにハッシュ化したいパスワードを入れる", PASSWORD_BCRYPT), PHP_EOL;'
```
