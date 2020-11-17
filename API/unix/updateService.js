// Copyright 2020 Samuel KORTAS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const { commandLineBase, serviceDetailTable, checkArgv, SERVICE_REQUIRED, documentClient } = require('./helpers');

var argv = commandLineBase()
    .usage('Usage: updateService --service <serviceName> --instance <instanceName>'
    +    '\n                [ --param1 value1 [ --param2 value2 ...] ]')
    .command('updateService', 'update parameters of  a service in Ludion')
    .example('$0 -s Jupyter -i myBook --x 1', '-> set to 1 the parameter x of a Jupyter note book service')
    .argv;


checkArgv(argv, [SERVICE_REQUIRED]);

var os = require("os");
var hostname = argv.hostname ? argv.hostname : os.hostname();

var service = argv.service ? argv.service : null;
var instance = argv.instance ? argv.instance : null;
var id = argv.id ? argv.id :  null;

var { id } =  argv;


var update = "SET ";

var params = {
    TableName: serviceDetailTable,
    ExpressionAttributeNames: { }, 
    ExpressionAttributeValues: { },
    Key: { id: id },
    Item: { id: id},
    ReturnValues: "ALL_NEW",
};



Object.keys(argv).map( x => {
    if ( "__service__instance__id__s__i__d__debug__$0__I___user_as_param____".indexOf(`__${x}__`) == -1) {
	    params.ExpressionAttributeNames[`#${x.toUpperCase()}`] = x;
        params.ExpressionAttributeValues[`:${x}`] = "" + argv[x] ; // { S: `${argv[x]}` };
        params.Item[x] = argv[x];
	    update = update + `#${x.toUpperCase()} = :${x}, `;
    }
  }
);		       

update = update.slice(0,update.length-2);

params.UpdateExpression  = update;

if (argv.debug) { console.log('update order',params);}

documentClient.update(params, function(err, data) {
    if (err) {
	console.error("Can't modify Service.\n"+err);
    } else {
	console.log("Succeeded modifying"
		    + " an Service: " );
    }
});
   






