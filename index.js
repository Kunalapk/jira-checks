const core = require('@actions/core');
const exec = require('@actions/exec');
const {github, context} = require('@actions/github');
const request = require('request');

async function run() {
	try {
		let project_id = core.getInput('project_id');
		let jira_token = core.getInput('token');
		let path = core.getInput('path');
		//let token = core.getInput('github-token', {required: true})
        //const githubReactor = new GitHub(token, {} )


		let pullRequestTitle = getPullRequestTitle(github)
		let { stdout } = await exec.getExecOutput(`npx run-func ${path} getTicketId "${pullRequestTitle}"`)
		let processedJiraId = stdout.toString().trim()

		let jiraTicketUrl = `https://${project_id}.atlassian.net/rest/api/latest/issue/${processedJiraId}.json`
		
		console.log("jiraTicketUrl - "+getJiraTicketData(jiraTicketUrl, jira_token))
		//core.setFailed("MISSING");

		const result = await github.issues.createComment({
            owner: context.actor,
            repo: context.payload.repository.full_name,
            issue_number: 1,
            body: "We need to have the word in the body of the pull request"
        });
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