const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
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

		const github_token = core.getInput('GITHUB_TOKEN');

	    const context = github.context;

	    const pull_request_number = context.payload.pull_request.number;

	    //const octokit = new github.GitHub(github_token);
	    const octokit = github.getOctokit(github_token);
	    
	    const new_comment = octokit.issues.createComment({
        	...context.repo,
        	issue_number: pull_request_number,
        	body: "hhjhgbhjgjhg"
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