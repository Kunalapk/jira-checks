const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
const request = require('request');

async function run() {
	try {
		const project_id = core.getInput('project_id');
		const jira_token = core.getInput('token');
		const path = core.getInput('path');

		var pullRequestTitle = getPullRequestTitle(github)
		const { stdout } = await exec.getExecOutput(`npx run-func ${path} getTicketId "${pullRequestTitle}"`)
		var processedJiraId = stdout.toString().trim()

		var jiraTicketUrl = `https://${project_id}.atlassian.net/rest/api/latest/issue/${processedJiraId}.json`
		
		console.log("jiraTicketUrl - "+getJiraTicketData(jiraTicketUrl, jira_token))
	} catch (error) {
		core.setFailed("Failed::"+error)
	}
}


function getPullRequestTitle(github) {
	return github.context.payload.pull_request.title
}


function getJiraTicketData(jiraUrl, token){
	var request = require('request');
	var options = {
	  'method': 'GET',
	  'url': jiraUrl,
	  'headers': {
	    'Authorization': 'Basic '+token
	  }
	};
	request(options, function (error, response) {
	  if (error) console.log(error);
	  console.log(response.body);
	});
}

run();