// FTP 接続先情報読み込み
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const secretInfos = require('../secret-infos.json');

// ftp-uploadの設定
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
    user: secretInfos.ftp.userName,
    password: secretInfos.ftp.password,
    host: secretInfos.ftp.host,
    port: 21,
    localRoot: ".output/public",
    remoteRoot: "/public_html/blog.udcxx.me/",
    include: ["*", "**/*"],
    exclude: ["/**/*.DS_Store"],
    deleteRemote: false,
    forcePasv: true
};

// 開始時にログを残す
console.clear();
require('readline').cursorTo(process.stdout, 0, 0);
process.stdout.write('🏁アップロードを開始します');

// アップロード中にログを残す
ftpDeploy.on("uploading", function (data) {
    const count = Math.floor(data.transferredFileCount / data.totalFilesCount * 100);

    require('readline').cursorTo(process.stdout, 0, 3);
    process.stdout.write(`【${"■".repeat(Math.floor(count / 10)) + "□".repeat(10 - Math.floor(count / 10))}】 ${count}% // ♻Uploading... ${data.filename}\x1b[0K`);
});
ftpDeploy.on("upload-error", function (data) {
    require('readline').cursorTo(process.stdout, 0, 4);
    console.log(data.err);
});

// 終了時にログを残す
ftpDeploy.deploy(config, function (err, res) {
    if (err) {
        require('readline').cursorTo(process.stdout, 0, 5);
        console.log(err);
    } else {
        require('readline').cursorTo(process.stdout, 0, 5);
        process.stdout.write('🐬アップロードが完了しました');
    };
    process.exit();
});