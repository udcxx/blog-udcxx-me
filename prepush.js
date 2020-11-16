const { execSync } = require('child_process')
const branch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .replace(/\r?\n/g, "");

if (branch === "blog") {
	execSync("npm run blog");
} else {
	return;
}
