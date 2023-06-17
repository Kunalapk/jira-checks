const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
var fs = require('fs');

async function run() {
	try {
		const project_id = core.getInput('project_id');
		const jira_token = core.getInput('token');
		const path = './'+core.getInput('path');
		const src = __dirname

		//core.setOutput("Hello! - "+project_id+" - "+jira_token)

	  	//const myModule = await import(path);
		//const ticketId = myModule.getTicketId("sdfds");
		//console.log("Hello! - "+project_id+" - "+jira_token.length+" - "+ticketId+" - "+path)

		var lib = require('app/sauce.js')
		console.log(lib.getTicketId("sdfds"));
		//await exec.exec(`${src}/validate-jira-checks.sh -`);
	} catch (error) {
		core.setFailed("Failed::"+error)
	}
}

run();