'use strict';

// Move the edit-file.js file into the lib folder
// Create a new file at the root called "edit.js" which requires in the edit-file.js
// edit-file.js should export a function, called by edit.js that does the same operations
// Write a test in the __tests__ folder for lib/edit-file.js that makes assertions on that exported function.
// Use describe and it (or test) methods to define descriptive tests and increase readability
// Each it callback should aim to test a small, well defined, feature of a function
// Write tests to ensure that the reader function rejects errors with invalid file paths
// Write tests to ensure that the reader function correctly resolves mapped string data for an array of file paths
// Use a mocked version of the fs module so that you don't actually write to files during your test.

jest.mock('fs');

// Best to just comment this out
// const reader = require('../../edit-file.js');
const reader = require('../../lib/reader-edited.js');

describe('File Reader Module', () => {

  it('when given a bad file, returns an error', done => {
    let files = ['bad.txt'];
    // In jest, throwing errors obviously kills the app, so if you're
    // going to throw one in a test, have the expect execute your code as a
    // function so that you can trap it.
    reader(files, (err,data) => {
      console.log(data);
      expect(err).toBeDefined();
      done();
    });
  });

  it('Does it read all 3 files', done => {
    let files = ['file1.txt', 'file2.txt', 'file2.txt'];
    reader(files, (err,data) => {
      expect(err).toBeNull();
      expect(data instanceof Array ).toBeTruthy();
      expect(data.length ).toBe(3);
      done();
    });
  });
});