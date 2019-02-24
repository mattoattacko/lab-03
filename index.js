'use strict';

const fileReader = require('./lib/reader-edited.js');
const fileReaderPromises = require('./lib/reader-promises.js');
const fileReaderPromiseAll = require('./lib/reader-promise-all.js');
const fileReaderCallbacksArray = require('./lib/reader-callbacks-extended.js');

// In your lab folder, you'll find an index.js file that calls on a library file: lib/reader.js In the files folder, you'll see 3 files: 1.txt, 2.txt, 3.txt
// The index.file should accept filenames as parameters from the command line and then invoke the reader function with an error first callback to read in the 3 files, and console.log() their contents (the data)
// The reader library should be reading in the files given to it in order and returning back an array of contents from those files.
// You should also be able to run npm test and have the reader test file run against that same library to make the same assertion.

// Obtain and assert input
let files = process.argv.slice(2);
if( ! (files instanceof Array && files.length) ) {
  throw new Error('Invalid Argument');
}

fileReader(files, (err,data) => {
  if ( err ) { throw err; }
  console.log('From the Callback:', data);
});

// Testing different idea

// callbacks to read the files 
fileReaderCallbacksArray(files, (err,data) => {
  if ( err ) { throw err; }
  console.log('From the Callbacks Extended:', data);
});

// uses promises to read 3 files in order
fileReaderPromises(files)
  .then(contents => console.log('From Promises():', contents));


// uses Promise.all to read any number of files
fileReaderPromiseAll(files)
  .then(contents => console.log('From Promise.all():', contents));
