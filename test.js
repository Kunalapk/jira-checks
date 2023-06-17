const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
	try {
		
	  	//const myModule = await import('./hey.js');
		const myModule = require('./hey.js');
		const ticketId = myModule.getTicketId("Tickkk");
		console.log("Hello! - "+ticketId)

		//await exec.exec(`${src}/validate-jira-checks.sh -`);
	} catch (error) {
		core.setFailed("Failed"+error)
	}
}

run();