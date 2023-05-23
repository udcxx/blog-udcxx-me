/*

ファイルを移動するスクリプト

/src/content/article/230131-article-title.md を
/src/content/article/230131/article-title.md に移動します。

※ リポジトリのルートディレクトリにいる状態で実行する必要があります。

*/ 

const { execSync } = require('child_process');
const fs = require('fs');
const glob = require('glob');

const dir = "./src/content/";

new glob.Glob(`${dir}/article/*.md`, {}, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        let count = 0;
        files.forEach(file => {
            const dirName = file.substring(0, file.indexOf("-"));
            const fileName = file.replace(dirName, "").replace("-", "");
            fs.mkdir(dirName, { recursive: true }, () => {
                if (err) { return; } else {
                    fs.renameSync(`${dirName}-${fileName}`, `${dirName}/${fileName}`);
                    console.log(`${fileName} を移動しました。`);
                    count++;
                };
            });
        });
    }
});

