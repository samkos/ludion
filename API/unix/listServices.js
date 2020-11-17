// Copyright 2020 Samuel KORTAS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const { commandLineBase, checkArgv } = require('./helpers');

var argv = commandLineBase()
    .usage('Usage: $0 [ --long ] [--json] '+
	   '\n        [ --service <serviceName> ] [ --instance <instanceName> ]')
     .alias('l', 'long').nargs('l', 0).describe('l', 'long format')
     .alias('j', 'json').nargs('j', 0).describe('j', 'json format')
     .command('listServices', 'list services registered in Ludion')
    .example('$0 -u johndoe', '-> list all services belonging to user johndoe')
    .argv;

checkArgv(argv);

const { id, user, service, instance } = argv;

import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports)

import { API, graphqlOperation } from 'aws-amplify'

var filter = id ?  `id:{eq:"${id}"}`  : `id:{beginsWith:""}` ;
if (user && !id && user !=="all") { filter = filter + `, user:{eq:"${user}"}`}
if (service && !id) { filter = filter + `, service:{eq:"${service}"}`}
if (instance && !id) { filter = filter + `, instance:{eq:"${instance}"}`}


const query = `
query ls{
  listServices(filter:{
    ${filter}
    })
    {
      items {
        ${ argv.long  && argv.is_admin ? "id" : ""}
        machine
        service
        instance
        status
        step
        ${ argv.user_as_param ? "user" : ""}
        ${ argv.long ? "endpoint\njobid\ndescription" : ""}
      }
  }
}
`;


if (argv.debug) {
  console.log('query',query);
  console.log('operation',graphqlOperation(query))
  console.log(argv);
} 

const jsonToTable = require('json-to-table');
const tableToTxt = require('text-table');


API.graphql(graphqlOperation(query))
    .then(data => {
      if (argv.debug) {
	  console.log("data",data);
	  console.log("data.items",data.data.listServices.items);
      }
      console.log(argv.json ? data.data.listServices.items :
        tableToTxt(jsonToTable(data.data.listServices.items)))
      })
    .catch(err => console.log({err}))


