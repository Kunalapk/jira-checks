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
		var pullRequestTitle = getPullRequestTitle(github).toString().trim()
		console.log("TITLEXXX: "+pullRequestTitle)
		const { stdout } = await exec.getExecOutput(`npx run-func ${path} getTicketId "${pullRequestTitle}"`)
		console.log("Processed PR Title - "+stdout)
	} catch (error) {
		core.setFailed("Failed::"+error)
	}
}



function getPullRequestTitle(github) {
	return github.context.payload.pull_request.title
}

run();