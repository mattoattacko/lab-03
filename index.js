'use strict';

const fileReader = require('./lib/reader-fixed.js');
const fileReaderCallbacksArray = require('./lib/reader-callbacks-array.js');
const fileReaderPromises = require('./lib/reader-promises.js');
const fileReaderPromiseAll = require('./lib/reader-promise-all.js');

// Obtain and assert input
let files = process.argv.slice(2);
if( ! (files instanceof Array && files.length) ) {
  throw new Error('Invalid Args');
}

fileReader(files, (err,data) => {
  if ( err ) { throw err; }
  console.log('From Callback:', data);
});

// ASHLEY'S BREAKDOWN: This uses callbacks to read the files 
fileReaderCallbacksArray(files, (err,data) => {
  if ( err ) { throw err; }
  console.log('From Callbacks Extended:', data);
});

// ASHLEY'S BREAKDOWN: This uses promises to read 3 files in order
fileReaderPromises(files)
  .then(contents => console.log('From Promises():', contents));


// ASHLEY'S BREAKDOWN: This uses Promise.all to read any number of files
fileReaderPromiseAll(files)
  .then(contents => console.log('From Promise.all():', contents));
