const { exec } = require('child_process');
const branch = exec("git rev-parse --abbrev-ref HEAD")
    .toString()
    .replace(/\r?\n/g, "");

if (branch === "blog") {
	exec("npm run blog");
} else {
	return;
}
