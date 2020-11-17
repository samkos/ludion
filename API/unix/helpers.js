// Copyright 2020 Samuel KORTAS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

export const CHECK_USER = 'CHECK_USER';
export const SERVICE_REQUIRED = 'SERVICE_REQUIRED'

const LUDION_ADMINISTRATORS = ',samy,kortass,';
// const LUDION_ADMINISTRATORS = '';
var is_admin = LUDION_ADMINISTRATORS.indexOf(`,${process.env.USER},`)>-1;

const { serviceTable, serviceDetailTable, aws_appsync_region, aws_user_pools_id } = require('./aws-exports').default;



// Load the AWS SDK for JS
var AWS = require("aws-sdk");

AWS.config.update({region: aws_appsync_region});
AWS.config.loadFromPath('./service-updater.json');

AWS.config.apiVersions = {
  cognitoidentityserviceprovider: '2016-04-18',
  // other service API versions
};


// -----------------------------------------
// Create the document client interface for DynamoDB
const documentClient = new AWS.DynamoDB.DocumentClient();

// Create the Service interface for DynamoDB
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider;


var params = {
  UserPoolId: aws_user_pools_id, /* required */
  // AttributesToGet: null,
  AttributesToGet: ['email'],
  // Filter: 'Username = "kortass"',
  // Filter:"",
  // Limit: 50,
  // PaginationToken: 'x'
};

async function getMail(user) {
  return new Promise(function(resolve,reject) {
     cognitoidentityserviceprovider.listUsers(params, function(err, data) {
        if (err) { 
            console.log(err, err.stack); // an error occurred
            reject(err);
          }
          else  {
            var user_data = data.Users.find( x => x.Username === user);
            var email = user_data.Attributes[0].Value;
            resolve(email);
          }
        }
     )
    }
  )
}

// function giving current date and time
function currentDateTime() {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date+'/'+time;
}

const yargs  = require('yargs');

// command line per default
function commandLineBase(user) {
  // return yargs;
  var commandLine = yargs
      .alias('s', 'service').nargs('s', 1).describe('s', 'Name of the service')
      .alias('i', 'instance').nargs('i', 1).describe('i', 'Name of the instance')
      .alias('d','debug').nargs('debug',0).describe('debug', 'Adds debug trace')
      .help('h').alias('h', 'help')
      .epilog('Ludion Unix Command line - copyright 2020');

  if (is_admin) {
    commandLine = commandLine
    .describe('u', 'given user | all                               [ ADMIN ONLY ]').nargs('u',1).alias('u','user')  
    .describe('Z', 'act as regular user, abolish admin privileges  [ ADMIN ONLY ]').nargs('Z',0).alias('Z','not-admin')  ;
    
  }
  return commandLine;
}

function haveToCheck(option, criteria) {
  return ("," + option.join(",") + ",").indexOf(`,${criteria},`)>-1;
}

// checking argument passed are compatible with Ludion command
function checkArgv(argv, options =[]) {
  if (argv.debug) {
    console.log(`argv`,argv);
  }
  
  argv.user_as_param = argv.user; 
  if (argv["not-admin"]) {
    is_admin = false;
  }

  argv.is_admin = is_admin;

  if (!is_admin && argv.user ) {
    console.log("ERROR: --user option is not possible if --not-admin option is set.");
    process.exit(1);
  }

  argv.user = argv.user ? argv.user : process.env.USER;
    
  if (haveToCheck(options, SERVICE_REQUIRED)) {
    if (!argv.id & (!argv.service | !argv.instance )) {
      console.log("ERROR: at least id or service AND instance are expected as parameters");
      process.exit(1);
    }
    const {service, instance, user } = argv;
    argv.id =  `${service}:${instance}:${user}`;
  }

}

module.exports.getMail = getMail;
module.exports.documentClient = documentClient;
module.exports.currentDateTime = currentDateTime;
module.exports.commandLineBase = commandLineBase;
module.exports.checkArgv = checkArgv;
module.exports.serviceTable = serviceTable;
module.exports.serviceDetailTable = serviceDetailTable;
module.exports.region = aws_appsync_region;
module.exports.user_pools_id = aws_user_pools_id;

