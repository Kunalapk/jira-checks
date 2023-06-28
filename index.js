const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
var fs = require('fs');

async function run() {
	try {
		const project_id = core.getInput('project_id');
		const jira_token = core.getInput('token');
		//const path = './'+core.getInput('path');
		const path = core.getInput('path');

		var text = await exec.getExecOutput("npx run-func "+path+" getTicketId XYZ")
		console.log("sdnfkjdnsf - "+text+" - "+path)
		//await exec.exec(`${src}/validate-jira-checks.sh -`);
	} catch (error) {
		core.setFailed("Failed::"+error)
	}
}

run();