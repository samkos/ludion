// Copyright 2020 Samuel KORTAS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const { commandLineBase, checkArgv, SERVICE_REQUIRED } = require('./helpers');

var argv = commandLineBase()
    .usage('Usage: setServiceTrigger --service <serviceName> --instance <instanceName>'
    +    '\n                      --widget <widget_type> --label xxx --calls <script>')
    .command('setServiceTrigger', 'connect a widget of a service in Ludion to local script')
    .example('$0 -s Jupyter -i myBook --widget Button --label "Save me" --calls run_save.sh', 
             '-> a click on Button "Save me" triggers a call to run_save.sh')
    .alias('w', 'widget').nargs('w', 1).describe('w', 'Type of widget to add')
    .alias('l', 'label').nargs('l', 1).describe('l', 'Widget configuration parameters')
    .alias('c', 'calls').nargs('c', 1).describe('c', 'Absolute path to script to trigger')
    .argv;

checkArgv(argv, [SERVICE_REQUIRED]);

var { instance, service, id } = argv;

var AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});
AWS.config.loadFromPath('./service-updater.json');

// Create the Service interface for DynamoDB
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var update = "SET ";

var params = {
    TableName: "Service",
    ExpressionAttributeNames: { }, 
    ExpressionAttributeValues: { },
    Key: { id: id },
    Item: { id: id},
    ReturnValues: "ALL_NEW",
};



Object.keys(argv).map( x => {
    if ( "__service__instance__id___i__d__debug__$0__I_____".indexOf(`__${x}__`) == -1) {
	    params.ExpressionAttributeNames[`#${x.toUpperCase()}`] = x;
        params.ExpressionAttributeValues[`:${x}`] = argv[x] ; // { S: `${argv[x]}` };
        params.Item[x] = argv[x];
	    update = update + `#${x.toUpperCase()} = :${x}, `;
    }
  }
);		       

update = update.slice(0,update.length-2);

params.UpdateExpression  = update;

if (argv.debug) { console.log('update order',params);}

// Create the document client interface for DynamoDB
var documentClient = new AWS.DynamoDB.DocumentClient();


documentClient.update(params, function(err, data) {
    if (err) {
	console.error("Can't modify Service.\n"+err);
    } else {
	console.log("Succeeded modifying"
		    + " an Service: " );
    }
});
   






