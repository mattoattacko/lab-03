'use strict';

// ASHLEY'S BREAKDOWN: This solution is the most scalable option yet. It too uses promisify but instead, implements forEach to grab each file from the paths array that is passed in and push its contents to a new promises array. It creates a list of promises stacked up in order. Then when they are all finished stacking up in the promises array, we call Promise.all to read the data, which is an array of all of their outputs, and we then return that data. The data will be an array of buffers so we need to stringify those buffers (using reduce) and send it all back. The great thing about Promise.all is that the whole process only takes as long as the longest one, compared to the other options, that take a cumulative approach.   

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
 * Read a single file, wrapped so that we can test
 * @param file
 * @returns {*}
 */
const readOne = (file) => {
  return readFile(file);
};

/**
 * Use Promise.all to wrap an array of file read requests
 * @param paths
 * @returns Promise.all([array of result strings])
 */
const readAll = (paths) => {

  let promises = [];
  paths.forEach( file => {
    promises.push(readOne(file));
  });

  return Promise.all(promises)
    .then(
      data => {
        return data.reduce((a, buffer) => {
          a.push(buffer.toString().trim());
          return a;
        }, []);
      }
    );

};