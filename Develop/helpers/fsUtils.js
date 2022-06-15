const fs = require("fs");
const util = require("util");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  // stringifies content (assumed object) before writing into the file
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );