// BSD 2-Clause License

// Copyright (c) 2020, Samuel Kortas
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:

// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.

// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

function yargsCallback(err, args, output) {
    if (output) {
      // Remove types (e.g. [string], [boolean]) from the output
    //   output = output.replace(/ \[\w+\]/g, '');
      
      // Show the modified output
      console.log("xxxxxxxxx", output);
    }
  }

var argv = require('yargs')
    .usage('Usage: updateService --service <serviceName> --instance <instanceName>'
    +    '\n                [ --param1 value1 [ --param2 value2 ...] ]')
    .command('updateService', 'update parameters of  a service in Ludion')
    .example('$0 -s Jupyter -i myBook --x 1', '-> set to 1 the parameter x of a Jupyter note book service')
    .alias('I', 'id').nargs('I', 1).describe('I', 'Id of the service')
    .alias('s', 'service').nargs('s', 1).describe('s', 'Name of the service')
    .alias('i', 'instance').nargs('i', 1).describe('i', 'Name of the instance')
    .alias('d','debug').nargs('debug',0).describe('debug', 'Adds debug trace')
    .help('h').alias('h', 'help')
    .epilog('Ludion Unix Command line - copyright 2020') 
    .argv;

if (argv.debug) {
    console.log(`argv`,argv);
}
    
    
