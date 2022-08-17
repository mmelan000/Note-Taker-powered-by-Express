const fs = require('fs');
const util = require('util');
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
// Converts data to JSON, then writes to file.
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err
      ? console.error(err)
      : console.info(`\nData written to ${destination}`)
  );
// Reads file, parses the array, pushes to the array, then sends it WriteToFile.
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
// Reads file, parses the array, finds the index in the array, splices it out of the array, then sends it WriteToFile.
const readAndDelete = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const noteIndex = parsedData.findIndex(object => object.id === content);
      parsedData.splice(noteIndex, 1);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };