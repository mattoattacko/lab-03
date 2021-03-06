'use strict';

// Use the node fs module
// Accepts a file name as a command line parameter
// Reads in the contents of the file specified with the CLI (test it out with that test.txt file)
// Creates a random value (using Math.random() or maybe faker()
// Puts that random value into the file
// Save the file
// Re-Open and read the file contents
// Emit a console.log() that shows the contents before and after the operations are completed.

var fs = require('fs');
var filename = process.argv.slice(2)[0];
console.log(__dirname);
var faker = require('faker');
var firstRandom = faker.random.number().toString();

fs.readFile(`${__dirname}/files/${filename}`, (err, data) => {
  if ( err ) throw err;
  let readFiles = data.toString().trim(); 
  console.log('First Random', readFiles);
  fs.writeFile(`${__dirname}/files/${filename}`, firstRandom, (err) => {
    if ( err ) throw err;
    fs.readFile(filename, (err, data) => {
      if ( err ) throw err;
      console.log('Second Random', data.toString());
    });
  });
});