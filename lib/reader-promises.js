'use strict';

// ASHLEY'S BREAKDOWN: The first thing this solution does differently is it implements promisify, which turns callbacks into promises. Instead of needing to use callbacks for the readOne function, we can just return it. If there are files, it will read them in the order they are listed in the readAll function. Then it will push the stringified data into the contents array and move onto the next then statement to read the next file (this is called a promise chain). Whatever data gets returned goes to the next then statement. If any errors are thrown, they will catch and the error that is associated with the catch line will run. However, this isn't exactly scalable either. You need to manually add each new file option to the code. Which leads us to the Promise All solution...

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

/**
 * Our module exports a single function that expects an array of files
 * @type {function(*=)}
 */
module.exports = exports = (files) => {
  return readAll([...files]);
};

/**
 * Wraps the FS module, for testing purposes
 * @param file
 * @returns {*}
 */
const readOne = (file) => {
  return readFile(file);
};

/**
 * Reads in 3 files using promises, returning an array of contents
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 * @returns {*}
 */
const readAll = (paths) => {

  let contents = [];

  return readOne(paths[0])
    .then( data => {
      contents.push(data.toString().trim());
      return readOne(paths[1]);
    })
    .then( data => {
      contents.push(data.toString().trim());
      return readOne(paths[2]);
    })
    .then( data => {
      contents.push(data.toString().trim());
      return contents;
    })
    .catch( err => {throw err;} );
};