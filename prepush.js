const execSync = require('child_process').execSync;
const branch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .replace(/\r?\n/g, "");

if (branch === "blog") {
	// execSync("npm run blog");
    execSync("node -v");
} else {
	return;
}
