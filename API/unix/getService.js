// Copyright 2020 Samuel KORTAS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const { commandLineBase, checkArgv, SERVICE_REQUIRED } = require('./helpers');

var argv = commandLineBase()
    .usage('Usage: getService --service <serviceName> --instance <instanceName>'
    +    '\n                [ --parameter param1[,param2,..] | --all-parameters ]')
    .command('getService', 'get current parameter register a service in Ludion')
    .example('$0 -s Jupyter -i myBook', '-> gives all-parameter of a Jupyter note book service')
    .alias('a', 'all-parameters').nargs('all-parameters', 0)
    .describe('all-parameters', 'returns the value of all parameters')
    .alias('p', 'parameter').nargs('parameter', 1)
    .describe('parameter', 'return the value of parameter listed')
    .argv;

checkArgv(argv, [ SERVICE_REQUIRED ]);

var os = require("os");
var hostname = argv.hostname ? argv.hostname : os.hostname();

var service = argv.service ? argv.service : null;
var instance = argv.instance ? argv.instance : null;
var id = argv.id ? argv.id :  null;

if (argv.debug) {
    console.log(`argv`,argv);
}


var AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});
AWS.config.loadFromPath('./service-updater.json');

// Create the Service interface for DynamoDB
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


var params;

if (id) {
    params = {
	Key: {
            "id": {"S": id}, 
	}, 
	TableName: "Service-i6vpxtoycfctfgs52wl72o3ypi-prod"
    };
    dynamodb.getItem(params, function(err, data) {
	if (err) {
	    console.error("Can't get Service parameters.\n"+err);
	    
	} else {
	    if (argv.debug) {
		console.log("data",data)
	    }
	    if (argv["all-parameters"])  {
		var answer = {};
		Object.keys(data.Item).map(x => {  answer[x] = data.Item[x].S ;});
		console.log(answer);
	    } else if (!argv["parameters"]) {
		console.log(data.Item.status.S);
	    } else {
		var answer = {};
		argv.parameters.split(",").map( x => {  answer[x] = data.Item[x].S ;});
		console.log(answer);
						
	    }
	    
	}
    });

} else {
    params = {
        KeyConditionExpression: 'service = :service AND instance = :instance',
        ExpressionAttributeValues: {
            ':service': {'S': service},
            ':instance': {'S': instance}
        },
        TableName: "Service"
    };
    dynamodb.query(params, function(err, data) {
	if (err) {
	    console.error("Can't get Service parameters.\n"+err);
	    
	} else {
	    console.log(JSON.stringify(data));
	}
    });


}



