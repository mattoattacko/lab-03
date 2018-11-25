
![CF](http://i.imgur.com/7v5ASc8.png) 03: Asynchronous Callbacks
===

## Submission Instructions
* Follow the core submission instructions

### Before you begin
* You'll need to initialize this lab folder as a new node module, install your dependencies, setup your npm script commands, and pull in your config files

## Assignment 1: Read and write to a file
There's a file called "test.txt" in the files folder of this lab
Write a node application, called `edit-file.js` in the root of your project that:

  * Use the node `fs` module
  * Accepts a file name as a command line parameter
  * Reads in the contents of the file specified with the CLI (test it out with that test.txt file)
  * Creates a random value (using Math.random() or maybe faker()
  * Puts that random value into the file
  * Save the file
  * Re-Open and read the file contents
  * Emit a `console.log()` that shows the contents before and after the operations are completed.

##### Strech Goal: Modularize and test
* Move the edit-file.js file into the lib folder
* Create a new file at the root called "edit.js" which requires in the edit-file.js
* edit-file.js should export a function, called by edit.js that does the same operations
* Write a test in the  `__tests__` folder for `lib/edit-file.js` that makes assertions on that exported function.
* Use `describe` and `it` (or `test`) methods to define descriptive tests and increase readability
* Each `it` callback should aim to test a small, well defined, feature of a function
* Write tests to ensure that the reader function rejects errors with invalid file paths
* Write tests to ensure that the reader function correctly resolves mapped string data for an array of file paths
* Use a mocked version of the `fs` module so that you don't actually write to files during your test.

## Assignment 2: Read Multiple Files, In Order
In your lab folder, you'll find an `index.js` file that calls on a library file: `lib/reader.js`
In the files folder, you'll see 3 files: `1.txt, 2.txt, 3.txt`
* The index.file should accept filenames as parameters from the command line and then invoke the reader function with an error first callback to read in the 3 files, and `console.log()` their contents (the `data`)
* The reader library should be reading in the files given to it in order and returning back an array of contents from those files.
* You should also be able to run npm test and have the reader test file run against that same library to make the same assertion.

**Task 1: Fix the broken code**
* None of the above actually works.
* Fix the library so that the files are read in the order specified on the command line AND returns an array of their contents in that same order.
* Once you do this, index.js should give you the right content and your tests should pass!

**Refactoring Task 2: Use callbacks to read an array of files**
* Make a copy of the reader.js library called `reader-callback-extended.js`
* Make a copy of the reader.test.js library called `reader-callback-extended.test.js`
* In this new file, convert the code you fixed in task 1 to run with any number of files.
* You'll need to change the tests to assert on 1, 2, 3, + files


**Refactoring Task 3: Use promises to read 3 files**
* Make a copy of the reader.js library called `reader-promises.js`
* Make a copy of the reader.test.js library called `reader-promises.test.js`
* In this new file, convert the code you fixed in task 1 to use promises to read in 3 files instead of callbacks
* You'll need to change the tests to work with promises instead of callbacks.


**Refactoring Task 4: Use `Promise.all()` to read an array files**
* Make a copy of the reader.js library called `reader-promise-all.js`
* Make a copy of the reader.test.js library called `reader-promise-all.test.js`
* In this new file, convert the code you fixed in task 3 to use an array promises to read in any number of files
* You'll need to change the tests to have more wide assertions


##  Documentation
In your README.md describe the exported values of each module you have defined. Every function description should include it's airty (expected number of parameters), the expected data for each paramiter (data-type and limitations), and it's behavior (for both valid and invalued use). Feel free to write any additional information in your README.md.
