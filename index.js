const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
	try {
		const project_id = core.getInput('project_id');
		const jira_token = core.getInput('jira_token');
		const src = __dirname

		core.setOutput("Hello! - "+project_id+" - "+jira_token)
		//await exec.exec(`${src}/validate-jira-checks.sh -`);
	} catch (error) {
		core.setFailed("Failed")
	}
}

run();