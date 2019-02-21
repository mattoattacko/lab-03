'use strict';

// ASHLEY'S BREAKDOWN: This file fixes the errors that were present in the reader.js file. Because these callbacks run asynchronously, they need to be nested inside one another in order for them to read in order. In the reader.js file, they were not nested so the program would see that each function was an error first callback and it would then send it to the queue. Then it would call the console.log. The order wasn't right. When they are nested, they can feed off of eachother and when they get into the callback queue, they are dependent on one another to run and will then read in order. There are problems with this system, however. The file structure isn't scalable. If you want to add more files to read down the road, you need to manually adjust the nesting which can get complicated. Every time you add a new file, it increases the chances of making an error. Also, what happens if you only want to read two files? Or one file? This system always reads three files. There isn't room for flexibility.
const fs = require('fs');
let contents = [];
console.log(contents);
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
 * Reads and returns the contents of 3 files
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 */
const readAll = (paths, callback) => {

  let contents = [];
  readOne(paths[0], (err, data) => {
    if (err) {
      callback(err);
    }
    else {
      contents.push(data.toString().trim());
      readOne(paths[1], (err, data) => {
        if (err) {
          callback(err);
        }
        else {
          contents.push(data.toString().trim());
          readOne(paths[2], (err, data) => {
            if (err) {
              callback(err);
            }
            else {
              contents.push(data.toString().trim());
              callback(null,contents);
            }
          });
        }
      });
    }
  });
};