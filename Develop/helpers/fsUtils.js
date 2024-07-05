const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = function (filePath, content) {
  fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) => {
    err ? console.error(err) : console.info(`Data written to ${filePath}`);
  });
};

const readAndAppend = function (filePath, content) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(filePath, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
