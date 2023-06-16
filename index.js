const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
	try {
		const src = __dirname
		await exec.exec(`${src}/validate-jira-checks.sh`);
	} catch (error) {
		core.setFailed("Failed")
	}
}

run();