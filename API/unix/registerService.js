// Copyright 2020 Samuel KORTAS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const { documentClient, commandLineBase, currentDateTime,
        serviceDetailTable, checkArgv, SERVICE_REQUIRED } = require('./helpers');

var argv = commandLineBase()
    .usage('Usage: $0 --service [serviceName] --instance [instanceName]')
    .command('registerService', 'register a service in Ludion')
    .example('$0 -s Jupyter -i myBook', '-> launch a Jupyter note book service')
    .alias('j', 'job').nargs('j', 1).describe('job', 'job #')
    .describe('e', 'Endpoint').alias('e','endpoint')  
    .demandOption(['service','instance'])
    .argv;

checkArgv(argv, [SERVICE_REQUIRED]);
const {user, service, instance, id } = argv;

var os = require("os");
var hostname = argv.hostname ? argv.hostname : os.hostname();
var endpoint = argv.endpoint ? argv.endpoint : `http://${hostname}:20030/lims`;
var description = argv.description ? argv.description : `Service ${service}`;



var jobid = argv.jobid ? argv.jobid : currentDateTime();

var params = {
    TableName: serviceDetailTable,
    Item: {
      id: id,
      description: description,
      machine: hostname,
      status: "STARTING",
      user: user,
      endpoint: endpoint,
      instance: instance,
      jobid: id,
      service: service
    }
  };

documentClient.put(params, function(err, data) {
    if (err) {
	console.error("Can't add Service.\n"+err);
	
    } else {
	console.log("Succeeded adding an Service: ", params.Item.service);
    }
});

