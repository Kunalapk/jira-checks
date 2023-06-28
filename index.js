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

		exec.exec("npx run-func "+path+" getTicketId XYZ").then(
			function(value) {
				console.log("TTTEETETETET - "+value)
			},
			function(error) {
				console.log("TTTEETETETET - "+error)
			}
		);
		var text = await exec.exec("npx run-func "+path+" getTicketId XYZ")
		console.log("sdnfkjdnsf - "+text+" - "+path)
		//await exec.exec(`${src}/validate-jira-checks.sh -`);
	} catch (error) {
		core.setFailed("Failed::"+error)
	}
}

run();