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
		console.log("jiraTicketUrl - "+getJiraTicketData(jiraTicketUrl))
	} catch (error) {
		core.setFailed("Failed::"+error)
	}
}


function getPullRequestTitle(github) {
	return github.context.payload.pull_request.title
}


function getJiraTicketData(jiraUrl){
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Basic a3VuYWxhcm9yYTA4NjRAZ21haWwuY29tOkFUQVRUM3hGZkdGMGtNeG1WYlN0ZFVUV1FTNm10eTFURkVlUWlaTEhSa1pRYnJROHNEbTFkT0JUUHM4aDdXN3B3SjlMdmxQaV9xT3ZQd3hNb0tJbTdoTF9GT0RBZlg4d0F0Z0Q2cUFvQ0RWYWh0Y1F3aEJNRmpld0x1VHJncEdxVnRiRm5odDZqNTV5TDE0VEZkZHVnQ21hd05lVTZEVXRuQ05teGd6NHZDTGJUNzhOeEhIUGhyZz00QkQzQzQzMw==");

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};

	fetch(jiraUrl, requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}

run();