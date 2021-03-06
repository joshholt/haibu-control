#!/usr/bin/env node

var eyes = require('eyes'),
		haibu = require('haibu-api'),
		optimist = require('optimist'),
		argv  = optimist.usage('Usage: $0 -[skrd]')
			.describe({
				'host' : 'The address to the haibu server to which you will be deploying an application',
				's' : 'Start application on Haibu Server, will deploy and start if this is the first time the server has seen the app',
				'k' : 'Stop  application on Habiu Server',
				'r' : 'Restart application on Habiu Server',
				'd' : 'Remove all instances of application from the Haibu Server'
			})
			.options('s', {	alias: 'start' })
			.options('k', { alias: 'kill' })
			.options('r', { alias: 'restart' })
			.options('d', { alias: 'destroy' })
			.demand('host')
			.argv;


var client, app, deployer;

client = new haibu.createClient({
	host: argv.host,
	port: 9002
}).drone;

try {
	app = JSON.parse(require('fs').readFileSync(process.cwd() + '/Deployfile'));
	console.log("Processed your Deployfile: \n");
	eyes.inspect(app);
} catch (e) {
	optimist.showHelp()
	console.log("Your Deployfile must be valid JSON");
	process.exit();
}

deployer = {
	"start"   : function () {
		client.start(app, function (err, res) { eyes.inspect(err); eyes.inspect(res); });
	},
	"kill"    : function () {
		client.stop(app.name, function (err, res) { eyes.inspect(err); eyes.inspect(res); });
	},
	"restart" : function() {
		client.restart(app.name, function (err, res) { eyes.inspect(err); eyes.inspect(res); });
	},
	"remove"  : function () {
		client.clean(app, function (err, res) { eyes.inspect(err); eyes.inspect(res); });
	}
};

if (!app || app === undefined) {
	optimist.showHelp()
	console.log("You need to create a Deployfile in the root of your project.");
}

if (argv.s || argv.start) {
	deployer.start();
}
else if (argv.k || argv.kill) {
	deployer.kill();
}
else if (argv.r || argv.restart) {
	deployer.restart();
}
else if (argv.d || argv.destroy) {
	deployer.remove();
}
else {
	optimist.showHelp();
}
