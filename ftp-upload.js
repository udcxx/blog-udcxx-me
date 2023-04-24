// FTP 接続先情報読み込み
import secretInfos from './secret-infos.json';

// ftp-uploadの設定
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
    user: secretInfos.ftp.userName,
    password: secretInfos.ftp.password,
    host: secretInfos.ftp.host,
    port: 21,
    localRoot: "dist",
    remoteRoot: "/public_html/blog.udcxx.me/",
    include: ["*", "**/*"],
    exclude: ["/**/*.DS_Store"],
    deleteRemote: false,
    forcePasv: true
};

// アップロード中にログを残す
ftpDeploy.on("uploading", function(data) {
    console.log(`${data.filename} をアップロード中...（${data.transferredFileCount + 1}/${data.totalFilesCount}）`);
});
ftpDeploy.on("upload-error", function(data) {
    console.log(data.err);
});

// 終了時にログを残す
ftpDeploy.deploy(config, function(err, res) {
    if (err) console.log(err);
    else console.log("アップロードが終了しました。");
    process.exit();
});
