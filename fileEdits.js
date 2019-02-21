'use strict';

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
    // console.log('First Random', firstRandom);
    fs.readFile(filename, (err, data) => {
      if ( err ) throw err;
      console.log('Second Random', data.toString());
    });
  });
});