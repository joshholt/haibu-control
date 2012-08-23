[![build status](https://secure.travis-ci.org/joshholt/haibu-control.png)](http://travis-ci.org/joshholt/haibu-control)
###Haibu-Control
haibu-control is a remote control for a haibu server.

You install haibu-control globally via NPM and then you create a
"Deployfile" in your nodejs project.

The format of the "Deployfile" is as follows

		{
			"user" : "joshholt",
			"name" : "test",
			"domain": "mytest.com",
			"repository" : {
				"type" : "git",
				"url"  : "https://github.com/Marak/hellonode.git"
			},
			"scripts" : {
				"start" : "server.js"
			}
		}


Once you've set up your "Deployfile" you can deploy your application to
your haibu server with the folowing command:

`haibu-control --host=127.0.0.1 -s`

You can restart your application on the haibu server with the following comand:

`haibu-control --host=127.0.0.1 -r`

You can kill your application on the haibu server with the following comand:

`haibu-control --host=127.0.0.1 -k`

You can completely remove your application from the haibu server with the following comand:

`haibu-control --host=127.0.0.1 -d`


###Example

There is an example application that you can use to test out haibu-control [here][examplelink]

[examplelink]:https://github.com/joshholt/haibu-control-example
