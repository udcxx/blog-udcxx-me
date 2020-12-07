const execSync = require('child_process').execSync;
const branch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .replace(/\r?\n/g, "");

if (branch === "201207prepush-test") {
	execSync("npm run md");
    execSync("npm run generate");
    execSync("npm run copy");
    execSync("npm run upload");
    // execSync("node -v");
} else {
	return;
}
