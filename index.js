const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
var fs = require('fs');

async function run() {
	try {
		const project_id = core.getInput('project_id');
		const jira_token = core.getInput('token');
		const path = core.getInput('path');

		var pullRequestTitle = getPullRequestTitle(github)
		const { stdout } = await exec.getExecOutput(`npx run-func ${path} getTicketId "${pullRequestTitle}"`)
		var processedJiraId = stdout.toString().trim()

		var jiraTicketUrl = `https://${project_id}.atlassian.net/rest/api/latest/issue/${processedJiraId}.json`
		console.log("jiraTicketUrl - "+jiraTicketUrl)
	} catch (error) {
		core.setFailed("Failed::"+error)
	}
}



function getPullRequestTitle(github) {
	return github.context.payload.pull_request.title
}

run();