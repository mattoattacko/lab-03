'use strict';

// ASHLEY'S BREAKDOWN: This is a more scalable solution compared to the reader.fixed.js file. The function expects an array of files as a parameter (called: paths). It then uses the built in array function .shift() to remove the first file from the array and push a stringified version (since it initially appears as a buffer) of its contents into the contents array. Then, if the paths array still has a length, it will call itself (recursive function) and keep pushing content to the contents array until there is nothing left to read in the paths array. This solution is good because you can send it any number of files - it is a more scalable solution. However, it can still be confusing as you need to have intimate knowledge of the callbacks - where they are coming from and what data they are providing. 
const fs = require('fs');
let contents = [];
/**
 * Our module exports a single function that expects an array of files
 * @type {function(*=)}
 */
module.exports = exports = (files, callback) => {
  readAll([...files],callback);
  contents = [];
};

/**
 * This wraps the fs module, primarily so that we can more easily write tests around it.
 * @param file
 * @param callback
 */
const readOne = (file, callback) => {
  fs.readFile( file, (err, data) => {
    if(err) { callback(err); }
    else { callback(undefined, data); }
  });
};

/**
 * Recursively go through the array (any length) of file paths and land on the
 * main callback (handler) with any returned data from readOne
 * @param paths
 * @param callback
 */
const readAll = (paths, callback) => {

  let path = paths.shift();

  path && readOne(path, (err, data) => {

    if (err) { throw err; }

    contents.push( data.toString().trim() );

    if(paths.length) {
      readAll(paths,callback);
    }
    else {
      callback(null,contents);
    }

  });
};