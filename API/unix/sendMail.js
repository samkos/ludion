// Copyright 2020 Samuel KORTAS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const {currentDateTime,  getMail, checkArgv, commandLineBase, documentClient } = require('./helpers');

var argv = commandLineBase()
.usage('Usage: sendMail   --subject <subject_of_mail>'
   + '\n                [ --message <message_text> | --file <message_file_path> ] '
  //  + '\n                [ --to <recipient> ] [ --cc <in_copy> ]')
   + '\n                [ --to <recipient> ] ')
.command('sendMail', 'send a Mail to current user')
.example('$0 --subject hi --message "hello from $HOST"', '-> send a mail to the current user')
.alias('S','subject').nargs('subject', 1).describe('subject', 'Subject of the email')
.nargs('to', 1).describe('to', 'Email of the recipient (current user\'s mail if omitted)')
// .nargs('cc', 1).describe('cc', 'Email of the persons in cc')
.alias('m', 'message').nargs('m', 1).describe('message', 'Text of the email')
.alias('f', 'file').nargs('f', 1).describe('file', 'path to a file containing the text of the email')
.demandOption(['subject'])
.argv;

checkArgv(argv);

if ( (!argv.message && !argv.file) || (argv.message && argv.file)) {
  console.log('ERROR: Choose either to send a simple text message (--message parameter)'+
  '\n       either to build it from a file (--file option)' +
  '\n       but not both ');
  process.exit(1);
}

if (argv.file) {
  const fs = require('fs');

  argv.message = fs.readFileSync(argv.file);
  if (argv.debug) {
    console.log(`mail read from file ${argv.file}:\n=====\n${argv.message}\n=======`)
  }
}

function sendMail(to, subject, message) {
  var params = {
      TableName: "ludion-Mail-EABV9UKZ3M1Q",
      Item: {
        "id" : currentDateTime() + '/' +argv.user,
        "subject": `${subject}`,
        "to": `${to}`,
        "body": `${message}`
      }
    };

  documentClient.put(params, function(err, data) {
      if (err) {
        console.error("Can't add Mail.\n"+err);
        
      } else {
        console.log(`Mail "${subject}" sent to ${to}`);
      }
    });
}



if (!argv.to ) {
    // get user and mail 
    getMail(argv.user).then(email => {   
      if (argv.debug) {

        console.log(`user:${argv.user}   email:${email}`);
      }
      sendMail(email, argv.subject, argv.message);
      
    });


} else {
  sendMail(argv.to, argv.subject, argv.message);
}


