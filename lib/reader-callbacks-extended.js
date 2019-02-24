'use strict';

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