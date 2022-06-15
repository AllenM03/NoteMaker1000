const fs = require("fs");
const util = require("util");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  // stringifies content (assumed object) before writing into the file
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  const readAndAppend = (content, file) => {
    // first read the file
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // if there's no error, convert JSON string to object
        const parsedData = JSON.parse(data);
        // so that the added content can be pushed into the array
        parsedData.push(content);
        // store the newly created array to the given file
        writeToFile(file, parsedData);
        console.info(`\nData added to ${file}`);
      }
    });
  };

  const deleteIdFromFile = (contentId, file) => {
    readFromFile(file)
      // convert JSON string to object so we could use array functions in it
      .then((data) => JSON.parse(data))
      .then((dataObj) => {
        // filter the array object so that we get all objects except for the one with selected ID
      const filteredData = dataObj.filter((item) => item.id !== contentId);

      // write to the file the filteredData
      writeToFile(file, filteredData);
      console.info(`\nItem ${contentId} has been deleted from ${file}`);
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteIdFromFile };