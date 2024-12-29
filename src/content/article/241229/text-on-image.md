---
title: 文字を埋め込んだ画像を生成するツール作った
date: 2024-12-29
tags: Web IT
eyecatch: 
eyecatchEmoji: 🖼️
description: PHPを使って、元画像に任意の文字を埋め込んで、新たな画像を生成するツールを作ってみました。
---

こんにちは。だいちゃんです。

QiitaとかZennとかイマドキのサイトは、OGP画像に記事タイトルが埋め込まれてるじゃないですか。

あれを実装してみたいなと思って、まずは画像と文字を重ねて別の画像ファイルとして保存するだけのツールを作ってみました。このブログに実装するかはさておき（ ~~Nuxt.jsとの連携めんどそう~~ ）、冬休みの自由研究ということで。

## 作ったもの

[https://play.udcxx.me/24-text-on-image/?title=ここに入れた文字が画像に埋め込まれます](https://play.udcxx.me/24-text-on-image/?title=%E3%81%93%E3%81%93%E3%81%AB%E5%85%A5%E3%82%8C%E3%81%9F%E6%96%87%E5%AD%97%E3%81%8C%E7%94%BB%E5%83%8F%E3%81%AB%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BE%E3%82%8C%E3%81%BE%E3%81%99) のように、 `?title=` 以降に指定した文字列を、 [ベースとなる画像](https://play.udcxx.me/24-text-on-image/images/ogp_templete.jpg) 上に埋め込んで、 [新しい画像](https://play.udcxx.me/24-text-on-image/images/E38193E38193E381ABE585A5E3828CE3819FE69687E5AD97E3818CE794BBE5838FE381ABE59F8BE38281E8BEBCE381BEE3828CE381BEE38199.jpg) として保存するものです。

### ベースとなる画像

![](https://play.udcxx.me/24-text-on-image/images/ogp_templete.jpg)

### 作成された画像

![](https://play.udcxx.me/24-text-on-image/images/E38193E38193E381ABE585A5E3828CE3819FE69687E5AD97E3818CE794BBE5838FE381ABE59F8BE38281E8BEBCE381BEE3828CE381BEE38199.jpg)

PHPで画像を処理することができる GD というライブラリを利用しています。ほとんどのPHP環境では特に何もしなくても利用できると思います。

実際、Dockerで作ったPHP環境や、CORE SERVERでは事前準備なく利用することができました。

利用できるかどうかは、 `<?php phpinfo(); ?>` とだけ記載したPHPファイルを作成して開いてみることで、利用できるライブラリなどの情報を確認することができます。GD Support 欄が enable になっていれば、利用可能です。

## コードとか

以下のコードを記載したPHPファイルの他に、`images` ディレクトリにベースとなる画像 `ogp_templete.jpg` と、Titleが指定されてないときに返すデフォルトの画像 `ogp_image.jpg` を、`fonts` ディレクトリにフォントファイル `ZenKakuGothicNew-Black.ttf` を用意する必要があります。

フォントファイルは、Googleフォントであれば無料でダウンロードできるので、そちらから。

```php
<?php
    if (isset($_GET['title'])) {
        // タイトルが指定されてたら
        $title = $_GET['title'];
        $file_name = str_replace('%', '', urlencode($title)).'.jpg';

        if (!file_exists('../images/'.$file_name)) {
            // ファイルが存在しない場合
            createimage($title, $file_name);
        }
        $ip = 'https://'.parent_path($_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME']).'images/'.$file_name;
        echo '<a href="'.$ip.'">'.$ip.'</a><br><br><img src="'.$ip.'">';


    } else {
        // タイトルの指定がなかったら
        $ip = 'https://'.parent_path($_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME']).'images/ogp_image.jpg';
        echo '<a href="'.$ip.'">'.$ip.'</a><br><br><img src="'.$ip.'">';
    }

    function createimage($title, $file_name) {
        $base_image = './images/ogp_templete.jpg';
        $image = imagecreatefromjpeg($base_image);
        $color = imagecolorallocate($image, 0, 0, 0);
        $fontfile = './fonts/ZenKakuGothicNew-Black.ttf';

        $fontsize = 36;
        $angle = 0;
        $x = 100;
        $y = 300 + $fontsize;
        
        // 合体っ！
        imagettftext($image, $fontsize, $angle, $x, $y,$color, $fontfile, $title);
        
        // 保存
        imagejpeg($image, './images/'.$file_name);
    }

    function parent_path($url, $count = 1) {
        for ($i=0; $i < $count; $i++) { 
            $lastSlash = strrpos($url, '/');
            $url = substr($url, 0, $lastSlash);
        }
        return $url.'/';
    }
?>
```

## やってみて思ったこと

日本語をそのままファイル名にするのはなんかトラブりそうで嫌だったのですが、かといってパーセントエンコードすると、`%` を取り除いても1文字が6文字になるので、ファイル名長すぎ問題が発生してしまいます...

タイトルが変わったことは検知しつつ、同じタイトルは同じ画像を使えるようにするために、どうにか工夫が必要そうです。

あと、位置あわせは左下をあわせる必要があるので、 `$y` にはフォントサイズ分加算してます。

そして現状だと文字が多くなると対応しきれないのでどうにかせにゃ... って感じです。

---

DockerでPHP環境作ってそこで開発すると、エラーログにヒント出てきてやりやすかった。でもやっぱりJavaScriptが好きだなぁ。